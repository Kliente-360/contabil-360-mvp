// Dados mock para o demo — Auto Center São Jorge Ltda
// Simples Nacional, São Paulo/SP
// Cobertura: Jan/2024 – Dez/2025 (24 meses completos)
//
// Narrativa: crescimento consistente com dois meses ruins:
//   Out/2024 — quebra de compressor industrial (custo extraordinário)
//   Jan/2025 — sazonalidade pós-férias + 13º atrasado de dois funcionários

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

export const DEMO_CREDENTIAL = {
  email: "financeiro@autocentersjorge.com.br",
  password: "demo@2024",
};

// ─── DRE MENSAL — 24 MESES ───────────────────────────────────────────────────

export type DREMes = {
  competencia: string;  // "YYYY-MM"
  mesLabel: string;     // "Jan/24"
  ano: number;
  mes: number;
  receita: number;
  cmv: number;
  lucroBruto: number;
  despesasOp: number;
  ebitda: number;
  impostos: number;
  lucroLiquido: number;
  observacao?: string;  // destaque para meses excepcionais
};

export const DRE_MESES: DREMes[] = [
  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    competencia: "2024-01", mesLabel: "Jan/24", ano: 2024, mes: 1,
    receita: 87_400, cmv: 31_200, lucroBruto: 56_200,
    despesasOp: 38_500, ebitda: 17_700, impostos: 4_807, lucroLiquido: 12_893,
  },
  {
    competencia: "2024-02", mesLabel: "Fev/24", ano: 2024, mes: 2,
    receita: 79_800, cmv: 28_400, lucroBruto: 51_400,
    despesasOp: 37_200, ebitda: 14_200, impostos: 4_389, lucroLiquido: 9_811,
  },
  {
    competencia: "2024-03", mesLabel: "Mar/24", ano: 2024, mes: 3,
    receita: 94_600, cmv: 33_800, lucroBruto: 60_800,
    despesasOp: 39_100, ebitda: 21_700, impostos: 5_203, lucroLiquido: 16_497,
  },
  {
    competencia: "2024-04", mesLabel: "Abr/24", ano: 2024, mes: 4,
    receita: 91_200, cmv: 32_100, lucroBruto: 59_100,
    despesasOp: 38_800, ebitda: 20_300, impostos: 5_016, lucroLiquido: 15_284,
  },
  {
    competencia: "2024-05", mesLabel: "Mai/24", ano: 2024, mes: 5,
    receita: 103_500, cmv: 37_200, lucroBruto: 66_300,
    despesasOp: 40_200, ebitda: 26_100, impostos: 5_693, lucroLiquido: 20_407,
  },
  {
    competencia: "2024-06", mesLabel: "Jun/24", ano: 2024, mes: 6,
    receita: 98_700, cmv: 35_400, lucroBruto: 63_300,
    despesasOp: 39_600, ebitda: 23_700, impostos: 5_429, lucroLiquido: 18_271,
  },
  {
    competencia: "2024-07", mesLabel: "Jul/24", ano: 2024, mes: 7,
    receita: 112_300, cmv: 40_100, lucroBruto: 72_200,
    despesasOp: 41_200, ebitda: 31_000, impostos: 6_177, lucroLiquido: 24_823,
  },
  {
    competencia: "2024-08", mesLabel: "Ago/24", ano: 2024, mes: 8,
    receita: 108_400, cmv: 38_600, lucroBruto: 69_800,
    despesasOp: 40_800, ebitda: 29_000, impostos: 5_962, lucroLiquido: 23_038,
  },
  {
    competencia: "2024-09", mesLabel: "Set/24", ano: 2024, mes: 9,
    receita: 95_200, cmv: 33_900, lucroBruto: 61_300,
    despesasOp: 39_400, ebitda: 21_900, impostos: 5_236, lucroLiquido: 16_664,
  },
  {
    // Mês ruim: quebra do compressor de ar industrial
    competencia: "2024-10", mesLabel: "Out/24", ano: 2024, mes: 10,
    receita: 76_400, cmv: 27_500, lucroBruto: 48_900,
    despesasOp: 52_800, ebitda: -3_900, impostos: 4_202, lucroLiquido: -8_102,
    observacao: "Quebra do compressor industrial — custo extraordinário R$ 13.800",
  },
  {
    competencia: "2024-11", mesLabel: "Nov/24", ano: 2024, mes: 11,
    receita: 88_900, cmv: 31_600, lucroBruto: 57_300,
    despesasOp: 39_200, ebitda: 18_100, impostos: 4_890, lucroLiquido: 13_210,
  },
  {
    competencia: "2024-12", mesLabel: "Dez/24", ano: 2024, mes: 12,
    receita: 104_700, cmv: 37_400, lucroBruto: 67_300,
    despesasOp: 40_600, ebitda: 26_700, impostos: 5_759, lucroLiquido: 20_941,
  },

  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    // Mês ruim: sazonalidade pós-férias + 13º atrasado (2 funcionários)
    competencia: "2025-01", mesLabel: "Jan/25", ano: 2025, mes: 1,
    receita: 72_100, cmv: 24_900, lucroBruto: 47_200,
    despesasOp: 51_400, ebitda: -4_200, impostos: 3_966, lucroLiquido: -8_166,
    observacao: "Sazonalidade pós-férias + quitação 13º proporcional",
  },
  {
    competencia: "2025-02", mesLabel: "Fev/25", ano: 2025, mes: 2,
    receita: 81_300, cmv: 28_400, lucroBruto: 52_900,
    despesasOp: 38_400, ebitda: 14_500, impostos: 4_472, lucroLiquido: 10_028,
  },
  {
    competencia: "2025-03", mesLabel: "Mar/25", ano: 2025, mes: 3,
    receita: 96_800, cmv: 34_600, lucroBruto: 62_200,
    despesasOp: 39_800, ebitda: 22_400, impostos: 5_324, lucroLiquido: 17_076,
  },
  {
    competencia: "2025-04", mesLabel: "Abr/25", ano: 2025, mes: 4,
    receita: 105_200, cmv: 37_800, lucroBruto: 67_400,
    despesasOp: 41_100, ebitda: 26_300, impostos: 5_786, lucroLiquido: 20_514,
  },
  {
    competencia: "2025-05", mesLabel: "Mai/25", ano: 2025, mes: 5,
    receita: 118_400, cmv: 42_500, lucroBruto: 75_900,
    despesasOp: 42_300, ebitda: 33_600, impostos: 6_512, lucroLiquido: 27_088,
  },
  {
    competencia: "2025-06", mesLabel: "Jun/25", ano: 2025, mes: 6,
    receita: 111_700, cmv: 40_000, lucroBruto: 71_700,
    despesasOp: 41_800, ebitda: 29_900, impostos: 6_144, lucroLiquido: 23_756,
  },
  {
    competencia: "2025-07", mesLabel: "Jul/25", ano: 2025, mes: 7,
    receita: 124_500, cmv: 44_600, lucroBruto: 79_900,
    despesasOp: 42_900, ebitda: 37_000, impostos: 6_848, lucroLiquido: 30_152,
  },
  {
    competencia: "2025-08", mesLabel: "Ago/25", ano: 2025, mes: 8,
    receita: 119_300, cmv: 42_800, lucroBruto: 76_500,
    despesasOp: 42_500, ebitda: 34_000, impostos: 6_562, lucroLiquido: 27_438,
  },
  {
    competencia: "2025-09", mesLabel: "Set/25", ano: 2025, mes: 9,
    receita: 108_600, cmv: 38_800, lucroBruto: 69_800,
    despesasOp: 41_200, ebitda: 28_600, impostos: 5_973, lucroLiquido: 22_627,
  },
  {
    competencia: "2025-10", mesLabel: "Out/25", ano: 2025, mes: 10,
    receita: 98_400, cmv: 35_200, lucroBruto: 63_200,
    despesasOp: 40_700, ebitda: 22_500, impostos: 5_412, lucroLiquido: 17_088,
  },
  {
    competencia: "2025-11", mesLabel: "Nov/25", ano: 2025, mes: 11,
    receita: 115_200, cmv: 41_300, lucroBruto: 73_900,
    despesasOp: 41_900, ebitda: 32_000, impostos: 6_336, lucroLiquido: 25_664,
  },
  {
    competencia: "2025-12", mesLabel: "Dez/25", ano: 2025, mes: 12,
    receita: 131_800, cmv: 47_200, lucroBruto: 84_600,
    despesasOp: 43_400, ebitda: 41_200, impostos: 7_249, lucroLiquido: 33_951,
  },
];

