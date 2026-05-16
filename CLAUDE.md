# Contabil 360 — Contexto para Claude Code

## O que é este projeto

Contabil 360 é um SaaS B2B2C para escritórios de contabilidade brasileiros. O produto conecta dois tipos de usuário em um único ambiente digital:

- **Admin (escritório):** gerencia clientes, lançamentos, documentos e tickets
- **Portal (cliente PME):** acessa relatórios financeiros, documentos, tickets e calendário fiscal

O diferencial central: nenhuma solução no mercado brasileiro integra nativamente o back-office do escritório com um portal self-service para o cliente final. Omie, ContaAzul e Questor focam no contador. O Contabil 360 cria a camada de relacionamento entre contador e cliente.

---

## Stack

### Frontend
- Next.js 14 (App Router) — TypeScript strict mode obrigatório
- Tailwind CSS
- shadcn/ui + Radix UI (componentes base)
- Lucide React (único pacote de ícones permitido — SVG, linha fina)
- TanStack Query v5 (data fetching e cache client-side)
- React Hook Form + Zod (formulários e validação)
- Recharts (gráficos financeiros)
- date-fns + date-fns-tz (manipulação de datas — zero Moment.js)

### Backend (Sprint 1 — Next.js API Routes)
- Next.js Route Handlers (App Router) — sem servidor separado no Sprint 1
- Drizzle ORM (queries type-safe para PostgreSQL)
- Better Auth (autenticação multi-tenant)
- Zod (validação de input em todos os endpoints)

### Banco de Dados e Infra
- PostgreSQL 16 via Neon (principal)
- Redis via Upstash (cache de sessões e relatórios)
- Cloudflare R2 (documentos e PDFs)
- Resend (emails transacionais)

### Deploy
- Vercel (frontend + API Routes)

### Sprint 2+ (fora do escopo atual)
- Fastify standalone (quando necessitar WebSocket ou jobs pesados)
- Turborepo monorepo (quando Fastify for separado)
- BullMQ (filas de background jobs)
- Anthropic Claude API (IA de classificação de lançamentos)
- AWS Textract (OCR de notas fiscais em PDF)

---

## Arquitetura de Arquivos (Sprint 1)

```
app/
├── (auth)/
│   └── login/              Login unificado — detecta tipo de usuário pelo JWT
├── (portal)/               Rotas do cliente PME
│   ├── inicio/             Dashboard com KPIs do mês
│   ├── relatorios/         DRE + Balanço Patrimonial (tabs)
│   ├── documentos/         Lista + download via presigned URL
│   └── tickets/            Criar + acompanhar tickets
├── (admin)/                Rotas do escritório (Sprint 1B)
│   ├── dashboard/
│   ├── clientes/
│   ├── lancamentos/
│   ├── documentos/
│   └── tickets/
└── api/                    Route Handlers (backend)
    ├── auth/
    └── portal/
        ├── inicio/
        ├── relatorios/
        ├── documentos/
        └── tickets/

lib/
├── db/
│   ├── schema.ts           Schema Drizzle completo
│   ├── index.ts            Conexão Neon
│   └── queries/            Query functions por domínio
├── auth.ts                 Better Auth config
└── validations.ts          Zod schemas compartilhados

components/
├── ui/                     shadcn/ui (gerado via CLI, não editar manualmente)
├── portal/                 Componentes exclusivos do portal cliente
├── admin/                  Componentes do admin (Sprint 1B)
└── shared/                 Compartilhados entre portais
```

---

## Design System

### Princípios inegociáveis
- Clean, minimalista, light-first
- Tom corporativo e confiável — referência Notion + Salesforce Analytics
- Dados em primeiro plano — tipografia clara, hierarquia forte
- **ZERO emoji em qualquer circunstância — em código, comentários, UI, seed data**
- **Ícones exclusivamente via Lucide React** — nunca unicode, nunca emoji, nunca outra biblioteca
- Sem gradientes decorativos, sem sombras excessivas, sem bordas arredondadas exageradas

### Tokens de Cor

```typescript
// Usar via CSS variables no globals.css ou classes Tailwind customizadas
const designTokens = {
  background:   '#FFFFFF', // fundo principal de todas as páginas
  surface:      '#F9FAFB', // cards, linhas alternadas de tabela, inputs
  sidebar:      '#111827', // navegação lateral (admin e portal)
  primary:      '#166534', // botões primários, links, acento principal
  primaryLight: '#DCFCE7', // badges, highlights, estados ativos suaves
  text:         '#111827', // texto principal
  muted:        '#6B7280', // labels, subtítulos, placeholders, metadados
  border:       '#E5E7EB', // divisores, bordas de cards e inputs
  success:      '#16A34A', // valores positivos, crédito, status ativo
  warning:      '#D97706', // atenção, pendente, vencimento próximo
  error:        '#DC2626', // erro, débito, status crítico, negativo
}
```

