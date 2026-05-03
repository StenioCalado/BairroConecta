import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { addService, SERVICE_TYPES, type ServiceType } from "@/lib/services-store";

export const Route = createFileRoute("/add")({
  head: () => ({
    meta: [
      { title: "Anunciar Serviço — Serviços do Bairro" },
      {
        name: "description",
        content: "Ofereça um serviço para a sua comunidade.",
      },
    ],
  }),
  component: AddPage,
});

function AddPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState<ServiceType>("Limpeza");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    const created = addService({
      name: name.trim(),
      type,
      phone: phone.trim(),
      description: description.trim(),
    });
    navigate({ to: "/service/$id", params: { id: created.id } });
  }

  const labelClass = "mb-2 block text-base font-bold text-foreground";
  const inputClass =
    "w-full rounded-xl border-2 border-input bg-card px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <div className="min-h-screen pb-12">
      <AppHeader title="Anunciar Serviço" showBack />

      <main className="mx-auto max-w-xl px-5 pt-6">
        <p className="mb-6 text-base text-muted-foreground">
          Preencha os campos abaixo. Todos são obrigatórios.
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
              placeholder="Ex: Maria Diarista"
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
              placeholder="Ex: (11) 99999-0000"
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
              placeholder="Conte o que você oferece para os vizinhos..."
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
            Publicar Serviço
          </button>
        </form>
      </main>
    </div>
  );
}