// Competência atual do demo (mês mais recente disponível)
export const COMPETENCIA_ATUAL = "2025-12";

// ─── DRE DETALHE (mês de referência: Dez/2025) ───────────────────────────────

export const DRE_DETALHE = {
  competencia: "2025-12",
  grupos: [
    {
      nome: "Receita Operacional Bruta",
      natureza: "receita" as const,
      total: 131_800,
      contas: [
        { codigo: "3.1.1", nome: "Serviços de Mecânica", valor: 85_900 },
        { codigo: "3.1.2", nome: "Serviços de Funilaria e Pintura", valor: 29_100 },
        { codigo: "3.1.3", nome: "Venda de Peças e Acessórios", valor: 16_800 },
      ],
    },
    {
      nome: "Custo dos Produtos/Serviços Vendidos",
      natureza: "custo" as const,
      total: -47_200,
      contas: [
        { codigo: "4.1.1", nome: "Peças e Materiais Consumidos", valor: -38_600 },
        { codigo: "4.1.2", nome: "Tintas e Insumos de Funilaria", valor: -8_600 },
      ],
    },
    {
      nome: "Lucro Bruto",
      natureza: "subtotal" as const,
      total: 84_600,
      contas: [],
    },
    {
      nome: "Despesas Operacionais",
      natureza: "despesa" as const,
      total: -43_400,
      contas: [
        { codigo: "5.1.1", nome: "Folha de Pagamento e Encargos", valor: -27_200 },
        { codigo: "5.1.2", nome: "Aluguel do Imóvel", valor: -6_500 },
        { codigo: "5.1.3", nome: "Energia Elétrica", valor: -2_100 },
        { codigo: "5.1.4", nome: "Telefone e Internet", valor: -420 },
        { codigo: "5.1.5", nome: "Contabilidade", valor: -1_200 },
        { codigo: "5.1.6", nome: "Manutenção de Equipamentos", valor: -1_080 },
        { codigo: "5.1.7", nome: "Marketing e Publicidade", valor: -2_200 },
        { codigo: "5.1.8", nome: "Seguros", valor: -850 },
        { codigo: "5.1.9", nome: "Despesas Diversas", valor: -1_850 },
      ],
    },
    {
      nome: "EBITDA",
      natureza: "subtotal" as const,
      total: 41_200,
      contas: [],
    },
    {
      nome: "Impostos (DAS Simples Nacional)",
      natureza: "imposto" as const,
      total: -7_249,
      contas: [
        { codigo: "6.1.1", nome: "DAS — Simples Nacional", valor: -7_249 },
      ],
    },
    {
      nome: "Lucro Líquido",
      natureza: "resultado" as const,
      total: 33_951,
      contas: [],
    },
  ],
};

