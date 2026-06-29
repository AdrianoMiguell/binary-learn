import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { progressoUsuarioTable } from "./progresso_usuario_schemas";
import { usuarioItensTable } from "./usuario_itens_schemas";

export const perfisTable = pgTable("perfis", {
  // Nota: uuid do Supabase referenciando auth.users geralmente vem via trigger externo
  id: uuid("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }),
  pontos: integer("pontos").default(0),
  moedas: integer("moedas").default(0),
  coracoes: integer("coracoes").default(5),
  avatar: varchar("avatar", { length: 255 }),
});

export const perfisRelations = relations(perfisTable, ({ many }) => ({
  progressos: many(progressoUsuarioTable),
  itensComprados: many(usuarioItensTable),
}));
