import NextAuthModule from "next-auth";
const NextAuth = NextAuthModule.default || NextAuthModule;
console.log("NextAuth importé :", NextAuth);

import CredentialsProviderModule from "next-auth/providers/credentials";
const CredentialsProvider = CredentialsProviderModule.default || CredentialsProviderModule;

console.log("CredentialsProvider importé :", CredentialsProvider);




import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../lib/prisma";
import { compare } from "bcryptjs";

export const runtime = "nodejs"

export const authOptions = {
  providers: [
   
    CredentialsProvider({
      name: "Email et Mot de Passe",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("Authorize - Credentials:", credentials);

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: { id: true, email: true, password: true, role: true },
          });
          console.log("Authorize - User from DB:", user);

          if (user) {
            const isValidPassword = await compare(credentials.password, user.password);
            console.log("Authorize - Password valid:", isValidPassword);

            return isValidPassword ? user : null;
          }
          console.log("Authorize - User not found");
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
      console.log("SignIn Callback - User:", user);
      console.log("SignIn Callback - Account:", account);

      if (account.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          console.log("SignIn - Existing User:", existingUser);

          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                name: user.name,
                email: user.email,
                role: "USER",
                createdAt: new Date(),
    
              },
            });
            console.log("SignIn - New User Created:", newUser);
          }
        } catch (error) {
          console.error("SignIn - Error creating user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      console.log("JWT Callback - Token before:", token);
      console.log("JWT Callback - User:", user);

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
          console.log("JWT Callback - DB User:", dbUser);
          token.role = dbUser?.role || "USER";
        } catch (error) {
          console.error("JWT Callback - Error fetching role:", error);
        }
      }

      console.log("JWT Callback - Token after:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Token:", token);
      console.log("Session Callback - Session before:", session);

      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role || "USER",
        };
      }

      console.log("Session Callback - Session after:", session);
      return session;
    },
  },
  debug: true, // Active les logs de NextAuth
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
