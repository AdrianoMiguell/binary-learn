import React from "react";
import blobBack from "@/public/assets/blob_back_padrao.svg";
import blobBack2 from "@/public/assets/blob_back_padrao_2.svg";
import Image from "next/image";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app_sidebar";
import AppHeader from "@/components/app_header";

export default function LayoutGame({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
