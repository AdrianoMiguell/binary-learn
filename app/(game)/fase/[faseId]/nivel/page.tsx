import NivelCard from "@/components/questoes/nivel_card";
import { NiveisService } from "@/db/services/niveis_service";

export default async function NivelPage({
  params,
}: {
  params: Promise<{ faseId: string }>;
}) {
  const { faseId } = await params;
  const faseIdNum = Number(faseId);

  if (isNaN(faseIdNum)) {
    return <div className="p-6 text-white">Fase inválida encontrada.</div>;
  }

  const niveis = await NiveisService.getByFase(faseIdNum);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-8">Selecione um Nível</h1>
      <div className="flex flex-wrap gap-x-20 gap-y-8 justify-center pb-12">
        {niveis.map((nivel, index) => (
          <NivelCard
            key={nivel.id}
            numero={index + 1}
            nivelId={nivel.id}
            faseId={faseIdNum}
            bloqueado={nivel.bloqueado ?? false}
            estrelas={0}
          />
        ))}
      </div>
    </div>
  );
}
