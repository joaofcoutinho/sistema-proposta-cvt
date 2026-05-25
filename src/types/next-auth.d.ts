import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /** Sessão exposta no app — adiciona o id do usuário. */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
