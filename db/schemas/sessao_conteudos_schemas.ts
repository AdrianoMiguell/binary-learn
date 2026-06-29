import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sessoesTable } from "./sessoes_schemas";

export const sessaoConteudosTable = pgTable("sessao_conteudos", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  sessaoId: integer("sessao_id").references(() => sessoesTable.id, { onDelete: "cascade" }),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  corpo: text("corpo"),
  ordem: integer("ordem"),
});

export const sessaoConteudosRelations = relations(sessaoConteudosTable, ({ one }) => ({
  sessao: one(sessoesTable, {
    fields: [sessaoConteudosTable.sessaoId],
    references: [sessoesTable.id],
  }),
}));