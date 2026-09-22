# Puesta en producción en la EC2 (y cómo actualizarla después)

Guía concreta para la máquina de AWS: Ubuntu, Docker ya instalado, usuario
`deploy`, carpeta `/opt/iotfenster-web`, IP `52.209.147.26`. La parte de
nginx, dominio, DNS y HTTPS no está aquí: ésa la hace el administrador del
servidor después, cuando el sitio ya responda.

La guía general, con la teoría y las alternativas, está en
[`DEPLOY.md`](DEPLOY.md). Esto es la versión corta para esta máquina.

---

## Antes de empezar

Todo esto se hace **una sola vez**. Desde tu PowerShell:

```bash
ssh deploy@52.209.147.26
```

Y ya dentro de la máquina, comprueba que el usuario está preparado:

```bash
docker ps && cd /opt/iotfenster-web && touch prueba.txt && ls -l && rm prueba.txt
```

Si `docker ps` responde sin pedir `sudo` y el `touch` no da error, adelante.

---

## 1 · Bajar el proyecto

```bash
cd /opt/iotfenster-web
git clone https://github.com/davidiotfenster-dev/mysmartwindow-hub.git .
```

El punto final es importante: clona **dentro** de la carpeta que ya existe en
vez de crear otra por debajo.

Si el repositorio es privado, GitHub pedirá usuario y contraseña. La
contraseña normal ya no sirve: hay que generar un *personal access token* en
GitHub (Settings → Developer settings → Tokens) y pegarlo donde pide la
contraseña.

---

## 2 · Los secretos del CMS

No están en el repositorio, y no deben estarlo. Se generan aquí:

```bash
cd /opt/iotfenster-web
cp cms/.env.example cms/.env
node -e "for(let i=0;i<6;i++)console.log(require('crypto').randomBytes(16).toString('base64'))"
```

Ese comando escupe seis líneas. Abre `cms/.env` con `nano cms/.env` y pega
una en cada campo: `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`,
`JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`. Se guarda con
`Ctrl+O`, `Enter`, y se sale con `Ctrl+X`.

> Si el servidor no tiene `node` fuera de Docker, sirve igual:
> `docker run --rm node:22-alpine node -e "for(let i=0;i<6;i++)console.log(require('crypto').randomBytes(16).toString('base64'))"`

---

## 3 · La dirección del sitio

Ésta es la única parte donde es fácil equivocarse. Hay dos variables que
parecen lo mismo y no lo son:

| Variable | Cuándo se usa | Si la cambias después |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | al **construir** la imagen | hay que **reconstruir** — queda incrustada en el código |
| `STRAPI_URL` | en cada **arranque** | basta reiniciar el contenedor |

Mientras no haya dominio, ponla con la IP. Edita `docker-compose.yml`
(`nano docker-compose.yml`) y deja el servicio `web` así:

```yaml
  web:
    build:
      context: .
      args:
        NEXT_PUBLIC_SITE_URL: http://52.209.147.26:3000
```

Cuando el administrador ponga el dominio real, se cambia esa línea por
`https://manuales.eldominio.com` y se vuelve a construir. Es el paso 6 de
más abajo, cinco minutos.

`STRAPI_URL` ya viene bien puesta (`http://cms:1337`, el nombre interno del
contenedor): no la toques.

---

## 4 · Levantarlo

```bash
cd /opt/iotfenster-web
docker compose up -d --build
```

La primera vez tarda varios minutos: construye las dos imágenes. Cuando
termine:

```bash
docker compose ps
```

Tienen que salir `web` y `cms` en estado `running`. Compruébalo desde la
propia máquina antes de mirar nada por fuera:

```bash
curl -I http://127.0.0.1:3000/es
curl -I http://127.0.0.1:1337/admin
```

Los dos deben responder `200`.

> Si desde tu casa no cargan `http://52.209.147.26:3000`, no es el proyecto:
> es el grupo de seguridad de AWS, que tiene que abrir esos puertos. Eso lo
> ve el administrador del servidor.

---

## 5 · Primer arranque del CMS (sólo una vez)

1. Entra en `http://52.209.147.26:1337/admin` y crea el usuario
   administrador. Guarda la contraseña en un gestor, no en un papel.
2. Dentro: **Settings → API Tokens → Create new API Token**. Nombre `seed`,
   tipo **Full access**. Copia el token: sólo se ve una vez.
3. Carga el catálogo de partida. Esto **se lanza desde tu ordenador**, no
   desde el servidor: la imagen de la web lleva sólo lo necesario para
   servir, sin los scripts ni el catálogo. Abre un túnel en una terminal:

   ```bash
   ssh -L 1337:localhost:1337 deploy@52.209.147.26
   ```

   Y en otra, dentro de tu copia del proyecto:

   ```bash
   STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=tu-token node scripts/seed-cms.mjs
   ```

   Mientras el túnel esté abierto, `localhost:1337` es el CMS del servidor.
   Así no hace falta abrir ese puerto a internet.

