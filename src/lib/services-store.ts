import { useEffect, useState } from "react";

export type ServiceType =
  | "Limpeza"
  | "Encanamento"
  | "Elétrica"
  | "Aulas"
  | "Babá"
  | "Transporte"
  | "Beleza"
  | "Reformas"
  | "Pedreiro"
  | "Pintor"
  | "Outros";

export const SERVICE_TYPES: ServiceType[] = [
  "Limpeza",
  "Encanamento",
  "Elétrica",
  "Aulas",
  "Babá",
  "Transporte",
  "Beleza",
  "Reformas",
  "Pedreiro",
  "Pintor",
  "Outros",
];

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  phone: string;
  description: string;
  createdAt: number;
}

const KEY = "community-services";

const SEED: Service[] = [
  {
    id: "1",
    name: "Maria Diarista",
    type: "Limpeza",
    phone: "(11) 98765-4321",
    description: "Limpeza residencial completa, semanal ou avulsa. Trabalho com capricho e pontualidade! Atendo toda a região.",
    createdAt: Date.now() - 86400000 * 10,
  },
  {
    id: "2",
    name: "Limpeza da Dona Célia",
    type: "Limpeza",
    phone: "(11) 94321-8765",
    description: "Especialista em limpeza pós-obra e limpeza pesada. Orçamento sem compromisso.",
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: "3",
    name: "João Encanador",
    type: "Encanamento",
    phone: "(11) 99123-4567",
    description: "Conserto de vazamentos, entupimentos e instalações hidráulicas. 20 anos de experiência. Atendimento rápido.",
    createdAt: Date.now() - 86400000 * 9,
  },
  {
    id: "4",
    name: "Hidráulica do Seu Raimundo",
    type: "Encanamento",
    phone: "(11) 97890-1122",
    description: "Desentupimento de esgoto, troca de canos e instalação de chuveiro. Preço justo e serviço garantido.",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "5",
    name: "Carlos Eletricista",
    type: "Elétrica",
    phone: "(11) 96543-2109",
    description: "Instalações elétricas, troca de disjuntores, tomadas e iluminação. Certificado pelo CREA. Residencial e comercial.",
    createdAt: Date.now() - 86400000 * 8,
  },
  {
    id: "6",
    name: "Elétrica do Zé",
    type: "Elétrica",
    phone: "(11) 93322-7788",
    description: "Curto-circuito, chuveiro elétrico, instalação de ar-condicionado e quadro de luz. Atendo fins de semana.",
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: "7",
    name: "Professora Ana – Matemática",
    type: "Aulas",
    phone: "(11) 97654-3210",
    description: "Reforço escolar em matemática para o ensino fundamental e médio. Aulas presenciais e online. Resultados garantidos!",
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: "8",
    name: "Prof. Roberto – Português e Redação",
    type: "Aulas",
    phone: "(11) 95544-6677",
    description: "Aulas de português e redação para vestibular e ENEM. Metodologia própria com alta taxa de aprovação.",
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "9",
    name: "Babá Sônia",
    type: "Babá",
    phone: "(11) 98811-2233",
    description: "Babá experiente com mais de 10 anos cuidando de crianças de 0 a 8 anos. Tenho referências de famílias do bairro.",
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: "10",
    name: "Cuidadora Fernanda",
    type: "Babá",
    phone: "(11) 92233-4455",
    description: "Cuidado de crianças e idosos. Disponível em período integral ou meio período. Curso de primeiros socorros.",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "11",
    name: "Moto Frete do Leandro",
    type: "Transporte",
    phone: "(11) 99988-1100",
    description: "Motoboy para entregas rápidas, documentos e pequenas encomendas. Atendo o bairro e região. WhatsApp.",
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "12",
    name: "Van do Seu Nilson",
    type: "Transporte",
    phone: "(11) 96677-3344",
    description: "Transporte escolar e fretamento para passeios, aeroporto e viagens. Van climatizada com 8 lugares.",
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: "13",
    name: "Salão da Patrícia",
    type: "Beleza",
    phone: "(11) 97788-5566",
    description: "Corte, escova, coloração, manicure e pedicure. Atendo em domicílio ou no salão. Horários flexíveis.",
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: "14",
    name: "Barbearia do Marquinhos",
    type: "Beleza",
    phone: "(11) 94455-9900",
    description: "Corte masculino, barba e sobrancelha. Ambiente descontraído, preços acessíveis. Agendamento pelo WhatsApp.",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "15",
    name: "Reformas do Seu Antônio",
    type: "Reformas",
    phone: "(11) 98899-0011",
    description: "Reforma geral de casas e apartamentos. Banheiro, cozinha, piso e forro. Orçamento grátis e serviço garantido.",
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: "16",
    name: "Marcenaria do Fábio",
    type: "Reformas",
    phone: "(11) 93344-7788",
    description: "Montagem de móveis planejados, conserto de portas, janelas e marcenaria em geral. Trabalho sob medida.",
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "17",
    name: "Pedreiro Valdir",
    type: "Pedreiro",
    phone: "(11) 96655-4433",
    description: "Assentamento de piso, azulejo, construção de muros e ampliações. Mais de 15 anos de experiência. Referências disponíveis.",
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: "18",
    name: "Construtora Dois Irmãos",
    type: "Pedreiro",
    phone: "(11) 91122-3344",
    description: "Pequenas construções, garagem, churrasqueira, calçada e reboco. Equipe de dois profissionais, serviço rápido.",
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: "19",
    name: "Pintor Claudinho",
    type: "Pintor",
    phone: "(11) 95566-7788",
    description: "Pintura interna e externa, textura, grafiato e verniz. Acabamento impecável com materiais de qualidade.",
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "20",
    name: "Pinturas da Rose",
    type: "Pintor",
    phone: "(11) 98877-2211",
    description: "Pintura residencial e decorativa. Especialista em efeitos especiais e pintura de detalhes. Orçamento sem compromisso.",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "21",
    name: "Consertos do Bairro",
    type: "Outros",
    phone: "(11) 97766-5544",
    description: "Pequenos reparos gerais: torneiras, fechaduras, persianas, calhas e muito mais. Atendo de segunda a sábado.",
    createdAt: Date.now() - 86400000 * 3,
  },
];

function read(): Service[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw);
  } catch {
    return SEED;
  }
}

function write(services: Service[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(services));
  window.dispatchEvent(new Event("services-updated"));
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setServices(read());
    setReady(true);
    const handler = () => setServices(read());
    window.addEventListener("services-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("services-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { services, ready };
}

export function addService(s: Omit<Service, "id" | "createdAt">) {
  const all = read();
  const next: Service = {
    ...s,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  write([next, ...all]);
  return next;
}

export function getService(id: string): Service | undefined {
  return read().find((s) => s.id === id);
}

export function updateService(
  id: string,
  patch: Omit<Service, "id" | "createdAt">,
) {
  const all = read();
  const next = all.map((s) => (s.id === id ? { ...s, ...patch } : s));
  write(next);
}

export function deleteService(id: string) {
  const all = read().filter((s) => s.id !== id);
  write(all);
}
