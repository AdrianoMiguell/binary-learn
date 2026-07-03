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
  nomeNivel?: string;
}

export default function QuestaoClient({
  questoes,
  faseId,
  nivelId,
  nomeNivel = "Nível",
}: QuestaoClientProps) {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [xp, setXp] = useState(0);
  const [vidas, setVidas] = useState(3);

  const questao = questoes[indice];
  const progressoPercent = Math.round((indice / questoes.length) * 100);

  // Adicione no estado
  const [acertosCount, setAcertosCount] = useState(0);

  const avancar = (acertou: boolean) => {
    const novoXp = acertou ? xp + 10 : xp;
    const novosAcertos = acertou ? acertosCount + 1 : acertosCount;

    if (acertou) setXp(novoXp);
    else setVidas((v) => Math.max(0, v - 1));

    if (acertou) setAcertosCount(novosAcertos);

    if (indice + 1 >= questoes.length) {
      router.push(
        `/fase/${faseId}/nivel/${nivelId}/resultado?xp=${novoXp}&acertos=${novosAcertos}&total=${questoes.length}`,
      );
    } else {
      setIndice((v) => v + 1);
    }
  };
  const voltar = () => {
    if (indice > 0) setIndice((v) => v - 1);
  };

  const handleVF = (resposta: "Verdadeiro" | "Falso") => {
    const correta = questao.alternativas.find((a) => a.is_correta);
    const acertou =
      correta?.texto.toLowerCase().startsWith(resposta.toLowerCase()) ?? false;
    avancar(acertou);
  };

  const handleQuiz = (alternativaId: number) => {
    const correta =
      questao.alternativas.find((a) => a.id === alternativaId)?.is_correta ??
      false;
    avancar(correta);
  };

  const handleLigar = (acertos: number) => {
    const total =
      questao.alternativas.filter((a) => a.grupo_ligacao !== null).length / 2;
    avancar(acertos === total);
  };

  const parsePares = () => {
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
    <div className="min-h-screen bg-white flex flex-col">
      <QuestaoHeader
        nomeNivel={nomeNivel}
        progressoPercent={progressoPercent}
        questaoAtual={indice + 1}
        totalQuestoes={questoes.length}
        vidas={vidas}
        xp={xp}
        podevoltar={indice > 0}
        onVoltar={voltar}
      />

      <div className="flex-1 flex flex-col px-6 py-8 max-w-2xl w-full mx-auto">
        {/* Número da questão */}
        <p className="text-xs text-gray-400 mb-2">
          {indice + 1}.{" "}
          {questao.tipo_questao === "ligar"
            ? "Relacione corretamente"
            : questao.tipo_questao === "vf"
              ? "Verdadeiro ou Falso"
              : "Múltipla escolha"}
        </p>

        {/* Enunciado grande */}
        <h2 className="text-lg font-semibold text-gray-800 mb-8 leading-relaxed">
          {questao.enunciado}
        </h2>

        {questao.tipo_questao === "vf" && (
          <QuestaoVF enunciado="" onResponder={handleVF} />
        )}
        {questao.tipo_questao === "quiz" && (
          <QuestaoQuiz
            enunciado=""
            alternativas={questao.alternativas}
            onResponder={handleQuiz}
          />
        )}
        {questao.tipo_questao === "ligar" && (
          <QuestaoLigar
            enunciado=""
            pares={parsePares()}
            onResponder={handleLigar}
          />
        )}
      </div>
    </div>
  );
}
