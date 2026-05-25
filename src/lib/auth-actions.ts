"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "./auth";

export interface LoginState {
  error?: string;
}

/** Server action de login (usada com useActionState no formulário). */
export async function authenticate(
  _prevState: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "E-mail ou senha inválidos." };
    }
    // Repassa o redirect do Next (NEXT_REDIRECT) e demais erros.
    throw error;
  }
}

/** Encerra a sessão e volta para o login. */
export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/login" });
}
