import React from "react";
import blobBack from "@/public/assets/blob_back_padrao.svg";
import blobBack2 from "@/public/assets/blob_back_padrao_2.svg";
import Image from "next/image";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app_sidebar";
import AppHeader from "@/components/app_header";
import WaveImage from "@/public/assets/wave-haikei.png";

export default function LayoutGame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <div className="w-full">
          <AppHeader background="bg-teal-500" />

          {children}

          <footer className="fixed bottom-10 left-0 right-0 h-35">
            <Image className="w-full h-50" src={WaveImage} alt="Back Wave" />
          </footer>
        </div>
      </SidebarProvider>
    </div>
  );
}
