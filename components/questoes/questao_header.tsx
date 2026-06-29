// components/questao_header.tsx
import { Heart, Zap } from "lucide-react";
import { Progress } from "../ui/progress";

interface QuestaoHeaderProps {
  nomeNivel: string;
  nomeQuestao?: string;
  progressoPercent: number; // 0–100
  vidas: number;            // ex: 3
  xp: number;
}

export default function QuestaoHeader({
  nomeNivel,
  nomeQuestao,
  progressoPercent,
  vidas,
  xp,
}: QuestaoHeaderProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <div className="flex items-center justify-between text-xs text-white/70">
        <span>{nomeNivel}{nomeQuestao ? ` — ${nomeQuestao}` : ""}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Heart size={14} className="fill-red-400 text-red-400" />
            {vidas}
          </span>
          <span className="flex items-center gap-1">
            <Zap size={14} className="fill-yellow-300 text-yellow-300" />
            {xp}
          </span>
        </div>
      </div>
      <Progress value={progressoPercent} className="h-2 bg-white/20 [&>div]:bg-white" />
    </div>
  );
}