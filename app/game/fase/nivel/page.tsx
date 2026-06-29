// app/fase/[faseId]/nivel/page.tsx
import NivelCard from "@/components/questoes/nivel_card";
import { NiveisService } from "@/db/services/niveis_service";

interface NivelPageProps {
  params: { faseId: string };
}

export default async function NivelPage({ params }: NivelPageProps) {
  const faseId = Number(params.faseId);
  const niveis = await NiveisService.getByFase(faseId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-8">Selecione um Nível</h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {niveis.map((nivel, index) => (
          <NivelCard
            key={nivel.id}
            numero={index + 1}
            nivelId={nivel.id}
            faseId={faseId}
            bloqueado={nivel.bloqueado ?? false}
            estrelas={0}
          />
        ))}
      </div>
    </div>
  );
}