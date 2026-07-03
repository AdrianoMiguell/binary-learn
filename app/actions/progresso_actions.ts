"use server";

import { ProgressoUsuarioService } from "@/db/services/progresso_usuario_service";
import { createClient } from "@/lib/supabase/server";

interface SalvarProgressoParams {
  nivelId: number;
  xpGanho: number;
  acertos: number;
  total: number;
  estrelas: number;
}

export async function salvarProgresso({
  nivelId,
  xpGanho,
  acertos,
  total,
  estrelas,
}: SalvarProgressoParams) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Sem usuário logado, ignora silenciosamente (modo teste)
  if (!user) return null;

  return await ProgressoUsuarioService.salvarProgresso({
    perfilId: user.id,
    nivelId,
    pontosObtidos: xpGanho,
    coracoesUsados: 0,
    estrelas,
  });
}