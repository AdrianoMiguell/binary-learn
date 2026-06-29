"use client";

import { cn } from "@/lib/utils";
import { AppSidebar } from "./app_sidebar";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "@/db/services/auth_service";

export default function AppHeader({ background }: { background?: string }) {
  const onClickSair = async () => {
    const confirmado = window.confirm("Você quer mesmo sair da conta atual?");

    if (confirmado) {
      try {
        await logout();
      } catch (error) {
        console.error("Erro ao deslogar");
      }
    }
  };

  return (
    <header
      className={cn(
        background != null,
        background,
        "",
        "fixed top-0 left-0 right-0 flex justify-between px-4 py-2 h-fit",
      )}
    >
      {/* <AppSidebar /> */}
      <SidebarTrigger variant="ghost" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <User />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Acessar Perfil</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onClickSair()}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
