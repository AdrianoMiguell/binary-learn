import {
  pgTable,
  integer,
  varchar,
  smallint,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { fasesTable } from "./fases_schemas";
import { sessoesTable } from "./sessoes_schemas";
import { questoesTable } from "./questoes_schemas";
import { progressoUsuarioTable } from "./progresso_usuario_schemas";

export const niveisTable = pgTable("niveis", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar("nome", { length: 200 }).notNull(),
  descricao: varchar("descricao", { length: 1000 }),
  icone: varchar("icone"),
  cor: varchar("cor", { length: 50 }),
  ordem: smallint("ordem"),
  faseId: integer("fases_id").references(() => fasesTable.id, {
    onDelete: "cascade",
  }),
  sessaoId: integer("sessao_id").references(() => sessoesTable.id, {
    onDelete: "set null",
  }),
  bloqueado: boolean("bloqueado").default(true),
  visivel: boolean("visivel").default(true),
});

export const niveisRelations = relations(niveisTable, ({ one, many }) => ({
  fase: one(fasesTable, {
    fields: [niveisTable.faseId],
    references: [fasesTable.id],
  }),
  sessao: one(sessoesTable, {
    fields: [niveisTable.sessaoId],
    references: [sessoesTable.id],
  }),
  questoes: many(questoesTable),
  progressos: many(progressoUsuarioTable),
}));
