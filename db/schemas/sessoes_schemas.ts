import { pgTable, integer, varchar, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { areasTable } from "./areas_schemas";
import { sessaoConteudosTable } from "./sessao_conteudos_schemas";
import { niveisTable } from "./niveis_schemas";

export const sessoesTable = pgTable("sessoes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  areaId: integer("area_id").references(() => areasTable.id, { onDelete: "cascade" }),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  ordem: integer("ordem"),
  visivel: boolean("visivel").default(true),
});

export const sessoesRelations = relations(sessoesTable, ({ one, many }) => ({
  area: one(areasTable, {
    fields: [sessoesTable.areaId],
    references: [areasTable.id],
  }),
  conteudos: many(sessaoConteudosTable),
  niveis: many(niveisTable),
}));