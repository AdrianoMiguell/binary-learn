// components/questao_client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QuestaoHeader from "./questao_header";
import QuestaoVF from "./questao_vf";
import QuestaoQuiz from "./questao_quiz";
import QuestaoLigar from "./questao_ligar";

interface Alternativa {
  id: number;
  texto: string;
  is_correta: boolean;
  grupo_ligacao: number | null;
}

interface Questao {
  id: number;
  tipo_questao: "quiz" | "vf" | "ligar";
  enunciado: string;
  ordem: number;
  alternativas: Alternativa[];
}

interface QuestaoClientProps {
  questoes: Questao[];
  faseId: number;
  nivelId: number;
}

export default function QuestaoClient({ questoes, faseId, nivelId }: QuestaoClientProps) {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [xp, setXp] = useState(0);
  const [vidas, setVidas] = useState(3);

  const questao = questoes[indice];
  const progressoPercent = Math.round(((indice) / questoes.length) * 100);

  const avancar = (acertou: boolean) => {
    if (acertou) setXp((v) => v + 10);
    else setVidas((v) => Math.max(0, v - 1));

    if (indice + 1 >= questoes.length) {
      router.push(`/fase/${faseId}/nivel/${nivelId}/resultado?xp=${xp + (acertou ? 10 : 0)}`);
    } else {
      setIndice((v) => v + 1);
    }
  };

  const handleVF = (resposta: "Verdadeiro" | "Falso") => {
    const correta = questao.alternativas.find((a) => a.is_correta);
    const acertou = correta?.texto.toLowerCase().startsWith(resposta.toLowerCase()) ?? false;
    avancar(acertou);
  };

  const handleQuiz = (alternativaId: number) => {
    const correta = questao.alternativas.find((a) => a.id === alternativaId)?.is_correta ?? false;
    avancar(correta);
  };

  const handleLigar = (acertos: number) => {
    const total = questao.alternativas.filter((a) => a.grupo_ligacao !== null).length / 2;
    avancar(acertos === total);
  };

  // Monta os pares para a questão ligar
  const parsePares = () => {
    const grupos = new Map<number, { ladoA?: string; ladoB?: string }>();
    // Separa alternativas em dois lados pelo índice dentro do grupo
    const porGrupo: Record<number, Alternativa[]> = {};
    questao.alternativas.forEach((a) => {
      if (a.grupo_ligacao === null) return;
      if (!porGrupo[a.grupo_ligacao]) porGrupo[a.grupo_ligacao] = [];
      porGrupo[a.grupo_ligacao].push(a);
    });
    return Object.entries(porGrupo).map(([grupo, alts]) => ({
      grupo: Number(grupo),
      ladoA: alts[0]?.texto ?? "",
      ladoB: alts[1]?.texto ?? "",
    }));
  };

  return (
    <div className="min-h-screen bg-teal-600 p-4 flex flex-col">
      <QuestaoHeader
        nomeNivel={`Nível ${nivelId}`}
        progressoPercent={progressoPercent}
        vidas={vidas}
        xp={xp}
      />

      <div className="flex-1 flex flex-col justify-center gap-4">
        <span className="text-white/60 text-xs">
          Questão {indice + 1} de {questoes.length}
        </span>

        {questao.tipo_questao === "vf" && (
          <QuestaoVF enunciado={questao.enunciado} onResponder={handleVF} />
        )}
        {questao.tipo_questao === "quiz" && (
          <QuestaoQuiz
            enunciado={questao.enunciado}
            alternativas={questao.alternativas}
            onResponder={handleQuiz}
          />
        )}
        {questao.tipo_questao === "ligar" && (
          <QuestaoLigar
            enunciado={questao.enunciado}
            pares={parsePares()}
            onResponder={handleLigar}
          />
        )}
      </div>
    </div>
  );
}