import { eq } from "drizzle-orm";
import { db } from "..";
import { fasesTable } from "../schemas/fases_schemas";

export const FasesService = {
  async getAll() {
    return await db.select().from(fasesTable);
  },

  async getById(id: number) {
    const result = await db.select().from(fasesTable);
    return result[0] || null;
  },

  async create(dados: {
    nome: string;
    descricao?: string;
    icone?: string;
    cor?: string;
  }) {
    const result = await db.insert(fasesTable).values(dados).returning();
    return result[0];
  },

  async update(
    id: number,
    dados: Partial<{
      nome: string;
      descricao: string;
      icone: string;
      cor: string;
    }>,
  ) {
    const result = await db
      .update(fasesTable)
      .set(dados)
      .where(eq(fasesTable.id, id))
      .returning();
  },

  async delete(id: number) {
    await db.delete(fasesTable).where(eq(fasesTable.id, id));
    return { success: true };
  },
};
