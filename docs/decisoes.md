# Contabil 360 — Registro de Decisões de Produto e Tecnologia

**Versão:** 1.0  
**Criado em:** Maio 2026  
**Propósito:** Fonte de verdade para todas as decisões tomadas. Atualizar a cada sprint.

---

## 1. Visão do Produto

### O que é
SaaS B2B2C para escritórios de contabilidade brasileiros. O produto opera em duas camadas simultâneas:

- **Admin (escritório):** hub de gestão de clientes, lançamentos, documentos e atendimento
- **Portal (cliente PME):** acesso self-service a relatórios financeiros, documentos, tickets e calendário fiscal

### Diferencial central
Nenhuma solução no mercado brasileiro integra nativamente o back-office do escritório com um portal de cliente. Domínio e Questor são invisíveis para o cliente. ContaAzul e Conta Certa ignoram o contador. O Contabil 360 cria a camada de relacionamento entre os dois.

### Posicionamento
Corporativo, confiável, analítico. Referência de produto: Notion + Salesforce Analytics. Anti-referência: Omie (visual carregado, tom genérico, experiência fragmentada).

---

## 2. Mercado e Go-to-Market

### Segmento primário
Escritórios "em crescimento": 20–300 clientes ativos, 2–10 contadores, faturamento R$ 15k–100k/mês. Tamanho estimado: ~8.000 escritórios no Brasil.

### Canal de aquisição (MVP)
Contato direto com escritórios via comunidades contábeis no LinkedIn e grupos especializados. Nenhum canal pago antes de validar o produto.

### Modelo de precificação
Por cliente ativo gerenciado (pass-through). Sem mensalidade fixa — o escritório paga apenas pelos clientes que ativa no portal. Estrutura de planos:

| Plano | Preço/cliente/mês | Range de clientes |
|---|---|---|
| Seed | R$ 29 | 1–30 |
| Growth | R$ 39 | 10–150 |
| Pro | R$ 49 | 50–500 |
| Enterprise | Negociado | 200+ |

**Argumento de venda:** Um escritório com 80 clientes que repassa o portal a R$ 99/mês por cliente gera R$ 4.720/mês de margem nova sem contratar ninguém.

### Referências internacionais
Karbon, TaxDome e Canopy resolvem exatamente esse problema para o mercado americano, faturando USD 3.000–8.000/escritório/ano, crescendo 40%+ a.a. O Brasil está 4–5 anos atrás nessa curva. A janela está aberta.

---

## 3. Stack Tecnológica

### Decisões e racional

| Tecnologia | Decisão | Racional |
|---|---|---|
| **Next.js 14 App Router** | Adotado | SSR, Server Components, API Routes em um único app. Padrão de mercado para SaaS moderno. |
| **TypeScript strict** | Adotado | Domínio contábil não tolera erros de tipo. Strict mode obrigatório desde o início. |
| **Tailwind CSS** | Adotado | Velocidade de desenvolvimento. Design system por tokens. Sem CSS-in-JS. |
| **shadcn/ui + Radix UI** | Adotado | Componentes acessíveis, sem lock-in de biblioteca. Customizáveis por design token. |
| **Drizzle ORM** | Adotado | Type-safe, próximo ao SQL, sem magia. Essencial para queries contábeis complexas. |
| **Better Auth** | Adotado | Multi-tenant desde o dia 1. Migrar depois é doloroso. |
| **TanStack Query v5** | Adotado | Cache inteligente, stale-while-revalidate, optimistic updates para o portal. |
| **React Hook Form + Zod** | Adotado | Validação TypeScript-first compartilhada entre front e back. |
| **Recharts** | Adotado | Gráficos customizáveis e leves para DRE e KPIs. |
| **Lucide React** | Adotado | Único pacote de ícones. SVG, linha fina, consistente com o tom executivo. |
| **date-fns + date-fns-tz** | Adotado | Manipulação de datas imutável, sem Moment.js. |
| **Fastify** | Diferido (Sprint 2+) | Necessário para WebSocket e BullMQ. Sem necessidade no Sprint 1. |
| **Turborepo** | Diferido (Sprint 2+) | Só faz sentido quando Fastify for separado do Next.js. |
| **BullMQ** | Diferido (Sprint 2+) | Background jobs para XML e IA. Sem necessidade no portal. |
| **Zustand** | Diferido (Sprint 2+) | Server Components + URL state resolvem o portal. Entra com o admin complexo. |
| **Anthropic Claude API** | Diferido (Sprint 2+) | Classificação de lançamentos. Hipótese a validar após product-market fit básico. |
| **AWS Textract** | Diferido (Sprint 2+) | OCR de notas em PDF. Entra junto com pipeline XML NF-e. |

### Decisões descartadas e por quê

