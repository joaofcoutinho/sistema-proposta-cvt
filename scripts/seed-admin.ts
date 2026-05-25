/**
 * Cria (ou atualiza) o usuário admin do painel.
 *
 * Lê SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD / SEED_ADMIN_NAME do .env.
 * Uso: pnpm seed:admin
 */
import "dotenv/config";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "../src/lib/db";
import { users } from "../src/lib/db/schema";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim();
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME?.trim() || "Admin Convertido";

  if (!email || !password) {
    throw new Error(
      "Defina SEED_ADMIN_EMAIL e SEED_ADMIN_PASSWORD no arquivo .env.",
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existing) {
    await db
      .update(users)
      .set({ passwordHash, name })
      .where(eq(users.id, existing.id));
    console.log(`✔ Admin atualizado: ${email}`);
  } else {
    await db.insert(users).values({ email, passwordHash, name });
    console.log(`✔ Admin criado: ${email}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("✖ Falha ao executar o seed:", error);
    process.exit(1);
  });
