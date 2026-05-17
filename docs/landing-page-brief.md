# Landing Page — Briefing Completo
**Produto:** Contabil 360  
**Público:** Donos e sócios de escritórios de contabilidade (20–300 clientes ativos)  
**Objetivo da página:** Gerar pedidos de acesso beta. Uma ação, um CTA.

---

## 1. Proposta de valor em uma frase

> O escritório de contabilidade já tem sistema. O cliente final, não.

Frase secundária de apoio:
> Enquanto seus concorrentes ainda enviam DRE por email e documentos por WhatsApp, seus clientes acessam tudo em tempo real — no celular, como um app.

---

## 2. Tom e posicionamento

- **Corporativo, confiável, analítico.** Não é uma startup de fintech colorida.
- **Referência visual:** Linear, Notion, Salesforce Analytics — clean, dados em primeiro plano, tipografia forte.
- **Anti-referência:** Omie (visual carregado, badges por todo lado, tom genérico).
- **Sem:** gradientes decorativos, ilustrações cartoon, emojis, jargão de startup ("disruptivo", "revolucionário").
- **Com:** espaço em branco generoso, hierarquia tipográfica clara, dados reais, contraste forte.

---

## 3. Design System (obrigatório respeitar)

### Cores
| Token | Hex | Uso na landing |
|---|---|---|
| background | `#FFFFFF` | Fundo principal |
| surface | `#F9FAFB` | Seções alternadas, cards |
| sidebar | `#111827` | Hero background, footer, logo |
| primary | `#166534` | CTA buttons, links, destaques |
| primary-light | `#DCFCE7` | Badges, highlights suaves |
| text | `#111827` | Corpo de texto |
| muted | `#6B7280` | Subtítulos, labels, metadados |
| border | `#E5E7EB` | Divisores, bordas de cards |
| success | `#16A34A` | Valores positivos, ícones positivos |
| warning | `#D97706` | Pendente, atenção |

### Tipografia
- **Fonte:** Inter (Google Fonts ou CDN)
- **Pesos:** 400 (body), 500 (label), 600 (subheading), 700 (heading)
- **Sem** fonte display, serif ou decorativa
- Line-height 1.5 para body, 1.15 para headings grandes

### Logo mark
Quatro círculos brancos formando um losango, em fundo `#111827` com `border-radius` generoso.
Geometria: círculo N (topo centro), E (direita centro), S (base centro), W (esquerda centro). O vazio central comporta um quinto círculo do mesmo tamanho. Ver SVG abaixo.

```svg
<svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="36" fill="#111827"/>
  <circle cx="90" cy="50" r="20" fill="white"/>
  <circle cx="130" cy="90" r="20" fill="white"/>
  <circle cx="90" cy="130" r="20" fill="white"/>
  <circle cx="50" cy="90" r="20" fill="white"/>
</svg>
```

