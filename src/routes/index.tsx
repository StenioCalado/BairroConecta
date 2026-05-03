import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, SearchX } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICE_TYPES, useServices, type ServiceType } from "@/lib/services-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Serviços do Bairro — Encontre e Ofereça Ajuda" },
      {
        name: "description",
        content:
          "Diretório comunitário para encontrar e oferecer serviços locais como limpeza, aulas, encanamento e muito mais.",
      },
      { property: "og:title", content: "Serviços do Bairro" },
      {
        property: "og:description",
        content: "Encontre e ofereça serviços na sua comunidade.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { services, ready } = useServices();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"Todos" | ServiceType>("Todos");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchType = filter === "Todos" || s.type === filter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [services, query, filter]);

  return (
    <div className="min-h-screen pb-32">
      <AppHeader />

      <main className="mx-auto max-w-xl px-5 pt-6">
        {/* Busca */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar serviços..."
            aria-label="Buscar serviços"
            className="h-14 w-full rounded-2xl border-2 border-transparent bg-card pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            style={{ boxShadow: "var(--shadow-soft)" }}
          />
        </div>

        {/* Filtros */}
        <div className="mt-5 -mx-5 overflow-x-auto px-5 pb-1">
          <div className="flex gap-2">
            {(["Todos", ...SERVICE_TYPES] as const).map((type) => {
              const active = filter === type;
              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-foreground hover:bg-secondary"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista */}
        <section className="mt-6">
          <h2 className="mb-3 px-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "serviço encontrado" : "serviços encontrados"}
          </h2>

          {!ready ? null : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center rounded-2xl bg-card px-6 py-12 text-center"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <SearchX className="mb-3 h-12 w-12 text-muted-foreground" />
              <p className="text-base font-bold text-foreground">
                Nenhum serviço encontrado
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tente outra busca ou adicione um novo serviço.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Botão flutuante */}
      <Link
        to="/add"
        className="fixed bottom-6 left-1/2 z-30 flex h-16 -translate-x-1/2 items-center gap-3 rounded-full px-7 text-lg font-bold text-primary-foreground transition hover:scale-105"
        style={{
          background: "var(--gradient-hero)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        <Plus className="h-7 w-7" strokeWidth={2.5} />
        Anunciar Serviço
      </Link>
    </div>
  );
}
