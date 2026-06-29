import { pgTable, integer, boolean, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { perfisTable } from "./perfis_schemas";
import { niveisTable } from "./niveis_schemas";

export const progressoUsuarioTable = pgTable("progresso_usuario", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  perfilId: uuid("perfil_id").references(() => perfisTable.id, { onDelete: "cascade" }),
  nivelId: integer("nivel_id").references(() => niveisTable.id, { onDelete: "cascade" }),
  concluida: boolean("concluida").default(false),
  pontosObtidos: integer("pontos_obtidos").default(0),
  coracoesUsados: integer("coracoes_usados").default(0),
  concluidoEm: timestamp("concluido_em", { withTimezone: true }).defaultNow(),
});

export const progressoUsuarioRelations = relations(progressoUsuarioTable, ({ one }) => ({
  perfil: one(perfisTable, {
    fields: [progressoUsuarioTable.perfilId],
    references: [perfisTable.id],
  }),
  nivel: one(niveisTable, {
    fields: [progressoUsuarioTable.nivelId],
    references: [niveisTable.id],
  }),
}));