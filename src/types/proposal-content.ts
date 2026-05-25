/**
 * Tipos do campo `content` (JSONB) das propostas.
 *
 * Cada tipo de proposta tem um schema próprio. `ProposalContentByType`
 * mapeia o `type` da proposta para a interface correspondente, e
 * `ProposalContent` é a união de todas elas.
 */

// ─── Blocos compartilhados ───────────────────────────────────────────────

export interface HeroContent {
  /** Tag/eyebrow acima do título (ex.: "Performance Marketing") */
  tag: string;
  title: string;
  subtitle: string;
}

/** Ação de um botão de CTA. */
export type CtaAction =
  | { type: "accept"; label: string }
  | { type: "link"; label: string; url: string }
  | { type: "whatsapp"; label: string; phone: string; message?: string };

export interface CtaBlock {
  title: string;
  subtitle?: string;
  actions: CtaAction[];
}

/** Caixa de preço / investimento. */
export interface PricingContent {
  /** Rótulo acima do valor (ex.: "Investimento") */
  label?: string;
  /** Valor principal já formatado (ex.: "R$ 12.000") */
  amount: string;
  /** Texto de parcelamento (ex.: "ou 12x de R$ 1.000 sem juros") */
  installments?: string;
  note?: string;
}

/** Uma condição de pagamento na grade de parcelas. */
export interface PaymentInstallment {
  /** Ex.: "Entrada", "12x" */
  label: string;
  /** Valor formatado (ex.: "R$ 1.500") */
  amount: string;
  note?: string;
}

/** Item de checklist (escopo, entregas, inclusos). */
export interface ChecklistItem {
  text: string;
  /** Sub-texto / bullet opcional */
  detail?: string;
}

/** Fase de um roadmap/cronograma. */
export interface RoadmapPhase {
  title: string;
  /** Prazo (ex.: "10 dias", "Semana 1", "0-30 dias") */
  duration: string;
  items: string[];
}

/** Card genérico com ícone (valores, pilares, serviços). */
export interface IconCard {
  /** Nome do ícone Tabler (ex.: "IconRocket") */
  icon: string;
  title: string;
  description: string;
}

// ─── Website ─────────────────────────────────────────────────────────────

export interface PortfolioProject {
  name: string;
  url: string;
  description: string;
  tags: string[];
  /** Nome do ícone Tabler */
  icon: string;
}

export interface WebsiteContent {
  hero: HeroContent;
  /** Pílula de preço exibida no hero */
  pricePill: string;
  portfolio: PortfolioProject[];
  /** Grid de valores (6 cards) */
  values: IconCard[];
  pricing: PricingContent;
  cta: CtaBlock;
}

// ─── E-commerce ──────────────────────────────────────────────────────────

export interface EcommerceContent {
  hero: HeroContent;
  sprintDays: number;
  /** Plataforma de e-commerce (Tray, Shopify, etc.) */
  platform: string;
  erp: string;
  /** Chips de destaque exibidos no topo */
  chips: string[];
  pricing: PricingContent;
  /** Os "4S": Streaming, Scrolling, Search, Shopping */
  fourS: { title: string; description: string }[];
  /** Roadmap em 5 fases */
  roadmap: RoadmapPhase[];
  scopeIncluded: ChecklistItem[];
  scopeExcluded: string[];
  /** Grade de condições de pagamento */
  paymentConditions: PaymentInstallment[];
  cta: CtaBlock;
}

// ─── Tráfego Pago ────────────────────────────────────────────────────────

export interface DashboardMetric {
  label: string;
  value: string;
  hint?: string;
}

export interface DashboardData {
  investment: string;
  revenue: string;
  roas: string;
  cac: string;
  /** Gráfico de barras por semana */
  weeklyBars: { week: string; value: number }[];
  /** Breakdown por canal */
  channels: { name: string; share: number; value?: string }[];
}

/** Uma fase do modelo de investimento em 2 etapas. */
export interface TrafegoPricingPhase {
  title: string;
  description: string;
  value: string;
}

export interface TrafegoContent {
  hero: HeroContent;
  /** 6 cards do serviço */
  serviceCards: IconCard[];
  included: ChecklistItem[];
  dashboard: DashboardData;
  /** Modelo de investimento em 2 fases */
  pricingModel: TrafegoPricingPhase[];
  /** Cronograma em 4 semanas */
  schedule: RoadmapPhase[];
  cta: CtaBlock;
}

// ─── Campanha de Marketing ───────────────────────────────────────────────

export interface CampanhaInvestment {
  /** Valor fixo de gestão */
  managementFee: PricingContent;
  /** Opcional de produção */
  productionFee?: PricingContent;
  /** Texto sobre a verba de mídia (destacada como NÃO inclusa) */
  mediaBudgetNote: string;
}

export interface CampanhaContent {
  hero: HeroContent;
  /** 6 cards de pilares */
  pillars: IconCard[];
  /** Cronograma em fases (30/60/90 dias) */
  schedule: RoadmapPhase[];
  deliverables: ChecklistItem[];
  excluded: string[];
  investment: CampanhaInvestment;
  cta: CtaBlock;
}

// ─── União ───────────────────────────────────────────────────────────────

export interface ProposalContentByType {
  website: WebsiteContent;
  ecommerce: EcommerceContent;
  trafego: TrafegoContent;
  campanha: CampanhaContent;
}

export type ProposalType = keyof ProposalContentByType;

export type ProposalContent = ProposalContentByType[ProposalType];

/** Tipos de proposta que possuem formulário de aceite. */
export const TYPES_WITH_ACCEPTANCE: ProposalType[] = [
  "ecommerce",
  "trafego",
  "campanha",
];
