import { pgTable, integer, varchar, text, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { usuarioItensTable } from "./usuario_itens_schemas";

export const lojaItensTable = pgTable("loja_itens", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar("nome", { length: 255 }).notNull(),
  descricao: text("descricao"),
  icone: varchar("icone", { length: 255 }),
  preco: integer("preco").default(0).notNull(),
  tipo: varchar("tipo", { length: 100 }).notNull(), 
  valorEfeito: varchar("valor_efeito", { length: 255 }),
  visivel: boolean("visivel").default(true),
});

export const lojaItensRelations = relations(lojaItensTable, ({ many }) => ({
  compras: many(usuarioItensTable),
}));