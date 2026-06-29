import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

type AuthState = {
  error: string | null;
  success: boolean | false;
  payload?: FormData;
};

export async function signUpNewUser(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (password?.length < 8) {
    return {
      error: "A senha tem menos de 8 caracteres",
      success: false,
      payload: formData,
    };
  }

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return { error: error.message, success: false, payload: formData };
  }

  redirect("/dashboard");
  //   return { error: null, success: true };
}

export async function signInWithEmail(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (password?.length < 8) {
    return {
      error: "A senha tem menos de 8 caracteres",
      success: false,
      payload: formData,
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return { error: error.message, success: false, payload: formData };
  }

  redirect("/dashboard");
  //   return { error: null, success: true };
}

export async function logout(): Promise<AuthState> {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: error.message, success: false };
    }

    redirect("/auth/login");
  } catch (error) {
    return { error: "Erro ao executar ação", success: false };
  }
}
