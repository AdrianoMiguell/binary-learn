"use client";

import { useState, useMemo } from "react";
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

const LETRAS = ["a", "b", "c", "d", "e", "f"];

export default function QuestaoLigar({
  pares,
  onResponder,
}: QuestaoLigarProps) {
  const ladoB = useMemo(() => [...pares].sort(() => Math.random() - 0.5), []);

  const [pendente, setPendente] = useState<{
    lado: "A" | "B";
    grupo: number;
  } | null>(null);
  const [ligacoes, setLigacoes] = useState<Record<number, number>>({});

  // Mapas de grupo → letra, para cada lado
  const letraA: Record<number, string> = {};
  pares.forEach((p, i) => {
    letraA[p.grupo] = LETRAS[i];
  });

  const letraB: Record<number, string> = {};
  ladoB.forEach((p, i) => {
    letraB[p.grupo] = LETRAS[i];
  });

  const desligarA = (grupoA: number) => {
    setLigacoes((prev) => {
      const c = { ...prev };
      delete c[grupoA];
      return c;
    });
    setPendente(null);
  };

  const desligarB = (grupoB: number) => {
    setLigacoes((prev) => {
      const c = { ...prev };
      const chave = Object.keys(c).find((k) => c[Number(k)] === grupoB);
      if (chave) delete c[Number(chave)];
      return c;
    });
    setPendente(null);
  };

  const handleA = (grupoA: number) => {
    if (ligacoes[grupoA] !== undefined) {
      desligarA(grupoA);
      return;
    }
    if (pendente?.lado === "B") {
      setLigacoes((prev) => ({ ...prev, [grupoA]: pendente.grupo }));
      setPendente(null);
      return;
    }
    setPendente({ lado: "A", grupo: grupoA });
  };

  const handleB = (grupoB: number) => {
    if (Object.values(ligacoes).includes(grupoB)) {
      desligarB(grupoB);
      return;
    }
    if (pendente?.lado === "A") {
      setLigacoes((prev) => ({ ...prev, [pendente.grupo]: grupoB }));
      setPendente(null);
      return;
    }
    setPendente({ lado: "B", grupo: grupoB });
  };

  const confirmar = () => {
    const acertos = pares.filter((p) => ligacoes[p.grupo] === p.grupo).length;
    onResponder(acertos);
  };

  const todosLigados = Object.keys(ligacoes).length === pares.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        {/* COLUNA ESQUERDA — Lado A (sempre fixo, com letras) */}
        <div className="flex flex-col gap-2">
          {pares.map((par) => {
            const ligado = ligacoes[par.grupo] !== undefined;
            const selecionado =
              pendente?.lado === "A" && pendente.grupo === par.grupo;

            return (
              <button
                key={par.grupo}
                onClick={() => handleA(par.grupo)}
                className={cn(
                  "rounded-xl border-2 px-3 py-3 text-sm font-medium text-left transition-all flex items-center gap-2",
                  selecionado
                    ? "border-teal-500 bg-teal-500 text-white"
                    : ligado
                      ? "border-teal-400 bg-teal-50 text-teal-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-teal-300",
                )}
              >
                <span
                  className={cn(
                    "w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 border",
                    selecionado
                      ? "bg-white/20 border-white/40 text-white"
                      : ligado
                        ? "bg-teal-100 border-teal-300 text-teal-700"
                        : "bg-gray-100 border-gray-300 text-gray-500",
                  )}
                >
                  {letraA[par.grupo]}
                </span>
                <span className="flex-1">{par.ladoA}</span>
              </button>
            );
          })}
        </div>

        {/* COLUNA DIREITA — Lado B (embaralhado, badge só quando ligado) */}
        <div className="flex flex-col gap-2">
          {ladoB.map((par) => {
            const ligado = Object.values(ligacoes).includes(par.grupo);
            const selecionado =
              pendente?.lado === "B" && pendente.grupo === par.grupo;

            const grupoALigado = ligado
              ? Number(
                  Object.keys(ligacoes).find(
                    (k) => ligacoes[Number(k)] === par.grupo,
                  ),
                )
              : null;
            const letraParA =
              grupoALigado !== null ? letraA[grupoALigado] : null;

            return (
              <button
                key={par.grupo}
                onClick={() => handleB(par.grupo)}
                className={cn(
                  "rounded-xl border-2 px-3 py-3 text-sm font-medium text-left transition-all flex items-center gap-2",
                  selecionado
                    ? "border-teal-500 bg-teal-500 text-white"
                    : ligado
                      ? "border-teal-400 bg-teal-50 text-teal-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-teal-300",
                )}
              >
                <span
                  className={cn(
                    "w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 border",
                    letraParA
                      ? "bg-teal-500 border-teal-600 text-white"
                      : selecionado
                        ? "bg-white/20 border-white/40 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-500",
                  )}
                >
                  {letraParA ?? ""}
                </span>
                <span className="flex-1">{par.ladoB}</span>
              </button>
            );
          })}
        </div>
      </div>

      {todosLigados && (
        <div className="flex justify-end mt-2">
          <Button
            onClick={confirmar}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl px-8"
          >
            Confirmar
          </Button>
        </div>
      )}
    </div>
  );
}
