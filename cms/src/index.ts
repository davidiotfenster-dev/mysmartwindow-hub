import type { Core } from '@strapi/strapi';

/**
 * Idiomas del sitio. Español es el que manda si algo falla al leer un
 * idioma en el front (ver src/lib/content/*.ts en la app de Next.js).
 */
const LOCALES = [
  { code: 'es', name: 'Spanish (es)' },
  { code: 'en', name: 'English (en)' },
  { code: 'it', name: 'Italian (it)' },
];

/**
 * Content-types propios que la web publica debe poder leer sin autenticarse.
 * Solo se activan find/findOne: crear, editar y borrar sigue exigiendo el
 * panel de administración o un token con permiso explícito.
 */
const PUBLIC_READ_CONTENT_TYPES = [
  'category',
  'device',
  'resource',
  'ecosystem',
  'news-post',
  'faq-item',
  'partner',
  'site-setting',
  'legal-page',
  'team-member',
];

async function ensureLocales(strapi: Core.Strapi) {
  const localesService = strapi.plugin('i18n').service('locales');
  const existing: Array<{ code: string }> = await localesService.find();
  const existingCodes = new Set(existing.map((l) => l.code));

  for (const locale of LOCALES) {
    if (existingCodes.has(locale.code)) continue;
    try {
      await localesService.create(locale);
      strapi.log.info(`[bootstrap] Idioma creado: ${locale.code}`);
    } catch (err) {
      strapi.log.warn(`[bootstrap] No se pudo crear el idioma ${locale.code}: ${err}`);
    }
  }
}

async function setPublicReadPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('[bootstrap] No se encontro el rol "public"; omito permisos.');
    return;
  }

  for (const contentType of PUBLIC_READ_CONTENT_TYPES) {
    for (const action of ['find', 'findOne']) {
      const actionId = `api::${contentType}.${contentType}.${action}`;

      const already = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action: actionId, role: publicRole.id } });

      if (already) continue;

      try {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action: actionId, role: publicRole.id },
        });
      } catch (err) {
        strapi.log.warn(`[bootstrap] No se pudo activar ${actionId}: ${err}`);
      }
    }
  }

  strapi.log.info('[bootstrap] Lectura publica activada para: ' + PUBLIC_READ_CONTENT_TYPES.join(', '));
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureLocales(strapi);
    await setPublicReadPermissions(strapi);
  },
};
