import { and, isNotNull, lt, notInArray } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { proposals } from "@/lib/db/schema";

/**
 * Marca como "expired" as propostas cuja validade já passou.
 * Acionada por um cron da Vercel (ver vercel.json). Se CRON_SECRET estiver
 * definido, exige o header Authorization: Bearer <secret>.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const header = request.headers.get("authorization");
    if (header !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const expired = await db
    .update(proposals)
    .set({ status: "expired", updatedAt: new Date() })
    .where(
      and(
        isNotNull(proposals.validUntil),
        lt(proposals.validUntil, new Date()),
        notInArray(proposals.status, ["accepted", "rejected", "expired"]),
      ),
    )
    .returning({ id: proposals.id });

  return NextResponse.json({ ok: true, expired: expired.length });
}
