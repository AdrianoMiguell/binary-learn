"use client";

import { cn } from "@/lib/utils";
import { AppSidebar } from "./app_sidebar";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
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
import { useAuthStore } from "@/app/store/auth/auth_store";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function AppHeader({ background }: { background?: string }) {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const router = useRouter();

  const onClickSair = async () => {
    const confirmado = window.confirm("Você quer mesmo sair da conta atual?");

    if (confirmado) {
      try {
        clearAuth();
        await logout();
        window.location.href = "/login";
      } catch (error) {
        console.error("Erro ao deslogar");
      }
    }
  };

  const getInitials = () => {
    if (user?.username == null) return "?";
    const names = user.username.split(" ");
    if (names.length == 1) return names[0].charAt(0).toUpperCase();

    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const inRaiz = pathname === "/";

  return (
    <header>
      <AppSidebar username={user?.username} initials={getInitials()} />

      <nav
        className={cn(
          background != null,
          background,
          "",
          "flex justify-between px-4 py-2 h-fit",
        )}
      >
        <div className="flex justify-center items-center gap-2">
          <SidebarTrigger variant="ghost" />
          {!inRaiz && <Link href="/">Binary Learn</Link>}
        </div>

        {user?.email != null ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="hover:cursor-pointer">
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
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
        ) : (
          <div className="flex gap-1">
            <Button variant="ghost" onClick={() => router.push("/register")}>
              Registrar
            </Button>
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Login
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
