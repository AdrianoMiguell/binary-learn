import { pgTable, integer, text, boolean, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { niveisTable } from "./niveis_schemas";
import { alternativasTable } from "./alternativas_schemas";

// Declarando o tipo ENUM das questões compatível com o PostgreSQL
export const tipoQuestaoEnum = pgEnum("tipo_questao_enum", [
  "quiz",
  "vf",
  "ligar",
]);

export const questoesTable = pgTable("questoes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nivelId: integer("nivel_id").references(() => niveisTable.id, {
    onDelete: "cascade",
  }),
  tipoQuestao: tipoQuestaoEnum("tipo_questao").notNull(),
  enunciado: text("enunciado").notNull(),
  ordem: integer("ordem"),
  visivel: boolean("visivel").default(true),
});

export const questoesRelations = relations(questoesTable, ({ one, many }) => ({
  nivel: one(niveisTable, {
    fields: [questoesTable.nivelId],
    references: [niveisTable.id],
  }),
  alternativas: many(alternativasTable),
}));
