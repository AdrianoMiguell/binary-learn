"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Gugi } from "next/font/google";

const gugiFont = Gugi({
  weight: "400",
  subsets: ["latin"],
});

export default function HomePage() {
  const route = useRouter();

  return <div>Heal</div>;
}
