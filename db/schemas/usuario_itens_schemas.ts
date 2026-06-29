import { pgTable, integer, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { perfisTable } from "./perfis_schemas";
import { lojaItensTable } from "./loja_itens_schemas";

export const usuarioItensTable = pgTable("usuario_itens", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  perfilId: uuid("perfil_id").references(() => perfisTable.id, { onDelete: "cascade" }),
  itemId: integer("item_id").references(() => lojaItensTable.id, { onDelete: "cascade" }),
  compradoEm: timestamp("comprado_em", { withTimezone: true }).defaultNow(),
});

export const usuarioItensRelations = relations(usuarioItensTable, ({ one }) => ({
  perfil: one(perfisTable, {
    fields: [usuarioItensTable.perfilId],
    references: [perfisTable.id],
  }),
  item: one(lojaItensTable, {
    fields: [usuarioItensTable.itemId],
    references: [lojaItensTable.id],
  }),
}));