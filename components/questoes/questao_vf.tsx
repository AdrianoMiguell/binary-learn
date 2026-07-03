"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface QuestaoVFProps {
  enunciado: string; // agora vazio — enunciado fica no client
  onResponder: (resposta: "Verdadeiro" | "Falso") => void;
}

export default function QuestaoVF({ onResponder }: QuestaoVFProps) {
  const [selecionada, setSelecionada] = useState<"Verdadeiro" | "Falso" | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        {(["Falso", "Verdadeiro"] as const).map((opcao) => (
          <button
            key={opcao}
            onClick={() => setSelecionada(opcao)}
            className={cn(
              "flex-1 py-5 text-base font-bold rounded-2xl border-2 transition-all",
              opcao === "Falso"
                ? selecionada === "Falso"
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
                : selecionada === "Verdadeiro"
                ? "bg-green-500 border-green-500 text-white"
                : "bg-green-50 border-green-300 text-green-600 hover:bg-green-100"
            )}
          >
            {opcao}
          </button>
        ))}
      </div>
      {selecionada && (
        <div className="flex justify-end">
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