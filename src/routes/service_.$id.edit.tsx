import { createFileRoute, useNavigate, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import {
  getService,
  updateService,
  deleteService,
  SERVICE_TYPES,
  type ServiceType,
} from "@/lib/services-store";

export const Route = createFileRoute("/service_/$id/edit")({
  head: () => ({
    meta: [
      { title: "Editar Serviço — Serviços do Bairro" },
      { name: "description", content: "Atualize ou remova um serviço comunitário." },
    ],
  }),
  component: EditPage,
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

function EditPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const existing = getService(id);
  if (!existing) throw notFound();

  const [name, setName] = useState(existing.name);
  const [type, setType] = useState<ServiceType>(existing.type);
  const [phone, setPhone] = useState(existing.phone);
  const [description, setDescription] = useState(existing.description);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirming, setConfirming] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Por favor, insira um nome";
    if (!phone.trim()) e.phone = "Por favor, insira um telefone";
    if (!description.trim()) e.description = "Por favor, escreva uma descrição";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    updateService(id, {
      name: name.trim(),
      type,
      phone: phone.trim(),
      description: description.trim(),
    });
    navigate({ to: "/service/$id", params: { id } });
  }

  function onDelete() {
    deleteService(id);
    navigate({ to: "/" });
  }

  const labelClass = "mb-2 block text-base font-bold text-foreground";
  const inputClass =
    "w-full rounded-xl border-2 border-input bg-card px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <div className="min-h-screen pb-12">
      <AppHeader title="Editar Serviço" showBack />

      <main className="mx-auto max-w-xl px-5 pt-6">
        <p className="mb-6 text-base text-muted-foreground">
          Atualize as informações abaixo ou remova este serviço.
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className={labelClass}>
              Nome do serviço
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Tipo de serviço</label>
            <div className="flex flex-wrap gap-2">
              {SERVICE_TYPES.map((t) => {
                const active = type === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      active
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-card text-foreground hover:bg-secondary"
                    }`}
                    style={!active ? { boxShadow: "var(--shadow-soft)" } : {}}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Telefone / WhatsApp
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
            {errors.phone && (
              <p className="mt-1.5 text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Descrição do serviço
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={inputClass}
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-destructive">
                {errors.description}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl text-lg font-bold text-primary-foreground transition hover:opacity-95 active:scale-[0.99]"
            style={{
              background: "var(--gradient-hero)",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <Check className="h-6 w-6" strokeWidth={2.5} />
            Salvar Alterações
          </button>
        </form>

        <div className="mt-10 border-t border-border pt-6">
          {!confirming ? (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-destructive bg-card text-base font-semibold text-destructive transition hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-5 w-5" />
              Excluir este serviço
            </button>
          ) : (
            <div className="rounded-2xl bg-card p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
              <p className="text-base font-bold text-foreground">
                Tem certeza que quer excluir?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Essa ação não pode ser desfeita.
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="h-12 flex-1 rounded-xl bg-secondary text-base font-semibold text-secondary-foreground"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-destructive text-base font-bold text-destructive-foreground"
                >
                  <Trash2 className="h-5 w-5" />
                  Excluir
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
