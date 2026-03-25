import NextAuthModule from "next-auth";
import { authOptions } from "../../../../lib/auth";

// 1. Les imports d'abord, les exports ensuite !
export const dynamic = 'force-dynamic';

// 2. Le fameux correctif qui sauve ton build
const NextAuth = NextAuthModule.default || NextAuthModule;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };