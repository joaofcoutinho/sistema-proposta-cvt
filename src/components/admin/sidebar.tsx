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
    <div className="flex items-center gap-3 px-6 py-6">
      {/* eslint-disable-next-line @next/next/no-img-element -- logo estático */}
      <img
        src="/convertido-logo.png"
        alt="Convertido"
        className="size-9 shrink-0 object-contain"
      />
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="wordmark text-[15px] text-foreground">
          Convertido
        </span>
        <span className="mt-0.5 text-[11px] text-muted-foreground/80">
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
    <nav className="flex flex-1 flex-col gap-0.5 px-4 pt-2">
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-all",
              active
                ? "bg-foreground/[0.06] text-foreground"
                : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
            )}
          >
            {active ? (
              <span
                aria-hidden
                className="absolute top-1/2 left-0 h-5 w-0.5 -translate-x-1 -translate-y-1/2 rounded-r-full bg-primary"
              />
            ) : null}
            <item.icon
              className={cn(
                "size-[18px] transition-colors",
                active ? "text-foreground" : "text-muted-foreground/70",
              )}
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
  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "?";
  return (
    <div className="border-t border-border px-4 py-4">
      {userEmail ? (
        <div className="mb-2 flex items-center gap-2.5 rounded-lg px-2 py-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[11px] font-semibold text-foreground/80">
            {initial}
          </span>
          <span className="truncate text-[12px] text-muted-foreground">
            {userEmail}
          </span>
        </div>
      ) : null}
      <form action={signOutAction}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
        >
          <IconLogout className="size-[18px]" stroke={1.75} />
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
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-sidebar lg:flex">
        <Brand />
        <NavList pathname={pathname} />
        <SidebarFooter userEmail={userEmail} />
      </aside>

      {/* Topbar — mobile */}
      <div className="flex items-center gap-3 border-b border-border bg-sidebar/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Abrir menu"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
          >
            <IconMenu2 className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-sidebar p-0">
            <SheetTitle className="sr-only">Menu do painel</SheetTitle>
            <div className="flex h-full flex-col">
              <Brand />
              <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
              <SidebarFooter userEmail={userEmail} />
            </div>
          </SheetContent>
        </Sheet>
        <span className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- logo estático */}
          <img
            src="/convertido-logo.png"
            alt="Convertido"
            className="size-7 shrink-0 object-contain"
          />
          <span className="wordmark text-[14px] text-foreground">
            Convertido
          </span>
        </span>
      </div>
    </>
  );
}
