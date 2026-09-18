# syntax=docker/dockerfile:1

# ============================================================================
# 1. Dependencias
# ============================================================================
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci


# ============================================================================
# 2. Compilacion
#
# Las variables NEXT_PUBLIC_* se incrustan en el build, no se leen en ejecucion.
# Por eso el dominio se pasa aqui con --build-arg y no como variable del
# contenedor: de el salen las URLs canonicas y el sitemap.
# ============================================================================
FROM node:22-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_BASE_PATH=
ARG NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UCOYzORrjwX-krZhyK9-NqBQ
ARG NEXT_PUBLIC_YOUTUBE_HANDLE=MySmartWindow
ARG YOUTUBE_API_KEY=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH \
    NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=$NEXT_PUBLIC_YOUTUBE_CHANNEL_ID \
    NEXT_PUBLIC_YOUTUBE_HANDLE=$NEXT_PUBLIC_YOUTUBE_HANDLE \
    YOUTUBE_API_KEY=$YOUTUBE_API_KEY \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# ============================================================================
# 3. Ejecucion
# ============================================================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Usuario sin privilegios: nada aqui necesita root
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
# La salida standalone ya trae server.js y solo las dependencias necesarias
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD node -e "fetch('http://127.0.0.1:3000/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
