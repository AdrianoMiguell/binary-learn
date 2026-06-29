"use client";
import React from "react";
import { AppSidebar } from "@/components/app_sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <header>
        <AppSidebar />
      </header>
      <main className="px-4 py-2">
        <SidebarTrigger className="hover:cursor-pointer" />
        {children}
      </main>
    </SidebarProvider>
  );
}
