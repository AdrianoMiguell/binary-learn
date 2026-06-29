// components/questao_quiz.tsx
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Alternativa {
  id: number;
  texto: string;
}

interface QuestaoQuizProps {
  enunciado: string;
  alternativas: Alternativa[];
  onResponder: (alternativaId: number) => void;
}

export default function QuestaoQuiz({
  enunciado,
  alternativas,
  onResponder,
}: QuestaoQuizProps) {
  const [selecionada, setSelecionada] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-white font-medium text-base leading-relaxed">
        {enunciado}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {alternativas.map((alt) => (
          <button
            key={alt.id}
            onClick={() => setSelecionada(alt.id)}
            className={cn(
              "rounded-xl border-2 px-4 py-3 text-sm text-left font-medium transition-all",
              selecionada === alt.id
                ? "border-white bg-white text-teal-700"
                : "border-white/40 bg-white/10 text-white hover:bg-white/20",
            )}
          >
            {alt.texto}
          </button>
        ))}
      </div>
      {selecionada !== null && (
        <div className="flex justify-end mt-2">
          <Button
            onClick={() => onResponder(selecionada)}
            className="bg-white text-teal-700 font-bold rounded-xl px-6 hover:bg-white/90"
          >
            Avançar
          </Button>
        </div>
      )}
    </div>
  );
}
