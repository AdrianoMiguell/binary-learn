import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
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
import {
  BookOpen,
  ChevronDown,
  Gamepad,
  HdIcon,
  Icon,
  LogOut,
  ShieldAlert,
  ShoppingBag,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";

const itens = [
  {
    name: "Aprender",
    icon: BookOpen,
    route: "/",
  },
  {
    name: "Instruções",
    icon: ShieldAlert,
    route: "/",
  },
  {
    name: "Loja de Itens",
    icon: ShoppingBag,
    route: "/",
  },
];

export function AppSidebar({
  username,
  initials,
}: {
  username?: string | null;
  initials?: string | "?";
}) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="z-50"
    >
      <SidebarHeader className="flex flex-col items-center justify-center p-4 pt-8 relative">
        <div className="absolute top-2 right-2">
          <SidebarTrigger
            variant="ghost"
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </SidebarTrigger>
        </div>
        {username == null ? (
          <h1 className="self-start text-lg text-gray-700 font-semibold">
            Binary Learn
          </h1>
        ) : (
          <>
            <Avatar className="h-20 w-20 border-none mb-2">
              <AvatarFallback className="text-4xl font-semibold bg-gray-950 text-gray-300">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-700">
              {username}
            </span>
          </>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 pt-4">
        <SidebarMenu className="gap-3">
          {itens.map((item, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton
                asChild
                className="w-full justify-start gap-3 py-6 px-4 bg-emerald-400 text-emerald-950 border-2 border-emerald-500 hover:bg-emerald-400/80 font-medium rounded-xl transition-colors shadow-sm [&_svg]:text-emerald-950"
              >
                <Link href={item.route}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="pb-6 px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="w-full justify-center py-6  bg-red-400 text-red-950 border-2 border-red-500 hover:bg-red-500/80 font-medium rounded-xl transition-colors shadow-sm [&_svg]:text-red-950"
            >
              <Link href="/logout">
                <LogOut className="mr-2 h-5 w-5" />
                Sair
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
