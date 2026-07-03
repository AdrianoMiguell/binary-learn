import {
  pgTable,
  integer,
  varchar,
  smallint,
  boolean,
} from "drizzle-orm/pg-core";
import { sessoesTable } from "./sessoes_schemas";
import { fasesTable } from "./fases_schemas";
import { InferSelectModel } from "drizzle-orm";

export const niveisTable = pgTable("niveis", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar("nome", { length: 200 }).notNull(),
  descricao: varchar("descricao", { length: 1000 }),
  icone: varchar("icone"),
  cor: varchar("cor", { length: 50 }),
  ordem: smallint("ordem"),
  faseId: integer("fase_id").references(() => fasesTable.id, {
    onDelete: "cascade",
  }),
  sessaoId: integer("sessao_id").references(() => sessoesTable.id, {
    onDelete: "set null",
  }),
  bloqueado: boolean("bloqueado").default(true),
  visivel: boolean("visivel").default(true),
});

export type NivelDados = InferSelectModel<typeof niveisTable>;
