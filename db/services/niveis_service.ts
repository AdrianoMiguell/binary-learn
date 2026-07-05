import { eq } from "drizzle-orm";
import { db } from "..";
import { niveisTable } from "../schemas/niveis_schemas";

export const NiveisService = {
  async getAll() {
    return await db.select().from(niveisTable);
  },

  async getByFase(faseId: number) {
    return await db
      .select()
      .from(niveisTable)
      .where(eq(niveisTable.faseId, faseId));
  },

  async getById(nivelId: number) {
    const result = await db
      .select()
      .from(niveisTable)
      .where(eq(niveisTable.id, nivelId))
      .limit(1);

    return result[0] || null;
  },

  // async getById(id: number) {
  //   const result = await db.select().from(fasesTable);
  //   return result[0] || null;
  // },
};
