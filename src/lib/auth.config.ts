import type { NextAuthConfig } from "next-auth";

/**
 * Configuração base do NextAuth — segura para o Edge Runtime (sem acesso
 * a banco ou bcrypt). É usada pelo middleware e estendida em `auth.ts`.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    /** Controla o acesso às rotas (executado no middleware). */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnAdmin) {
        return isLoggedIn;
      }

      if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      return true;
    },
    session({ session, token }) {
      // NextAuth grava o id do usuário em token.sub automaticamente.
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
