import { QuestoesService } from "@/db/services/questoes_service";
import QuestaoClient from "@/components/questoes/questao_client";
import { FasesService } from "@/db/services/fases_service";
import { NiveisService } from "@/db/services/niveis_service";

// app/fase/[faseId]/nivel/[nivelId]/questao/page.tsx
interface QuestaoPageProps {
  params: Promise<{ faseId: string; nivelId: string }>;
}

export default async function QuestaoPage({ params }: QuestaoPageProps) {
  const { faseId, nivelId } = await params;

  const nivelIdNum = Number(nivelId);
  const faseIdNum = Number(faseId);

  const questoes = await QuestoesService.getByNivel(nivelIdNum);
  const fase = await FasesService.getById(faseIdNum);
  const nivel = await NiveisService.getById(nivelIdNum);

  return (
    <QuestaoClient
      questoes={questoes}
      faseId={fase.id}
      nivelId={nivel.id}
      nomeFase={fase.nome}
      nomeNivel={nivel.nome}
    />
  );
}
