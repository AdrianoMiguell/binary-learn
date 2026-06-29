import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { perfisTable } from "../schemas/perfis_schemas";

export const PerfisService = {
  async getById(perfilId: string) {
    const result = await db
      .select()
      .from(perfisTable)
      .where(eq(perfisTable.id, perfilId));
    return result[0] || null;
  },

  // Adiciona os pontos/moedas conquistados no final da partida
  async adicionarRecompensa(perfilId: string, pontosGanhos: number, moedasGanhas: number) {
    return await db
      .update(perfisTable)
      .set({
        pontos: sql`${perfisTable.pontos} + ${pontosGanhos}`,
        moedas: sql`${perfisTable.moedas} + ${moedasGanhas}`,
      })
      .where(eq(perfisTable.id, perfilId))
      .returning();
  },

  // Desconta um coração quando o usuário erra muitas questões
  async removerCoracao(perfilId: string) {
    return await db
      .update(perfisTable)
      .set({
        coracoes: sql`GREATEST(${perfisTable.coracoes} - 1, 0)`,
      })
      .where(eq(perfisTable.id, perfilId));
  }
};