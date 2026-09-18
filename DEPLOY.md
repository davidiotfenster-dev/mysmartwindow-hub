# Despliegue en un servidor propio

Esta aplicación **no es un sitio estático**: necesita Node en ejecución. Usa
renderizado en servidor, rutas de API (proxy de PDF, formularios), middleware de
idioma y revalidación periódica contra YouTube. No se puede servir copiando
ficheros a una carpeta de Apache o IIS.

El build genera una **salida autocontenida** (`output: 'standalone'`): una
carpeta con su propio `server.js` y sólo las dependencias necesarias. Pesa unas
decenas de MB en lugar de arrastrar `node_modules` entero.

---

## Antes de nada: decidir la URL

Es la decisión que condiciona todo lo demás, porque **las variables
`NEXT_PUBLIC_*` se incrustan durante la compilación**, no se leen al arrancar.
Cambiar el dominio obliga a recompilar.

| Escenario | `NEXT_PUBLIC_SITE_URL` | `NEXT_PUBLIC_BASE_PATH` |
|---|---|---|
| Subdominio propio · `manuales.iotfenster.com` | `https://manuales.iotfenster.com` | *(vacío)* |
| Subcarpeta · `iotfenster.com/manuales` | `https://www.iotfenster.com` | `/manuales` |
| Sustituye a la página actual | `https://www.iotfenster.com` | `/app-mysmartwindow` |

### Aviso de contenido duplicado

Si esto convive con la página actual de WordPress `/app-mysmartwindow/`, los dos
competirán por las mismas búsquedas y Google repartirá la autoridad entre ambas.
Hay que elegir una:

- **Subdominio**: sin conflicto, pero la autoridad del dominio principal no se
  hereda; el subdominio empieza casi de cero.
- **Subcarpeta**: hereda la autoridad del dominio, es lo mejor para SEO, pero
  hay que coordinar las rutas con WordPress en el proxy inverso.
- **Sustitución**: lo más limpio a medio plazo. Requiere **redirecciones 301**
  desde las URLs viejas para no perder lo ya posicionado.

---

## Variables de entorno

Copia `.env.example` a `.env.local` (o pásalas al contenedor) y rellena:

```bash
NEXT_PUBLIC_SITE_URL=https://manuales.iotfenster.com   # obligatorio en produccion
NEXT_PUBLIC_BASE_PATH=                                  # solo si va en subcarpeta
YOUTUBE_API_KEY=                                        # opcional; sin ella se usa el feed RSS
REVALIDATE_SECRET=                                      # protege POST /api/youtube
```

---

## Opción A · Docker (la más portable)

Funciona igual en Linux, en Windows con Docker Desktop y en cualquier
orquestador. Es la que recomiendo si no hay una preferencia clara.

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://manuales.iotfenster.com \
  -t mysmartwindow-hub .

docker run -d --name mysmartwindow -p 3000:3000 --restart unless-stopped \
  mysmartwindow-hub
```

Con clave de YouTube, añade `--build-arg YOUTUBE_API_KEY=...` al `build`.

---

## Opción B · Linux + nginx

**1. Compilar** (en el servidor o en un equipo con la misma versión de Node):

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://manuales.iotfenster.com npm run build
```

**2. Copiar** al servidor estas tres cosas:

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
ExecStart=/usr/bin/node server.js
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now mysmartwindow
```

**4. nginx** como proxy inverso:

```nginx
server {
    listen 443 ssl http2;
    server_name manuales.iotfenster.com;

    # ssl_certificate ... (certbot)

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Los estaticos con hash pueden cachearse para siempre
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

---

## Opción C · Windows Server + IIS

IIS **no ejecuta Node**: actúa de proxy inverso hacia el proceso de Node.

**1. Compilar y copiar** igual que en la opción B, a `C:\inetpub\mysmartwindow`.

**2. Node como servicio de Windows** con [NSSM](https://nssm.cc):

```
nssm install MySmartWindow "C:\Program Files\nodejs\node.exe" server.js
nssm set MySmartWindow AppDirectory C:\inetpub\mysmartwindow
nssm set MySmartWindow AppEnvironmentExtra NODE_ENV=production PORT=3000 HOSTNAME=127.0.0.1
nssm start MySmartWindow
```

**3. IIS**: instala **URL Rewrite** y **Application Request Routing**, activa el
proxy en ARR y crea un sitio con este `web.config`:

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

---

## Después de desplegar

1. **Comprobar** que `/{dominio}/sitemap.xml` y `/robots.txt` muestran el
   dominio real y no `localhost`. Si sale localhost, se compiló sin
   `NEXT_PUBLIC_SITE_URL`.
2. **Dar de alta el sitemap** en Google Search Console.
3. **Validar el marcado** en <https://search.google.com/test/rich-results> con
   una ficha de vídeo y una de manual.
4. **Redirecciones 301** desde las URLs antiguas, si se sustituye la página.
5. **HTTPS obligatorio**: el sitio declara URLs canónicas `https`.

## Actualizaciones

Cada cambio requiere recompilar y volver a copiar (o reconstruir la imagen).
Con Docker es `docker build` + `docker run`; con systemd, copiar y
`sudo systemctl restart mysmartwindow`.
