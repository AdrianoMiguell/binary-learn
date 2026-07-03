// db/schemas/relations.ts  ← arquivo novo
import { relations } from "drizzle-orm";
import { lojaItensTable } from "./loja_itens_schemas";
import { usuarioItensTable } from "./usuario_itens_schemas";
import { areasTable } from "./areas_schemas";
import { sessoesTable } from "./sessoes_schemas";
import { alternativasTable } from "./alternativas_schemas";
import { questoesTable } from "./questoes_schemas";
import { sessaoConteudosTable } from "./sessao_conteudos_schemas";
import { perfisTable } from "./perfis_schemas";
import { niveisTable } from "./niveis_schemas";
import { progressoUsuarioTable } from "./progresso_usuario_schemas";
import { fasesTable } from "./fases_schemas";

export const lojaItensRelations = relations(lojaItensTable, ({ many }) => ({
  usuarioItens: many(usuarioItensTable),
}));

export const usuarioItensRelations = relations(
  usuarioItensTable,
  ({ one }) => ({
    item: one(lojaItensTable, {
      fields: [usuarioItensTable.itemId],
      references: [lojaItensTable.id],
    }),
  }),
);

export const sessaoConteudosRelations = relations(
  sessaoConteudosTable,
  ({ one }) => ({
    sessao: one(sessoesTable, {
      fields: [sessaoConteudosTable.sessaoId],
      references: [sessoesTable.id],
    }),
  }),
);

export const questoesRelations = relations(questoesTable, ({ one, many }) => ({
  nivel: one(niveisTable, {
    fields: [questoesTable.nivelId],
    references: [niveisTable.id],
  }),
  alternativas: many(alternativasTable),
}));

export const progressoUsuarioRelations = relations(
  progressoUsuarioTable,
  ({ one }) => ({
    perfil: one(perfisTable, {
      fields: [progressoUsuarioTable.perfilId],
      references: [perfisTable.id],
    }),
    nivel: one(niveisTable, {
      fields: [progressoUsuarioTable.nivelId],
      references: [niveisTable.id],
    }),
  }),
);
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
export const perfisRelations = relations(perfisTable, ({ many }) => ({
  progressos: many(progressoUsuarioTable),
  itensComprados: many(usuarioItensTable),
}));

export const areasRelations = relations(areasTable, ({ many }) => ({
  sessoes: many(sessoesTable),
}));

export const alternativasRelations = relations(
  alternativasTable,
  ({ one }) => ({
    questao: one(questoesTable, {
      fields: [alternativasTable.questaoId],
      references: [questoesTable.id],
    }),
  }),
);

export const sessoesRelations = relations(sessoesTable, ({ one, many }) => ({
  area: one(areasTable, {
    fields: [sessoesTable.areaId],
    references: [areasTable.id],
  }),
  conteudos: many(sessaoConteudosTable),
  niveis: many(niveisTable),
}));

export const usuarioItensPerfilRelations = relations(
  usuarioItensTable,
  ({ one }) => ({
    perfil: one(perfisTable, {
      fields: [usuarioItensTable.perfilId],
      references: [perfisTable.id],
    }),
    item: one(lojaItensTable, {
      fields: [usuarioItensTable.itemId],
      references: [lojaItensTable.id],
    }),
  }),
);