// ─── BALANÇO PATRIMONIAL (Dez/2025) ──────────────────────────────────────────

export const BALANCO = {
  competencia: "2025-12",
  ativo: {
    total: 538_600,
    grupos: [
      {
        nome: "Ativo Circulante",
        total: 261_400,
        contas: [
          { codigo: "1.1.1", nome: "Caixa e Equivalentes de Caixa", valor: 89_300 },
          { codigo: "1.1.2", nome: "Contas a Receber", valor: 94_800 },
          { codigo: "1.1.3", nome: "Estoque de Peças", valor: 72_400 },
          { codigo: "1.1.4", nome: "Outros Créditos", valor: 4_900 },
        ],
      },
      {
        nome: "Ativo Não Circulante",
        total: 277_200,
        contas: [
          { codigo: "1.2.1", nome: "Veículos e Máquinas", valor: 181_000 },
          { codigo: "1.2.2", nome: "Equipamentos de Oficina", valor: 76_700 },
          { codigo: "1.2.3", nome: "Móveis e Utensílios", valor: 19_500 },
        ],
      },
    ],
  },
  passivo: {
    total: 538_600,
    grupos: [
      {
        nome: "Passivo Circulante",
        total: 112_800,
        contas: [
          { codigo: "2.1.1", nome: "Fornecedores a Pagar", valor: 44_200 },
          { codigo: "2.1.2", nome: "Salários e Encargos a Pagar", valor: 36_400 },
          { codigo: "2.1.3", nome: "Impostos a Recolher", valor: 14_800 },
          { codigo: "2.1.4", nome: "Outras Obrigações", valor: 17_400 },
        ],
      },
      {
        nome: "Passivo Não Circulante",
        total: 42_300,
        contas: [
          { codigo: "2.2.1", nome: "Financiamentos (Veículos)", valor: 42_300 },
        ],
      },
      {
        nome: "Patrimônio Líquido",
        total: 383_500,
        contas: [
          { codigo: "3.1.1", nome: "Capital Social", valor: 80_000 },
          { codigo: "3.1.2", nome: "Lucros Acumulados", valor: 303_500 },
        ],
      },
    ],
  },
};

