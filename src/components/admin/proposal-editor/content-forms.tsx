"use client";

import type { ProposalType } from "@/types/proposal-content";

import {
  ArrayField,
  IconField,
  TextAreaField,
  TextField,
} from "./fields";
import { FieldCard } from "./fields";
import {
  ChecklistField,
  CtaFields,
  HeroFields,
  IconCardsField,
  NumberField,
  PricingFields,
  RoadmapField,
  StringListField,
} from "./shared-fields";

// ─── Website ─────────────────────────────────────────────────────────────

function WebsiteContentForm() {
  return (
    <>
      <FieldCard title="Hero">
        <HeroFields name="content.hero" />
        <TextField name="content.pricePill" label="Pílula de preço (hero)" />
      </FieldCard>

      <FieldCard
        title="Portfólio"
        description="Projetos exibidos como cards com mock de navegador."
      >
        <ArrayField
          name="content.portfolio"
          label="Projetos"
          itemNoun="Projeto"
          addLabel="Adicionar projeto"
          newItem={() => ({
            name: "",
            url: "https://",
            description: "",
            tags: [],
            icon: "IconWorld",
          })}
          renderItem={(path) => (
            <div className="flex flex-col gap-3">
              <TextField name={`${path}.name`} label="Nome" />
              <TextField name={`${path}.url`} label="URL" />
              <TextAreaField
                name={`${path}.description`}
                label="Descrição"
                rows={2}
              />
              <StringListField name={`${path}.tags`} label="Tags" />
              <IconField name={`${path}.icon`} label="Ícone" />
            </div>
          )}
        />
      </FieldCard>

      <FieldCard title="Valores" description="Grid de 6 cards.">
        <IconCardsField
          name="content.values"
          label="Cards de valor"
          addLabel="Adicionar card"
        />
      </FieldCard>

      <FieldCard title="Preço (CTA)">
        <PricingFields name="content.pricing" />
      </FieldCard>

      <FieldCard title="Chamada para ação">
        <CtaFields name="content.cta" />
      </FieldCard>
    </>
  );
}

// ─── E-commerce ──────────────────────────────────────────────────────────

function EcommerceContentForm() {
  return (
    <>
      <FieldCard title="Hero">
        <HeroFields name="content.hero" />
      </FieldCard>

      <FieldCard title="Detalhes do projeto">
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField name="content.sprintDays" label="Dias de sprint" />
          <TextField name="content.platform" label="Plataforma" />
          <TextField name="content.erp" label="ERP" />
        </div>
        <StringListField name="content.chips" label="Chips de destaque" />
      </FieldCard>

      <FieldCard title="Preço">
        <PricingFields name="content.pricing" />
      </FieldCard>

      <FieldCard title="Metodologia 4S">
        <ArrayField
          name="content.fourS"
          label="Os 4S"
          itemNoun="S"
          addLabel="Adicionar item"
          newItem={() => ({ title: "", description: "" })}
          renderItem={(path) => (
            <div className="flex flex-col gap-3">
              <TextField name={`${path}.title`} label="Título" />
              <TextAreaField
                name={`${path}.description`}
                label="Descrição"
                rows={2}
              />
            </div>
          )}
        />
      </FieldCard>

      <FieldCard title="Roadmap">
        <RoadmapField
          name="content.roadmap"
          label="Fases do roadmap"
          addLabel="Adicionar fase"
        />
      </FieldCard>

      <FieldCard title="Escopo">
        <ChecklistField
          name="content.scopeIncluded"
          label="Itens inclusos"
          addLabel="Adicionar item"
        />
        <StringListField
          name="content.scopeExcluded"
          label="Não incluído no escopo"
        />
      </FieldCard>

      <FieldCard title="Condições de pagamento">
        <ArrayField
          name="content.paymentConditions"
          label="Parcelas"
          itemNoun="Parcela"
          addLabel="Adicionar parcela"
          newItem={() => ({ label: "", amount: "", note: "" })}
          renderItem={(path) => (
            <div className="flex flex-col gap-3">
              <TextField name={`${path}.label`} label="Rótulo" />
              <TextField name={`${path}.amount`} label="Valor" />
              <TextField name={`${path}.note`} label="Quando" />
            </div>
          )}
        />
      </FieldCard>

      <FieldCard
        title="Chamada para ação"
        description="O título e o subtítulo aparecem acima do formulário de aceite."
      >
        <CtaFields name="content.cta" />
      </FieldCard>
    </>
  );
}

// ─── Tráfego Pago ────────────────────────────────────────────────────────

