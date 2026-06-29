// components/questao_ligar.tsx
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Par {
  grupo: number;
  ladoA: string;
  ladoB: string;
}

interface QuestaoLigarProps {
  enunciado: string;
  pares: Par[];
  onResponder: (acertos: number) => void;
}

export default function QuestaoLigar({ enunciado, pares, onResponder }: QuestaoLigarProps) {
  // Embaralha o lado B para exibição
  const ladoB = [...pares].sort(() => Math.random() - 0.5);

  const [selA, setSelA] = useState<number | null>(null);   // índice do item A selecionado
  const [ligacoes, setLigacoes] = useState<Record<number, number>>({}); // grupoA → grupoB

  const handleLadoA = (grupo: number) => setSelA(grupo);

  const handleLadoB = (grupoBItem: number) => {
    if (selA === null) return;
    setLigacoes((prev) => ({ ...prev, [selA]: grupoBItem }));
    setSelA(null);
  };

  const confirmar = () => {
    const acertos = pares.filter((p) => ligacoes[p.grupo] === p.grupo).length;
    onResponder(acertos);
  };

  const todosLigados = Object.keys(ligacoes).length === pares.length;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-white font-medium text-base">{enunciado}</p>
      <div className="grid grid-cols-2 gap-3">
        {/* Lado A */}
        <div className="flex flex-col gap-2">
          {pares.map((par) => (
            <button
              key={par.grupo}
              onClick={() => handleLadoA(par.grupo)}
              className={cn(
                "rounded-lg border-2 px-3 py-2 text-sm font-medium text-left transition-all",
                selA === par.grupo
                  ? "border-white bg-white text-teal-700"
                  : ligacoes[par.grupo] !== undefined
                  ? "border-teal-300 bg-teal-600 text-white"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {par.ladoA}
            </button>
          ))}
        </div>
        {/* Lado B (embaralhado) */}
        <div className="flex flex-col gap-2">
          {ladoB.map((par) => {
            const jaUsado = Object.values(ligacoes).includes(par.grupo);
            return (
              <button
                key={par.grupo}
                onClick={() => handleLadoB(par.grupo)}
                className={cn(
                  "rounded-lg border-2 px-3 py-2 text-sm font-medium text-left transition-all",
                  jaUsado
                    ? "border-teal-300 bg-teal-600 text-white"
                    : "border-white/40 bg-white/10 text-white hover:bg-white/20"
                )}
              >
                {par.ladoB}
              </button>
            );
          })}
        </div>
      </div>
      {todosLigados && (
        <div className="flex justify-end mt-2">
          <Button
            onClick={confirmar}
            className="bg-white text-teal-700 font-bold rounded-xl px-6 hover:bg-white/90"
          >
            Confirmar
          </Button>
        </div>
      )}
    </div>
  );
}