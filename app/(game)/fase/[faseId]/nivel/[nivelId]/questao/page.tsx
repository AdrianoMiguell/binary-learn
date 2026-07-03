// app/[faseId]/nivel/[nivelId]/questao/page.tsx
import { QuestoesService } from "@/db/services/questoes_service";
import QuestaoClient from "@/components/questoes/questao_client";

// app/fase/[faseId]/nivel/[nivelId]/questao/page.tsx
interface QuestaoPageProps {
  params: Promise<{ faseId: string; nivelId: string }>;
}

export default async function QuestaoPage({ params }: QuestaoPageProps) {
  const { faseId, nivelId } = await params; // ← await aqui

  const nivelIdNum = Number(nivelId);
  const faseIdNum = Number(faseId);

  const questoes = await QuestoesService.getByNivel(nivelIdNum);

  return (
    <QuestaoClient
      questoes={questoes}
      faseId={faseIdNum}
      nivelId={nivelIdNum}
    />
  );
}
