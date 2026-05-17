import type { DREMes } from "./mock-data";
import { formatCurrencyCompact } from "./utils";

export type Periodo = "mensal" | "trimestral" | "anual";

export type PeriodoAgrupado = {
  label: string;
  periodoKey: string;
  receita: number;
  cmv: number;
  lucroBruto: number;
  despesasOp: number;
  ebitda: number;
  impostos: number;
  lucroLiquido: number;
  margemEbitda: number;
  margemLiquida: number;
  varReceita?: number;
  varEbitda?: number;
  varLucroLiquido?: number;
  temNegativo: boolean;
};

function somarMeses(meses: DREMes[]): Omit<PeriodoAgrupado, "label" | "periodoKey" | "margemEbitda" | "margemLiquida" | "temNegativo"> {
  return {
    receita: meses.reduce((s, m) => s + m.receita, 0),
    cmv: meses.reduce((s, m) => s + m.cmv, 0),
    lucroBruto: meses.reduce((s, m) => s + m.lucroBruto, 0),
    despesasOp: meses.reduce((s, m) => s + m.despesasOp, 0),
    ebitda: meses.reduce((s, m) => s + m.ebitda, 0),
    impostos: meses.reduce((s, m) => s + m.impostos, 0),
    lucroLiquido: meses.reduce((s, m) => s + m.lucroLiquido, 0),
  };
}

function calcVariacao(atual: number, anterior: number): number | undefined {
  if (anterior === 0) return undefined;
  return ((atual - anterior) / Math.abs(anterior)) * 100;
}

export function agruparPorPeriodo(meses: DREMes[], periodo: Periodo): PeriodoAgrupado[] {
  let grupos: { label: string; periodoKey: string; meses: DREMes[] }[] = [];

  if (periodo === "mensal") {
    grupos = meses.map((m) => ({
      label: m.mesLabel,
      periodoKey: m.competencia,
      meses: [m],
    }));
  }

  if (periodo === "trimestral") {
    const anos = [...new Set(meses.map((m) => m.ano))];
    for (const ano of anos) {
      for (let q = 1; q <= 4; q++) {
        const mesesTrimestre = meses.filter(
          (m) => m.ano === ano && Math.ceil(m.mes / 3) === q
        );
        if (mesesTrimestre.length > 0) {
          grupos.push({
            label: `Q${q}/${String(ano).slice(2)}`,
            periodoKey: `${ano}-Q${q}`,
            meses: mesesTrimestre,
          });
        }
      }
    }
  }

  if (periodo === "anual") {
    const anos = [...new Set(meses.map((m) => m.ano))];
    for (const ano of anos) {
      const mesesAno = meses.filter((m) => m.ano === ano);
      if (mesesAno.length > 0) {
        grupos.push({ label: String(ano), periodoKey: String(ano), meses: mesesAno });
      }
    }
  }

  const resultados: PeriodoAgrupado[] = grupos.map(({ label, periodoKey, meses: ms }) => {
    const soma = somarMeses(ms);
    return {
      label,
      periodoKey,
      ...soma,
      margemEbitda: soma.receita > 0 ? (soma.ebitda / soma.receita) * 100 : 0,
      margemLiquida: soma.receita > 0 ? (soma.lucroLiquido / soma.receita) * 100 : 0,
      temNegativo: soma.ebitda < 0 || soma.lucroLiquido < 0,
    };
  });

  // Adiciona variações vs período anterior
  for (let i = 1; i < resultados.length; i++) {
    const atual = resultados[i];
    const anterior = resultados[i - 1];
    atual.varReceita = calcVariacao(atual.receita, anterior.receita);
    atual.varEbitda = calcVariacao(atual.ebitda, anterior.ebitda);
    atual.varLucroLiquido = calcVariacao(atual.lucroLiquido, anterior.lucroLiquido);
  }

  return resultados;
}

export function resumoAnual(meses: DREMes[], ano: number) {
  const ms = meses.filter((m) => m.ano === ano);
  const soma = somarMeses(ms);
  const mesesPositivos = ms.filter((m) => m.ebitda > 0).length;
  const melhorMes = ms.reduce((best, m) => (m.ebitda > best.ebitda ? m : best), ms[0]);
  const piorMes = ms.reduce((worst, m) => (m.ebitda < worst.ebitda ? m : worst), ms[0]);
  return {
    ...soma,
    margemEbitda: (soma.ebitda / soma.receita) * 100,
    margemLiquida: (soma.lucroLiquido / soma.receita) * 100,
    mesesPositivos,
    mesesNegativos: 12 - mesesPositivos,
    melhorMes,
    piorMes,
  };
}

export type InsightTipo = "alerta" | "atencao" | "elogio" | "neutro";
export type InsightIcone = "TrendingUp" | "TrendingDown" | "AlertTriangle" | "Info";

export type Insight = {
  tipo: InsightTipo;
  titulo: string;
  descricao: string;
  icone: InsightIcone;
};

