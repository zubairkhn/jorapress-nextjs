import { plans } from "@/lib/content";
import { Icon } from "./Icon";
import { Button } from "./ui";

export function PricingCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`card relative flex flex-col p-7 ${
            plan.featured
              ? "border-cyan-glow/40 shadow-glow"
              : "card-hover"
          }`}
        >
          {plan.featured && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-glow px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-950">
              Most popular
            </span>
          )}
          <h3 className="text-lg font-semibold text-fg">{plan.name}</h3>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight text-fg">{plan.price}</span>
            {plan.period && <span className="text-sm text-fg-dim">{plan.period}</span>}
          </div>
          <p className="mt-3 min-h-[3rem] text-sm leading-relaxed text-fg-muted">{plan.blurb}</p>

          <Button
            href={plan.href}
            variant={plan.featured ? "primary" : "outline"}
            className="mt-5 w-full"
          >
            {plan.cta}
          </Button>

          <ul className="mt-7 space-y-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-fg-muted">
                <Icon
                  name="check"
                  className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow"
                  strokeWidth={2.2}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
