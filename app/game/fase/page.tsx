// app/fase/page.tsx
import FaseCard from "@/components/questoes/fase_card";
import { FasesService } from "@/db/services/fases_service";

export default async function FasePage() {
  const fases = await FasesService.getAll();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Fases</h1>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3">
        {fases.length === 0 ? (
          <p className="text-white/60 text-sm col-span-full">Nenhuma fase criada ainda.</p>
        ) : (
          fases.map((fase) => (
            <FaseCard
              key={fase.id}
              fase={fase}
              xp={0}
              estrelas={0}
              bloqueada={fase.bloqueada ?? false}
            />
          ))
        )}
      </div>
    </div>
  );
}