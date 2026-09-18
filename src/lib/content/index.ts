/**
 * Capa de contenido.
 *
 * Punto unico de acceso a todo lo que un editor puede cambiar desde Strapi:
 * recursos, dispositivos, categorias, ecosistemas, noticias, FAQ,
 * distribuidores y los ajustes globales del sitio. Cada `get*()` intenta
 * leer el CMS y, si no esta configurado o no responde, usa los ficheros de
 * `src/data/` como catalogo de partida. Ver `cms/README.md` para el detalle
 * de que contenido vive donde.
 */
export { getCategories, getCategoryMap } from './categories'
export { getDevices, getVisibleDevices, getDeviceMap } from './devices'
export {
  getResources,
  getResourceById,
  getFeaturedResources,
  getCatalogVideoIds,
  countByCategory,
} from './resources'
export { getEcosystems } from './ecosystems'
export { getFaqs } from './faq'
export { getNews, getNewsPost } from './news'
export { getPartners } from './partners'
export { getSiteSettings, type SiteSettings, type SiteSeo } from './site-settings'
export { CMS_ENABLED } from './strapi-client'
