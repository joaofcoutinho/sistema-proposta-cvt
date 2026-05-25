import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";

export default async function PanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-svh">
      <AdminSidebar userEmail={session?.user?.email ?? ""} />
      <main className="lg:pl-60">{children}</main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
