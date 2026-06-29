// components/nivel_card.tsx
"use client";

import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface NivelCardProps {
  numero: number;
  nivelId: number;
  faseId: number;
  bloqueado?: boolean;
  estrelas?: number; // 0, 1, 2 ou 3
}

export default function NivelCard({
  numero,
  nivelId,
  faseId,
  bloqueado = false,
  estrelas = 0,
}: NivelCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => !bloqueado && router.push(`/fase/${faseId}/nivel/${nivelId}/questao`)}
      className={cn(
        "flex flex-col items-center gap-2 cursor-pointer group",
        bloqueado && "cursor-not-allowed opacity-50"
      )}
    >
      <div
        className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-md transition-transform group-hover:scale-105",
          bloqueado ? "bg-gray-400 text-gray-600" : "bg-amber-300 text-amber-900"
        )}
      >
        {numero}
      </div>
      <div className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <Star
            key={i}
            size={16}
            className={cn(i <= estrelas ? "fill-amber-400 text-amber-400" : "text-gray-400")}
          />
        ))}
      </div>
    </div>
  );
}