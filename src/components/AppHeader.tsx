import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, Users, LogIn } from "lucide-react";

interface Props {
  title?: string;
  showBack?: boolean;
}

export function AppHeader({ title, showBack }: Props) {
  const { location } = useRouterState();
  const isHome = location.pathname === "/";

  return (
    <header
      className="sticky top-0 z-20 text-primary-foreground"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="mx-auto flex max-w-xl items-center gap-3 px-5 py-5">
        {showBack && !isHome ? (
          <Link
            to="/"
            aria-label="Voltar"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
            <Users className="h-6 w-6" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold leading-tight">
            {title ?? "Serviços do Bairro"}
          </h1>
          {!title && (
            <p className="text-sm text-primary-foreground/80">
              Encontre ajuda. Ofereça ajuda.
            </p>
          )}
        </div>
        <Link
          to="/login"
          aria-label="Entrar"
          className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/25"
        >
          <LogIn className="h-4 w-4" />
          Entrar
        </Link>
      </div>
    </header>
  );
}
