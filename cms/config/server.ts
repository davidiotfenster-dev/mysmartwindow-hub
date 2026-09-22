import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Direccion publica del panel. Detras de Caddy, Strapi ve peticiones que
  // llegan a un contenedor interno y sin esto compone mal sus propias URL
  // -las del panel, las de los ficheros subidos-. Vacia en local, donde se
  // entra directamente por localhost.
  url: env('PUBLIC_URL', ''),
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