### Ícones
Lucide Icons (https://lucide.dev) — traço fino, sem fill, estilo linear.

---

## 4. Estrutura de seções (ordem sugerida)

### 4.1 — Navbar
- Logo (mark + "Contabil 360") à esquerda
- Link "Demo" e botão "Solicitar acesso" à direita
- Fundo branco, `border-bottom: 1px solid #E5E7EB`, sticky

### 4.2 — Hero
**Background:** `#111827` (escuro, contrasta com o restante da página)  
**Headline (grande, branco):**
> O escritório de contabilidade já tem sistema.  
> O cliente final, não.

**Subheadline (menor, `#9CA3AF`):**
> DRE, documentos, obrigações fiscais e canal de atendimento — tudo em um portal que o cliente acessa no celular, sem depender de você para cada consulta.

**CTA primário:** "Solicitar acesso beta" → botão verde (`#166534`, texto branco)  
**CTA secundário:** "Ver demonstração" → botão outline branco

**Visual:** mockup/screenshot do painel inicial do portal (KPIs, gráfico de evolução). Pode ser um frame de browser ou mobile, escuro ao redor.

### 4.3 — Dor (fundo branco)
Três colunas ou cards, cada um com um ícone Lucide e título curto + descrição:

| Ícone | Título | Descrição |
|---|---|---|
| `MessageSquare` | WhatsApp não é canal | Documentos perdidos, sem histórico, sem rastreamento. Cada mensagem é tempo cobrado de quem poderia estar produzindo. |
| `FileX` | PDF ignorado | O DRE chega por email uma vez ao mês. O cliente não abre. Quando abre, não entende. Quando questiona, você para tudo. |
| `Clock` | Prazo virou problema do contador | O cliente não acompanha o calendário fiscal. Quando vence, a culpa é do escritório. |

### 4.4 — Produto (fundo `#F9FAFB`)
Tabs ou lista lateral com as funcionalidades principais — cada item com screenshot ou ilustração à direita:

1. **Painel Financeiro** — KPIs do mês, gráfico 12 meses, obrigações em aberto
2. **Relatórios** — DRE detalhada, Balanço, Análise comparativa, exportação PDF
3. **Documentos** — busca, download, sem reenvio por WhatsApp
4. **Calendário Fiscal** — obrigações, vencimentos, status pago/pendente/vencido
5. **Atendimento** — tickets com histórico, sem perda de contexto

### 4.5 — Prova de mercado (fundo branco)
Dois blocos em colunas:

**Coluna esquerda — mercado brasileiro:**
- 75.000+ escritórios ativos
- 19 milhões de CNPJs atendidos
- +14% ao ano em software contábil

**Coluna direita — validação internacional:**
> Karbon, TaxDome e Canopy resolveram este problema nos EUA.  
> Crescem 40%+ ao ano. Faturam entre USD 3.000 e 8.000 por escritório por ano.  
> **O Brasil está 4 a 5 anos atrás nessa curva.**

### 4.6 — Modelo de negócio (fundo `#F9FAFB`)
Tabela de planos limpa, sem muito destaque visual agressivo:

| Plano | Clientes | Por cliente/mês |
|---|---|---|
| Seed | 1–30 | R$ 29 |
| Growth | 10–150 | R$ 39 |
| Pro | 50–500 | R$ 49 |

Nota abaixo da tabela:
> Escritório com 80 clientes no Growth: paga R$ 3.120/mês. Repassando a R$ 99/cliente, gera R$ 4.720/mês de margem nova. Sem contratar.

### 4.7 — CTA final (fundo `#111827`)
**Headline:**
> Não existe lista de espera longa.  
> Se faz sentido para a sua operação, a conversa é direta.

**Formulário simples:** Nome, Email, Nº de clientes ativos → botão "Solicitar acesso"  
(Ou apenas email + botão, dependendo do que o designer preferir)

### 4.8 — Footer
Logo + tagline + links simples + copyright

---

## 5. Conteúdo textual completo

Todo o conteúdo já está no README.md do repositório. Usar como fonte principal. Não inventar métricas ou afirmações.

---

## 6. Referências visuais (inspiração, não cópia)

- **Linear.app** — hero escuro, tipografia grande, produto em destaque
- **Vercel.com** — hero escuro, cards de features limpos, prova social com logos
- **Loom.com** — storytelling visual antes do produto
- **Notion.so** — conteúdo em primeiro lugar, sem excesso de cor

---

## 7. Especificações técnicas

- **Responsivo:** mobile-first (o comprador frequentemente decide no celular)
- **Não usar React ou Next.js** nesta landing — HTML/CSS/JS vanilla ou framework leve (Astro, 11ty, Hugo)
- **Fonte:** Inter via `<link rel="preconnect">` + Google Fonts
- **Ícones:** Lucide via CDN (`https://unpkg.com/lucide@latest`)
- **Sem dependências de UI pesadas** — a landing tem que carregar em < 1s
- **CTA:** formulário simples que pode apontar para Typeform, Notion form ou mailto por enquanto
- **Deploy:** Netlify (basta arrastar a pasta `dist/` ou conectar o repositório)

---

## 8. O que NÃO fazer

- Sem emojis em qualquer lugar
- Sem ilustrações estilo Undraw ou cartoon
- Sem animações complexas ou parallax agressivo — micro-animações sutis são bem-vindas
- Sem depoimentos inventados
- Sem "Plano Gratuito" ou "Free Forever" — ainda não existe
- Sem logos de clientes — ainda não temos
- Não usar cores fora do design system

---
