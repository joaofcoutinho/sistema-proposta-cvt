import type { Metadata } from "next";

import { ClientForm } from "@/components/admin/client-form";
import { PageHeader } from "@/components/admin/page-header";

export const metadata: Metadata = {
  title: "Novo cliente — Convertido",
};

export default function NewClientPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-10 sm:py-12">
      <PageHeader
        title="Novo cliente"
        description="Cadastre a empresa, o contato e a identidade visual."
      />
      <ClientForm />
    </div>
  );
}
