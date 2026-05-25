/**
 * Conteúdo inicial de uma proposta nova, por tipo. Serve de ponto de partida
 * editável no editor — já vem com estrutura e exemplos para o preview.
 */
import type {
  CampanhaContent,
  EcommerceContent,
  ProposalContent,
  ProposalContentByType,
  ProposalType,
  TrafegoContent,
  WebsiteContent,
} from "@/types/proposal-content";

const defaultWebsite: WebsiteContent = {
  hero: {
    tag: "Desenvolvimento Web",
    title: "Um site feito para converter",
    subtitle:
      "Presença digital de alta performance que une identidade de marca, usabilidade e foco em resultado.",
  },
  pricePill: "A partir de R$ 4.997 · 4× sem juros",
  portfolio: [
    {
      name: "Projeto exemplo",
      url: "https://exemplo.com.br",
      description: "Descreva o projeto entregue para este cliente.",
      tags: ["Institucional", "Performance"],
      icon: "IconWorld",
    },
  ],
  values: [
    {
      icon: "IconBrandFigma",
      title: "Design estratégico",
      description: "Identidade visual alinhada à marca e à conversão.",
    },
    {
      icon: "IconBolt",
      title: "Performance técnica",
      description: "Código limpo, carregamento rápido e otimizado para SEO.",
    },
    {
      icon: "IconDeviceMobile",
      title: "100% responsivo",
      description: "Experiência impecável em qualquer tela.",
    },
    {
      icon: "IconChartLine",
      title: "Foco em resultado",
      description: "Estruturado para alimentar campanhas e SEO.",
    },
    {
      icon: "IconShieldCheck",
      title: "Discovery incluído",
      description: "Todo projeto começa com planejamento estratégico.",
    },
    {
      icon: "IconHeadset",
      title: "Suporte dedicado",
      description: "Acompanhamento próximo e revisões incluídas.",
    },
  ],
  pricing: {
    label: "Investimento total",
    amount: "R$ 4.997",
    installments: "4× R$ 1.249,25",
    note: "sem juros no cartão",
  },
  cta: {
    title: "Vamos começar seu site?",
    subtitle: "Investimento único, site pronto para converter.",
    actions: [{ type: "accept", label: "Aceitar proposta" }],
  },
};

const defaultEcommerce: EcommerceContent = {
  hero: {
    tag: "Implantação de Loja Virtual",
    title: "Sua operação no e-commerce",
    subtitle: "Sprint estruturado para colocar a loja no ar e pronta para escalar.",
  },
  sprintDays: 40,
  platform: "Tray ou Shopify",
  erp: "—",
  chips: ["Sprint 40 dias", "Go-live garantido", "15 dias de suporte"],
  pricing: {
    label: "Investimento total",
    amount: "R$ 14.997",
    installments: "em 4× de R$ 3.749,25 sem juros",
  },
  fourS: [
    { title: "Streaming", description: "Vídeos de produto que constroem confiança." },
    { title: "Scrolling", description: "Conteúdo para redes que gera tráfego orgânico." },
    { title: "Search", description: "SEO e Google Shopping para capturar a demanda." },
    { title: "Shopping", description: "Loja como hub de conversão, checkout fluido." },
  ],
  roadmap: [
    {
      title: "Integração e setup",
      duration: "Dias 1–15",
      items: ["Validação de API", "Infraestrutura", "Identidade visual"],
    },
    {
      title: "Desenvolvimento da loja",
      duration: "Dias 16–28",
      items: ["Catálogo", "Checkout", "SEO on-page"],
    },
    {
      title: "Testes e go-live",
      duration: "Dias 29–40",
      items: ["Homologação", "Publicação", "Treinamento"],
    },
  ],
  scopeIncluded: [
    { text: "Implantação da plataforma" },
    { text: "Configuração de checkout, frete e pagamento" },
    { text: "Importação do catálogo de produtos" },
    { text: "Testes, homologação e go-live" },
  ],
  scopeExcluded: [
    "Licença mensal da plataforma",
    "Produção fotográfica dos produtos",
  ],
  paymentConditions: [
    { label: "1ª parcela", amount: "R$ 3.749,25", note: "Na assinatura" },
    { label: "2ª parcela", amount: "R$ 3.749,25", note: "No meio do projeto" },
  ],
  cta: {
    title: "Pronto para começar?",
    subtitle:
      "Ao aceitar, você confirma que leu e concorda com o escopo, valor e condições desta proposta.",
    actions: [{ type: "accept", label: "Aceitar proposta" }],
  },
};

