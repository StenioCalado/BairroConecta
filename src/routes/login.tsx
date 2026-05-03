import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, Eye, EyeOff, Users } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Serviços do Bairro" },
      { name: "description", content: "Entre na sua conta para gerenciar seus serviços." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = "Por favor, insira seu e-mail";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "E-mail inválido";
    if (!password.trim()) e.password = "Por favor, insira sua senha";
    else if (password.length < 6) e.password = "A senha deve ter ao menos 6 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    // Simulação de login — navega para home
    navigate({ to: "/" });
  }

  const inputClass =
    "w-full rounded-xl border-2 border-input bg-white px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-12"
      style={{ background: "var(--gradient-soft)" }}
    >
      {/* Logo / ícone */}
      <div
        className="flex h-20 w-20 items-center justify-center rounded-3xl mb-6 text-primary-foreground"
        style={{
          background: "var(--gradient-hero)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        <Users className="h-10 w-10" />
      </div>

      <h1 className="text-3xl font-extrabold text-foreground text-center">Bem-vindo de volta!</h1>
      <p className="mt-2 text-base text-muted-foreground text-center">
        Entre para gerenciar seus serviços no bairro
      </p>

      <div
        className="mt-8 w-full max-w-sm rounded-3xl bg-white p-8"
        style={{ boxShadow: "var(--shadow-elevated)" }}
      >
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-bold text-foreground">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className={inputClass}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-bold text-foreground">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass + " pr-12"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm font-semibold text-primary hover:underline">
              Esqueci minha senha
            </button>
          </div>

          <button
            type="submit"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-bold text-primary-foreground transition hover:opacity-95 active:scale-[0.99]"
            style={{
              background: "var(--gradient-hero)",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <LogIn className="h-5 w-5" strokeWidth={2.5} />
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <button type="button" className="font-bold text-primary hover:underline">
            Cadastre-se
          </button>
        </div>
      </div>

      <Link
        to="/"
        className="mt-6 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
      >
        ← Voltar sem entrar
      </Link>
    </div>
  );
}
