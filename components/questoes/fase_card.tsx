// components_card.tsx
"use client";

import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { DynamicIcon } from "./dynamic_icon";
import { Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaseDados } from "@/db/schemas/fases_schemas";
import React from "react";
import { readableColor } from "polished";

interface FaseCardProps {
  fase: FaseDados;
  xp?: number;
  estrelas?: number;
  bloqueada?: boolean;
}

export default function FaseCard({
  fase,
  xp = 0,
  estrelas = 0,
  bloqueada = false,
}: FaseCardProps) {
  const router = useRouter();

  const backColor = bloqueada ? "#bfbfbf" : (fase.cor ?? "#f5c97a");
  const textColor = readableColor(backColor, "#2f2f2f", "#ffffff");

  return (
    <Card
      onClick={() => !bloqueada && router.push(`/fase/${fase.id}/nivel`)}
      style={{
        backgroundColor: backColor,
        color: textColor,
      }}
      className={cn(
        `relative px-8 py-6 flex flex-col items-center gap-3 border-0 rounded-2xl shadow-md transition-all`,
        !bloqueada && "hover:cursor-pointer hover:opacity-90 hover:shadow-lg",
        // bloqueada
        //   ? "opacity-50 cursor-not-allowed bg-gray-300"
        //   : `bg-(--bg-fase)] ${textColor}  hover:opacity-80 cursor-pointer`,
        // // cor dinâmica via inline style abaixo
      )}
    >
      {bloqueada && (
        <div className="absolute top-2 right-2 text-gray-500">
          <DynamicIcon nome="Lock" size={16} />
        </div>
      )}

      <DynamicIcon
        nome={fase.icone ?? "Box"}
        size={64}
        className={`drop-shadow`}
        // className={`${textColor} drop-shadow`}
      />

      <span
        className={`text-xl font-bold  drop-shadow text-center`}
        // className={`text-xl font-bold ${textColor} drop-shadow text-center`}
      >
        {fase.nome}
      </span>

      <div className={`flex gap-4  text-sm font-medium`}>
        {/* <div className={`flex gap-4 ${textColor}/90 text-sm font-medium`}> */}
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