export function gerarInsight(meses: DREMes[]): Insight {
  if (meses.length === 0) {
    return { tipo: "neutro", titulo: "Sem dados disponíveis", descricao: "Nenhum período com lançamentos.", icone: "Info" };
  }

  const atual = meses[meses.length - 1];
  const anterior = meses.length >= 2 ? meses[meses.length - 2] : null;

  // Resultado líquido negativo
  if (atual.lucroLiquido < 0) {
    return {
      tipo: "alerta",
      titulo: atual.ebitda < 0 ? "Resultado operacional e líquido negativos" : "Resultado líquido negativo",
      descricao: `O mês fechou com prejuízo de ${formatCurrencyCompact(Math.abs(atual.lucroLiquido))}. ${atual.observacao ?? "Verifique as despesas extraordinárias com seu contador."}`,
      icone: "TrendingDown",
    };
  }

  // EBITDA negativo
  if (atual.ebitda < 0) {
    return {
      tipo: "alerta",
      titulo: "Resultado operacional negativo",
      descricao: `As despesas operacionais superaram o lucro bruto em ${formatCurrencyCompact(Math.abs(atual.ebitda))}. Revise a composição de custos com seu contador.`,
      icone: "AlertTriangle",
    };
  }

  // Receita caiu mais de 20% vs mês anterior
  if (anterior && anterior.receita > 0) {
    const varReceita = ((atual.receita - anterior.receita) / anterior.receita) * 100;
    if (varReceita < -20) {
      return {
        tipo: "atencao",
        titulo: `Receita recuou ${Math.abs(varReceita).toFixed(0)}% em relação a ${anterior.mesLabel}`,
        descricao: `A queda de ${formatCurrencyCompact(anterior.receita - atual.receita)} pode refletir sazonalidade. Acompanhe a evolução nas próximas semanas.`,
        icone: "AlertTriangle",
      };
    }
  }

  // Melhor lucro líquido do período
  const maxLucro = Math.max(...meses.map((m) => m.lucroLiquido));
  if (atual.lucroLiquido >= maxLucro) {
    const margem = ((atual.lucroLiquido / atual.receita) * 100).toFixed(1);
    return {
      tipo: "elogio",
      titulo: `Melhor resultado dos últimos ${meses.length} meses`,
      descricao: `Lucro líquido de ${formatCurrencyCompact(atual.lucroLiquido)} com margem de ${margem}% — o maior do período analisado.`,
      icone: "TrendingUp",
    };
  }

  // Melhor EBITDA do período
  const maxEbitda = Math.max(...meses.map((m) => m.ebitda));
  if (atual.ebitda >= maxEbitda) {
    const margem = ((atual.ebitda / atual.receita) * 100).toFixed(1);
    return {
      tipo: "elogio",
      titulo: `Melhor EBITDA dos últimos ${meses.length} meses`,
      descricao: `EBITDA de ${formatCurrencyCompact(atual.ebitda)} com margem de ${margem}% — eficiência operacional em alta.`,
      icone: "TrendingUp",
    };
  }

  // Recuperação após mês negativo
  if (anterior && anterior.lucroLiquido < 0 && atual.lucroLiquido > 0) {
    return {
      tipo: "elogio",
      titulo: `Recuperação após resultado negativo em ${anterior.mesLabel}`,
      descricao: `A empresa voltou ao azul com lucro líquido de ${formatCurrencyCompact(atual.lucroLiquido)}.`,
      icone: "TrendingUp",
    };
  }

  // Três meses consecutivos de queda no lucro
  if (meses.length >= 4) {
    const [m3, m2, m1] = meses.slice(-3);
    const ref = meses[meses.length - 4];
    if (m3.lucroLiquido < ref.lucroLiquido && m2.lucroLiquido < m3.lucroLiquido && m1.lucroLiquido < m2.lucroLiquido) {
      return {
        tipo: "atencao",
        titulo: "Lucro em queda por 3 meses consecutivos",
        descricao: `A tendência de redução pode indicar pressão em custos ou receita estagnada. Vale revisar a composição de despesas com seu contador.`,
        icone: "AlertTriangle",
      };
    }
  }

  // Margem EBITDA acima de 30%
  const margemEbitda = (atual.ebitda / atual.receita) * 100;
  if (margemEbitda > 30) {
    return {
      tipo: "elogio",
      titulo: `Margem EBITDA de ${margemEbitda.toFixed(1)}% — excelente eficiência`,
      descricao: `Empresas saudáveis no segmento tipicamente operam entre 15% e 25%. Manter custos sob controle é o caminho para crescer com consistência.`,
      icone: "TrendingUp",
    };
  }

  // Acima da média do período
  const mediaLucro = meses.reduce((s, m) => s + m.lucroLiquido, 0) / meses.length;
  if (atual.lucroLiquido > mediaLucro * 1.1) {
    const pct = ((atual.lucroLiquido / mediaLucro - 1) * 100).toFixed(0);
    return {
      tipo: "elogio",
      titulo: "Resultado acima da média do período",
      descricao: `O lucro líquido de ${formatCurrencyCompact(atual.lucroLiquido)} está ${pct}% acima da média mensal de ${formatCurrencyCompact(mediaLucro)} dos últimos ${meses.length} meses.`,
      icone: "TrendingUp",
    };
  }

  // Neutro
  const margem = ((atual.lucroLiquido / atual.receita) * 100).toFixed(1);
  return {
    tipo: "neutro",
    titulo: "Resultado dentro do padrão histórico",
    descricao: `Lucro líquido de ${formatCurrencyCompact(atual.lucroLiquido)} com margem de ${margem}%. Sem variações significativas em relação ao histórico recente.`,
    icone: "Info",
  };
}
