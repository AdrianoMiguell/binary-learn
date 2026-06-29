import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  varchar,
  bigint,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const fasesTable = pgTable("fases", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar("nome", { length: 200 }).notNull(),
  descricao: varchar("descricao", { length: 1000 }),
  icone: varchar("icone"),
  cor: varchar("cor", { length: 50 }),
  ordem: boolean(),
  bloqueada: boolean(),
  visivel: boolean(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type FaseDados = InferSelectModel<typeof fasesTable>;
