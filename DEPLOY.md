# Desplegar en un servidor propio

Guía paso a paso para subir el sitio y el CMS a un servidor, con un dominio
para el sitio y un subdominio para el panel de contenidos. Sigue los pasos
en orden — cada uno da por hecho el anterior.

**Lo que vas a montar:**

```
Sitio (Next.js)          Strapi (CMS)
manuales.tudominio.com   cms.tudominio.com
puerto 3000       ──lee contenido──►   puerto 1337
```

Ninguna de las dos apps es un sitio estático: ambas necesitan Node en
ejecución. El sitio usa renderizado en servidor, rutas de API (proxy de PDF,
formularios) y revalidación periódica contra YouTube; Strapi es la app que
guarda y sirve el contenido editable. Todo corre dentro de **Docker**, que es
lo único que hay que instalar en el servidor.

## Antes de empezar, necesitas

- Acceso por SSH (terminal) al servidor, con permisos de administrador
- Acceso al panel de DNS del dominio
- El repositorio de código en algún sitio accesible (GitHub, GitLab...)
- Decidido el dominio del sitio y el subdominio del CMS (ej.
  `manuales.tudominio.com` y `cms.tudominio.com`)

---

## 1 · Configurar el dominio (DNS)

En el panel donde gestionas el dominio, crea dos registros `A`, ambos
apuntando a la IP del servidor — es el mismo servidor para los dos, solo
cambia el nombre:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| `A` | `manuales` (o el subdominio del sitio) | IP del servidor |
| `A` | `cms` | IP del servidor |

Si el sitio va a vivir en la raíz del dominio (`tudominio.com` sin
subdominio), ese primer registro se crea sobre `@` en vez de `manuales`.

> **Ten paciencia aquí**: los cambios de DNS pueden tardar de minutos a
> varias horas en propagarse. Puedes seguir con el paso 2 mientras tanto.

### Si esto convive con una página ya existente

Si el sitio va a coexistir con una página actual en el mismo dominio (por
ejemplo una `/app-mysmartwindow/` de WordPress), los dos competirán por las
mismas búsquedas y Google repartirá la autoridad entre ambos. Hay que elegir:

- **Subdominio**: sin conflicto, pero el subdominio empieza casi de cero en
  SEO — no hereda la autoridad del dominio principal.
- **Subcarpeta** (`tudominio.com/manuales`): hereda la autoridad del
  dominio, es lo mejor para SEO, pero hay que coordinar las rutas con la
  página existente en el proxy inverso.
- **Sustitución** de la página actual: lo más limpio a medio plazo, pero
  requiere **redirecciones 301** desde las URLs viejas para no perder lo ya
  posicionado.

---

## 2 · Preparar el servidor

Por SSH, conectado al servidor:

```bash
# Ubuntu / Debian
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# cierra sesión y vuelve a entrar para que el permiso se aplique
```

Comprueba que ha quedado instalado:

```bash
docker --version
docker compose version
```

> **Windows Server**: con Docker Desktop en modo Linux containers es el
> mismo proceso. Si el servidor no puede tener Docker, hay una vía
> alternativa sin contenedores — ver *Alternativa sin Docker*, al final de
> este documento.

---

## 3 · Bajar el proyecto

```bash
cd /opt
sudo git clone <URL-DE-TU-REPOSITORIO> mysmartwindow
cd mysmartwindow
```

A partir de aquí, todos los comandos se ejecutan desde dentro de esta
carpeta (`/opt/mysmartwindow`).

---

## 4 · Configurar las variables de entorno

Copia la plantilla de secretos del CMS y genera valores propios — nunca los
que trae el repositorio de ejemplo:

```bash
cp cms/.env.example cms/.env
node -e "for(let i=0;i<6;i++)console.log(require('crypto').randomBytes(16).toString('base64'))"
```

Copia esas 6 líneas generadas dentro de `cms/.env`, una en cada campo
(`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`,
`TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`).

### La parte que hay que entender bien

Hay dos variables que parecen iguales pero se comportan distinto — equivocarse
aquí es el error más habitual al desplegar:

| Variable | Se usa | Qué pasa si la cambias luego |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | al **compilar** el sitio | queda incrustada en el código — cambiar el dominio **obliga a reconstruir la imagen entera** |
| `STRAPI_URL` | en **cada arranque**, en el servidor | se puede cambiar y reiniciar el contenedor, sin reconstruir nada |

> Las fotos y los PDF subidos al CMS se sirven a través del propio sitio
> (`/api/media/...`), no con la dirección del CMS. Por eso el CMS puede vivir
> en una red interna sin publicarse hacia fuera, y cambiarlo de sitio no
> obliga a reconstruir ni rompe las vistas previas al compartir enlaces.

Edita `docker-compose.yml` y pon el dominio real del sitio en el build del
servicio `web`:

```yaml
services:
  web:
    build:
      context: .
      args:
        NEXT_PUBLIC_SITE_URL: https://manuales.tudominio.com
```

