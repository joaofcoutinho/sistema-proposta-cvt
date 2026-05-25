"use client";

import {
  IconFileText,
  IconLayoutDashboard,
  IconLogout,
  IconMenu2,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOutAction } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: IconLayoutDashboard },
  { href: "/admin/clients", label: "Clientes", icon: IconUsers },
  { href: "/admin/proposals", label: "Propostas", icon: IconFileText },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-5 py-5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30">
        C
      </div>
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Convertido
        </span>
        <span className="text-[11px] text-muted-foreground">
          Propostas comerciais
        </span>
      </div>
    </div>
  );
}

function NavList({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/12 text-foreground"
                : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
            )}
          >
            <item.icon
              className={cn("size-4.5", active && "text-primary-soft")}
              stroke={1.75}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter({ userEmail }: { userEmail: string }) {
  return (
    <div className="border-t border-border px-3 py-4">
      {userEmail ? (
        <p className="truncate px-3 pb-2 text-xs text-muted-foreground">
          {userEmail}
        </p>
      ) : null}
      <form action={signOutAction}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <IconLogout className="size-4.5" stroke={1.75} />
          Sair
        </button>
      </form>
    </div>
  );
}

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sidebar fixa — desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border bg-sidebar lg:flex">
        <Brand />
        <NavList pathname={pathname} />
        <SidebarFooter userEmail={userEmail} />
      </aside>

      {/* Topbar — mobile */}
      <div className="flex items-center gap-3 border-b border-border bg-sidebar px-4 py-3 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Abrir menu"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          >
            <IconMenu2 className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-60 bg-sidebar p-0">
            <SheetTitle className="sr-only">Menu do painel</SheetTitle>
            <div className="flex h-full flex-col">
              <Brand />
              <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
              <SidebarFooter userEmail={userEmail} />
            </div>
          </SheetContent>
        </Sheet>
        <span className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            C
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Convertido
          </span>
        </span>
      </div>
    </>
  );
}
