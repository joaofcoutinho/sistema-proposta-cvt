import type { CtaAction, CtaBlock, PricingContent } from "@/types/proposal-content";

import { cn } from "@/lib/utils";

import { ProposalIcon } from "./proposal-icon";

/** Resolve um CtaAction para href + atributos de link. */
function resolveAction(action: CtaAction): {
  href: string;
  external: boolean;
} {
  switch (action.type) {
    case "link":
      return { href: action.url, external: true };
    case "whatsapp": {
      const phone = action.phone.replace(/\D/g, "");
      const text = action.message
        ? `?text=${encodeURIComponent(action.message)}`
        : "";
      return { href: `https://wa.me/${phone}${text}`, external: true };
    }
    case "accept":
    default:
      // Âncora para o formulário de aceite na própria página.
      return { href: "#aceite", external: false };
  }
}

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 active:translate-y-px";

interface CtaActionsProps {
  actions: CtaAction[];
  className?: string;
}

/** Renderiza a lista de botões de CTA (o primeiro recebe destaque). */
export function CtaActions({ actions, className }: CtaActionsProps) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-3", className)}>
      {actions.map((action, index) => {
        const { href, external } = resolveAction(action);
        const primary = index === 0;
        const icon =
          action.type === "whatsapp"
            ? "IconBrandWhatsapp"
            : action.type === "accept"
              ? "IconRocket"
              : "IconExternalLink";

        return (
          <a
            key={action.label}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={cn(
              baseButton,
              primary
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                : "border border-border-strong bg-surface text-foreground hover:bg-surface-2",
            )}
          >
            <ProposalIcon name={icon} className="size-4" />
            {action.label}
          </a>
        );
      })}
    </div>
  );
}

interface ProposalCtaProps {
  content: CtaBlock;
  badge?: string;
  /** Preço exibido em destaque acima dos botões */
  pricing?: PricingContent;
}

/** Bloco de chamada para ação no fim da proposta. */
export function ProposalCta({ content, badge, pricing }: ProposalCtaProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface px-6 py-10 text-center sm:px-12 sm:py-14">
      {/* glow sutil no topo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-28 mx-auto h-56 w-[420px] max-w-[80%] rounded-full bg-primary/20 blur-[100px]"
      />

      <div className="relative mx-auto flex max-w-xl flex-col items-center">
        {badge ? (
          <span className="eyebrow mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-emerald-300">
            <ProposalIcon name="IconSparkles" className="size-3.5" />
            {badge}
          </span>
        ) : null}

        <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
          {content.title}
        </h2>
        {content.subtitle ? (
          <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
            {content.subtitle}
          </p>
        ) : null}

        {pricing ? (
          <div className="my-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <div className="text-left">
              <p className="eyebrow text-muted-foreground">
                {pricing.label ?? "Investimento total"}
              </p>
              <p className="mt-1 font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {pricing.amount}
              </p>
            </div>
            {pricing.installments ? (
              <>
                <span className="hidden h-12 w-px bg-border-strong sm:block" />
                <div className="text-left">
                  <p className="eyebrow text-muted-foreground">
                    Parcelamento
                  </p>
                  <p className="mt-1 font-mono text-xl font-semibold text-primary-soft">
                    {pricing.installments}
                  </p>
                  {pricing.note ? (
                    <p className="text-xs text-muted-foreground">
                      {pricing.note}
                    </p>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        ) : null}

        <CtaActions actions={content.actions} className={pricing ? "" : "mt-7"} />
      </div>
    </div>
  );
}
