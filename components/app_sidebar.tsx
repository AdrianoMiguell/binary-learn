import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, Gamepad, HdIcon, Icon } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <h1>Binary Learn</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel> Jogos </SidebarGroupLabel>
          <SidebarGroupAction>
            <Gamepad />
            <span className="sr-only"> Adicionar fases e níveis do jogo</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton content="">
                  <SidebarMenuAction>
                    <HdIcon />
                  </SidebarMenuAction>
                  <a href="/dashboard/fases">
                    <span>Fases</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SidebarMenuAction>
                    <HdIcon />
                  </SidebarMenuAction>
                  <a href="/dashboard/fases">
                    <span>Níveis</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SidebarMenuAction>
                    <HdIcon />
                  </SidebarMenuAction>
                  <a href="/dashboard/fases">
                    <span>Pontos</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
