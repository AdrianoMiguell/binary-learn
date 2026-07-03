import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";

export const perfisTable = pgTable("perfis", {
  id: uuid("id").primaryKey(),
  username: varchar("username", { length: 255 }),
  pontos: integer("pontos").default(0),
  moedas: integer("moedas").default(0),
  coracoes: integer("coracoes").default(5),
  avatar: varchar("avatar", { length: 255 }),
});
