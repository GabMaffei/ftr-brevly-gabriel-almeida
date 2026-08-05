<p align="right">
  <a href="./README.pt-BR.md">🇧🇷 Português</a>
</p>

# 🚀 Phase 1 Challenge — Brev.ly

A full-stack URL shortener developed as part of the Tech Developer 360 postgraduate program at [Rocketseat College of Technology](https://ftr.rocketseat.com.br/).

**Brev.ly** allows users to create, list, and delete shortened links, track access statistics, export reports, and correctly redirect shortened URLs to their original destinations.

The project was built in two parts:

- **Backend (`server`)** → REST API built with Fastify, Drizzle ORM, and PostgreSQL, including a DevOps layer with Docker.
- **Frontend (`web`)** → React single-page application built with Vite, Tailwind CSS, and TanStack Query.

## 📸 Preview

![Brev.ly application interface](./preview.gif)

## ✨ Features

### Backend

- [x] Create shortened links with input validation
- [x] Delete links
- [x] Retrieve the original URL from a shortened link
- [x] List all registered URLs
- [x] Increment link access counters
- [x] Export access reports as CSV files with CDN upload
- [x] Generate unique and randomized CSV filenames
- [x] Optimized link listing

### Frontend

- [x] Create new shortened links
- [x] Display registered links
- [x] Delete links
- [x] Automatically redirect shortened URLs
- [x] Display the number of accesses for each link
- [x] Download access reports as CSV files
- [x] Responsive layout for desktop and mobile devices
- [x] Handle loading, error, and empty states

## 🛠️ Technologies

### Backend

- **TypeScript**
- **Fastify**
- **Drizzle ORM**
- **PostgreSQL**
- **Docker**

### Frontend

- **React 19** with **Vite**
- **TypeScript**
- **Tailwind CSS**, **tailwind-variants**, and **tailwind-merge**
- **TanStack Query**
- **React Hook Form** with **Zod**
- **React Hot Toast**
- **Phosphor Icons**
- **Radix UI ScrollArea**

## 📂 Repository Structure

```text
/
├── web/      # Frontend application built with React and Vite
└── server/   # Backend API built with Fastify, PostgreSQL, and Docker
```

## ⚙️ Environment Variables

### Backend

Create a `server/.env` file:

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

### Frontend

Create a `web/.env` file:

```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3333
```

## ▶️ Running the Project

### Backend

Inside the `server` directory:

#### Start the PostgreSQL database

```bash
docker compose up
```

#### Run the database migrations

```bash
pnpm run db:migrate
```

#### Start the development environment

```bash
pnpm run dev
```

#### Alternatively, build and run the production version

```bash
pnpm run build
pnpm run prd
```

### Frontend

Inside the `web` directory:

```bash
pnpm install
pnpm run dev
```

## 🎯 Challenge Goals

This challenge is part of Rocketseat's full-stack development postgraduate program. Its main goals are to:

- Consolidate frontend, backend, and DevOps concepts
- Reinforce software development best practices using TypeScript and Docker
- Encourage autonomy and research beyond the content covered in class
- Simulate a real-world product development scenario

## 📝 Additional Information

This repository contains my implementation of the Phase 1 challenge: **Brev.ly**.

Built with 💜 during my postgraduate program at Rocketseat.