### Tipografia
- Fonte: **Inter** via Google Fonts ou next/font
- Sem fonte display ou serif
- Pesos usados: 400 (body), 500 (label/caption), 600 (subheading), 700 (heading)
- Line-height padrão: 1.5 para body, 1.2 para headings

### Gráficos
- Paleta monocromática baseada em `#166534` (shades de verde)
- `#E5E7EB` para linhas de grid
- Tooltips: fundo `#FFFFFF`, borda `#E5E7EB`, texto `#111827`
- Sem gradientes de área fortes — máximo 15% de opacidade no fill

---

## Regras de Negócio — Obrigatórias

### Dados financeiros
- **Sempre `decimal(15,2)` no banco** — nunca `float` ou `number` nativo para valores monetários
- Drizzle usa `decimal()` que retorna string — converter com `parseFloat()` apenas para exibição
- Nunca usar aritmética de ponto flutuante em cálculos contábeis — acumular em inteiros (centavos) ou usar biblioteca Decimal.js se necessário

### Imutabilidade de lançamentos
- **Jamais deletar um lançamento contábil** — criar registro de estorno com `estornoDeId` referenciando o original
- Todo estorno deve ter `tipo: "estorno"` e o ID do lançamento original
- Audit log obrigatório para qualquer mutação em lançamentos

### Multi-tenancy
- **Todo query deve filtrar por `escritorioId`** sem exceção
- O `escritorioId` vem sempre do JWT/session autenticada, nunca do body do request ou query string
- Nunca buscar dados cross-tenant — um escritório não pode ver dados de outro

### Datas e Competência
- **Datas armazenadas sempre em UTC** no banco
- Converter para `America/Sao_Paulo` apenas na camada de exibição
- Competência sempre no formato `"YYYY-MM"` (string) — usado como chave de agrupamento e cache
- Nunca usar `new Date()` sem considerar timezone — usar `date-fns-tz`

### Segurança
- Nunca logar valores financeiros completos, senhas, tokens, CPF ou CNPJ
- Downloads de documentos: presigned URLs com expiração máxima de 15 minutos
- Validação Zod em 100% dos endpoints — nunca aceitar input sem schema definido
- `escritorioId` nunca vem do cliente — sempre do token server-side

---

## Estado Atual: Sprint 1A (Demo)

### Objetivo
Portal do cliente com seed data realista. Demonstrar para escritórios de contabilidade e medir interesse de mercado.

### Inclui
- Setup Next.js 14 + Tailwind + shadcn/ui com design system completo
- Schema Drizzle (subset): `escritorios`, `usuarios`, `clientes`, `lancamentos`, `plano_contas`, `documentos`, `tickets`, `ticket_mensagens`, `eventos_calendario`
- Seed data: Tributar Assessoria Contábil + Auto Center São Jorge Ltda (6 meses de DRE, Simples Nacional)
- Auth: login do cliente (email + senha)
- Portal: `/inicio`, `/relatorios` (DRE + Balanço), `/documentos`, `/tickets`

### Critério de sucesso da Sprint 1A
3 ou mais escritórios dizem "quero testar com um cliente real".

### Não inclui (Sprint 1B ou posterior)
- Admin do escritório
- Upload real de arquivos
- Calendário fiscal
- Razão contábil
- IA de classificação
- Email e notificações
- Qualquer integração externa

---

## Sprint 1B (Operação) — após validação da demo

### Objetivo
Permitir que 2–3 escritórios reais operem o sistema com clientes reais.

### Inclui
- Login admin (escritório)
- Clientes: lista + cadastro + edição
- Lançamentos: criar + listar (alimenta DRE/Balanço do portal)
- Documentos: upload por cliente (Cloudflare R2)
- Tickets: visualizar + responder
- Fluxo de convite de cliente (email via Resend)

### Critério de sucesso da Sprint 1B
Um escritório cadastrou clientes reais e reduziu envio de documentos por WhatsApp.

---

## Sprint 2+ (pós-validação de mercado)

- IA de classificação (Anthropic Claude API)
- Upload e parse de XML NF-e
- Razão contábil
- Notificações por email
- Calendário fiscal com recorrência
- Score do cliente
- Fastify standalone + Turborepo (background jobs, WebSocket)
- Onboarding wizard

---

## Convenções de Código

- TypeScript strict: `"strict": true` no tsconfig — sem `any` implícito, sem `!` desnecessário
- Funções de query no Drizzle em `lib/db/queries/[dominio].ts`
- Zod schemas de validação de API em `lib/validations.ts`
- Componentes: PascalCase, arquivos kebab-case (`ticket-card.tsx`)
- Hooks: prefixo `use` + camelCase (`useCliente`, `useRelatorios`)
- Server Components por padrão — `"use client"` apenas quando necessário (eventos, estado local)
- Sem comentários óbvios — só comentar o "por quê", nunca o "o quê"
