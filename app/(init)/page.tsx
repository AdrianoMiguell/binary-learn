"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Gugi } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "@/components/app_header";
import { Book, BookMarkedIcon, Play } from "lucide-react";

const gugiFont = Gugi({
  weight: "400",
  subsets: ["latin"],
});

export default function HomePage() {
  const route = useRouter();

  return (
    <SidebarProvider>
      <main className="w-full">
        <AppHeader />

        <section className="p-6 h-[calc(100vh-5rem)] flex flex-col justify-center items-center gap-1">
          <h1 className={`${gugiFont.className} text-5xl font-bold`}>
            Binary Learn
          </h1>
          <div className="mt-12 px-6 min-w-80 grid gap-6">
            <Button
              variant="systemLocal"
              className="h-10 w-full"
              onClick={() => route.push("/fase")}
            >
              <Play />
              Jogar
            </Button>
            <Button variant="systemLocal" className="h-10 w-full">
              <Book />
              Aprender
            </Button>
            <Button variant="systemLocal" className="h-10 w-full">
              <BookMarkedIcon />
              Instruções
            </Button>
          </div>
        </section>
      </main>
    </SidebarProvider>
  );
}
