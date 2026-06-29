// components/fase_card.tsx
"use client";

import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { DynamicIcon } from "./dynamic_icon";
import { Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaseDados } from "@/db/schemas/fases_schemas";

interface FaseCardProps {
  fase: FaseDados;
  xp?: number;
  estrelas?: number;
  bloqueada?: boolean;
}

export default function FaseCard({ fase, xp = 0, estrelas = 0, bloqueada = false }: FaseCardProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => !bloqueada && router.push(`./fase/${fase.id}/nivel`)}
      className={cn(
        "relative px-8 py-6 flex flex-col items-center gap-3 transition-opacity border-0 rounded-2xl shadow-md",
        bloqueada
          ? "opacity-50 cursor-not-allowed bg-gray-300"
          : "hover:opacity-80 cursor-pointer",
        // cor dinâmica via inline style abaixo
      )}
      style={{ backgroundColor: bloqueada ? undefined : (fase.cor ?? "#f5c97a") }}
    >
      {bloqueada && (
        <div className="absolute top-2 right-2 text-gray-500">
          <DynamicIcon nome="Lock" size={18} />
        </div>
      )}

      <DynamicIcon nome={fase.icone ?? "Box"} size={64} className="text-white drop-shadow" />

      <span className="text-xl font-bold text-white drop-shadow text-center">
        {fase.nome}
      </span>

      <div className="flex gap-4 text-white/90 text-sm font-medium">
        <span className="flex items-center gap-1">
          <Zap size={14} /> {xp}
        </span>
        <span className="flex items-center gap-1">
          <Star size={14} /> {estrelas}
        </span>
      </div>
    </Card>
  );
}