`STRAPI_URL` ya viene puesta a `http://cms:1337` en ese mismo fichero — es el
nombre interno del contenedor dentro de la red de Docker, no hace falta
tocarlo salvo que Strapi viva en otra máquina.

Si además tienes clave de la API de YouTube o el secreto de revalidación,
añádelos igual como `args` del servicio `web`: `YOUTUBE_API_KEY`,
`REVALIDATE_SECRET`. Ninguno es obligatorio — sin clave de YouTube se usa el
feed RSS público.

---

## 5 · Arrancar sitio + CMS

```bash
docker compose up -d --build
```

Tarda unos minutos la primera vez (construye las dos imágenes). Comprueba
que los dos contenedores están corriendo:

```bash
docker compose ps
```

Deberías ver dos servicios, `web` y `cms`, en estado `running`.

---

## 6 · Primer arranque de Strapi (solo la primera vez)

1. Entra a `http://IP-DEL-SERVIDOR:1337/admin` y crea el primer usuario
   administrador (nombre, email, contraseña — guárdala en un gestor de
   contraseñas).
2. Dentro del panel: **Settings → API Tokens → Create new API Token**.
   Nombre: `seed`. Tipo: **Full access**. Copia el token — solo se muestra
   una vez.
3. Importa el catálogo de partida (recursos, dispositivos, categorías...)
   con ese token. Se lanza **desde tu ordenador**, no desde el servidor: la
   imagen de la web contiene sólo lo necesario para servir el sitio, sin los
   scripts ni el catálogo. Si el CMS no está publicado hacia fuera, abre un
   túnel (`ssh -L 1337:localhost:1337 usuario@servidor`) y apunta ahí:

   ```bash
   STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=tu-token node scripts/seed-cms.mjs
   ```

4. Sube los PDF de los manuales al CMS, igual desde tu ordenador. El nombre
   de cada fichero tiene que ser el del recurso al que pertenece, y cada
   idioma se sube por separado:

   ```bash
   STRAPI_URL=http://localhost:1337 node scripts/subir-pdfs.mjs ./documentos-es es --simular
   STRAPI_URL=http://localhost:1337 STRAPI_API_TOKEN=tu-token node scripts/subir-pdfs.mjs ./documentos-es es
   ```

Es seguro volver a ejecutarlo más adelante: actualiza el contenido existente
en vez de duplicarlo. Cómo usar el panel día a día está en
[`cms/GUIA-DE-CONTENIDOS.md`](cms/GUIA-DE-CONTENIDOS.md).

---

## 7 · Dominio público y HTTPS

nginx como proxy inverso delante de los dos contenedores:

```bash
sudo apt install nginx certbot python3-certbot-nginx -y
```

Crea `/etc/nginx/sites-available/mysmartwindow`:

```nginx
server {
    listen 80;
    server_name manuales.tudominio.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name cms.tudominio.com;
    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/mysmartwindow /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# HTTPS para los dos de una vez
sudo certbot --nginx -d manuales.tudominio.com -d cms.tudominio.com
```

Certbot edita el fichero solo, añade el bloque `listen 443 ssl` y programa la
renovación automática del certificado.

---

## 8 · Comprobar que todo funciona

- **Sitio**: `https://manuales.tudominio.com` debe verse la portada, no un error.
- **CMS**: `https://cms.tudominio.com/admin` debe pedirte iniciar sesión.
- **Conectados**: cambia un título en el CMS, espera un minuto, recarga la
  página del sitio — debe reflejarse.
- **Sitemap**: `/sitemap.xml` debe mostrar el dominio real, nunca `localhost`.
  Si sale `localhost`, se compiló sin `NEXT_PUBLIC_SITE_URL` correcto.
- **Marcado**: valida una ficha de vídeo y una de manual en
  <https://search.google.com/test/rich-results>.
- Da de alta el sitemap en Google Search Console.

---

## 9 · Dónde vive la información (y cómo no perderla)

Todo lo que se edita en el CMS —textos, relaciones, imágenes subidas— se
guarda en **dos carpetas**, no en el código:

| Qué | Dónde |
| --- | --- |
| Contenido (textos, relaciones, todo lo editable) | `cms/.tmp/data.db` |
| Imágenes y ficheros subidos | `cms/public/uploads/` |

El `docker-compose.yml` ya monta esas dos carpetas como **volúmenes con
nombre** (`strapi-data`, `strapi-uploads`), que viven fuera del contenedor.
Eso significa:

- ✅ **Seguro**: reiniciar el servidor, reiniciar Docker, reconstruir la
  imagen con `--build` — el contenido sobrevive.
- ⚠️ **Sí lo borra**: ejecutar `docker compose down -v` (la `-v` es la que
  borra volúmenes) — no lo uses salvo que quieras resetear todo a propósito.

**Copia de seguridad recomendada** — un cron semanal que copie esas dos
carpetas a otro sitio (otro disco, S3, lo que uséis):

```bash
docker compose exec cms tar czf - .tmp public/uploads > backup-$(date +%F).tar.gz
```

