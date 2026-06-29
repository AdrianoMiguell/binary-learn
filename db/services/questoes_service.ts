import { eq } from "drizzle-orm";
import { db } from "..";
import { questoesTable } from "../schemas/questoes_schemas"; // <- linha que faltava

export const QuestoesService = {
  async getByNivel(nivelId: number) {
    // Busca as questões trazendo o array de alternativas acoplado relacionalmente
    const result = await db.query.questoesTable.findMany({
      where: eq(questoesTable.nivelId, nivelId),
      with: {
        alternativas: true,
      },
      orderBy: (questoes, { asc }) => [asc(questoes.ordem)],
    });

    // Mapeia para garantir compatibilidade exata com o snake_case do seu QuestaoClient
    return result.map((q) => ({
      id: q.id,
      tipo_questao: q.tipoQuestao, // Adapta camelCase para o front
      enunciado: q.enunciado,
      ordem: q.ordem ?? 0,
      alternativas: q.alternativas.map((a) => ({
        id: a.id,
        texto: a.texto,
        is_correta: a.isCorreta ?? false, // Adapta para a.is_correta
        grupo_ligacao: a.grupoLigacao, // Adapta para a.grupo_ligacao
      })),
    }));
  },
};
