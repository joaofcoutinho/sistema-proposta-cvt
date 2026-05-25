/**
 * Dados de exemplo para preview dos templates de proposta (Etapa 3).
 * Baseados nos materiais de referência da Convertido.
 */
import type { Client, Proposal } from "@/lib/db/schema";
import type {
  CampanhaContent,
  EcommerceContent,
  ProposalContentByType,
  ProposalType,
  TrafegoContent,
  WebsiteContent,
} from "@/types/proposal-content";

// ─── Website ─────────────────────────────────────────────────────────────

const websiteContent: WebsiteContent = {
  hero: {
    tag: "Desenvolvimento Web",
    title: "Sites que vendem. Experiências que convertem.",
    subtitle:
      "Da estratégia ao pixel final — criamos presença digital de alta performance que une identidade de marca, usabilidade e foco em resultado real.",
  },
  pricePill: "A partir de R$ 4.997 · 4× sem juros",
  portfolio: [
    {
      name: "Sudeste Atacado",
      url: "https://sudesteatacado.com.br",
      description:
        "E-commerce atacadista com catálogo robusto, navegação otimizada para conversão e integração com sistema de pedidos B2B.",
      tags: ["E-commerce", "B2B", "Performance"],
      icon: "IconShoppingCart",
    },
    {
      name: "Vai de Vendas",
      url: "https://vaidevendas.com.br",
      description:
        "Plataforma comercial com identidade vibrante, foco em captação de leads e estrutura para funil de vendas consultivo.",
      tags: ["Institucional", "Lead Gen", "Vendas"],
      icon: "IconChartLine",
    },
    {
      name: "Elo",
      url: "https://elo-site-five.vercel.app",
      description:
        "Site institucional moderno com design minimalista, foco em storytelling de marca e navegação fluida em todos os dispositivos.",
      tags: ["Institucional", "Design Premium", "Responsivo"],
      icon: "IconDeviceMobile",
    },
    {
      name: "Marion Madeiras",
      url: "https://marionmadeiras.com.br",
      description:
        "Presença digital para marca do segmento madeireiro com catálogo visual, posicionamento de autoridade e SEO estrutural.",
      tags: ["Catálogo", "SEO", "Varejo"],
      icon: "IconWorld",
    },
    {
      name: "Nova Série",
      url: "https://lp-novaserie.vercel.app",
      description:
        "Landing page de alta conversão com copy estratégico, hierarquia visual clara e elementos de gatilho para captação imediata.",
      tags: ["Landing Page", "Conversão", "Copy"],
      icon: "IconRocket",
    },
    {
      name: "SL Trades Importação",
      url: "https://sl-trades-importaca-0.vercel.app",
      description:
        "Site corporativo para empresa de importação com arquitetura de informação estratégica e captação B2B.",
      tags: ["Corporativo", "Importação", "B2B"],
      icon: "IconBolt",
    },
  ],
  values: [
    {
      icon: "IconBrandFigma",
      title: "Design estratégico",
      description:
        "Cada pixel tem propósito. Identidade visual alinhada à sua marca e à intenção de conversão.",
    },
    {
      icon: "IconBolt",
      title: "Performance técnica",
      description:
        "Código limpo, carregamento rápido e otimizado para SEO desde a estrutura — sem atalhos.",
    },
    {
      icon: "IconDeviceMobile",
      title: "100% responsivo",
      description:
        "Experiência impecável em qualquer tela — do desktop ao celular, sem comprometer conversão.",
    },
    {
      icon: "IconChartLine",
      title: "Foco em resultado",
      description:
        "Estruturado para alimentar campanhas de tráfego pago, SEO e estratégias de e-commerce.",
    },
    {
      icon: "IconShieldCheck",
      title: "Discovery incluído",
      description:
        "Todo projeto começa com planejamento estratégico — entendemos o negócio antes de criar.",
    },
    {
      icon: "IconHeadset",
      title: "Suporte dedicado",
      description:
        "Cultura de servir: acompanhamento próximo, revisões incluídas e entrega com excelência.",
    },
  ],
  pricing: {
    label: "Investimento total",
    amount: "R$ 4.997",
    installments: "4× R$ 1.249,25",
    note: "sem juros no cartão de crédito",
  },
  cta: {
    title: "Seu próximo site começa aqui",
    subtitle:
      "Investimento único. Site profissional, estratégico e pronto para converter — entregue pela equipe que já transformou a presença digital de dezenas de marcas.",
    actions: [
      {
        type: "whatsapp",
        label: "Quero meu site agora",
        phone: "5511999999999",
        message:
          "Tenho interesse no serviço de website da Convertido. Quero avançar com a proposta.",
      },
    ],
  },
};