// ─── CALENDÁRIO FISCAL ────────────────────────────────────────────────────────

export type EventoCalendario = {
  id: string;
  titulo: string;
  descricao: string;
  data: string;      // "YYYY-MM-DD"
  tipo: "das" | "folha" | "prolabore" | "contabilidade" | "obrigacao" | "reuniao";
  valor?: number;    // when it's a payment
  status: "pago" | "pendente" | "vencido" | "agendado";
};

export const EVENTOS_CALENDARIO: EventoCalendario[] = [
  // ── Janeiro 2026 ────────────────────────────────────────────────────────────
  {
    id: "evt-001",
    titulo: "DASN-SIMEI 2025 — Entrega",
    descricao: "Declaração Anual do Simples Nacional referente ao exercício 2025.",
    data: "2026-01-31",
    tipo: "obrigacao",
    status: "pendente",
  },
  {
    id: "evt-002",
    titulo: "Folha de Pagamento — Janeiro/2026",
    descricao: "Pagamento da folha de pagamento e encargos trabalhistas.",
    data: "2026-01-05",
    tipo: "folha",
    valor: 27_200,
    status: "pago",
  },
  {
    id: "evt-003",
    titulo: "Pró-labore — Janeiro/2026",
    descricao: "Retirada de pró-labore dos sócios.",
    data: "2026-01-10",
    tipo: "prolabore",
    valor: 8_500,
    status: "pago",
  },
  {
    id: "evt-004",
    titulo: "Boleto Contabilidade — Janeiro/2026",
    descricao: "Mensalidade de serviços contábeis — Tributar Assessoria Contábil.",
    data: "2026-01-15",
    tipo: "contabilidade",
    valor: 1_200,
    status: "pago",
  },
  {
    id: "evt-005",
    titulo: "FGTS — Janeiro/2026",
    descricao: "Recolhimento mensal do FGTS dos colaboradores.",
    data: "2026-01-07",
    tipo: "folha",
    valor: 2_400,
    status: "pago",
  },
  {
    id: "evt-006",
    titulo: "DAS Simples Nacional — Dez/2025",
    descricao: "Guia de recolhimento do DAS referente à competência Dezembro/2025.",
    data: "2026-01-20",
    tipo: "das",
    valor: 7_249,
    status: "pago",
  },

  // ── Fevereiro 2026 ──────────────────────────────────────────────────────────
  {
    id: "evt-007",
    titulo: "Folha de Pagamento — Fevereiro/2026",
    descricao: "Pagamento da folha de pagamento e encargos trabalhistas.",
    data: "2026-02-05",
    tipo: "folha",
    valor: 27_200,
    status: "pago",
  },
  {
    id: "evt-008",
    titulo: "FGTS — Fevereiro/2026",
    descricao: "Recolhimento mensal do FGTS dos colaboradores.",
    data: "2026-02-07",
    tipo: "folha",
    valor: 2_400,
    status: "pago",
  },
  {
    id: "evt-009",
    titulo: "Pró-labore — Fevereiro/2026",
    descricao: "Retirada de pró-labore dos sócios.",
    data: "2026-02-10",
    tipo: "prolabore",
    valor: 8_500,
    status: "pago",
  },
  {
    id: "evt-010",
    titulo: "Boleto Contabilidade — Fevereiro/2026",
    descricao: "Mensalidade de serviços contábeis — Tributar Assessoria Contábil.",
    data: "2026-02-15",
    tipo: "contabilidade",
    valor: 1_200,
    status: "pago",
  },
  {
    id: "evt-011",
    titulo: "DAS Simples Nacional — Jan/2026",
    descricao: "Guia de recolhimento do DAS referente à competência Janeiro/2026.",
    data: "2026-02-20",
    tipo: "das",
    valor: 6_180,
    status: "pago",
  },
  {
    id: "evt-012",
    titulo: "DIRF 2025 — Entrega",
    descricao: "Declaração do Imposto sobre a Renda Retido na Fonte — exercício 2025.",
    data: "2026-02-28",
    tipo: "obrigacao",
    status: "pago",
  },

  // ── Março 2026 ───────────────────────────────────────────────────────────────
  {
    id: "evt-013",
    titulo: "Folha de Pagamento — Março/2026",
    descricao: "Pagamento da folha de pagamento e encargos trabalhistas.",
    data: "2026-03-05",
    tipo: "folha",
    valor: 27_200,
    status: "pago",
  },
  {
    id: "evt-014",
    titulo: "FGTS — Março/2026",
    descricao: "Recolhimento mensal do FGTS dos colaboradores.",
    data: "2026-03-07",
    tipo: "folha",
    valor: 2_400,
    status: "pago",
  },
  {
    id: "evt-015",
    titulo: "Pró-labore — Março/2026",
    descricao: "Retirada de pró-labore dos sócios.",
    data: "2026-03-10",
    tipo: "prolabore",
    valor: 8_500,
    status: "pago",
  },
  {
    id: "evt-016",
    titulo: "Boleto Contabilidade — Março/2026",
    descricao: "Mensalidade de serviços contábeis — Tributar Assessoria Contábil.",
    data: "2026-03-15",
    tipo: "contabilidade",
    valor: 1_200,
    status: "pago",
  },
  {
    id: "evt-017",
    titulo: "DAS Simples Nacional — Fev/2026",
    descricao: "Guia de recolhimento do DAS referente à competência Fevereiro/2026.",
    data: "2026-03-20",
    tipo: "das",
    valor: 6_340,
    status: "pago",
  },
  {
    id: "evt-018",
    titulo: "Reuniao Trimestral com Contador — Q1/2026",
    descricao: "Revisao de resultados do 1o trimestre, planejamento tributario e metas.",
    data: "2026-03-26",
    tipo: "reuniao",
    status: "agendado",
  },

  // ── Abril 2026 ───────────────────────────────────────────────────────────────
  {
    id: "evt-019",
    titulo: "Folha de Pagamento — Abril/2026",
    descricao: "Pagamento da folha de pagamento e encargos trabalhistas.",
    data: "2026-04-05",
    tipo: "folha",
    valor: 27_200,
    status: "pago",
  },
  {
    id: "evt-020",
    titulo: "FGTS — Abril/2026",
    descricao: "Recolhimento mensal do FGTS dos colaboradores.",
    data: "2026-04-07",
    tipo: "folha",
    valor: 2_400,
    status: "pago",
  },
  {
    id: "evt-021",
    titulo: "Pró-labore — Abril/2026",
    descricao: "Retirada de pró-labore dos sócios.",
    data: "2026-04-10",
    tipo: "prolabore",
    valor: 8_500,
    status: "pago",
  },
  {
    id: "evt-022",
    titulo: "Boleto Contabilidade — Abril/2026",
    descricao: "Mensalidade de serviços contábeis — Tributar Assessoria Contábil.",
    data: "2026-04-15",
    tipo: "contabilidade",
    valor: 1_200,
    status: "pago",
  },
  {
    id: "evt-023",
    titulo: "DAS Simples Nacional — Mar/2026",
    descricao: "Guia de recolhimento do DAS referente à competência Março/2026.",
    data: "2026-04-20",
    tipo: "das",
    valor: 6_720,
    status: "pago",
  },
  {
    id: "evt-024",
    titulo: "SPED Fiscal — Entrega EFD ICMS/IPI",
    descricao: "Entrega do arquivo SPED Fiscal referente ao 1o trimestre de 2026.",
    data: "2026-04-25",
    tipo: "obrigacao",
    status: "pago",
  },

  // ── Maio 2026 ────────────────────────────────────────────────────────────────
  {
    id: "evt-025",
    titulo: "Folha de Pagamento — Maio/2026",
    descricao: "Pagamento da folha de pagamento e encargos trabalhistas.",
    data: "2026-05-05",
    tipo: "folha",
    valor: 27_200,
    status: "pago",
  },
  {
    id: "evt-026",
    titulo: "FGTS — Maio/2026",
    descricao: "Recolhimento mensal do FGTS dos colaboradores.",
    data: "2026-05-07",
    tipo: "folha",
    valor: 2_400,
    status: "pago",
  },
  {
    id: "evt-027",
    titulo: "Pró-labore — Maio/2026",
    descricao: "Retirada de pró-labore dos sócios.",
    data: "2026-05-10",
    tipo: "prolabore",
    valor: 8_500,
    status: "pago",
  },
  {
    id: "evt-028",
    titulo: "Boleto Contabilidade — Maio/2026",
    descricao: "Mensalidade de serviços contábeis — Tributar Assessoria Contábil.",
    data: "2026-05-15",
    tipo: "contabilidade",
    valor: 1_200,
    status: "pendente",
  },
  {
    id: "evt-029",
    titulo: "DAS Simples Nacional — Abr/2026",
    descricao: "Guia de recolhimento do DAS referente à competência Abril/2026.",
    data: "2026-05-20",
    tipo: "das",
    valor: 6_950,
    status: "pendente",
  },

  // ── Junho 2026 ───────────────────────────────────────────────────────────────
  {
    id: "evt-030",
    titulo: "Folha de Pagamento — Junho/2026",
    descricao: "Pagamento da folha de pagamento e encargos trabalhistas.",
    data: "2026-06-05",
    tipo: "folha",
    valor: 27_200,
    status: "agendado",
  },
  {
    id: "evt-031",
    titulo: "FGTS — Junho/2026",
    descricao: "Recolhimento mensal do FGTS dos colaboradores.",
    data: "2026-06-07",
    tipo: "folha",
    valor: 2_400,
    status: "agendado",
  },
  {
    id: "evt-032",
    titulo: "Pró-labore — Junho/2026",
    descricao: "Retirada de pró-labore dos sócios.",
    data: "2026-06-10",
    tipo: "prolabore",
    valor: 8_500,
    status: "agendado",
  },
  {
    id: "evt-033",
    titulo: "Boleto Contabilidade — Junho/2026",
    descricao: "Mensalidade de serviços contábeis — Tributar Assessoria Contábil.",
    data: "2026-06-15",
    tipo: "contabilidade",
    valor: 1_200,
    status: "agendado",
  },
  {
    id: "evt-034",
    titulo: "DAS Simples Nacional — Mai/2026",
    descricao: "Guia de recolhimento do DAS referente à competência Maio/2026.",
    data: "2026-06-20",
    tipo: "das",
    valor: 7_100,
    status: "agendado",
  },
  {
    id: "evt-035",
    titulo: "Reuniao Trimestral com Contador — Q2/2026",
    descricao: "Revisao de resultados do 2o trimestre, planejamento tributario e metas.",
    data: "2026-06-25",
    tipo: "reuniao",
    status: "agendado",
  },
];

