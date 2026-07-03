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
  estrelas?: number;
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
        "flex flex-col items-center gap-x-6 gap-y-3 cursor-pointer group",
        bloqueado && "cursor-not-allowed opacity-50"
      )}
    >
      <div
        className={cn(
          "w-35 h-35 rounded-full flex items-center justify-center text-5xl font-bold shadow-md transition-transform group-hover:scale-105",
          bloqueado ? "bg-gray-400 text-gray-600" : "bg-amber-300 text-amber-900"
        )}
      >
        {numero}
      </div>
      <div className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <Star
            key={i}
            size={24}
            className={cn(i <= estrelas ? "fill-amber-400 text-amber-400" : "text-gray-400")}
          />
        ))}
      </div>
    </div>
  );
}