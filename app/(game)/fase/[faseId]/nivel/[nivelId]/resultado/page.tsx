import { ResultadoClient } from "@/components/questoes/resultado_client";

interface ResultadoPageProps {
  params: Promise<{ faseId: string; nivelId: string }>;
  searchParams: Promise<{ xp?: string; acertos?: string; total?: string }>;
}

export default async function ResultadoPage({ params, searchParams }: ResultadoPageProps) {
  const { faseId, nivelId } = await params;
  const { xp = "0", acertos = "0", total = "1" } = await searchParams;

  return (
    <ResultadoClient
      faseId={Number(faseId)}
      nivelId={Number(nivelId)}
      xpGanho={Number(xp)}
      acertos={Number(acertos)}
      total={Number(total)}
    />
  );
}