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
};
