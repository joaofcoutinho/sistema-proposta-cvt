import NextAuth from "next-auth";

import { authConfig } from "@/lib/auth.config";

// Instância "leve" do NextAuth (sem banco/bcrypt) para rodar no Edge.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login"],
};
