import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Numeração opcional exibida antes do label (ex.: "01") */
  index?: string;
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Cabeçalho de seção: label (eyebrow) + título + descrição. */
export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto text-center",
        "max-w-2xl",
        className,
      )}
    >
      {label ? (
        <p
          className={cn(
            "eyebrow mb-2.5 flex items-center gap-2 text-primary-soft",
            align === "center" && "justify-center",
          )}
        >
          {index ? (
            <span className="text-foreground/35">{index}</span>
          ) : null}
          {index ? (
            <span aria-hidden className="h-3 w-px bg-border-strong" />
          ) : null}
          {label}
        </p>
      ) : null}
      <h2 className="text-xl font-semibold tracking-tight text-balance text-foreground sm:text-[1.625rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-2.5 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-[0.9375rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
