import { pgTable, integer, varchar, boolean } from "drizzle-orm/pg-core";
import { questoesTable } from "./questoes_schemas";

export const alternativasTable = pgTable("alternativas", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  questaoId: integer("questao_id").references(() => questoesTable.id, { onDelete: "cascade" }),
  texto: varchar("texto", { length: 255 }).notNull(),
  isCorreta: boolean("is_correta").default(false),
  grupoLigacao: integer("grupo_ligacao"),
});

