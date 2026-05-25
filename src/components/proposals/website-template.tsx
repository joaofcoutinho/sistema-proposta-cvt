import type { PortfolioProject, WebsiteContent } from "@/types/proposal-content";

import { ProposalCta } from "./shared/cta-block";
import { ProposalFooter } from "./shared/footer";
import { ProposalHero } from "./shared/hero";
import { IconCardGrid } from "./shared/icon-card-grid";
import { PricePill } from "./shared/pricing-box";
import { ProposalIcon } from "./shared/proposal-icon";
import { SectionHeading } from "./shared/section-heading";
import { ProposalTopbar } from "./shared/topbar";
import type { ProposalTemplateProps } from "./template-props";

const TAG_STYLES = [
  "border-primary/25 bg-primary/12 text-primary-soft",
  "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  "border-amber-400/20 bg-amber-400/10 text-amber-300",
  "border-accent/25 bg-accent/12 text-accent-soft",
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Card de projeto com mock de navegador. */
function PortfolioCard({ project }: { project: PortfolioProject }) {
  const cleanUrl = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-border-strong">
      {/* barra do navegador */}
      <div className="flex items-center gap-2 bg-background/60 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 truncate rounded border border-foreground/10 bg-foreground/5 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
          {cleanUrl}
        </div>
      </div>

      {/* screenshot mock */}
      <div className="flex h-40 flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface to-surface-2">
        <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-base font-semibold text-primary-foreground">
          {initials(project.name)}
        </div>
        <span className="font-mono text-xs text-muted-foreground/60">
          {cleanUrl}
        </span>
      </div>

      {/* corpo */}
      <div className="p-4">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag, index) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                TAG_STYLES[index % TAG_STYLES.length]
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-primary/30 px-2.5 py-1.5 text-[11px] font-semibold text-primary-soft transition-colors hover:bg-primary/12"
        >
          <ProposalIcon name="IconExternalLink" className="size-3.5" />
          Visitar site
        </a>
      </div>
    </article>
  );
}

export function WebsiteTemplate({ client, proposal }: ProposalTemplateProps) {
  const content = proposal.content as WebsiteContent;

  return (
    <div className="min-h-svh">
      <ProposalTopbar
        logoUrl={client.logoUrl}
        companyName={client.companyName}
        badge="Portfólio · Websites"
      />

      <ProposalHero
        tag={content.hero.tag}
        tagIcon="IconWorld"
        title={content.hero.title}
        subtitle={content.hero.subtitle}
      >
        <PricePill text={content.pricePill} />
      </ProposalHero>

      <div className="mx-6 h-px bg-border" />

      {/* Portfólio */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <SectionHeading
          label="Nosso portfólio"
          title="Projetos entregues"
          description="Cada projeto nasce de um Discovery estratégico. Conheça cases reais de clientes que confiaram na Convertido para construir sua presença digital."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.portfolio.map((project) => (
            <PortfolioCard key={project.url} project={project} />
          ))}
        </div>
      </section>

      <div className="mx-6 h-px bg-border" />

      {/* Valores */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <SectionHeading
          label="Por que a Convertido"
          title="Tecnologia + criatividade integradas"
          description="Um site Convertido não é só bonito — ele é construído para crescer junto com o seu negócio."
        />
        <div className="mt-8">
          <IconCardGrid cards={content.values} columns={3} />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pt-4 pb-12">
        <ProposalCta
          content={content.cta}
          badge="Oferta especial"
          pricing={content.pricing}
        />
      </section>

      <ProposalFooter />
    </div>
  );
}
