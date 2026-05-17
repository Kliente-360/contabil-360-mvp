# Meta Prompt — Landing Page Contabil 360

Cole este prompt exatamente como está para iniciar a sessão no Claude Design.

---

## PROMPT

Você vai criar a landing page completa do **Contabil 360** — um SaaS B2B para escritórios de contabilidade brasileiros.

**O que é o produto:**
Plataforma que conecta o escritório de contabilidade com o cliente final (PME). O escritório opera o back-office; o cliente acessa um portal próprio com DRE, Balanço Patrimonial, documentos, calendário fiscal e canal de atendimento — sem depender do contador para cada consulta.

**Público-alvo da landing:** Donos e sócios de escritórios de contabilidade com 20–300 clientes ativos.

**Objetivo único da página:** Gerar pedidos de acesso beta. Um CTA, uma ação.

---

### Design System (não negociável)

**Paleta:**
- Background: `#FFFFFF`
- Surface (seções alternadas, cards): `#F9FAFB`
- Dark (hero, footer, navbar): `#111827`
- Primary (CTA, links, destaques): `#166534`
- Primary light (badges): `#DCFCE7`
- Text: `#111827`
- Muted: `#6B7280`
- Border: `#E5E7EB`
- Success: `#16A34A`
- Warning: `#D97706`

**Tipografia:** Inter (Google Fonts). Pesos 400, 500, 600, 700. Sem serifa, sem display. Headings grandes com line-height 1.15.

**Logo mark:** Quatro círculos brancos em losango sobre fundo `#111827` com border-radius. SVG:
```svg
<svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="36" fill="#111827"/>
  <circle cx="90" cy="50" r="20" fill="white"/>
  <circle cx="130" cy="90" r="20" fill="white"/>
  <circle cx="90" cy="130" r="20" fill="white"/>
  <circle cx="50" cy="90" r="20" fill="white"/>
</svg>
```

**Ícones:** Lucide Icons (traço fino, sem fill). CDN: `https://unpkg.com/lucide@latest`

**Referência visual:** Linear.app, Vercel.com — hero escuro, tipografia grande, produto em destaque, muito espaço em branco.

**Anti-referência:** Nada com gradientes coloridos, ilustrações cartoon, emojis, ou excesso de badges.

---

### Estrutura da página (8 seções)

**1. Navbar**
Logo (SVG acima + "Contabil 360") à esquerda. Links "Demo" e botão "Solicitar acesso" (verde `#166534`) à direita. Sticky, fundo branco, borda inferior `#E5E7EB`.

**2. Hero — fundo `#111827`**
Headline grande em branco:
> "O escritório de contabilidade já tem sistema. O cliente final, não."

Subheadline em `#9CA3AF`:
> "DRE, documentos, obrigações fiscais e canal de atendimento — tudo em um portal que o cliente acessa no celular, sem depender de você para cada consulta."

CTA primário: "Solicitar acesso beta" (verde).
CTA secundário: "Ver demonstração" (outline branco).
Visual: mockup de dashboard com KPIs — pode ser um frame de browser estilizado com dados fictícios coerentes com o produto.

**3. Dor — fundo `#FFFFFF`**
Três cards horizontais com ícone Lucide + título + descrição curta:
- `MessageSquare` / "WhatsApp não é canal" / "Documentos perdidos, sem histórico, sem rastreamento. Cada mensagem é tempo do seu time que não foi cobrado."
- `FileX` / "PDF ignorado" / "O DRE chega por email uma vez ao mês. O cliente não abre. Quando questiona, você para tudo para explicar o que já está no relatório."
- `Clock` / "Prazo virou problema do contador" / "O cliente não acompanha o calendário fiscal. Quando vence, a culpa é do escritório."

**4. Produto — fundo `#F9FAFB`**
Tabs ou lista lateral navegável. Cada item: título + descrição curta + visual/mockup à direita.
Cinco features: Painel Financeiro, Relatórios, Documentos, Calendário Fiscal, Atendimento.

**5. Prova de mercado — fundo `#FFFFFF`**
Duas colunas.
Esquerda — Brasil: 75.000+ escritórios ativos / 19 milhões de CNPJs / +14% ao ano.
Direita — Internacional: "Karbon, TaxDome e Canopy resolveram este problema nos EUA. Crescem 40%+ ao ano. O Brasil está 4 a 5 anos atrás nessa curva."

**6. Modelo de negócio — fundo `#F9FAFB`**
Tabela de planos limpa:
- Seed: 1–30 clientes / R$ 29 por cliente/mês
- Growth: 10–150 clientes / R$ 39 por cliente/mês
- Pro: 50–500 clientes / R$ 49 por cliente/mês

Nota: "Escritório com 80 clientes no Growth paga R$ 3.120/mês. Repassando a R$ 99/cliente, gera R$ 4.720/mês de margem nova. Sem contratar."

**7. CTA final — fundo `#111827`**
Headline: "Não existe lista de espera longa. Se faz sentido para a sua operação, a conversa é direta."
Formulário: Nome + Email + Nº de clientes ativos + botão "Solicitar acesso" (verde).

**8. Footer**
Logo + tagline "O contador tem o sistema. O cliente merece o portal." + copyright.

---

### Especificações técnicas

- **Stack:** HTML + CSS + JavaScript vanilla. Sem React, sem Next.js. Pode usar Tailwind CSS via CDN se preferir.
- **Responsivo:** mobile-first. O botão de CTA deve ser sempre visível no mobile sem scroll horizontal.
- **Performance:** < 1s de carregamento. Sem imagens pesadas — usar SVG e CSS para mockups se necessário.
- **Fontes:** Inter via `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link>` da fonte.
- **Deploy:** uma pasta `dist/` com `index.html` pronto para arrastar no Netlify.

---

### Restrições absolutas

- Zero emojis
- Zero ilustrações cartoon ou clipart
- Zero depoimentos inventados
- Zero métricas além das fornecidas acima
- Zero cores fora da paleta definida
- Não adicionar seções além das 8 listadas sem perguntar

---

### Entregável esperado

Arquivo `index.html` único e autocontido (com `<style>` inline ou `<link>` para CSS externo no mesmo projeto), funcional, responsivo, pronto para deploy. Se gerar múltiplos arquivos, organizar em pasta `landing/`.

Comece pelo Hero e Navbar, mostre, e siga seção por seção para revisão antes de avançar.
