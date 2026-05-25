import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { isBlobConfigured, uploadLogo } from "@/lib/blob";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "Upload indisponível: BLOB_READ_WRITE_TOKEN não configurado." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Nenhum arquivo enviado." },
      { status: 400 },
    );
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Formato inválido. Use PNG, JPG, WEBP ou SVG." },
      { status: 400 },
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Arquivo muito grande (máximo 2 MB)." },
      { status: 400 },
    );
  }

  try {
    const url = await uploadLogo(file);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Falha no upload de logo:", error);
    return NextResponse.json(
      { error: "Falha ao enviar o arquivo." },
      { status: 500 },
    );
  }
}
