import { Link } from "@tanstack/react-router";
import { Phone, ChevronRight } from "lucide-react";
import type { Service } from "@/lib/services-store";

const TYPE_EMOJI: Record<string, string> = {
  Limpeza: "🧹",
  Encanamento: "🔧",
  Elétrica: "⚡",
  Aulas: "📚",
  Babá: "👶",
  Transporte: "🚗",
  Beleza: "✂️",
  Reformas: "🔨",
  Pedreiro: "🧱",
  Pintor: "🖌️",
  Outros: "💡",
};

export function ServiceCard({ service }: { service: Service }) {
  const emoji = TYPE_EMOJI[service.type] ?? "🏠";

  return (
    <Link
      to="/service/$id"
      params={{ id: service.id }}
      className="group block rounded-2xl bg-card p-5 transition hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-2xl">
          {emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-lg font-bold text-foreground">
              {service.name}
            </h3>
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
          </div>
          <span className="mt-1 inline-block rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-secondary-foreground">
            {service.type}
          </span>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{service.phone}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
