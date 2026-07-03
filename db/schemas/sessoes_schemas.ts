import { pgTable, integer, varchar, boolean } from "drizzle-orm/pg-core";
import { areasTable } from "./areas_schemas";

export const sessoesTable = pgTable("sessoes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  areaId: integer("area_id").references(() => areasTable.id, { onDelete: "cascade" }),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  ordem: integer("ordem"),
  visivel: boolean("visivel").default(true),
});
