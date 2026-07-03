import { pgTable, integer, varchar, text, boolean } from "drizzle-orm/pg-core";

export const areasTable = pgTable("areas", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar("nome", { length: 255 }).notNull(),
  descricao: text("descricao"),
  icone: varchar("icone", { length: 255 }),
  cor: varchar("cor", { length: 50 }),
  ordem: integer("ordem"),
  visivel: boolean("visivel").default(true),
});
