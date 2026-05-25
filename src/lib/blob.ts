import { put } from "@vercel/blob";

/** Extensão de arquivo a partir do nome (fallback: png). */
function fileExtension(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase();
  return ext && ext.length <= 5 ? ext : "png";
}

/**
 * Envia o logo de um cliente para o Vercel Blob e retorna a URL pública.
 * Requer a env var BLOB_READ_WRITE_TOKEN.
 */
export async function uploadLogo(file: File): Promise<string> {
  const key = `logos/${crypto.randomUUID()}.${fileExtension(file.name)}`;
  const blob = await put(key, file, {
    access: "public",
    contentType: file.type || undefined,
  });
  return blob.url;
}

/** Indica se o upload via Blob está configurado. */
export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}