| Opção descartada | Alternativa escolhida | Motivo |
|---|---|---|
| Vercel (produção) | Netlify (MVP temporário) | Netlify está em uso no Sprint 1A por simplicidade de onboarding. Vercel é o destino — suporte nativo ao App Router, edge functions, otimização de fontes e builds paralelos. Migração sem mudança de código. |
| Express | Next.js API Routes (depois Fastify) | Sem diferencial sobre Fastify. Fastify é 2x mais rápido e tem validação nativa. |
| Prisma | Drizzle ORM | Prisma adiciona abstração desnecessária. Drizzle é mais próximo ao SQL e mais performático. |
| NextAuth.js | Better Auth | Better Auth resolve multi-tenant nativamente. Migrar NextAuth para multi-tenant depois é trabalho considerável. |
| Moment.js | date-fns | Bundle menor, API imutável, árvore de imports. |
| AWS S3 | Cloudflare R2 | R2 tem free tier muito mais generoso (10GB) e sem custo de egress. |
| Railway (banco) | Neon | Neon é PostgreSQL serverless com melhor free tier para MVP. |

---

## 4. Infraestrutura

### Contas necessárias (todas free tier no Sprint 1)

| Serviço | Uso | Free tier | Quando pagar |
|---|---|---|---|
| **Netlify** | Deploy Next.js (MVP) | 100GB bandwidth, 300 min build/mês | Na migração para Vercel |
| **Vercel** | Deploy Next.js (produção) | 100GB bandwidth, deploys ilimitados | Com tráfego significativo |
| **Neon** | PostgreSQL 16 | 0,5GB storage, auto-suspend | Com >500MB de dados |
| **Cloudflare R2** | Documentos e PDFs | 10GB storage, 1M ops/mês | Com >10GB de documentos |
| **Upstash** | Redis (cache, sessões) | 10.000 req/dia | Com tráfego real |
| **Resend** | Emails transacionais | 3.000 emails/mês | Com mais de 3k envios |

**Custo do Sprint 1A e 1B: R$ 0/mês.**

### Custo projetado ao escalar
- Anthropic API (Sprint 2): ~R$ 50–200/mês para volume de MVP
- Vercel Pro: USD 20/mês quando precisar de builds paralelos ou mais bandwidth
- Neon Pro: USD 19/mês com >0,5GB de dados
- Railway para Fastify (Sprint 2+): USD 5–20/mês

### Arquitetura futura (Sprint 2+)
```
Vercel                        Railway (ou Fly.io)
──────────────────            ────────────────────────
Next.js (frontend)            Fastify (API standalone)
Next.js API Routes            BullMQ workers
  (operações leves)           WebSocket server
                              Processamento XML NF-e
```

---

## 5. Design System

### Princípios
- Clean, minimalista, light-first
- Tom corporativo e confiável
- Dados em primeiro plano
- ZERO emoji em qualquer circunstância
- Ícones exclusivamente via Lucide React

### Tokens de cor

| Token | Hex | Uso |
|---|---|---|
| background | `#FFFFFF` | Fundo de todas as páginas |
| surface | `#F9FAFB` | Cards, tabelas, inputs |
| sidebar | `#111827` | Navegação lateral |
| primary | `#166534` | Botões, links, acento |
| primary-light | `#DCFCE7` | Badges, estados ativos |
| text | `#111827` | Texto principal |
| muted | `#6B7280` | Labels, subtítulos |
| border | `#E5E7EB` | Divisores, bordas |
| success | `#16A34A` | Positivo, crédito |
| warning | `#D97706` | Atenção, pendente |
| error | `#DC2626` | Erro, débito, negativo |

### Tipografia
- Fonte: Inter (Google Fonts / next/font)
- Sem fonte display ou serif
- Pesos: 400, 500, 600, 700

---

## 6. Plano de Sprints

### Sprint 1A — Demo — CONCLUÍDA

**Objetivo:** Demonstrar para escritórios. Medir reação de mercado.

**Entregue:**
- Portal do cliente completo com seed data realista (14 meses de dados)
- Auth: login com JWT e middleware de verificação com cache (60s TTL)
- `/inicio`: KPIs do mês, gráfico de evolução 12 meses, obrigações em aberto
- `/relatorios`: DRE detalhado + Balanço Patrimonial + Análise comparativa com toggle acumulado
- `/documentos`: lista com busca debounced, competência + data de upload
- `/tickets`: threads de atendimento com histórico de conversas
- `/calendario`: calendário fiscal interativo com mini-calendário e cards de status
- `/print/relatorio`: exportação PDF A4 landscape executiva
- PWA completo: splash screen para 8 iPhones, standalone, ícone diamond, status bar black-translucent
- Logo mark unificado (diamond SVG) em toda a interface
- Performance: next/font, Recharts lazy, useMemo generalizado, compress + optimizeFonts
- Deploy: Netlify

**Critério de go para 1B:** 3+ escritórios dizem "quero testar com cliente real".

---

### Sprint 1B — Operação (2–2,5 semanas, condicional)