// ─── DOCUMENTOS ───────────────────────────────────────────────────────────────

export type Documento = {
  id: string;
  nome: string;
  tipo: "guia" | "relatorio" | "declaracao" | "contrato" | "certidao" | "boleto" | "ato_constitutivo";
  competencia: string;
  tamanhoKb: number;
  enviadoEm: string;
  enviadoPor: string;
  valor?: number;
};

export const DOCUMENTOS: Documento[] = [
  { id: "doc-001", nome: "Contrato Social — Auto Center São Jorge Ltda", tipo: "ato_constitutivo", competencia: "2024-01", tamanhoKb: 1_248, enviadoEm: "2024-01-10", enviadoPor: "Dr. Roberto Mendes" },
  { id: "doc-002", nome: "Cartão CNPJ", tipo: "certidao", competencia: "2024-01", tamanhoKb: 98, enviadoEm: "2024-01-10", enviadoPor: "Dr. Roberto Mendes" },
  { id: "doc-003", nome: "Alvará de Funcionamento 2025", tipo: "certidao", competencia: "2025-01", tamanhoKb: 312, enviadoEm: "2025-02-03", enviadoPor: "Ana Paula Ferreira" },
  { id: "doc-004", nome: "Contrato de Prestação de Serviços Contábeis", tipo: "contrato", competencia: "2024-01", tamanhoKb: 542, enviadoEm: "2024-01-15", enviadoPor: "Dr. Roberto Mendes" },
  { id: "doc-005", nome: "Boleto Contabilidade — Janeiro/2026", tipo: "boleto", competencia: "2026-01", tamanhoKb: 76, enviadoEm: "2026-01-08", enviadoPor: "Ana Paula Ferreira", valor: 1_200 },
  { id: "doc-006", nome: "Boleto Contabilidade — Dezembro/2025", tipo: "boleto", competencia: "2025-12", tamanhoKb: 76, enviadoEm: "2025-12-08", enviadoPor: "Ana Paula Ferreira", valor: 1_200 },
  { id: "doc-007", nome: "PGDAS-D — Dezembro 2025", tipo: "guia", competencia: "2025-12", tamanhoKb: 184, enviadoEm: "2026-01-08", enviadoPor: "Ana Paula Ferreira" },
  { id: "doc-008", nome: "PGDAS-D — Novembro 2025", tipo: "guia", competencia: "2025-11", tamanhoKb: 191, enviadoEm: "2025-12-08", enviadoPor: "Ana Paula Ferreira" },
  { id: "doc-009", nome: "PGDAS-D — Outubro 2025", tipo: "guia", competencia: "2025-10", tamanhoKb: 177, enviadoEm: "2025-11-07", enviadoPor: "Ana Paula Ferreira" },
  { id: "doc-010", nome: "PGDAS-D — Setembro 2025", tipo: "guia", competencia: "2025-09", tamanhoKb: 183, enviadoEm: "2025-10-09", enviadoPor: "Ana Paula Ferreira" },
  { id: "doc-011", nome: "Relatório DRE — Dezembro 2025", tipo: "relatorio", competencia: "2025-12", tamanhoKb: 318, enviadoEm: "2026-01-08", enviadoPor: "Ana Paula Ferreira" },
  { id: "doc-012", nome: "Fechamento Contábil — Q4/2025", tipo: "relatorio", competencia: "2025-12", tamanhoKb: 524, enviadoEm: "2026-01-15", enviadoPor: "Ana Paula Ferreira" },
  { id: "doc-013", nome: "Fechamento Contábil — Q3/2025", tipo: "relatorio", competencia: "2025-09", tamanhoKb: 498, enviadoEm: "2025-10-14", enviadoPor: "Ana Paula Ferreira" },
  { id: "doc-014", nome: "Relatório Anual — Exercício 2024", tipo: "relatorio", competencia: "2024-12", tamanhoKb: 892, enviadoEm: "2025-02-14", enviadoPor: "Dr. Roberto Mendes" },
  { id: "doc-015", nome: "DASN-SIMEI — Exercício 2024", tipo: "declaracao", competencia: "2024-12", tamanhoKb: 234, enviadoEm: "2025-01-31", enviadoPor: "Ana Paula Ferreira" },
  { id: "doc-016", nome: "DIRF 2025", tipo: "declaracao", competencia: "2025-12", tamanhoKb: 187, enviadoEm: "2026-02-28", enviadoPor: "Ana Paula Ferreira" },
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
    titulo: "Dúvida sobre resultado de outubro/2024 — EBITDA negativo",
    tipo: "Financeiro",
    prioridade: "alta",
    status: "resolvido",
    abertoPor: "Carlos Eduardo (Sócio)",
    atribuidoPara: "Ana Paula Ferreira",
    criadoEm: "2024-11-05T09:15:00",
    atualizadoEm: "2024-11-06T14:30:00",
    mensagens: [
      {
        id: "msg-001",
        autor: "Carlos Eduardo",
        autorTipo: "cliente",
        conteudo: "Ana Paula, o relatório de outubro fechou com EBITDA negativo de -R$ 3.900. O que aconteceu? Nunca vi isso antes.",
        criadoEm: "2024-11-05T09:15:00",
      },
      {
        id: "msg-002",
        autor: "Ana Paula Ferreira",
        autorTipo: "escritorio",
        conteudo: "Carlos, o impacto veio da manutenção emergencial do compressor de ar (R$ 13.800 extraordinário). Fora isso, o mês estava normal. Já classifiquei como despesa não recorrente. Novembro volta ao padrão — posso preparar uma análise comparativa se quiser.",
        criadoEm: "2024-11-06T14:30:00",
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
    criadoEm: "2026-01-10T11:00:00",
    atualizadoEm: "2026-01-12T16:45:00",
    mensagens: [
      {
        id: "msg-003",
        autor: "Carlos Eduardo",
        autorTipo: "cliente",
        conteudo: "Preciso de uma declaração de faturamento dos últimos 12 meses para o banco. É para financiar dois elevadores novos.",
        criadoEm: "2026-01-10T11:00:00",
      },
      {
        id: "msg-004",
        autor: "Ana Paula Ferreira",
        autorTipo: "escritorio",
        conteudo: "Perfeito! Com o resultado de 2025 (receita de R$ 1,28M, alta de 12,5% sobre 2024), o dossiê para o banco fica muito sólido. Pode confirmar o CNPJ e razão social do banco para constar na declaração?",
        criadoEm: "2026-01-12T16:45:00",
      },
    ],
  },
  {
    id: "tkt-003",
    titulo: "Planejamento tributário 2026 — avaliação de regime",
    tipo: "Tributário",
    prioridade: "media",
    status: "em_andamento",
    abertoPor: "Carlos Eduardo (Sócio)",
    atribuidoPara: "Ana Paula Ferreira",
    criadoEm: "2026-01-15T10:00:00",
    atualizadoEm: "2026-01-15T10:00:00",
    mensagens: [
      {
        id: "msg-005",
        autor: "Carlos Eduardo",
        autorTipo: "cliente",
        conteudo: "Com o crescimento que tivemos em 2025, vale a pena continuar no Simples Nacional ou migrar para Lucro Presumido?",
        criadoEm: "2026-01-15T10:00:00",
      },
      {
        id: "msg-006",
        autor: "Ana Paula Ferreira",
        autorTipo: "escritorio",
        conteudo: "Boa pergunta. Com receita de R$ 1,28M em 2025 e crescimento projetado para 2026, estamos se aproximando do limite do Simples (R$ 4,8M). Vou preparar uma simulação comparativa Simples × Presumido com os dados reais de 2025. Entrego até sexta.",
        criadoEm: "2026-01-15T17:00:00",
      },
    ],
  },
];

// ─── KPIs MÊS ATUAL ───────────────────────────────────────────────────────────

export function getKPIsMesAtual() {
  const atual = DRE_MESES[DRE_MESES.length - 1];     // Dez/25
  const anterior = DRE_MESES[DRE_MESES.length - 2];  // Nov/25
  const mesmoAnoAnterior = DRE_MESES[DRE_MESES.length - 13]; // Dez/24

  return {
    receita: {
      valor: atual.receita,
      variacao: ((atual.receita - anterior.receita) / anterior.receita) * 100,
      variacaoYoy: ((atual.receita - mesmoAnoAnterior.receita) / mesmoAnoAnterior.receita) * 100,
    },
    ebitda: {
      valor: atual.ebitda,
      variacao: ((atual.ebitda - anterior.ebitda) / anterior.ebitda) * 100,
      margem: (atual.ebitda / atual.receita) * 100,
    },
    lucroLiquido: {
      valor: atual.lucroLiquido,
      variacao: ((atual.lucroLiquido - anterior.lucroLiquido) / anterior.lucroLiquido) * 100,
      margem: (atual.lucroLiquido / atual.receita) * 100,
    },
    impostos: {
      valor: atual.impostos,
      aliquotaEfetiva: (atual.impostos / atual.receita) * 100,
    },
    competencia: atual.competencia,
    competenciaLabel: "Dezembro 2025",
    mesAnteriorLabel: "Novembro 2025",
  };
}
