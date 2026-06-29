// app/fase/[faseId]/nivel/[nivelId]/questao/page.tsx
import { QuestoesService } from "@/db/services/questoes_service";
import QuestaoClient from "@/components/questoes/questao_client";

interface QuestaoPageProps {
  params: { faseId: string; nivelId: string };
}

export default async function QuestaoPage({ params }: QuestaoPageProps) {
  const nivelId = Number(params.nivelId);
  const questoes = await QuestoesService.getByNivel(nivelId); // inclui alternativas
  // Estrutura esperada: questao.alternativas[] com { id, texto, is_correta, grupo_ligacao }

  return <QuestaoClient questoes={questoes} faseId={Number(params.faseId)} nivelId={nivelId} />;
}