**Objetivo:** Onboarding de escritórios reais com clientes reais.

**Inclui:**
- Login admin
- Clientes: lista + cadastro + edição
- Lançamentos: criar + listar (alimenta DRE/Balanço do portal)
- Documentos: upload por cliente (Cloudflare R2)
- Tickets: visualizar + responder
- Fluxo de convite de cliente (email via Resend)

**Critério de go para Sprint 2:** Um escritório parou de enviar documentos por WhatsApp.

---

### Sprint 2 — Inteligência (pós product-market fit básico)

- IA de classificação de lançamentos (Anthropic Claude API)
- Upload e parse de XML NF-e
- Razão contábil
- Notificações por email (vencimentos, novos documentos)
- Calendário fiscal com recorrência
- Fastify standalone + Turborepo

---

### Sprint 3 — Escala

- Score do cliente
- Onboarding wizard
- Relatórios exportáveis em PDF
- White-label (portal com domínio e logo do escritório)
- App mobile (React Native) — portal cliente
- Integração Open Finance (extrato bancário)

---

## 7. Funcionalidades: IN vs OUT por Sprint

### O que está fora do MVP e por quê

| Funcionalidade | Status | Motivo |
|---|---|---|
| Razão contábil | Sprint 2 | DRE + BP já provam o conceito. Razão é detalhe operacional. |
| Calendário fiscal | ~~Sprint 2~~ **Antecipado para Sprint 1A** | Decidido incluir na demo após avaliar que o contador usa para mostrar ao cliente o que vem pela frente. Diferencializa a experiência. |
| Comunidade | Sprint 3 | Valor de retenção, não de aquisição. Não valida o core. |
| Score do cliente | Sprint 3 | Nice-to-have. Não bloqueia validação de mercado. |
| IA de classificação | Sprint 2 | Alto esforço, valida hipótese diferente do portal. |
| Upload XML NF-e | Sprint 2 | Integração complexa. Não essencial para demo funcionar. |
| Notificações email | Sprint 1B+ | Útil mas não bloqueia validação. |
| Onboarding wizard | Sprint 3 | Polimento pós-tração. |
| Exportação PDF | ~~Sprint 3~~ **Antecipado para Sprint 1A** | Incluído via `/print/relatorio` (A4 landscape, auto-print). Diferencial de demo muito alto — o contador vê o relatório que o cliente vai receber. |
| App mobile nativo | Sprint 3 | PWA resolve o caso de uso mobile no Sprint 1A. App React Native entra em Sprint 3 se validado o PMF. |
| White-label | Sprint 3 | Recurso de escala, não de validação. |
| Multi-filial | Enterprise | Complexidade desnecessária no MVP. |

---

## 8. Regras de Negócio Críticas

### Imutabilidade de lançamentos
Nunca deletar um lançamento. Sempre criar estorno com referência ao original. É princípio contábil, não preferência técnica.

### Dados financeiros
Sempre `decimal(15,2)` no banco. Nunca `float`. Erros de arredondamento em centavos são inaceitáveis em sistema contábil.

### Multi-tenancy
Todo query filtra por `escritorioId`. O ID vem sempre do JWT server-side, nunca do cliente.

### Datas
UTC no banco. Timezone `America/Sao_Paulo` apenas na exibição. Competência no formato `"YYYY-MM"`.

---

## 9. Riscos Identificados

| Risco | Nível | Mitigação |
|---|---|---|
| Concorrência lateral de ERPs (Omie) adicionando portal | Alto | Lançar antes que eles completem o movimento. Sprint 1A define a urgência. |
| Resistência do contador (vê o portal como ameaça) | Médio | Posicionar como amplificador da relação, não substituto. Materiais de vendas reforçam isso. |
| Complexidade fiscal brasileira subestimada | Médio | IA e integrações fiscais no Sprint 2, não no MVP. Foco primeiro no relacionamento. |
| Churn pela raiz (escritório cancela, todos os clientes somem) | Alto | Retenção do escritório é KPI primário. Onboarding e CS dedicados desde o primeiro beta. |
| Custo de IA escala antes da receita | Baixo (MVP) | IA entra só no Sprint 2, com receita já validada. |

---

## 10. Hipóteses de Validação

### Sprint 1A valida:
- Escritórios ficam impressionados o suficiente com o portal para querer mostrar ao cliente?
- A proposta de valor do portal é percebida sem necessidade de explicação?

### Sprint 1B valida:
- O escritório consegue operar o sistema sem treinamento?
- O cliente PME loga espontaneamente e volta?
- O volume de WhatsApp e PDF por email reduz?
- O escritório pagaria pelo produto?

### Sprint 2 valida:
- A classificação por IA economiza tempo real do contador?
- O upload de XML substitui o envio manual?

---

*Atualizar este documento ao final de cada sprint com o que mudou, o que foi aprendido e as decisões revisadas.*
