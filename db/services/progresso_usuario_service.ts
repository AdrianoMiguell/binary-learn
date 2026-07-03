import { and, eq } from "drizzle-orm";
import { db } from "..";
import { progressoUsuarioTable } from "../schemas/progresso_usuario_schemas";

export const ProgressoUsuarioService = {
  async salvarProgresso(dados: {
    perfilId: string;
    nivelId: number;
    pontosObtidos: number;
    coracoesUsados: number;
    estrelas: number;
  }) {
    const existente = await db
      .select()
      .from(progressoUsuarioTable)
      .where(
        and(
          eq(progressoUsuarioTable.perfilId, dados.perfilId),
          eq(progressoUsuarioTable.nivelId, dados.nivelId)
        )
      );

    if (existente.length > 0) {
      if (dados.pontosObtidos > (existente[0].pontosObtidos ?? 0)) {
        return await db
          .update(progressoUsuarioTable)
          .set({
            pontosObtidos: dados.pontosObtidos,
            coracoesUsados: dados.coracoesUsados,
            estrelas: dados.estrelas,   // ← adicionado
            concluida: true,
            concluidoEm: new Date(),
          })
          .where(eq(progressoUsuarioTable.id, existente[0].id))
          .returning();
      }
      return existente[0];
    }

    const novoProgresso = await db
      .insert(progressoUsuarioTable)
      .values({
        perfilId: dados.perfilId,
        nivelId: dados.nivelId,
        pontosObtidos: dados.pontosObtidos,
        coracoesUsados: dados.coracoesUsados,
        estrelas: dados.estrelas,       // ← adicionado
        concluida: true,
      })
      .returning();

    return novoProgresso[0];
  },
};