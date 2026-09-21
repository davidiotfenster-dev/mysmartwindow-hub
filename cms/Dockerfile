# syntax=docker/dockerfile:1

# ============================================================================
# 1. Dependencias
#
# better-sqlite3 y sharp compilan codigo nativo: hacen falta las herramientas
# de compilacion aunque luego no se usen en tiempo de ejecucion.
# ============================================================================
FROM node:22-alpine AS deps
WORKDIR /opt/cms
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
COPY package.json package-lock.json* ./
RUN npm ci


# ============================================================================
# 2. Compilacion
# ============================================================================
FROM node:22-alpine AS builder
WORKDIR /opt/cms
RUN apk add --no-cache vips-dev
ENV NODE_ENV=production
COPY --from=deps /opt/cms/node_modules ./node_modules
COPY . .
RUN npm run build


# ============================================================================
# 3. Ejecucion
# ============================================================================
FROM node:22-alpine AS runner
WORKDIR /opt/cms
RUN apk add --no-cache vips

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 strapi \
 && adduser --system --uid 1001 strapi

COPY --from=builder --chown=strapi:strapi /opt/cms ./

# Las dos carpetas tienen que existir en la imagen y pertenecer ya a `strapi`:
# cuando Docker crea un volumen nuevo copia el contenido y los permisos de la
# ruta que tapa, y si no existe lo crea como root. Entonces Strapi, que corre
# sin privilegios, no puede crear la base de datos y arranca en bucle.
RUN mkdir -p /opt/cms/.tmp /opt/cms/public/uploads \
 && chown -R strapi:strapi /opt/cms/.tmp /opt/cms/public/uploads

# .tmp guarda la base sqlite y las cachés: debe persistir entre despliegues,
# monta un volumen aqui. public/uploads guarda los ficheros subidos en el CMS.
VOLUME ["/opt/cms/.tmp", "/opt/cms/public/uploads"]

USER strapi
EXPOSE 1337

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
  CMD node -e "fetch('http://127.0.0.1:1337/_health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npm", "run", "start"]
