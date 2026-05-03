import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Phone, Tag, Pencil } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { getService, useServices } from "@/lib/services-store";

export const Route = createFileRoute("/service/$id")({
  head: () => ({
    meta: [
      { title: "Detalhes do Serviço — Serviços do Bairro" },
      { name: "description", content: "Veja os detalhes deste serviço comunitário." },
    ],
  }),
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <AppHeader title="Não encontrado" showBack />
      <div className="mx-auto max-w-xl px-5 py-12 text-center">
        <p className="text-lg text-foreground">Este serviço não foi encontrado.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  ),
});

function ServiceDetail() {
  const { id } = Route.useParams();
  useServices();
  const service = getService(id);

  if (!service) {
    throw notFound();
  }

  return (
    <div className="min-h-screen pb-12">
      <AppHeader title="Detalhes do Serviço" showBack />

      <main className="mx-auto max-w-xl px-5 pt-6">
        <div
          className="rounded-3xl bg-card p-6"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl text-3xl font-bold text-primary-foreground"
              style={{ background: "var(--gradient-hero)" }}
            >
              {service.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-bold leading-tight text-foreground">
                {service.name}
              </h2>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                <Tag className="h-3.5 w-3.5" />
                {service.type}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Sobre
            </h3>
            <p className="text-base leading-relaxed text-foreground">
              {service.description}
            </p>
          </div>
        </div>

        <a
          href={`tel:${service.phone.replace(/[^\d+]/g, "")}`}
          className="mt-6 flex h-16 w-full items-center justify-center gap-3 rounded-2xl text-lg font-bold text-primary-foreground transition hover:opacity-95 active:scale-[0.99]"
          style={{
            background: "var(--gradient-hero)",
            boxShadow: "var(--shadow-elevated)",
          }}
        >
          <Phone className="h-6 w-6" strokeWidth={2.5} />
          Ligar: {service.phone}
        </a>

        <Link
          to="/service/$id/edit"
          params={{ id: service.id }}
          className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-card text-base font-semibold text-foreground transition hover:bg-secondary"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <Pencil className="h-5 w-5" />
          Editar ou excluir
        </Link>

        <Link
          to="/"
          className="mt-3 flex h-14 w-full items-center justify-center rounded-2xl bg-card text-base font-semibold text-foreground transition hover:bg-secondary"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          Voltar para todos os serviços
        </Link>
      </main>
    </div>
  );
}
