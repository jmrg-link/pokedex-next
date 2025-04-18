# ───────────────────────── Etapa deps ─────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

# ─────────────────────── Etapa builder ────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm prune --production

# ──────────────────────── Etapa runner ───────────────────────
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json


RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
