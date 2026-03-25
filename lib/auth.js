// lib/auth.js
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma"; 
import { compare } from "bcryptjs";

// 🚀 L'astuce anti-crash pour le build
import CredentialsProviderModule from "next-auth/providers/credentials";
const CredentialsProvider = CredentialsProviderModule.default || CredentialsProviderModule;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email et Mot de Passe",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: { id: true, email: true, password: true, role: true, name: true },
          });

          if (user) {
            const isValidPassword = await compare(credentials.password, user.password);
            return isValidPassword ? user : null;
          }
          return null;
        } catch (error) {
          console.error("Authorize - Error:", error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
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
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: user.name,
                email: user.email,
                role: "USER",
                createdAt: new Date(),
              },
            });
          }
        } catch (error) {
          console.error("SignIn - Error creating user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "USER";
      } else if (token && !token.role) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            select: { role: true },
          });
          token.role = dbUser?.role || "USER";
        } catch (error) {
          console.error("JWT Callback - Error fetching role:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role || "USER",
        };
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development", 
};