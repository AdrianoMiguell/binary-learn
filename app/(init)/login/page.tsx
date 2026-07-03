"use client";

import { useAuthStore } from "@/app/store/auth/auth_store";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { signInWithEmail } from "@/db/services/auth_service";
import { PerfisService } from "@/db/services/perfis_service";
import { AlertCircle, AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

export default function loginPage() {
  const [visible, setVisible] = useState(false);
  const setUser = useAuthStore((state) => state.setUser); // <-- Pega a função de salvar do Zustand

  const [state, formAction, isPending] = useActionState(signInWithEmail, {
    data: null,
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success && state.data?.id) {
      const emailSave = state.payload?.get("email") as string;
      const username = state.data.username || "";

      setUser({ email: emailSave, username: username });
      window.location.href = "/";
    }
  }, [state, setUser]);

  return (
    <form action={formAction} className="mb-5">
      <FieldGroup>
        <FieldGroup>
          <h1 className="text-2xl font-bold">Entrar</h1>
          <FieldDescription>
            Acesse a plataforma com a sua conta e aprenda mais sobre conversões
            númericas
          </FieldDescription>
        </FieldGroup>
        <FieldGroup>
          <Field>
            {state.error != null && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="emailField">Email</FieldLabel>
            <Input
              id="emailField"
              type="email"
              name="email"
              placeholder="Ex: name@gmail.com"
              defaultValue={(state?.payload?.get("email") as string) || ""}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="passwordField">Senha</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="passwordField"
                name="password"
                type={visible ? "text" : "password"}
                required
              />
              <InputGroupAddon align="inline-end">
                <Button
                  variant="ghost"
                  disabled={isPending}
                  onClick={() => setVisible(!visible)}
                  type="button"
                >
                  {!visible ? <Eye /> : <EyeOff />}
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Deve ter pelo menos 8 caracteres
            </FieldDescription>
          </Field>
          <Field orientation="horizontal" className="justify-between">
            <Link href="/register">
              Ainda não tem uma conta? Registre-se aqui
            </Link>
            <Button>Enviar</Button>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
