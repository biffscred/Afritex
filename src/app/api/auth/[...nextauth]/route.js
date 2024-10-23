// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../lib/prisma";
import { compare } from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Email et Mot de Passe",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        console.log('Credentials received:', credentials);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            
            email: true,
            password: true,
            role: true,
          },
        });

        if (user) {
          const isValidPassword = await compare(credentials.password, user.password);
          if (isValidPassword) {
            return user;
          } else {
            console.log('Invalid password');
            return null;
          }
        } else {
          console.log('User not found');
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma), // Inclusion du PrismaAdapter
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              role: 'USER',
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log('User during JWT callback:', user);
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || 'USER';
      } else if (token && !token.role) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true },
        });
        token.role = dbUser?.role || "USER";
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Token during session callback:', token);
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role || 'USER',
        };
      }
      return session;
    },
  },
  debug: true, // Optionnel : Active le mode débogage pour plus de détails
};

export const GET = NextAuth(options);
export const POST = NextAuth(options);