function TrafegoContentForm() {
  return (
    <>
      <FieldCard title="Hero">
        <HeroFields name="content.hero" />
      </FieldCard>

      <FieldCard title="Cards de serviço" description="Grid de 6 cards.">
        <IconCardsField
          name="content.serviceCards"
          label="Cards"
          addLabel="Adicionar card"
        />
      </FieldCard>

      <FieldCard title="O que está incluso">
        <ChecklistField
          name="content.included"
          label="Itens inclusos"
          addLabel="Adicionar item"
        />
      </FieldCard>

      <FieldCard title="Dashboard">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField name="content.dashboard.investment" label="Investimento" />
          <TextField name="content.dashboard.revenue" label="Receita" />
          <TextField name="content.dashboard.roas" label="ROAS" />
          <TextField name="content.dashboard.cac" label="CAC" />
        </div>
        <ArrayField
          name="content.dashboard.weeklyBars"
          label="Barras semanais"
          itemNoun="Semana"
          addLabel="Adicionar semana"
          newItem={() => ({ week: "", value: 0 })}
          renderItem={(path) => (
            <div className="grid grid-cols-2 gap-3">
              <TextField name={`${path}.week`} label="Rótulo" />
              <NumberField name={`${path}.value`} label="Valor" />
            </div>
          )}
        />
        <ArrayField
          name="content.dashboard.channels"
          label="Canais"
          itemNoun="Canal"
          addLabel="Adicionar canal"
          newItem={() => ({ name: "", share: 50, value: "" })}
          renderItem={(path) => (
            <div className="flex flex-col gap-3">
              <TextField name={`${path}.name`} label="Nome do canal" />
              <NumberField name={`${path}.share`} label="Proporção (0–100)" />
              <TextField name={`${path}.value`} label="Valor exibido" />
            </div>
          )}
        />
      </FieldCard>

      <FieldCard title="Modelo de investimento">
        <ArrayField
          name="content.pricingModel"
          label="Fases de investimento"
          itemNoun="Fase"
          addLabel="Adicionar fase"
          newItem={() => ({ title: "", value: "", description: "" })}
          renderItem={(path) => (
            <div className="flex flex-col gap-3">
              <TextField name={`${path}.title`} label="Título" />
              <TextField name={`${path}.value`} label="Valor" />
              <TextAreaField
                name={`${path}.description`}
                label="Descrição"
                rows={2}
              />
            </div>
          )}
        />
      </FieldCard>

      <FieldCard title="Cronograma">
        <RoadmapField
          name="content.schedule"
          label="Semanas"
          addLabel="Adicionar semana"
        />
      </FieldCard>

      <FieldCard title="Chamada para ação">
        <CtaFields name="content.cta" />
      </FieldCard>
    </>
  );
}

// ─── Campanha ────────────────────────────────────────────────────────────

function CampanhaContentForm() {
  return (
    <>
      <FieldCard title="Hero">
        <HeroFields name="content.hero" />
      </FieldCard>

      <FieldCard title="Pilares" description="Grid de 6 cards.">
        <IconCardsField
          name="content.pillars"
          label="Pilares"
          addLabel="Adicionar pilar"
        />
      </FieldCard>

      <FieldCard title="Cronograma">
        <RoadmapField
          name="content.schedule"
          label="Fases (30/60/90 dias)"
          addLabel="Adicionar fase"
        />
      </FieldCard>

      <FieldCard title="Entregas">
        <ChecklistField
          name="content.deliverables"
          label="Entregas inclusas"
          addLabel="Adicionar entrega"
        />
        <StringListField name="content.excluded" label="Não incluído" />
      </FieldCard>

      <FieldCard title="Investimento">
        <p className="text-xs font-medium text-muted-foreground">
          Fee de gestão
        </p>
        <PricingFields name="content.investment.managementFee" />
        <p className="text-xs font-medium text-muted-foreground">
          Fee de produção (opcional)
        </p>
        <PricingFields name="content.investment.productionFee" />
        <TextAreaField
          name="content.investment.mediaBudgetNote"
          label="Nota sobre a verba de mídia"
        />
      </FieldCard>

      <FieldCard title="Chamada para ação">
        <CtaFields name="content.cta" />
      </FieldCard>
    </>
  );
}

export function ContentFormByType({ type }: { type: ProposalType }) {
  switch (type) {
    case "website":
      return <WebsiteContentForm />;
    case "ecommerce":
      return <EcommerceContentForm />;
    case "trafego":
      return <TrafegoContentForm />;
    case "campanha":
      return <CampanhaContentForm />;
  }
}
