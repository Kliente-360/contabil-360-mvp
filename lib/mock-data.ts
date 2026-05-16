// Seed data para o demo da Sprint 1A.
// Todos os valores em centavos (inteiros) para evitar arredondamento.
// Empresa: Auto Center São Jorge Ltda — Simples Nacional — São Paulo/SP

export const ESCRITORIO = {
  nome: "Tributar Assessoria Contábil",
  cnpj: "12.345.678/0001-90",
  responsavel: "Dr. Roberto Mendes",
  email: "contato@tributar.com.br",
};

export const CLIENTE = {
  id: "cliente-001",
  razaoSocial: "Auto Center São Jorge Ltda",
  nomeFantasia: "Auto Center São Jorge",
  cnpj: "98.765.432/0001-10",
  regimeTributario: "Simples Nacional" as const,
  segmento: "Mecânica e Funilaria",
  email: "financeiro@autocentersjorge.com.br",
  contadorNome: "Ana Paula Ferreira",
  contadorEmail: "anapaula@tributar.com.br",
  endereco: "Av. das Nações, 1.847 — Vila Prudente, São Paulo/SP",
  fundacao: "2018",
  funcionarios: 12,
};

// Credencial de demo — aceita apenas estes dados
export const DEMO_CREDENTIAL = {
  email: "financeiro@autocentersjorge.com.br",
  password: "demo@2024",
};

// ─── DRE — 6 meses (Jan–Jun 2024) ────────────────────────────────────────────
// Estrutura: { competencia, receita, cmv, lucroBruto, despesasOperacionais, ebitda }
// Valores em reais (número)

export type DREMes = {
  competencia: string;
  mesLabel: string;
  receita: number;
  cmv: number;        // custo de peças e materiais
  lucroBruto: number;
  despesasOp: number; // salários, aluguel, energia, marketing, admin
  ebitda: number;
  impostos: number;   // DAS Simples Nacional
  lucroLiquido: number;
};

export const DRE_MESES: DREMes[] = [
  {
    competencia: "2024-01",
    mesLabel: "Jan/24",
    receita: 87_400,
    cmv: 31_200,
    lucroBruto: 56_200,
    despesasOp: 38_500,
    ebitda: 17_700,
    impostos: 4_807,
    lucroLiquido: 12_893,
  },
  {
    competencia: "2024-02",
    mesLabel: "Fev/24",
    receita: 79_800,
    cmv: 28_400,
    lucroBruto: 51_400,
    despesasOp: 37_200,
    ebitda: 14_200,
    impostos: 4_389,
    lucroLiquido: 9_811,
  },
  {
    competencia: "2024-03",
    mesLabel: "Mar/24",
    receita: 94_600,
    cmv: 33_800,
    lucroBruto: 60_800,
    despesasOp: 39_100,
    ebitda: 21_700,
    impostos: 5_203,
    lucroLiquido: 16_497,
  },
  {
    competencia: "2024-04",
    mesLabel: "Abr/24",
    receita: 91_200,
    cmv: 32_100,
    lucroBruto: 59_100,
    despesasOp: 38_800,
    ebitda: 20_300,
    impostos: 5_016,
    lucroLiquido: 15_284,
  },
  {
    competencia: "2024-05",
    mesLabel: "Mai/24",
    receita: 103_500,
    cmv: 37_200,
    lucroBruto: 66_300,
    despesasOp: 40_200,
    ebitda: 26_100,
    impostos: 5_693,
    lucroLiquido: 20_407,
  },
  {
    competencia: "2024-06",
    mesLabel: "Jun/24",
    receita: 98_700,
    cmv: 35_400,
    lucroBruto: 63_300,
    despesasOp: 39_600,
    ebitda: 23_700,
    impostos: 5_429,
    lucroLiquido: 18_271,
  },
];