// ─── E-commerce ──────────────────────────────────────────────────────────

const ecommerceContent: EcommerceContent = {
  hero: {
    tag: "Implantação de Loja Virtual",
    title: "Do ERP à vitrine digital em 40 dias",
    subtitle:
      "Sprint estruturado para colocar a sua operação no e-commerce com integração nativa ao ERP e loja pronta para escalar.",
  },
  sprintDays: 40,
  platform: "Tray ou Shopify",
  erp: "Microuniverso",
  chips: [
    "Sprint 40 dias",
    "ERP Microuniverso",
    "Tray ou Shopify",
    "Go-live garantido",
    "15 dias de suporte",
  ],
  pricing: {
    label: "Investimento total",
    amount: "R$ 14.997,00",
    installments: "em 4× de R$ 3.749,25 sem juros",
  },
  fourS: [
    {
      title: "Streaming",
      description:
        "Vídeos e tutoriais de produto que constroem confiança antes da compra.",
    },
    {
      title: "Scrolling",
      description:
        "Conteúdo para redes sociais que gera tráfego orgânico qualificado.",
    },
    {
      title: "Search",
      description:
        "SEO e Google Shopping para capturar quem busca seus produtos.",
    },
    {
      title: "Shopping",
      description:
        "A loja como hub de conversão — checkout fluido e ERP sincronizado.",
    },
  ],
  roadmap: [
    {
      title: "Integração ERP Microuniverso",
      duration: "Dias 1–10",
      items: [
        "Validação da API",
        "Mapeamento de campos",
        "Sandbox",
        "Sincronização bidirecional testada",
      ],
    },
    {
      title: "Infraestrutura e identidade visual",
      duration: "Dias 11–15",
      items: [
        "Domínio e SSL",
        "Tema base",
        "Cores, logo e menus",
        "E-mails transacionais",
      ],
    },
    {
      title: "Desenvolvimento da loja",
      duration: "Dias 16–28",
      items: [
        "Importação de catálogo",
        "Frete, pagamento, checkout",
        "Identidade visual",
        "SEO on-page",
        "GA4",
      ],
    },
    {
      title: "Testes & Homologação",
      duration: "Dias 29–36",
      items: [
        "Pedido ponta a ponta",
        "Sync de estoque",
        "Responsivo",
        "Core Web Vitals",
      ],
    },
    {
      title: "Go-Live & Entrega",
      duration: "Dias 37–40",
      items: [
        "Publicação",
        "Treinamento da equipe (4h)",
        "Documentação",
        "Suporte 15 dias",
      ],
    },
  ],
  scopeIncluded: [
    { text: "Validação e Integração ERP Microuniverso" },
    { text: "Implantação da plataforma (Tray ou Shopify)" },
    { text: "Configuração de checkout, frete e meios de pagamento" },
    { text: "Importação e estruturação do catálogo de produtos" },
    { text: "Identidade visual e UI da loja" },
    { text: "SEO on-page estrutural" },
    { text: "Testes, homologação e go-live" },
    { text: "Treinamento da equipe (até 4 horas)" },
    { text: "Suporte técnico pós-entrega (15 dias corridos)" },
  ],
  scopeExcluded: [
    "Licença mensal da plataforma (pago diretamente pelo cliente)",
    "Produção fotográfica ou filmagem dos produtos",
    "Criação ou redesign de logotipo / identidade visual",
    "Investimento em mídia paga (tráfego pago)",
  ],
  paymentConditions: [
    {
      label: "1ª parcela",
      amount: "R$ 3.749,25",
      note: "Na assinatura do contrato",
    },
    {
      label: "2ª parcela",
      amount: "R$ 3.749,25",
      note: "Início da Fase 3 (Dia 16)",
    },
    {
      label: "3ª parcela",
      amount: "R$ 3.749,25",
      note: "Aprovação da homologação (Dia 36)",
    },
    {
      label: "4ª parcela",
      amount: "R$ 3.749,25",
      note: "30 dias após o go-live",
    },
  ],
  cta: {
    title: "Pronto para começar?",
    subtitle:
      "Ao aceitar, você confirma que leu e concorda com o escopo, valor e condições desta proposta.",
    actions: [{ type: "accept", label: "Aceitar proposta" }],
  },
};

