# Convertido — Sistema de Propostas Comerciais

Sistema interno da Convertido Marketing para gerar páginas de proposta
comercial personalizadas por cliente, a partir de 4 templates base
(Website, E-commerce, Tráfego Pago, Campanha de Marketing).

Cada cliente recebe um link único — `propostas.convertido.com.br/p/[slug]` —
com a proposta renderizada com a identidade visual dele, com tracking de
visualização e aceite online.

## Stack

- **Next.js 15** (App Router) + **TypeScript** + React Server Components
- **Tailwind CSS v4** + **shadcn/ui**
- **Neon** (Postgres serverless) + **Drizzle ORM**
- **NextAuth v5** (Auth.js) — credentials provider, sessão JWT
- **Resend** + **React Email** — e-mails transacionais
- **Vercel Blob** — upload de logos
- **pnpm** — gerenciador de pacotes · Deploy na **Vercel**

## Funcionalidades

- **Autenticação** por e-mail/senha (sem cadastro público)
- **CRUD de clientes** com identidade visual (cores, logo, tema)
- **CRUD de propostas** com editor split-view e preview ao vivo
- **Página pública** `/p/[slug]` com tema do cliente, expiração e aceite
- **Tracking** de visualizações e aceites
- **E-mails** ao visualizar e ao aceitar
- **Dashboard** com métricas e atividade recente

## Setup local

Pré-requisitos: Node.js 20+ e pnpm 10+.

```bash
pnpm install
cp .env.example .env          # preencha as variáveis (ver abaixo)
pnpm db:migrate               # cria as tabelas no Neon
pnpm seed:admin               # cria o usuário admin
pnpm dev                      # http://localhost:3000
```

Acesse `/login` com o e-mail/senha de `SEED_ADMIN_*`.

## Variáveis de ambiente

Documentadas em [`.env.example`](./.env.example):

| Variável | Descrição |
| --- | --- |
| `DATABASE_URL` | Connection string do Neon (Postgres) |
| `AUTH_SECRET` | Segredo do NextAuth — `openssl rand -base64 32` |
| `RESEND_API_KEY` | Chave da API do Resend (opcional — sem ela, e-mails são ignorados) |
| `RESEND_FROM_EMAIL` | Remetente dos e-mails |
| `ADMIN_NOTIFICATION_EMAIL` | Destino das notificações de view/aceite |
| `BLOB_READ_WRITE_TOKEN` | Token do Vercel Blob (opcional — sem ele, upload de logo fica indisponível) |
| `NEXT_PUBLIC_PUBLIC_URL` | URL pública das propostas |
| `SEED_ADMIN_*` | Credenciais do admin criado pelo `pnpm seed:admin` |
| `CRON_SECRET` | Opcional — protege o endpoint `/api/cron/expire` |

## Scripts

| Script | O que faz |
| --- | --- |
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm db:generate` | Gera migration a partir do schema |
| `pnpm db:migrate` | Aplica as migrations no banco |
| `pnpm db:studio` | Abre o Drizzle Studio |
| `pnpm seed:admin` | Cria/atualiza o usuário admin |

## Deploy na Vercel

1. **Neon** — crie um projeto em [neon.tech](https://neon.tech), copie a
   connection string (`DATABASE_URL`).
2. **Vercel** — importe o repositório. Em *Settings → Environment Variables*,
   preencha todas as variáveis do `.env.example`.
3. **Migrations** — rode `pnpm db:migrate` localmente apontando para o banco
   de produção (ou via pipeline).
4. **Vercel Blob** — crie um store Blob no projeto e copie o
   `BLOB_READ_WRITE_TOKEN`.
5. **Resend** — gere uma API key e verifique o domínio remetente.
6. **Cron** — o [`vercel.json`](./vercel.json) já agenda
   `/api/cron/expire` diariamente (marca propostas vencidas como expiradas).
7. **Deploy** — a Vercel builda automaticamente. Rode `pnpm seed:admin` uma
   vez contra o banco de produção para criar o admin.

### Subdomínio das propostas

Para servir as propostas em `propostas.convertido.com.br`:

1. Na Vercel, adicione o domínio `propostas.convertido.com.br` ao projeto.
2. No DNS do `convertido.com.br`, crie um registro `CNAME` de `propostas`
   apontando para `cname.vercel-dns.com`.
3. Ajuste `NEXT_PUBLIC_PUBLIC_URL=https://propostas.convertido.com.br`.

## Estrutura

```
src/
  app/
    (admin)/admin/       # painel (route group (panel) tem a sidebar)
    (public)/p/[slug]/   # página pública da proposta
    (auth)/login/        # login
    api/                 # rotas: auth, upload, track, accept, cron
  components/
    ui/                  # shadcn/ui
    admin/               # painel (sidebar, formulários, tabelas, editor)
    proposals/           # templates de proposta + blocos compartilhados
  lib/
    db/                  # schema, cliente e queries Drizzle
    proposals/           # actions, conteúdo default, status
    clients/             # actions de clientes
    validations/         # schemas Zod
  emails/                # templates de e-mail (React Email)
  types/                 # tipos discriminados de proposal.content
drizzle/migrations/      # migrations
scripts/seed-admin.ts    # seed do admin
```

## Status

✅ Projeto completo (Etapas 1–8) — pronto para deploy.
