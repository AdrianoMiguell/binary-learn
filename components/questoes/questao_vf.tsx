// components/questao_vf.tsx
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface QuestaoVFProps {
  enunciado: string;
  onResponder: (resposta: "Verdadeiro" | "Falso") => void;
}

export default function QuestaoVF({ enunciado, onResponder }: QuestaoVFProps) {
  const [selecionada, setSelecionada] = useState<"Verdadeiro" | "Falso" | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-white font-medium text-base leading-relaxed">{enunciado}</p>
      <div className="flex gap-4 justify-center">
        {(["Falso", "Verdadeiro"] as const).map((opcao) => (
          <Button
            key={opcao}
            onClick={() => setSelecionada(opcao)}
            className={cn(
              "flex-1 py-4 text-lg font-bold rounded-xl border-2 transition-all",
              opcao === "Falso"
                ? selecionada === "Falso"
                  ? "bg-red-500 border-red-300 text-white"
                  : "bg-red-400/80 border-red-300 text-white hover:bg-red-500"
                : selecionada === "Verdadeiro"
                ? "bg-green-500 border-green-300 text-white"
                : "bg-green-400/80 border-green-300 text-white hover:bg-green-500"
            )}
          >
            {opcao}
          </Button>
        ))}
      </div>
      {selecionada && (
        <div className="flex justify-end">
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