// ─── Tráfego Pago ────────────────────────────────────────────────────────

const trafegoContent: TrafegoContent = {
  hero: {
    tag: "Performance Marketing · Tráfego Pago",
    title: "Gestão de Performance & Tráfego Pago",
    subtitle:
      "Operação completa de mídia paga focada em escala lucrativa. Estratégia, execução, criativos e otimização diária — com acompanhamento ao vivo em dashboard dedicado.",
  },
  serviceCards: [
    {
      icon: "IconTargetArrow",
      title: "Estratégia & Planejamento",
      description:
        "Auditoria de canais, mapeamento de funil, definição de KPIs, modelagem de público e roadmap mensal de testes.",
    },
    {
      icon: "IconAd",
      title: "Mídia Paga Multi-canal",
      description:
        "Gestão de campanhas em Meta, Google (Search, PMax, YouTube), TikTok e LinkedIn — com orçamento dinâmico por canal.",
    },
    {
      icon: "IconPalette",
      title: "Criativos de Performance",
      description:
        "Produção e iteração semanal de criativos estáticos e em vídeo, baseados em dados e estudos de concorrência.",
    },
    {
      icon: "IconChartDots",
      title: "Tracking & Atribuição",
      description:
        "Implementação de GA4, GTM, Meta CAPI, Pixel e UTMs padronizados para leitura confiável de ROAS e CAC.",
    },
    {
      icon: "IconAdjustmentsHorizontal",
      title: "Otimização Diária",
      description:
        "Ajustes finos de lances, públicos, criativos e páginas. Reuniões quinzenais e relatório executivo mensal.",
    },
    {
      icon: "IconArrowsExchange",
      title: "CRO & Landing Pages",
      description:
        "Análise de conversão e recomendações de testes A/B nas páginas de destino para maximizar o tráfego.",
    },
  ],
  included: [
    { text: "Reunião semanal de alinhamento estratégico" },
    { text: "Relatório executivo mensal com leitura de resultados" },
    { text: "Acesso 24/7 ao dashboard em tempo real" },
    { text: "Canal direto via WhatsApp com o time" },
    { text: "Briefings de criativos quinzenais" },
    { text: "Plano de mídia mensal documentado" },
  ],
  dashboard: {
    investment: "R$ 48,2k",
    revenue: "R$ 214k",
    roas: "4,44x",
    cac: "R$ 87",
    weeklyBars: [
      { week: "S1", value: 9 },
      { week: "S2", value: 12 },
      { week: "S3", value: 11 },
      { week: "S4", value: 15 },
      { week: "S5", value: 14 },
      { week: "S6", value: 18 },
      { week: "S7", value: 21 },
      { week: "S8", value: 19 },
      { week: "S9", value: 24 },
      { week: "S10", value: 27 },
      { week: "S11", value: 31 },
      { week: "S12", value: 34 },
    ],
    channels: [
      { name: "Meta Ads", share: 78, value: "R$ 26,4k · ROAS 4,8x" },
      { name: "Google Ads", share: 54, value: "R$ 18,1k · ROAS 4,2x" },
      { name: "TikTok Ads", share: 22, value: "R$ 3,7k · ROAS 3,1x" },
    ],
  },
  pricingModel: [
    {
      title: "Fase 1 · Até R$ 30.000/mês",
      value: "R$ 2.997 /mês",
      description:
        "Mensalidade fixa enquanto o faturamento atribuído à mídia paga estiver até R$ 30.000. Inclui gestão multi-canal, dashboard, reuniões semanais e criativos.",
    },
    {
      title: "Fase 2 · Acima de R$ 30.000/mês",
      value: "10% sobre o faturamento",
      description:
        "Ao ultrapassar R$ 30.000 de faturamento mensal atribuído à mídia, a remuneração passa a 10% sobre o faturamento gerado. Ex.: faturou R$ 80.000 → investimento de R$ 8.000.",
    },
  ],
  schedule: [
    {
      title: "Onboarding",
      duration: "Semana 1",
      items: ["Acessos", "Auditoria", "Planejamento estratégico"],
    },
    {
      title: "Setup técnico",
      duration: "Semana 2",
      items: ["Tracking", "Dashboard", "Estrutura de campanhas"],
    },
    {
      title: "Go-live",
      duration: "Semana 3",
      items: ["Primeiras campanhas no ar", "Criativos iniciais"],
    },
    {
      title: "Escala",
      duration: "Semana 4+",
      items: ["Otimização contínua", "Expansão de canais"],
    },
  ],
  cta: {
    title: "Pronto para escalar com previsibilidade?",
    subtitle:
      "Aceite esta proposta e iniciamos o onboarding em até 48h.",
    actions: [
      { type: "accept", label: "Aceitar proposta" },
      {
        type: "link",
        label: "Agendar conversa",
        url: "https://cal.com/convertido",
      },
    ],
  },
};

