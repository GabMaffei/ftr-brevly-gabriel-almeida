# 🚀 Desafio Fase 1 - Brev.ly

Um encurtador de URLs FullStack desenvolvido como parte do desafio da pós-graduação Tech Developer 360 da [Faculdade de Tecnologia Rocketseat (FTR)](https://ftr.rocketseat.com.br/).

O **Brev.ly** permite criar, listar e remover links encurtados, acompanhar relatórios de acessos e realizar o redirecionamento correto para o link original.  
O projeto foi construído em duas partes:

- **Backend (`server`)** → API com Fastify, Drizzle e Postgres, além da camada de DevOps com Docker.
- **Frontend (`web`)** → Aplicação React SPA utilizando Vite, TailwindCSS e React Query.

## ✨ Funcionalidades

### Backend
- [x] Criar links encurtados com validação
- [x] Deletar links
- [x] Buscar a URL original via link encurtado
- [x] Listar todas as URLs cadastradas
- [x] Incrementar contador de acessos
- [x] Exportar relatórios em CSV (com upload em CDN)
- [x] Nome aleatório/único para arquivos CSV
- [x] Listagem performática

### Frontend
- [x] Cadastro de novos links
- [x] Listagem de links cadastrados
- [x] Deleção de links
- [x] Redirecionamento automático de links encurtados
- [x] Exibição da quantidade de acessos
- [x] Download de relatório em CSV
- [x] Responsividade (desktop e mobile)
- [x] Tratamento de estados (loading, erros, empty states)

## 🛠️ Tecnologias Utilizadas

### Backend
- **TypeScript**
- **Fastify**
- **Drizzle ORM**
- **Postgres**
- **Docker**

### Frontend
- **React 19** + **Vite**
- **TypeScript**
- **TailwindCSS** + **tailwind-variants** + **tailwind-merge**
- **React Query** (TanStack)
- **React Hook Form** + **Zod**
- **React Hot Toast**
- **Phosphor Icons** e **Radix UI ScrollArea**

## 📂 Estrutura do Repositório
/

├── web/ # Aplicação Frontend (React + Vite)

└── server/ # API Backend (Fastify + Postgres + Docker)

## ⚙️ Variáveis de Ambiente

### Backend (colocar `server/.env`)
```env
# Server
PORT=3333
NODE_ENV=development

# Database
DATABASE_URL="postgresql://docker:docker@localhost:5432/brevly"

# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET="ftr-brevly-server"
CLOUDFLARE_PUBLIC_URL=""
```
### Frontend (colocar `web/.env`)
```
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3333
```
## ▶️ Como Rodar o Projeto
## Backend dentro da pasta server
#### iniciar o banco de dados postgres
```
docker compose up
```
#### executar migrations
```
pnpm run db:migrate
```
#### executar projeto em ambiente de desenvolvimento
```
pnpm run dev
```
#### OU: realizar build e executar a versão de produção
```
pnpm run build
pnpm run prd
```
## Frontend dentro da pasta web
```
pnpm install
pnpm run dev
```
## Objetivo do Desafio

Esse desafio faz parte da formação FullStack da Rocketseat e tem como objetivo:

- Consolidar conceitos de Frontend, Backend e DevOps;

- Reforçar o uso de boas práticas com TypeScript e Docker;

- Exercitar autonomia e pesquisa para além do conteúdo visto em aula;

- Simular um cenário real de desenvolvimento de produto.

## 📝 Considerações

Esse repositório contém a resolução do desafio Fase 1 - Brev.ly.

Feito com 💜 durante a pós-graduação da Rocketseat.