> **Si crece el equipo editorial**: con varias personas editando a la vez, o
> si quieres backups gestionados automáticamente, cambia `DATABASE_CLIENT` a
> `postgres` en `cms/.env` (ver los ejemplos comentados en ese mismo
> fichero). Con SQLite (lo de por defecto) va perfecto para un servidor con
> uno o dos editores.

---

## 10 · Subir cambios más adelante

Cada vez que haya cambios de **código** nuevos (el contenido se edita en el
CMS y no necesita esto):

```bash
cd /opt/mysmartwindow
git pull
docker compose up -d --build
```

Los volúmenes de datos no se tocan: el contenido del CMS sigue exactamente
donde estaba.

---

## Referencia rápida

| Quiero... | Comando |
| --- | --- |
| Ver los logs de un servicio | `docker compose logs -f web` (o `cms`) |
| Reiniciar solo un servicio | `docker compose restart web` |
| Parar todo | `docker compose down` *(sin `-v`: los datos quedan a salvo)* |
| Entrar dentro de un contenedor | `docker compose exec cms sh` |
| Volver a importar el catálogo | repite el paso 6.3 — es seguro, no duplica |

### Si algo falla

- **El sitio carga pero sin datos del CMS**: revisa que `STRAPI_URL` apunte
  al sitio correcto y que `docker compose ps` muestre `cms` como `running`.
- **El dominio no carga (timeout)**: el DNS aún no se ha propagado, o nginx
  no tiene el bloque para ese `server_name`. Prueba
  `curl -I http://127.0.0.1:3000` desde el propio servidor.
- **El sitemap muestra `localhost`**: se compiló sin `NEXT_PUBLIC_SITE_URL`
  correcto. Corrígelo en `docker-compose.yml` y repite
  `docker compose up -d --build`.
- **Certbot no consigue el certificado**: casi siempre es el DNS — comprueba
  con `dig manuales.tudominio.com` que ya resuelve a la IP del servidor.

---

## Alternativa sin Docker

Si el servidor no puede tener Docker, cada app se despliega por su cuenta
como un proceso Node normal.

### El sitio (Linux + nginx)

**1. Compilar** (en el servidor o en un equipo con la misma versión de Node):

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://manuales.tudominio.com npm run build
```

**2. Copiar** al servidor:

```
.next/standalone/   ->  /opt/mysmartwindow/
.next/static/       ->  /opt/mysmartwindow/.next/static/
public/             ->  /opt/mysmartwindow/public/
```

**3. Servicio systemd** en `/etc/systemd/system/mysmartwindow.service`:

```ini
[Unit]
Description=MySmartWindow Hub
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/mysmartwindow
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=127.0.0.1
Environment=STRAPI_URL=http://127.0.0.1:1337
ExecStart=/usr/bin/node server.js
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now mysmartwindow
```

### Strapi (el mismo patrón, otro puerto)

Strapi es una segunda app Node: se compila y arranca igual, pero en su
**propio proceso y puerto** (1337 por defecto).

```bash
cd cms
npm ci
npm run build
```

Servicio systemd `/etc/systemd/system/mysmartwindow-cms.service`, igual que
el de arriba pero con `WorkingDirectory=/opt/mysmartwindow/cms`,
`ExecStart=/usr/bin/npm run start` y sin la variable `STRAPI_URL` (esa es
del sitio, no de Strapi).

### nginx para las dos

El mismo bloque de dos `server{}` del paso 7 — cada uno apunta a su puerto
(3000 el sitio, 1337 el CMS).

```nginx
location /_next/static/ {
    proxy_pass http://127.0.0.1:3000;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

Añade este bloque extra en el `server{}` del sitio: los ficheros estáticos
con hash en el nombre pueden cachearse para siempre.

### Windows Server + IIS

IIS no ejecuta Node: actúa de proxy inverso. Compila y copia igual que en
Linux, y en vez de systemd usa [NSSM](https://nssm.cc) para cada app:

```
nssm install MySmartWindow "C:\Program Files\nodejs\node.exe" server.js
nssm set MySmartWindow AppDirectory C:\inetpub\mysmartwindow
nssm set MySmartWindow AppEnvironmentExtra NODE_ENV=production PORT=3000 HOSTNAME=127.0.0.1 STRAPI_URL=http://127.0.0.1:1337
nssm start MySmartWindow
```

(Repite con otro nombre de servicio, otro directorio y `PORT=1337` para
Strapi.)

Instala **URL Rewrite** y **Application Request Routing** en IIS, activa el
proxy en ARR y crea un sitio con este `web.config` por cada (sub)dominio,
cambiando el puerto de destino:

```xml
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="ProxyToNode" stopProcessing="true">
          <match url="(.*)" />
          <action type="Rewrite" url="http://127.0.0.1:3000/{R:1}" />
          <serverVariables>
            <set name="HTTP_X_FORWARDED_PROTO" value="https" />
          </serverVariables>
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```
