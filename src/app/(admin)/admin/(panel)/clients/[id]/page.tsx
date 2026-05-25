import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ClientForm } from "@/components/admin/client-form";
import { PageHeader } from "@/components/admin/page-header";
import { getClientById } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Editar cliente — Convertido",
};

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-8">
      <PageHeader title="Editar cliente" description={client.companyName} />
      <ClientForm client={client} />
    </div>
  );
}