// DRE detalhada do mês atual (Jun/24) com grupos de contas
export const DRE_DETALHE = {
  competencia: "2024-06",
  grupos: [
    {
      nome: "Receita Operacional Bruta",
      natureza: "receita" as const,
      total: 98_700,
      contas: [
        { codigo: "3.1.1", nome: "Serviços de Mecânica", valor: 64_300 },
        { codigo: "3.1.2", nome: "Serviços de Funilaria e Pintura", valor: 21_800 },
        { codigo: "3.1.3", nome: "Venda de Peças e Acessórios", valor: 12_600 },
      ],
    },
    {
      nome: "Custo dos Produtos/Serviços Vendidos",
      natureza: "custo" as const,
      total: -35_400,
      contas: [
        { codigo: "4.1.1", nome: "Peças e Materiais Consumidos", valor: -28_900 },
        { codigo: "4.1.2", nome: "Tintas e Insumos de Funilaria", valor: -6_500 },
      ],
    },
    {
      nome: "Lucro Bruto",
      natureza: "subtotal" as const,
      total: 63_300,
      contas: [],
    },
    {
      nome: "Despesas Operacionais",
      natureza: "despesa" as const,
      total: -39_600,
      contas: [
        { codigo: "5.1.1", nome: "Folha de Pagamento e Encargos", valor: -24_800 },
        { codigo: "5.1.2", nome: "Aluguel do Imóvel", valor: -6_500 },
        { codigo: "5.1.3", nome: "Energia Elétrica", valor: -1_800 },
        { codigo: "5.1.4", nome: "Telefone e Internet", valor: -420 },
        { codigo: "5.1.5", nome: "Contabilidade", valor: -1_200 },
        { codigo: "5.1.6", nome: "Manutenção de Equipamentos", valor: -980 },
        { codigo: "5.1.7", nome: "Marketing e Publicidade", valor: -1_500 },
        { codigo: "5.1.8", nome: "Seguros", valor: -850 },
        { codigo: "5.1.9", nome: "Despesas Diversas", valor: -1_550 },
      ],
    },
    {
      nome: "EBITDA",
      natureza: "subtotal" as const,
      total: 23_700,
      contas: [],
    },
    {
      nome: "Impostos (DAS Simples Nacional)",
      natureza: "imposto" as const,
      total: -5_429,
      contas: [
        { codigo: "6.1.1", nome: "DAS — Simples Nacional", valor: -5_429 },
      ],
    },
    {
      nome: "Lucro Líquido",
      natureza: "resultado" as const,
      total: 18_271,
      contas: [],
    },
  ],
};

// ─── BALANÇO PATRIMONIAL (Jun/24) ─────────────────────────────────────────────

export const BALANCO = {
  competencia: "2024-06",
  ativo: {
    total: 412_800,
    grupos: [
      {
        nome: "Ativo Circulante",
        total: 187_300,
        contas: [
          { codigo: "1.1.1", nome: "Caixa e Equivalentes de Caixa", valor: 43_200 },
          { codigo: "1.1.2", nome: "Contas a Receber", valor: 68_400 },
          { codigo: "1.1.3", nome: "Estoque de Peças", valor: 71_200 },
          { codigo: "1.1.4", nome: "Outros Créditos", valor: 4_500 },
        ],
      },
      {
        nome: "Ativo Não Circulante",
        total: 225_500,
        contas: [
          { codigo: "1.2.1", nome: "Veículos e Máquinas", valor: 148_000 },
          { codigo: "1.2.2", nome: "Equipamentos de Oficina", valor: 62_000 },
          { codigo: "1.2.3", nome: "Móveis e Utensílios", valor: 15_500 },
        ],
      },
    ],
  },
  passivo: {
    total: 412_800,
    grupos: [
      {
        nome: "Passivo Circulante",
        total: 98_600,
        contas: [
          { codigo: "2.1.1", nome: "Fornecedores a Pagar", valor: 38_200 },
          { codigo: "2.1.2", nome: "Salários e Encargos a Pagar", valor: 31_400 },
          { codigo: "2.1.3", nome: "Impostos a Recolher", valor: 12_800 },
          { codigo: "2.1.4", nome: "Outras Obrigações", valor: 16_200 },
        ],
      },
      {
        nome: "Passivo Não Circulante",
        total: 64_900,
        contas: [
          { codigo: "2.2.1", nome: "Financiamentos (Veículos)", valor: 64_900 },
        ],
      },
      {
        nome: "Patrimônio Líquido",
        total: 249_300,
        contas: [
          { codigo: "3.1.1", nome: "Capital Social", valor: 80_000 },
          { codigo: "3.1.2", nome: "Lucros Acumulados", valor: 169_300 },
        ],
      },
    ],
  },
};

