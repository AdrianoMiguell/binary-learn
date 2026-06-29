// components/questao_intro_card.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface QuestaoIntroCardProps {
  numeroNivel: number;
  nomeNivel: string;
  descricaoNivel: string;
  faseId: number;
  nivelId: number;
}

export default function QuestaoIntroCard({
  numeroNivel,
  nomeNivel,
  descricaoNivel,
  faseId,
  nivelId,
}: QuestaoIntroCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-auto flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-amber-300 flex items-center justify-center text-2xl font-bold text-amber-900 shrink-0">
          {numeroNivel}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-gray-800">{nomeNivel}</h2>
          <p className="text-sm text-gray-500 leading-relaxed">{descricaoNivel}</p>
        </div>
      </div>

      <Button
        onClick={() => router.push(`/fase/${faseId}/nivel/${nivelId}/questao`)}
        className="self-end bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-6"
      >
        Iniciar
      </Button>

    </div>
  );
}