// ─── Campanha de Marketing ───────────────────────────────────────────────

const campanhaContent: CampanhaContent = {
  hero: {
    tag: "Campanha Integrada",
    title: "Uma campanha pensada para gerar demanda",
    subtitle:
      "Do conceito à mensuração — planejamento estratégico, identidade própria e distribuição multicanal em torno de um único objetivo de negócio.",
  },
  pillars: [
    {
      icon: "IconBulb",
      title: "Planejamento estratégico",
      description:
        "Definição de objetivo, público, mensagem central e KPIs antes de qualquer peça ser produzida.",
    },
    {
      icon: "IconPalette",
      title: "Identidade da campanha",
      description:
        "Conceito criativo, naming, paleta e sistema visual exclusivos para a campanha.",
    },
    {
      icon: "IconPencil",
      title: "Produção de conteúdo",
      description:
        "Criativos estáticos, vídeos curtos e textos adaptados a cada canal de distribuição.",
    },
    {
      icon: "IconBroadcast",
      title: "Distribuição multicanal",
      description:
        "Orquestração entre redes sociais, e-mail, mídia paga e parcerias para máxima cobertura.",
    },
    {
      icon: "IconLayoutBoardSplit",
      title: "Landing page / hotsite",
      description:
        "Página dedicada da campanha, otimizada para conversão e captura de leads.",
    },
    {
      icon: "IconChartHistogram",
      title: "Mensuração e relatórios",
      description:
        "Acompanhamento de resultados com relatório consolidado e recomendações.",
    },
  ],
  schedule: [
    {
      title: "Estratégia e conceito",
      duration: "0–30 dias",
      items: [
        "Briefing e imersão",
        "Conceito criativo",
        "Plano de mídia e canais",
      ],
    },
    {
      title: "Produção e lançamento",
      duration: "30–60 dias",
      items: [
        "Produção de conteúdo",
        "Landing page",
        "Go-live da campanha",
      ],
    },
    {
      title: "Otimização e relatório",
      duration: "60–90 dias",
      items: [
        "Otimização contínua",
        "Testes A/B",
        "Relatório final de resultados",
      ],
    },
  ],
  deliverables: [
    { text: "Planejamento estratégico completo da campanha" },
    { text: "Conceito criativo e identidade visual da campanha" },
    { text: "Pacote de criativos para redes sociais (estáticos e vídeo)" },
    { text: "Landing page / hotsite dedicado" },
    { text: "Gestão da campanha em mídia paga" },
    { text: "Disparo de e-mail marketing" },
    { text: "Relatório consolidado de resultados" },
  ],
  excluded: [
    "Verba de mídia paga (investimento nas plataformas)",
    "Produção audiovisual com equipe externa (filmagem profissional)",
    "Cachê de influenciadores ou parcerias",
    "Brindes e materiais impressos",
  ],
  investment: {
    managementFee: {
      label: "Gestão da campanha",
      amount: "R$ 6.900",
      installments: "por mês · contrato mínimo de 3 meses",
      note: "Estratégia, gestão, distribuição e relatórios.",
    },
    productionFee: {
      label: "Produção de conteúdo (opcional)",
      amount: "R$ 3.500",
      installments: "por mês",
      note: "Pacote mensal de criativos estáticos e vídeos curtos.",
    },
    mediaBudgetNote:
      "A verba investida nas plataformas de anúncio (Meta, Google, etc.) é definida em conjunto e paga diretamente pelo cliente — não está inclusa nos valores acima.",
  },
  cta: {
    title: "Vamos colocar sua campanha no ar?",
    subtitle:
      "Aceite a proposta e agendamos o kickoff para alinhar os próximos passos.",
    actions: [
      { type: "accept", label: "Aceitar proposta" },
      {
        type: "whatsapp",
        label: "Falar com a equipe",
        phone: "5511999999999",
        message: "Quero conversar sobre a proposta de campanha.",
      },
    ],
  },
};

