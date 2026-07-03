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

export default function QuestaoQuiz({ alternativas, onResponder }: QuestaoQuizProps) {
  const [selecionada, setSelecionada] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {alternativas.map((alt) => (
          <button
            key={alt.id}
            onClick={() => setSelecionada(alt.id)}
            className={cn(
              "rounded-xl border-2 px-4 py-4 text-sm text-left font-medium transition-all",
              selecionada === alt.id
                ? "border-teal-500 bg-teal-50 text-teal-700"
                : "border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50"
            )}
          >
            {alt.texto}
          </button>
        ))}
      </div>
      {selecionada !== null && (
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => onResponder(selecionada)}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl px-8"
          >
            Avançar
          </Button>
        </div>
      )}
    </div>
  );
}