// ─── DOCUMENTOS ───────────────────────────────────────────────────────────────

export type Documento = {
  id: string;
  nome: string;
  tipo: "guia" | "relatorio" | "declaracao" | "contrato";
  competencia: string;
  tamanhoKb: number;
  enviadoEm: string;
  enviadoPor: string;
};

export const DOCUMENTOS: Documento[] = [
  {
    id: "doc-001",
    nome: "PGDAS-D — Junho 2024",
    tipo: "guia",
    competencia: "2024-06",
    tamanhoKb: 184,
    enviadoEm: "2024-07-08",
    enviadoPor: "Ana Paula Ferreira",
  },
  {
    id: "doc-002",
    nome: "Relatório DRE — Junho 2024",
    tipo: "relatorio",
    competencia: "2024-06",
    tamanhoKb: 312,
    enviadoEm: "2024-07-08",
    enviadoPor: "Ana Paula Ferreira",
  },
  {
    id: "doc-003",
    nome: "PGDAS-D — Maio 2024",
    tipo: "guia",
    competencia: "2024-05",
    tamanhoKb: 191,
    enviadoEm: "2024-06-07",
    enviadoPor: "Ana Paula Ferreira",
  },
  {
    id: "doc-004",
    nome: "Relatório DRE — Maio 2024",
    tipo: "relatorio",
    competencia: "2024-05",
    tamanhoKb: 298,
    enviadoEm: "2024-06-07",
    enviadoPor: "Ana Paula Ferreira",
  },
  {
    id: "doc-005",
    nome: "PGDAS-D — Abril 2024",
    tipo: "guia",
    competencia: "2024-04",
    tamanhoKb: 177,
    enviadoEm: "2024-05-08",
    enviadoPor: "Ana Paula Ferreira",
  },
  {
    id: "doc-006",
    nome: "PGDAS-D — Março 2024",
    tipo: "guia",
    competencia: "2024-03",
    tamanhoKb: 183,
    enviadoEm: "2024-04-09",
    enviadoPor: "Ana Paula Ferreira",
  },
  {
    id: "doc-007",
    nome: "PGDAS-D — Fevereiro 2024",
    tipo: "guia",
    competencia: "2024-02",
    tamanhoKb: 179,
    enviadoEm: "2024-03-08",
    enviadoPor: "Ana Paula Ferreira",
  },
  {
    id: "doc-008",
    nome: "Contrato de Prestação de Serviços Contábeis",
    tipo: "contrato",
    competencia: "2024-01",
    tamanhoKb: 542,
    enviadoEm: "2024-01-15",
    enviadoPor: "Dr. Roberto Mendes",
  },
];

// ─── TICKETS ──────────────────────────────────────────────────────────────────

export type Ticket = {
  id: string;
  titulo: string;
  tipo: string;
  prioridade: "alta" | "media" | "baixa";
  status: "aberto" | "em_andamento" | "aguardando_cliente" | "resolvido";
  abertoPor: string;
  atribuidoPara: string;
  criadoEm: string;
  atualizadoEm: string;
  mensagens: {
    id: string;
    autor: string;
    autorTipo: "cliente" | "escritorio";
    conteudo: string;
    criadoEm: string;
  }[];
};