// ─── Registro ────────────────────────────────────────────────────────────

const MOCK_CONTENT: ProposalContentByType = {
  website: websiteContent,
  ecommerce: ecommerceContent,
  trafego: trafegoContent,
  campanha: campanhaContent,
};

const MOCK_TITLES: Record<ProposalType, string> = {
  website: "Proposta de Website",
  ecommerce: "Proposta de E-commerce",
  trafego: "Proposta de Tráfego Pago",
  campanha: "Proposta de Campanha de Marketing",
};

function mockClient(): Client {
  const now = new Date();
  return {
    id: "00000000-0000-0000-0000-000000000000",
    companyName: "Cliente Exemplo Ltda.",
    contactName: "Felipe Batista",
    contactRole: "Diretor Comercial",
    contactEmail: "felipe@clienteexemplo.com.br",
    contactPhone: "(11) 99999-9999",
    logoUrl: null,
    primaryColor: "#6C4FE8",
    accentColor: "#C05BCC",
    themeMode: "dark",
    createdBy: null,
    createdAt: now,
    updatedAt: now,
  };
}

/** Retorna um par client/proposal de exemplo para o tipo informado. */
export function getMockProposal(type: ProposalType): {
  client: Client;
  proposal: Proposal;
} {
  const now = new Date();
  const validUntil = new Date(now);
  validUntil.setDate(validUntil.getDate() + 15);

  const proposal: Proposal = {
    id: "00000000-0000-0000-0000-000000000001",
    clientId: "00000000-0000-0000-0000-000000000000",
    type,
    slug: `preview-${type}`,
    title: MOCK_TITLES[type],
    status: "draft",
    content: MOCK_CONTENT[type],
    validUntil,
    sentAt: null,
    firstViewedAt: null,
    acceptedAt: null,
    createdBy: null,
    createdAt: now,
    updatedAt: now,
  };

  return { client: mockClient(), proposal };
}
