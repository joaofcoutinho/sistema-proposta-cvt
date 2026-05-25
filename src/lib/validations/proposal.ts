import { z } from "zod";

import type { ProposalType } from "@/types/proposal-content";

// ─── Blocos compartilhados ───────────────────────────────────────────────

const heroSchema = z.object({
  tag: z.string(),
  title: z.string(),
  subtitle: z.string(),
});

const ctaActionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("accept"), label: z.string() }),
  z.object({ type: z.literal("link"), label: z.string(), url: z.string() }),
  z.object({
    type: z.literal("whatsapp"),
    label: z.string(),
    phone: z.string(),
    message: z.string().optional(),
  }),
]);

const ctaBlockSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  actions: z.array(ctaActionSchema),
});

const pricingSchema = z.object({
  label: z.string().optional(),
  amount: z.string(),
  installments: z.string().optional(),
  note: z.string().optional(),
});

const paymentInstallmentSchema = z.object({
  label: z.string(),
  amount: z.string(),
  note: z.string().optional(),
});

const checklistItemSchema = z.object({
  text: z.string(),
  detail: z.string().optional(),
});

const roadmapPhaseSchema = z.object({
  title: z.string(),
  duration: z.string(),
  items: z.array(z.string()),
});

const iconCardSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

// ─── Website ─────────────────────────────────────────────────────────────

export const websiteContentSchema = z.object({
  hero: heroSchema,
  pricePill: z.string(),
  portfolio: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      icon: z.string(),
    }),
  ),
  values: z.array(iconCardSchema),
  pricing: pricingSchema,
  cta: ctaBlockSchema,
});

// ─── E-commerce ──────────────────────────────────────────────────────────

export const ecommerceContentSchema = z.object({
  hero: heroSchema,
  sprintDays: z.number(),
  platform: z.string(),
  erp: z.string(),
  chips: z.array(z.string()),
  pricing: pricingSchema,
  fourS: z.array(
    z.object({ title: z.string(), description: z.string() }),
  ),
  roadmap: z.array(roadmapPhaseSchema),
  scopeIncluded: z.array(checklistItemSchema),
  scopeExcluded: z.array(z.string()),
  paymentConditions: z.array(paymentInstallmentSchema),
  cta: ctaBlockSchema,
});

// ─── Tráfego Pago ────────────────────────────────────────────────────────

export const trafegoContentSchema = z.object({
  hero: heroSchema,
  serviceCards: z.array(iconCardSchema),
  included: z.array(checklistItemSchema),
  dashboard: z.object({
    investment: z.string(),
    revenue: z.string(),
    roas: z.string(),
    cac: z.string(),
    weeklyBars: z.array(
      z.object({ week: z.string(), value: z.number() }),
    ),
    channels: z.array(
      z.object({
        name: z.string(),
        share: z.number(),
        value: z.string().optional(),
      }),
    ),
  }),
  pricingModel: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      value: z.string(),
    }),
  ),
  schedule: z.array(roadmapPhaseSchema),
  cta: ctaBlockSchema,
});

// ─── Campanha ────────────────────────────────────────────────────────────

export const campanhaContentSchema = z.object({
  hero: heroSchema,
  pillars: z.array(iconCardSchema),
  schedule: z.array(roadmapPhaseSchema),
  deliverables: z.array(checklistItemSchema),
  excluded: z.array(z.string()),
  investment: z.object({
    managementFee: pricingSchema,
    productionFee: pricingSchema.optional(),
    mediaBudgetNote: z.string(),
  }),
  cta: ctaBlockSchema,
});

// ─── Seleção por tipo ────────────────────────────────────────────────────

const CONTENT_SCHEMAS = {
  website: websiteContentSchema,
  ecommerce: ecommerceContentSchema,
  trafego: trafegoContentSchema,
  campanha: campanhaContentSchema,
} as const;

/** Retorna o schema de `content` para o tipo de proposta informado. */
export function getContentSchema(type: ProposalType) {
  return CONTENT_SCHEMAS[type];
}

// ─── Schema do editor (meta + content) ───────────────────────────────────

/** Schema do formulário do editor para um tipo de proposta. */
export function getEditorSchema(type: ProposalType) {
  return z.object({
    title: z.string().min(1, "Informe um título para a proposta"),
    slug: z
      .string()
      .min(1, "Informe um slug")
      .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífen"),
    validUntil: z.string(),
    content: getContentSchema(type),
  });
}

// ─── Schema do passo 1 (criação) ─────────────────────────────────────────

export const newProposalSchema = z.object({
  clientId: z.string().uuid("Selecione um cliente"),
  type: z.enum(["website", "ecommerce", "trafego", "campanha"]),
  title: z.string().min(1, "Informe um título").max(160),
});

// ─── Aceite da proposta (página pública) ─────────────────────────────────

export const acceptanceSchema = z.object({
  name: z.string().min(1, "Informe seu nome completo").max(160),
  role: z.string().max(160).optional(),
});
