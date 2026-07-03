import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { PerfisService } from "./perfis_service";

type AuthState = {
  error: string | null;
  data?: {
    id?: string | null;
    username?: string | null;
    email?: string | null;
  } | null;
  success: boolean | false;
  payload?: FormData;
};

export async function signUpNewUser(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = createClient();

  const username = formData.get("username") as string;
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
    options: {
      data: {
        display_name: username,
      },
    },
  });

  if (error) {
    return { error: error.message, success: false, payload: formData };
  }

  await supabase.auth.signOut();

  redirect("/login");
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

  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return { error: error.message, success: false, payload: formData };
  }

  const id = data.user.id;
  const username = data.user.user_metadata?.display_name as string | null;

  console.log(username);

  return {
    data: { id: id, username: username },
    error: null,
    success: true,
    payload: formData,
  };
}

export async function logout(): Promise<AuthState> {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: error.message, success: false };
    }

    return { error: null, success: false };
  } catch (error) {
    return { error: "Erro ao executar ação", success: false };
  }
}