4. Sube los PDF de los manuales, también desde tu ordenador y por el mismo
   túnel. Primero en seco, para ver que cada fichero encuentra su recurso:

   ```bash
   STRAPI_URL=http://localhost:1337 node scripts/subir-pdfs.mjs ./documentos-es es --simular
   ```

   Y si la lista sale bien, de verdad:

   ```bash
   STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=tu-token node scripts/subir-pdfs.mjs ./documentos-es es
   STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=tu-token node scripts/subir-pdfs.mjs ./documentos-it it
   ```

4. **Cierra el registro público**, que viene abierto de serie:
   **Settings → Users & Permissions → Advanced settings** y desactiva
   *Enable sign-ups*. Este sitio no tiene usuarios registrados; si se queda
   abierto, cualquiera puede darse de alta.

---

## 6 · Actualizar cuando hagas cambios

Aquí está lo que preguntabas. Hay **dos tipos de cambio** y sólo uno obliga a
tocar el servidor.

### Cambios de contenido → no se despliega nada

Textos, resúmenes, fotos, recursos nuevos, traducciones, subir los PDF
italianos… todo eso se edita en `http://52.209.147.26:1337/admin` y **aparece
solo**. El sitio relee el CMS cada hora, así que como mucho tardas ese rato en
verlo. Si tienes prisa, `docker compose restart web` y sale al momento.

### Cambios de código → tres líneas

Cuando yo (o tú) toquemos el código y lo subamos a GitHub:

```bash
cd /opt/iotfenster-web
git pull
docker compose up -d --build
```

Eso es todo. Tarda un par de minutos, y mientras construye **el sitio antiguo
sigue en pie**: Docker sólo cambia el contenedor cuando la imagen nueva está
lista. La caída real es de un par de segundos.

**Lo que NO se pierde al actualizar:** todo el contenido del CMS y las
imágenes subidas. Viven en volúmenes de Docker (`strapi-data`,
`strapi-uploads`), fuera de los contenedores. Puedes reconstruir las veces que
quieras.

**Lo único que sí borra los datos** es `docker compose down -v`. Esa `-v` es
la que se lleva los volúmenes por delante. No la uses salvo que quieras
empezar de cero a propósito.

Si quieres ahorrarte recordar los comandos, créate un atajo en el servidor:

```bash
printf '#!/bin/sh\ncd /opt/iotfenster-web && git pull && docker compose up -d --build && sleep 5 && curl -s -X POST http://127.0.0.1:3000/api/youtube > /dev/null\n' > /opt/iotfenster-web/actualizar.sh
chmod +x /opt/iotfenster-web/actualizar.sh
```

Y a partir de ahí, actualizar es `/opt/iotfenster-web/actualizar.sh`.

---

## 7 · Comprobar que sigue todo bien

Después de cada actualización, desde la propia máquina:

```bash
docker compose ps                    # los dos en 'running'
curl -I http://127.0.0.1:3000/es     # 200
curl -s http://127.0.0.1:3000/sitemap.xml | head -5
```

En el sitemap tiene que salir la dirección real del sitio. Si sale
`localhost`, se construyó sin `NEXT_PUBLIC_SITE_URL`: corrige el
`docker-compose.yml` (paso 3) y repite `docker compose up -d --build`.

---

## 8 · Copia de seguridad

Merece la pena antes de cada cambio grande, y como tarea semanal:

```bash
cd /opt/iotfenster-web
docker compose exec cms tar czf - .tmp public/uploads > ~/backup-$(date +%F).tar.gz
```

Guarda ese fichero fuera de la máquina. Es todo el contenido editable del
sitio: si algún día se borra el servidor entero, con eso y el repositorio lo
levantas otra vez.

---

## Si algo falla

| Síntoma | Casi siempre es |
| --- | --- |
| El sitio carga pero sin fotos ni textos del CMS | el contenedor `cms` no está arriba: `docker compose ps` y `docker compose logs cms` |
| No carga nada desde fuera, pero `curl` local responde | puertos cerrados en el grupo de seguridad de AWS |
| El sitemap dice `localhost` | se construyó sin `NEXT_PUBLIC_SITE_URL` (paso 3) |
| `git pull` se queja de cambios locales | alguien editó ficheros en el servidor: `git status` para ver cuáles |

Para ver qué está pasando en cualquier momento:

```bash
docker compose logs -f web    # o cms
```