const defaultTrafego: TrafegoContent = {
  hero: {
    tag: "Performance Marketing · Tráfego Pago",
    title: "Gestão de Performance & Tráfego Pago",
    subtitle:
      "Operação completa de mídia paga focada em escala lucrativa, com acompanhamento em dashboard.",
  },
  serviceCards: [
    {
      icon: "IconTargetArrow",
      title: "Estratégia & Planejamento",
      description: "Auditoria, mapeamento de funil e roadmap de testes.",
    },
    {
      icon: "IconAd",
      title: "Mídia Paga Multi-canal",
      description: "Gestão de campanhas em Meta, Google, TikTok e LinkedIn.",
    },
    {
      icon: "IconPalette",
      title: "Criativos de Performance",
      description: "Produção e iteração semanal de criativos.",
    },
    {
      icon: "IconChartDots",
      title: "Tracking & Atribuição",
      description: "GA4, GTM, Meta CAPI e UTMs padronizados.",
    },
    {
      icon: "IconAdjustmentsHorizontal",
      title: "Otimização Diária",
      description: "Ajustes de lances, públicos e criativos.",
    },
    {
      icon: "IconArrowsExchange",
      title: "CRO & Landing Pages",
      description: "Testes A/B para maximizar a conversão.",
    },
  ],
  included: [
    { text: "Reunião semanal de alinhamento" },
    { text: "Relatório executivo mensal" },
    { text: "Acesso ao dashboard em tempo real" },
    { text: "Canal direto via WhatsApp" },
  ],
  dashboard: {
    investment: "R$ 48,2k",
    revenue: "R$ 214k",
    roas: "4,44x",
    cac: "R$ 87",
    weeklyBars: [
      { week: "S1", value: 10 },
      { week: "S2", value: 14 },
      { week: "S3", value: 19 },
      { week: "S4", value: 24 },
      { week: "S5", value: 28 },
      { week: "S6", value: 34 },
    ],
    channels: [
      { name: "Meta Ads", share: 78, value: "R$ 26,4k · ROAS 4,8x" },
      { name: "Google Ads", share: 54, value: "R$ 18,1k · ROAS 4,2x" },
      { name: "TikTok Ads", share: 22, value: "R$ 3,7k · ROAS 3,1x" },
    ],
  },
  pricingModel: [
    {
      title: "Fase 1 · Valor fixo",
      value: "R$ 2.997 /mês",
      description: "Mensalidade fixa enquanto o faturamento estiver no patamar inicial.",
    },
    {
      title: "Fase 2 · Performance",
      value: "10% sobre o faturamento",
      description: "Acima do patamar, a remuneração passa a ser performance.",
    },
  ],
  schedule: [
    { title: "Onboarding", duration: "Semana 1", items: ["Acessos", "Auditoria"] },
    { title: "Setup técnico", duration: "Semana 2", items: ["Tracking", "Dashboard"] },
    { title: "Go-live", duration: "Semana 3", items: ["Primeiras campanhas"] },
    { title: "Escala", duration: "Semana 4+", items: ["Otimização contínua"] },
  ],
  cta: {
    title: "Pronto para escalar?",
    subtitle: "Aceite a proposta e iniciamos o onboarding em até 48h.",
    actions: [
      { type: "accept", label: "Aceitar proposta" },
      { type: "link", label: "Agendar conversa", url: "https://cal.com/convertido" },
    ],
  },
};

const defaultCampanha: CampanhaContent = {
  hero: {
    tag: "Campanha Integrada",
    title: "Uma campanha pensada para gerar demanda",
    subtitle:
      "Do conceito à mensuração — planejamento, identidade própria e distribuição multicanal.",
  },
  pillars: [
    {
      icon: "IconBulb",
      title: "Planejamento estratégico",
      description: "Objetivo, público, mensagem central e KPIs.",
    },
    {
      icon: "IconPalette",
      title: "Identidade da campanha",
      description: "Conceito criativo e sistema visual exclusivos.",
    },
    {
      icon: "IconPencil",
      title: "Produção de conteúdo",
      description: "Criativos estáticos, vídeos e textos por canal.",
    },
    {
      icon: "IconBroadcast",
      title: "Distribuição multicanal",
      description: "Redes, e-mail, mídia paga e parcerias.",
    },
    {
      icon: "IconLayoutBoardSplit",
      title: "Landing page / hotsite",
      description: "Página dedicada otimizada para conversão.",
    },
    {
      icon: "IconChartHistogram",
      title: "Mensuração e relatórios",
      description: "Acompanhamento de resultados e recomendações.",
    },
  ],
  schedule: [
    {
      title: "Estratégia e conceito",
      duration: "0–30 dias",
      items: ["Briefing", "Conceito criativo", "Plano de mídia"],
    },
    {
      title: "Produção e lançamento",
      duration: "30–60 dias",
      items: ["Produção de conteúdo", "Landing page", "Go-live"],
    },
    {
      title: "Otimização e relatório",
      duration: "60–90 dias",
      items: ["Otimização", "Testes A/B", "Relatório final"],
    },
  ],
  deliverables: [
    { text: "Planejamento estratégico da campanha" },
    { text: "Conceito criativo e identidade visual" },
    { text: "Pacote de criativos para redes sociais" },
    { text: "Landing page / hotsite dedicado" },
    { text: "Relatório consolidado de resultados" },
  ],
  excluded: [
    "Verba de mídia paga",
    "Cachê de influenciadores",
  ],
  investment: {
    managementFee: {
      label: "Gestão da campanha",
      amount: "R$ 6.900",
      installments: "por mês · contrato mínimo de 3 meses",
    },
    productionFee: {
      label: "Produção de conteúdo (opcional)",
      amount: "R$ 3.500",
      installments: "por mês",
    },
    mediaBudgetNote:
      "A verba investida nas plataformas de anúncio é paga diretamente pelo cliente.",
  },
  cta: {
    title: "Vamos colocar sua campanha no ar?",
    subtitle: "Aceite a proposta e agendamos o kickoff.",
    actions: [{ type: "accept", label: "Aceitar proposta" }],
  },
};

const DEFAULTS: ProposalContentByType = {
  website: defaultWebsite,
  ecommerce: defaultEcommerce,
  trafego: defaultTrafego,
  campanha: defaultCampanha,
};

/** Conteúdo inicial (cópia profunda) para uma proposta nova do tipo dado. */
export function getDefaultContent(type: ProposalType): ProposalContent {
  return structuredClone(DEFAULTS[type]);
}
