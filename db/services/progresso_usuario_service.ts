import { and, eq } from "drizzle-orm";
import { db } from "..";
import { progressoUsuarioTable } from "../schemas/progresso_usuario_schemas";

export const ProgressoUsuarioService = {
  // Salva ou atualiza a conclusão de um nível pelo jogador
  async salvarProgresso(dados: {
    perfilId: string;
    nivelId: number;
    pontosObtidos: number;
    coracoesUsados: number;
  }) {
    // Verifica se ele já jogou esse nível antes
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
      // Se já existia, atualiza apenas se a pontuação atual for maior
      if (dados.pontosObtidos > (existente[0].pontosObtidos ?? 0)) {
        return await db
          .update(progressoUsuarioTable)
          .set({
            pontosObtidos: dados.pontosObtidos,
            coracoesUsados: dados.coracoesUsados,
            concluida: true,
            concluidoEm: new Date(),
          })
          .where(eq(progressoUsuarioTable.id, existente[0].id))
          .returning();
      }
      return existente[0];
    }

    // Se é a primeira vez jogando o nível, cria o registro
    const novoProgresso = await db
      .insert(progressoUsuarioTable)
      .values({
        perfilId: dados.perfilId,
        nivelId: dados.nivelId,
        pontosObtidos: dados.pontosObtidos,
        coracoesUsados: dados.coracoesUsados,
        concluida: true,
      })
      .returning();

    return novoProgresso[0];
  },
};