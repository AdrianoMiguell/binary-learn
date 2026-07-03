import { Heart, Zap, ChevronLeft } from "lucide-react";
import { Progress } from "../ui/progress";

interface QuestaoHeaderProps {
  nomeNivel: string;
  progressoPercent: number;
  questaoAtual: number;
  totalQuestoes: number;
  vidas: number;
  xp: number;
  podevoltar: boolean;
  onVoltar: () => void;
}

export default function QuestaoHeader({
  nomeNivel,
  progressoPercent,
  questaoAtual,
  totalQuestoes,
  vidas,
  xp,
  podevoltar,
  onVoltar,
}: QuestaoHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3 flex flex-col gap-2">
      {/* Linha superior: voltar | nivel — questao x/y | vidas xp */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={onVoltar}
            disabled={!podevoltar}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col leading-tight">
            <span className="text-xs text-gray-400">{nomeNivel}</span>
            <span className="text-xs text-gray-500">
              Questão {questaoAtual} de {totalQuestoes}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="flex items-center gap-1 text-red-500">
            <Heart size={16} className="fill-red-500" />
            {vidas}
          </span>
          <span className="flex items-center gap-1 text-yellow-500">
            <Zap size={16} className="fill-yellow-400" />
            {xp}
          </span>
        </div>
      </div>

      {/* Barra de progresso */}
      <Progress
        value={progressoPercent}
        className="h-2 bg-gray-100 [&>div]:bg-teal-500"
      />
    </div>
  );
}