import type { DREMes } from "./mock-data";

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