export const TICKETS: Ticket[] = [
  {
    id: "tkt-001",
    titulo: "Dúvida sobre o PGDAS-D de junho — valor do DAS",
    tipo: "Fiscal",
    prioridade: "media",
    status: "em_andamento",
    abertoPor: "Carlos Eduardo (Sócio)",
    atribuidoPara: "Ana Paula Ferreira",
    criadoEm: "2024-07-10T09:15:00",
    atualizadoEm: "2024-07-10T14:30:00",
    mensagens: [
      {
        id: "msg-001",
        autor: "Carlos Eduardo",
        autorTipo: "cliente",
        conteudo:
          "Ana Paula, o DAS de junho veio R$ 5.429. No mês passado era R$ 5.693. Pode me explicar a diferença?",
        criadoEm: "2024-07-10T09:15:00",
      },
      {
        id: "msg-002",
        autor: "Ana Paula Ferreira",
        autorTipo: "escritorio",
        conteudo:
          "Olá Carlos! A diferença é proporcional à redução da receita de maio (R$ 103.500) para junho (R$ 98.700). A alíquota efetiva do Simples Nacional segue a faixa de faturamento acumulado. Estou preparando um resumo detalhado para você.",
        criadoEm: "2024-07-10T14:30:00",
      },
    ],
  },
  {
    id: "tkt-002",
    titulo: "Solicitação de declaração de faturamento para financiamento",
    tipo: "Declarações",
    prioridade: "alta",
    status: "aguardando_cliente",
    abertoPor: "Carlos Eduardo (Sócio)",
    atribuidoPara: "Ana Paula Ferreira",
    criadoEm: "2024-07-05T11:00:00",
    atualizadoEm: "2024-07-07T16:45:00",
    mensagens: [
      {
        id: "msg-003",
        autor: "Carlos Eduardo",
        autorTipo: "cliente",
        conteudo:
          "Preciso de uma declaração de faturamento dos últimos 12 meses para apresentar ao banco. É para financiamento de equipamentos.",
        criadoEm: "2024-07-05T11:00:00",
      },
      {
        id: "msg-004",
        autor: "Ana Paula Ferreira",
        autorTipo: "escritorio",
        conteudo:
          "Claro! Vou preparar a declaração com reconhecimento de firma. Você pode confirmar o nome exato do banco e o CNPJ para constar no documento?",
        criadoEm: "2024-07-07T16:45:00",
      },
    ],
  },
  {
    id: "tkt-003",
    titulo: "Orientação sobre contratação de funcionário — regime CLT",
    tipo: "RH / Trabalhista",
    prioridade: "baixa",
    status: "resolvido",
    abertoPor: "Carlos Eduardo (Sócio)",
    atribuidoPara: "Ana Paula Ferreira",
    criadoEm: "2024-06-20T10:00:00",
    atualizadoEm: "2024-06-24T09:00:00",
    mensagens: [
      {
        id: "msg-005",
        autor: "Carlos Eduardo",
        autorTipo: "cliente",
        conteudo:
          "Queremos contratar mais um mecânico. Qual o custo total de um CLT com salário de R$ 2.800?",
        criadoEm: "2024-06-20T10:00:00",
      },
      {
        id: "msg-006",
        autor: "Ana Paula Ferreira",
        autorTipo: "escritorio",
        conteudo:
          "Com salário de R$ 2.800, o custo total para a empresa gira em torno de R$ 4.060/mês, incluindo INSS patronal (20%), FGTS (8%), férias e 13º proporcionais, vale-transporte e vale-refeição estimados. Enviei um planilha detalhada no seu e-mail.",
        criadoEm: "2024-06-24T09:00:00",
      },
    ],
  },
];

// ─── KPIs DO MÊS ATUAL ────────────────────────────────────────────────────────

export function getKPIsMesAtual() {
  const atual = DRE_MESES[5]; // Jun/24
  const anterior = DRE_MESES[4]; // Mai/24

  return {
    receita: {
      valor: atual.receita,
      anterior: anterior.receita,
      variacao: ((atual.receita - anterior.receita) / anterior.receita) * 100,
    },
    ebitda: {
      valor: atual.ebitda,
      anterior: anterior.ebitda,
      variacao: ((atual.ebitda - anterior.ebitda) / anterior.ebitda) * 100,
      margem: (atual.ebitda / atual.receita) * 100,
    },
    lucroLiquido: {
      valor: atual.lucroLiquido,
      anterior: anterior.lucroLiquido,
      variacao: ((atual.lucroLiquido - anterior.lucroLiquido) / anterior.lucroLiquido) * 100,
      margem: (atual.lucroLiquido / atual.receita) * 100,
    },
    impostos: {
      valor: atual.impostos,
      aliquotaEfetiva: (atual.impostos / atual.receita) * 100,
    },
    competencia: atual.competencia,
    competenciaLabel: "Junho 2024",
  };
}
