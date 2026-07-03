"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Zap, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { salvarProgresso } from "@/app/actions/progresso_actions";

interface ResultadoClientProps {
  faseId: number;
  nivelId: number;
  xpGanho: number;
  acertos: number;
  total: number;
}

function calcularEstrelas(acertos: number, total: number): number {
  if (total === 0) return 0;
  const pct = (acertos / total) * 100;
  if (pct >= 95) return 3;
  if (pct >= 50) return 2;
  if (pct > 0)   return 1;
  return 0;
}

export function ResultadoClient({
  faseId,
  nivelId,
  xpGanho,
  acertos,
  total,
}: ResultadoClientProps) {
  const router = useRouter();
  const estrelas = calcularEstrelas(acertos, total);
  const [salvando, setSalvando] = useState(true);
  const [animado, setAnimado] = useState(false);

  useEffect(() => {
    // Anima as estrelas após montar
    const t = setTimeout(() => setAnimado(true), 300);

    // Salva progresso no banco
    salvarProgresso({ nivelId, xpGanho, acertos, total, estrelas })
      .finally(() => setSalvando(false));

    return () => clearTimeout(t);
  }, []);

  const mensagem = () => {
    if (estrelas === 3) return { titulo: "Perfeito! 🎉", sub: "Você dominou esse nível!" };
    if (estrelas === 2) return { titulo: "Muito bom! 👏", sub: "Continue praticando para chegar na perfeição." };
    if (estrelas === 1) return { titulo: "Bom começo! 💪", sub: "Você pode melhorar. Tente de novo!" };
    return { titulo: "Não desista! 🔁", sub: "Revise o conteúdo e tente novamente." };
  };

  const { titulo, sub } = mensagem();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 gap-8">

      {/* Título */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-gray-800">{titulo}</h1>
        <p className="text-gray-500 text-sm">{sub}</p>
      </div>

      {/* Estrelas */}
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <Star
            key={i}
            size={48}
            className={cn(
              "transition-all duration-500",
              animado && i <= estrelas
                ? "fill-yellow-400 text-yellow-400 scale-110"
                : "fill-gray-200 text-gray-200 scale-90",
              animado && i <= estrelas && `delay-[${(i - 1) * 150}ms]`
            )}
            style={{ transitionDelay: animado ? `${(i - 1) * 150}ms` : "0ms" }}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-5 py-4">
          <span className="text-sm text-gray-500 font-medium">Acertos</span>
          <span className="text-lg font-bold text-gray-800">
            {acertos} / {total}
          </span>
        </div>
        <div className="flex items-center justify-between bg-yellow-50 rounded-2xl px-5 py-4">
          <span className="text-sm text-yellow-700 font-medium flex items-center gap-1">
            <Zap size={16} className="fill-yellow-400 text-yellow-400" />
            XP ganho
          </span>
          <span className="text-lg font-bold text-yellow-700">+{xpGanho}</span>
        </div>
      </div>

      {/* Botões */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        {estrelas < 3 && (
          <Button
            variant="outline"
            className="w-full rounded-2xl py-5 border-2 border-teal-400 text-teal-600 font-bold flex items-center gap-2 hover:bg-teal-50"
            onClick={() =>
              router.push(`/fase/${faseId}/nivel/${nivelId}/questao`)
            }
          >
            <RotateCcw size={18} />
            Tentar novamente
          </Button>
        )}
        <Button
          disabled={salvando}
          className="w-full rounded-2xl py-5 bg-teal-500 hover:bg-teal-600 text-white font-bold flex items-center gap-2"
          onClick={() => router.push(`/fase/${faseId}/nivel`)}
        >
          {salvando ? "Salvando..." : "Continuar"}
          {!salvando && <ChevronRight size={18} />}
        </Button>
      </div>
    </div>
  );
}