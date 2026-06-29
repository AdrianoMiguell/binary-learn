"use client";

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
import { signUpNewUser } from "@/db/services/auth_service";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useActionState, useState } from "react";

export default function registerPage() {
  const [visible, setVisible] = useState(false);
  const [state, formAction, isPending] = useActionState(signUpNewUser, {
    success: false,
    error: null,
  });

  return (
    <form action={formAction}>
      <FieldGroup>
        <FieldGroup>
          <h1 className="text-2xl font-bold">Cadastrar</h1>
          <FieldDescription>
            Crie sua conta para acessar os recursos do sistema
          </FieldDescription>
        </FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="nameField">Nome</FieldLabel>
            <Input
              id="nameField"
              type="text"
              name="name"
              defaultValue={(state?.payload?.get("name") as string) || ""}
              placeholder="Ex: name@gmail.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="emailField">Email</FieldLabel>
            <Input
              id="emailField"
              type="email"
              name="email"
              defaultValue={(state?.payload?.get("email") as string) || ""}
              placeholder="Ex: name@gmail.com"
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
            <Link href="/auth/login">Já tem uma conta? Entre aqui</Link>
            <Button type="submit" disabled={isPending}>
              Enviar
            </Button>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
