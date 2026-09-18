import type { Localized } from '@/i18n/config'
import type { SeoOverride } from '@/lib/seo'
import type { CategoryId, DeviceId, ResourceType } from './taxonomy'

/**
 * Catalogo de recursos de MySmartWindow.
 *
 * Los enlaces apuntan a los documentos reales publicados por IoT Fenster.
 * Esta estructura es deliberadamente un espejo del futuro modelo de contenido
 * de Strapi (fase 2): cuando exista el CMS, `getResources()` cambiara de leer
 * este array a leer la API y el resto de la aplicacion no se entera.
 */
export interface Resource {
  id: string
  type: ResourceType
  category: CategoryId
  device: DeviceId
  title: Localized
  summary?: Localized
  /** URL del PDF (manuales y tarjetas). */
  url?: string
  /** ID del video de YouTube (recursos de tipo video). */
  youtubeId?: string
  /** Lista de reproduccion a la que pertenece, si aplica. */
  playlistId?: string
  /** Fecha de publicacion/actualizacion (ISO). */
  updated?: string
  /** Enlace roto en el sitio original: lo marcamos en vez de propagarlo. */
  broken?: boolean
  /** Destacar en la portada. */
  featured?: boolean
  /** Terminos extra para el buscador. */
  tags?: string[]
  /** SEO editable desde el CMS; si no existe se genera a partir del contenido. */
  seo?: SeoOverride
}

const CDN = 'https://www.iotfenster.com/wp-content/uploads'

export const resources: Resource[] = [
  /* ======================================================================
     ADMINISTRACION
     ====================================================================== */
  {
    id: 'perfiles-de-usuario-manual',
    type: 'manual',
    category: 'administracion',
    device: 'general',
    updated: '2024-06-01',
    featured: true,
    url: `${CDN}/2024/06/Perfiles_de_usuario-MySmartWindow.pdf`,
    title: { es: 'Perfiles de Usuario', en: 'User Profiles', it: 'Profili Utente' },
    summary: {
      es: 'Qué puede hacer cada rol —propietario, invitado, instalador— y cómo compartir el control de un cerramiento.',
      en: 'What each role —owner, guest, installer— can do and how to share control of an enclosure.',
      it: 'Cosa può fare ogni ruolo —proprietario, ospite, installatore— e come condividere il controllo.',
    },
    tags: ['roles', 'permisos', 'invitados', 'compartir'],
  },
  {
    id: 'preguntas-frecuentes-manual',
    type: 'manual',
    category: 'administracion',
    device: 'general',
    updated: '2024-06-01',
    url: `${CDN}/2024/06/Preguntas-frecuentes-MySmartWindow-1.pdf`,
    title: { es: 'Preguntas Frecuentes', en: 'Frequently Asked Questions', it: 'Domande Frequenti' },
    summary: {
      es: 'Las dudas más repetidas por los usuarios de la app, resueltas en un único documento.',
      en: 'The most repeated questions from app users, answered in a single document.',
      it: 'Le domande più frequenti degli utenti dell’app, raccolte in un unico documento.',
    },
    tags: ['faq', 'dudas', 'ayuda'],
  },
  {
    id: 'perfiles-de-usuario-video',
    type: 'video',
    category: 'administracion',
    device: 'general',
    youtubeId: 'xgwksfNHRGU',
    featured: true,
    title: { es: 'Perfiles de Usuario', en: 'User Profiles', it: 'Profili Utente' },
    tags: ['roles', 'permisos'],
  },
  {
    id: 'preguntas-frecuentes-video',
    type: 'video',
    category: 'administracion',
    device: 'general',
    youtubeId: '2RlnQIekOcc',
    title: { es: 'Preguntas Frecuentes', en: 'Frequently Asked Questions', it: 'Domande Frequenti' },
    tags: ['faq'],
  },
  {
    id: 'perfiles-de-usuario-tarjeta',
    type: 'tarjeta',
    category: 'administracion',
    device: 'general',
    updated: '2024-06-01',
    url: `${CDN}/2024/06/Perfiles_de_usuario_tarjeta.pdf`,
    title: { es: 'Perfiles de Usuario', en: 'User Profiles', it: 'Profili Utente' },
    summary: {
      es: 'Resumen de una página con los roles y sus permisos.',
      en: 'One-page summary of roles and their permissions.',
      it: 'Riepilogo di una pagina con i ruoli e i relativi permessi.',
    },
  },
  {
    id: 'preguntas-frecuentes-dispositivo-tarjeta',
    type: 'tarjeta',
    category: 'administracion',
    device: 'general',
    updated: '2024-06-01',
    url: `${CDN}/2024/06/Pregunta-frecuentes-dispositivo-MSW-1.pdf`,
    title: {
      es: 'Preguntas frecuentes: Dispositivo',
      en: 'FAQ: Device',
      it: 'FAQ: Dispositivo',
    },
  },
  {
    id: 'preguntas-frecuentes-conectividad-y-vinculacion-tarjeta',
    type: 'tarjeta',
    category: 'administracion',
    device: 'general',
    updated: '2024-06-01',
    url: `${CDN}/2024/06/Pregunta-frecuentes-conectividad-y-vinculacion-MSW-1.pdf`,
    title: {
      es: 'Preguntas frecuentes: Conectividad y vinculación',
      en: 'FAQ: Connectivity and pairing',
      it: 'FAQ: Connettività e associazione',
    },
  },
  {
    id: 'preguntas-frecuentes-tipos-de-motor-tarjeta',
    type: 'tarjeta',
    category: 'administracion',
    device: 'general',
    updated: '2024-06-01',
    url: `${CDN}/2024/06/Preguntas-frecuentes-tipos-de-motor-1.pdf`,
    title: {
      es: 'Preguntas frecuentes: Tipos de motor',
      en: 'FAQ: Motor types',
      it: 'FAQ: Tipi di motore',
    },
    tags: ['motor', 'persiana', 'compatibilidad'],
  },

  /* ======================================================================
     CONECTIVIDAD
     ====================================================================== */
  {
    id: 'como-ampliar-mi-cobertura-manual',
    type: 'manual',
    category: 'conectividad',
    device: 'general',
    updated: '2024-05-01',
    featured: true,
    url: `${CDN}/2024/05/Conectividad_Como-ampliar-mi-cobertura_Documentacion-MySmartWindow.pdf`,
    title: {
      es: 'Cómo ampliar mi cobertura',
      en: 'How to extend my coverage',
      it: 'Come estendere la copertura',
    },
    summary: {
      es: 'Repetidores, ubicación del router y trucos para que la señal llegue a cerramientos alejados.',
      en: 'Repeaters, router placement and tips so the signal reaches distant enclosures.',
      it: 'Ripetitori, posizione del router e consigli per raggiungere chiusure lontane.',
    },
    tags: ['wifi', 'señal', 'repetidor', 'cobertura'],
  },
  {
    id: 'multiwifi-wifi-complementario-manual',
    type: 'manual',
    category: 'conectividad',
    device: 'general',
    updated: '2026-09-01',
    url: `${CDN}/2026/09/ES_-Conectividad_Multiwifi_Documentacion-MySmartWindow-1.pdf`,
    title: {
      es: 'Multiwifi / Wifi complementario',
      en: 'Multi-WiFi / complementary WiFi',
      it: 'Multiwifi / WiFi complementare',
    },
    summary: {
      es: 'Configura una segunda red para que el dispositivo nunca se quede sin conexión.',
      en: 'Set up a second network so the device never loses connection.',
      it: 'Configura una seconda rete perché il dispositivo non perda mai la connessione.',
    },
    tags: ['wifi', 'red secundaria', 'respaldo'],
  },
  {
    id: 'compartir-una-red-wi-fi-desde-android-manual',
    type: 'manual',
    category: 'conectividad',
    device: 'general',
    updated: '2026-09-01',
    url: `${CDN}/2026/09/Manual_Android_WiFi_IoT_FENSTER_MySmartWindow.pdf`,
    title: {
      es: 'Compartir una red Wi-Fi desde Android',
      en: 'Share a Wi-Fi network from Android',
      it: 'Condividere una rete Wi-Fi da Android',
    },
    tags: ['android', 'hotspot', 'compartir internet'],
  },
  {
    id: 'crear-una-red-wi-fi-movistar-o2-manual',
    type: 'manual',
    category: 'conectividad',
    device: 'general',
    broken: true,
    title: {
      es: 'Crear una red Wi-Fi — Movistar / O2',
      en: 'Create a Wi-Fi network — Movistar / O2',
      it: 'Creare una rete Wi-Fi — Movistar / O2',
    },
    summary: {
      es: 'Documento anunciado en el portal original cuyo enlace está roto. Pendiente de republicar.',
      en: 'Document announced on the original portal whose link is broken. Pending re-publication.',
      it: 'Documento annunciato sul portale originale con collegamento non funzionante. Da ripubblicare.',
    },
    tags: ['router', 'movistar', 'o2', '2.4ghz'],
  },
  {
    id: 'multiwifi-wifi-complementario-video',
    type: 'video',
    category: 'conectividad',
    device: 'general',
    youtubeId: 'i1Dm_qvKTkY',
    title: {
      es: 'Multiwifi / Wifi complementario',
      en: 'Multi-WiFi / complementary WiFi',
      it: 'Multiwifi / WiFi complementare',
    },
  },

  /* ======================================================================
     APP
     ====================================================================== */
  {
    id: 'connect-1-menu-de-edicion-video',
    type: 'video',
    category: 'app',
    device: 'connect-1',
    youtubeId: 'vc7TpbaN5Bo',
    playlistId: 'PLXuC7JO6kNVU-U8aWViiZoSuMsXXOIfLA',
    featured: true,
    title: {
      es: 'Connect-1 — Menú de edición',
      en: 'Connect-1 — Edit menu',
      it: 'Connect-1 — Menu di modifica',
    },
    summary: {
      es: 'Renombra, reordena y agrupa tus cerramientos desde la app.',
      en: 'Rename, reorder and group your enclosures from the app.',
      it: 'Rinomina, riordina e raggruppa le tue chiusure dall’app.',
    },
    tags: ['app', 'editar', 'renombrar'],
  },

  /* ======================================================================
     DISPOSITIVOS
     ====================================================================== */
  {
    id: 'hard-reset-botones-del-dispositivo-manual',
    type: 'manual',
    category: 'dispositivos',
    device: 'general',
    updated: '2024-05-01',
    url: `${CDN}/2024/05/Dispositivo_botones_-MySmartWindow.pdf`,
    title: {
      es: 'Hard Reset · Botones del dispositivo',
      en: 'Hard Reset · Device buttons',
      it: 'Hard Reset · Pulsanti del dispositivo',
    },
    summary: {
      es: 'Qué hace cada botón físico y cómo devolver el dispositivo a fábrica.',
      en: 'What each physical button does and how to restore the device to factory settings.',
      it: 'Cosa fa ogni pulsante fisico e come riportare il dispositivo alle impostazioni di fabbrica.',
    },
    tags: ['reset', 'botones', 'fabrica'],
  },
  {
    id: 'reset-software-manual',
    type: 'manual',
    category: 'dispositivos',
    device: 'general',
    updated: '2024-06-01',
    url: `${CDN}/2024/06/Reset_Software_-MySmartWindow.pdf`,
    title: { es: 'Reset Software', en: 'Software Reset', it: 'Reset Software' },
    tags: ['reset', 'software'],
  },
  {
    id: 'c-pulsar-documentacion-de-funcionalidades-manual',
    type: 'manual',
    category: 'dispositivos',
    device: 'c-pulsar',
    updated: '2026-09-01',
    url: `${CDN}/2026/09/C-PULSAR_Documentacion_MySmartWindow.pdf`,
    title: {
      es: 'C-PULSAR — Documentación de funcionalidades',
      en: 'C-PULSAR — Feature documentation',
      it: 'C-PULSAR — Documentazione delle funzionalità',
    },
  },
  {
    id: 'c-wall-documentacion-de-funcionalidades-manual',
    type: 'manual',
    category: 'dispositivos',
    device: 'c-wall',
    updated: '2026-09-01',
    url: `${CDN}/2026/09/C-Wall_Documentacion_MySmartWindow.pdf`,
    title: {
      es: 'C-WALL — Documentación de funcionalidades',
      en: 'C-WALL — Feature documentation',
      it: 'C-WALL — Documentazione delle funzionalità',
    },
  },
  {
    id: 'connect-1-documentacion-de-funcionalidades-manual',
    type: 'manual',
    category: 'dispositivos',
    device: 'connect-1',
    updated: '2026-09-01',
    url: `${CDN}/2026/09/Connect-1_Documentacion_MySmartWindow_v2.pdf`,
    title: {
      es: 'CONNECT-1 — Documentación de funcionalidades',
      en: 'CONNECT-1 — Feature documentation',
      it: 'CONNECT-1 — Documentazione delle funzionalità',
    },
  },
  {
    id: 'connect-2-documentacion-de-funcionalidades-manual',
    type: 'manual',
    category: 'dispositivos',
    device: 'connect-2',
    updated: '2026-09-01',
    featured: true,
    url: `${CDN}/2026/09/Connect-2_Documentacion_MySmartWindow.pdf`,
    title: {
      es: 'CONNECT-2 — Documentación de funcionalidades',
      en: 'CONNECT-2 — Feature documentation',
      it: 'CONNECT-2 — Documentazione delle funzionalità',
    },
    summary: {
      es: 'Manual de referencia del controlador de segunda generación.',
      en: 'Reference manual for the second-generation controller.',
      it: 'Manuale di riferimento del controller di seconda generazione.',
    },
  },
  {
    id: 'connect-evo-documentacion-de-funcionalidades-manual',
    type: 'manual',
    category: 'dispositivos',
    device: 'connect-evo',
    updated: '2026-09-01',
    url: `${CDN}/2026/09/Connect_EVO_Documentacion.pdf`,
    title: {
      es: 'CONNECT EVO — Documentación de funcionalidades',
      en: 'CONNECT EVO — Feature documentation',
      it: 'CONNECT EVO — Documentazione delle funzionalità',
    },
  },
  {
    id: 'remotewitooth-documentacion-de-funcionalidades-manual',
    type: 'manual',
    category: 'dispositivos',
    device: 'remote-witooth',
    updated: '2026-09-01',
    url: `${CDN}/2026/09/RemoteWiTooth_Documentacion_MySmartWindow.pdf`,
    title: {
      es: 'RemoteWiTooth — Documentación de funcionalidades',
      en: 'RemoteWiTooth — Feature documentation',
      it: 'RemoteWiTooth — Documentazione delle funzionalità',
    },
  },
  {
    id: 'connect-1-hard-reset-y-botones-del-dispositivo-video',
    type: 'video',
    category: 'dispositivos',
    device: 'connect-1',
    youtubeId: '3_0JS2wHc8Y',
    title: {
      es: 'Connect-1 — Hard Reset y botones del dispositivo',
      en: 'Connect-1 — Hard Reset and device buttons',
      it: 'Connect-1 — Hard Reset e pulsanti del dispositivo',
    },
    tags: ['reset', 'botones'],
  },
  {
    id: 'connect-reset-software-video',
    type: 'video',
    category: 'dispositivos',
    device: 'general',
    youtubeId: 'yhQVNuBkd1Y',
    title: {
      es: 'Connect — Reset Software',
      en: 'Connect — Software Reset',
      it: 'Connect — Reset Software',
    },
  },
  {
    id: 'hard-reset-del-dispositivo-botones-tarjeta',
    type: 'tarjeta',
    category: 'dispositivos',
    device: 'connect-1',
    updated: '2024-06-01',
    url: `${CDN}/2024/06/Hard_reset_connect1-Dispositivos.pdf`,
    title: {
      es: 'Hard Reset del dispositivo — Botones',
      en: 'Device Hard Reset — Buttons',
      it: 'Hard Reset del dispositivo — Pulsanti',
    },
  },

  /* ======================================================================
     ECOSISTEMAS
     ====================================================================== */
  {
    id: 'alexa-vinculacion-con-mysmartwindow-manual',
    type: 'manual',
    category: 'ecosistemas',
    device: 'general',
    updated: '2025-09-01',
    featured: true,
    url: `${CDN}/2025/09/Manual-Alexa-Vinculacion-con-MySmartWindow.pdf`,
    title: {
      es: 'Alexa — Vinculación con MySmartWindow',
      en: 'Alexa — Linking with MySmartWindow',
      it: 'Alexa — Collegamento con MySmartWindow',
    },
    summary: {
      es: 'Vincula tu cuenta y controla los cerramientos con la voz en pocos minutos.',
      en: 'Link your account and control enclosures with your voice in minutes.',
      it: 'Collega il tuo account e controlla le chiusure con la voce in pochi minuti.',
    },
    tags: ['alexa', 'amazon', 'voz', 'skill'],
  },
  {
    id: 'alexa-subir-la-persiana-a-una-hora-de-la-manana-manual',
    type: 'manual',
    category: 'ecosistemas',
    device: 'general',
    updated: '2024-05-01',
    url: `${CDN}/2024/05/Manual-Alexa-Tarea-Programada-MySmartWindow.pdf`,
    title: {
      es: 'Alexa — Subir la persiana a una hora de la mañana',
      en: 'Alexa — Raise the blind at a set morning time',
      it: 'Alexa — Alzare la tapparella a un’ora del mattino',
    },
    tags: ['alexa', 'rutina', 'tarea programada'],
  },
  {
    id: 'google-home-bajar-las-persianas-al-anochecer-manual',
    type: 'manual',
    category: 'ecosistemas',
    device: 'general',
    updated: '2024-05-01',
    url: `${CDN}/2024/05/%F0%9F%92%9ABajar_persianas_al_anochecer_Tarea-Programada-MySmartWindow.pdf`,
    title: {
      es: 'Google Home — Bajar las persianas al anochecer',
      en: 'Google Home — Lower the blinds at dusk',
      it: 'Google Home — Abbassare le tapparelle al tramonto',
    },
    tags: ['google home', 'rutina', 'anochecer'],
  },
  {
    id: 'google-home-subir-las-persianas-a-las-8-00-manual',
    type: 'manual',
    category: 'ecosistemas',
    device: 'general',
    updated: '2024-05-01',
    url: `${CDN}/2024/05/%F0%9F%92%9AManual-Google-Home-Tarea-Programada-MySmartWindow.pdf`,
    title: {
      es: 'Google Home — Subir las persianas a las 8:00',
      en: 'Google Home — Raise the blinds at 8:00',
      it: 'Google Home — Alzare le tapparelle alle 8:00',
    },
    tags: ['google home', 'rutina'],
  },
  {
    id: 'ifttt-integracion-y-tareas-programadas-manual',
    type: 'manual',
    category: 'ecosistemas',
    device: 'general',
    updated: '2024-05-01',
    url: `${CDN}/2024/05/Manual-Integracion-IFTTT-Tarea-Programada-MySmartWindow.pdf`,
    title: {
      es: 'IFTTT — Integración y tareas programadas',
      en: 'IFTTT — Integration and scheduled tasks',
      it: 'IFTTT — Integrazione e attività programmate',
    },
    tags: ['ifttt', 'automatización', 'applet'],
  },
  {
    id: 'que-es-ifttt-manual',
    type: 'manual',
    category: 'ecosistemas',
    device: 'general',
    updated: '2024-05-01',
    url: `${CDN}/2024/05/%C2%BFQue-es-IFTTT-MySmartWindow.pdf`,
    title: { es: '¿Qué es IFTTT?', en: 'What is IFTTT?', it: 'Che cos’è IFTTT?' },
    tags: ['ifttt'],
  },
  {
    id: 'aidoo-skills-manual',
    type: 'manual',
    category: 'ecosistemas',
    device: 'general',
    updated: '2026-04-01',
    url: `${CDN}/2026/04/Aidoo_skills_ES.pdf`,
    title: { es: 'Aidoo Skills', en: 'Aidoo Skills', it: 'Aidoo Skills' },
    tags: ['aidoo', 'clima', 'airzone'],
  },
  {
    id: 'alexa-vincular-cuenta-video',
    type: 'video',
    category: 'ecosistemas',
    device: 'general',
    youtubeId: 'QbPyzlBy3rU',
    featured: true,
    title: {
      es: 'Alexa — Vincular cuenta',
      en: 'Alexa — Link account',
      it: 'Alexa — Collegare l’account',
    },
  },
  {
    id: 'alexa-subir-la-persiana-a-una-hora-de-la-manana-video',
    type: 'video',
    category: 'ecosistemas',
    device: 'general',
    youtubeId: 'kgfnaKl2jFk',
    title: {
      es: 'Alexa — Subir la persiana a una hora de la mañana',
      en: 'Alexa — Raise the blind at a set morning time',
      it: 'Alexa — Alzare la tapparella a un’ora del mattino',
    },
  },
  {
    id: 'google-home-bajar-las-persianas-al-anochecer-video',
    type: 'video',
    category: 'ecosistemas',
    device: 'general',
    youtubeId: '4_YDkKKsEsU',
    title: {
      es: 'Google Home — Bajar las persianas al anochecer',
      en: 'Google Home — Lower the blinds at dusk',
      it: 'Google Home — Abbassare le tapparelle al tramonto',
    },
  },
  {
    id: 'google-home-subir-las-persianas-a-las-8-00-video',
    type: 'video',
    category: 'ecosistemas',
    device: 'general',
    youtubeId: 'vWD91q1BPN8',
    title: {
      es: 'Google Home — Subir las persianas a las 8:00',
      en: 'Google Home — Raise the blinds at 8:00',
      it: 'Google Home — Alzare le tapparelle alle 8:00',
    },
  },
  {
    id: 'google-home-vincular-cuenta-video',
    type: 'video',
    category: 'ecosistemas',
    device: 'general',
    youtubeId: 'hebELentU-Y',
    title: {
      es: 'Google Home — Vincular cuenta',
      en: 'Google Home — Link account',
      it: 'Google Home — Collegare l’account',
    },
  },
  {
    id: 'ifttt-que-es-ifttt-video',
    type: 'video',
    category: 'ecosistemas',
    device: 'general',
    youtubeId: 'fJ20WneNgXU',
    title: { es: 'IFTTT — ¿Qué es IFTTT?', en: 'IFTTT — What is IFTTT?', it: 'IFTTT — Che cos’è IFTTT?' },
  },
  {
    id: 'connect-servicio-de-persiana-video',
    type: 'video',
    category: 'ecosistemas',
    device: 'general',
    youtubeId: 'LmwEcjnx4oY',
    title: {
      es: 'Connect — Servicio de persiana',
      en: 'Connect — Blind service',
      it: 'Connect — Servizio tapparella',
    },
  },

  /* ======================================================================
     INSTALACION
     ====================================================================== */
  {
    id: 'connect-1-como-se-instala-el-dispositivo-manual',
    type: 'manual',
    category: 'instalacion',
    device: 'connect-1',
    updated: '2024-06-01',
    url: `${CDN}/2024/06/Instalacion-Connect-1-MySmartWindow.pdf`,
    title: {
      es: 'CONNECT-1 — Cómo se instala el dispositivo',
      en: 'CONNECT-1 — How to install the device',
      it: 'CONNECT-1 — Come installare il dispositivo',
    },
  },
  {
    id: 'connect-2-como-se-instala-el-dispositivo-manual',
    type: 'manual',
    category: 'instalacion',
    device: 'connect-2',
    updated: '2024-06-01',
    featured: true,
    url: `${CDN}/2024/06/Instalacion-Connect-2-MySmartWindow-1.pdf`,
    title: {
      es: 'CONNECT-2 — Cómo se instala el dispositivo',
      en: 'CONNECT-2 — How to install the device',
      it: 'CONNECT-2 — Come installare il dispositivo',
    },
    summary: {
      es: 'Cableado, conexión al motor y primeros pasos, con ilustraciones.',
      en: 'Wiring, motor connection and first steps, with illustrations.',
      it: 'Cablaggio, collegamento al motore e primi passi, con illustrazioni.',
    },
  },
  {
    id: 'instalacion-del-sensor-de-apertura-manual',
    type: 'manual',
    category: 'instalacion',
    device: 'sensor-rc33',
    updated: '2024-05-01',
    url: `${CDN}/2024/05/Indicador-del-sensor-de-apertura-Instalacion.pdf`,
    title: {
      es: 'Instalación del sensor de apertura',
      en: 'Opening sensor installation',
      it: 'Installazione del sensore di apertura',
    },
  },
  {
    id: 'c-pulsar-instalacion-del-dispositivo-manual',
    type: 'manual',
    category: 'instalacion',
    device: 'c-pulsar',
    updated: '2026-06-01',
    url: `${CDN}/2026/06/Instalacion-C-PULSAR-MySmartWindow-1.pdf`,
    title: {
      es: 'C-PULSAR — Instalación del dispositivo',
      en: 'C-PULSAR — Device installation',
      it: 'C-PULSAR — Installazione del dispositivo',
    },
  },
  {
    id: 'fabricacion-del-cajon-rtx-manual',
    type: 'manual',
    category: 'instalacion',
    device: 'general',
    updated: '2026-07-01',
    url: `${CDN}/2026/07/Manual-fabricacion-Cajon-RTX-La-VIUDA.pdf`,
    title: {
      es: 'Fabricación del cajón RTX',
      en: 'RTX box manufacturing',
      it: 'Fabbricazione del cassonetto RTX',
    },
    summary: {
      es: 'Guía para fabricantes: montaje del cajón RTX compatible.',
      en: 'Guide for manufacturers: assembling the compatible RTX box.',
      it: 'Guida per i produttori: montaggio del cassonetto RTX compatibile.',
    },
    tags: ['fabricante', 'cajón', 'rtx'],
  },
  {
    id: 'c-wall-instalacion-del-dispositivo-manual',
    type: 'manual',
    category: 'instalacion',
    device: 'c-wall',
    updated: '2026-04-01',
    url: `${CDN}/2026/04/Instrucciones-CWALL-1.pdf`,
    title: {
      es: 'C-WALL — Instalación del dispositivo',
      en: 'C-WALL — Device installation',
      it: 'C-WALL — Installazione del dispositivo',
    },
  },
  {
    id: 'connect-evo-instalacion-del-dispositivo-manual',
    type: 'manual',
    category: 'instalacion',
    device: 'connect-evo',
    updated: '2026-07-01',
    url: `${CDN}/2026/07/Instalacion-EVO-MySmartWindow-1_compressed.pdf`,
    title: {
      es: 'CONNECT EVO — Instalación del dispositivo',
      en: 'CONNECT EVO — Device installation',
      it: 'CONNECT EVO — Installazione del dispositivo',
    },
  },
  {
    id: 'connect-1-como-se-instala-el-dispositivo-video',
    type: 'video',
    category: 'instalacion',
    device: 'connect-1',
    youtubeId: 'G7_DOCulUfQ',
    title: {
      es: 'CONNECT-1 — Cómo se instala el dispositivo',
      en: 'CONNECT-1 — How to install the device',
      it: 'CONNECT-1 — Come installare il dispositivo',
    },
  },
  {
    id: 'connect-2-como-se-instala-el-dispositivo-video',
    type: 'video',
    category: 'instalacion',
    device: 'connect-2',
    youtubeId: 'tZ1aSM4zxdI',
    featured: true,
    title: {
      es: 'CONNECT-2 — Cómo se instala el dispositivo',
      en: 'CONNECT-2 — How to install the device',
      it: 'CONNECT-2 — Come installare il dispositivo',
    },
  },
  {
    id: 'instalacion-del-sensor-de-apertura-video',
    type: 'video',
    category: 'instalacion',
    device: 'sensor-rc33',
    youtubeId: 'ciZx_U1ycLk',
    title: {
      es: 'Instalación del sensor de apertura',
      en: 'Opening sensor installation',
      it: 'Installazione del sensore di apertura',
    },
  },
  {
    id: 'motorizacion-de-una-ventana-video',
    type: 'video',
    category: 'instalacion',
    device: 'general',
    youtubeId: '1jnmia28Odg',
    title: {
      es: 'Motorización de una ventana',
      en: 'Motorising a window',
      it: 'Motorizzazione di una finestra',
    },
    tags: ['motor', 'ventana'],
  },
  {
    id: 'c-wall-como-se-instala-video',
    type: 'video',
    category: 'instalacion',
    device: 'c-wall',
    youtubeId: 'mxnSQ1yJokk',
    title: { es: 'C-WALL — Cómo se instala', en: 'C-WALL — How to install', it: 'C-WALL — Come si installa' },
  },

  /* ======================================================================
     SOPORTE
     ====================================================================== */
  {
    id: 'configuracion-del-router-video',
    type: 'video',
    category: 'soporte',
    device: 'general',
    youtubeId: 'RoWQK-J5JII',
    featured: true,
    title: {
      es: 'Configuración del router',
      en: 'Router configuration',
      it: 'Configurazione del router',
    },
    summary: {
      es: 'Banda de 2.4 GHz, separación de redes y ajustes que evitan la mayoría de incidencias.',
      en: '2.4 GHz band, network separation and the settings that prevent most issues.',
      it: 'Banda 2.4 GHz, separazione delle reti e impostazioni che evitano la maggior parte dei problemi.',
    },
    tags: ['router', '2.4ghz', 'incidencias'],
  },
  {
    id: 'solucion-de-problemas-vinculacion-video',
    type: 'video',
    category: 'soporte',
    device: 'general',
    youtubeId: 'Qvya35g8D_o',
    title: {
      es: 'Solución de problemas — Vinculación',
      en: 'Troubleshooting — Pairing',
      it: 'Risoluzione dei problemi — Associazione',
    },
    tags: ['troubleshooting', 'no vincula'],
  },

  /* ======================================================================
     SEGURIDAD
     ====================================================================== */
  {
    id: 'integrar-con-alarma-de-sirena-video',
    type: 'video',
    category: 'seguridad',
    device: 'general',
    youtubeId: 'lSqxdRcBJ-A',
    title: {
      es: 'Integrar con alarma de sirena',
      en: 'Integrate with a siren alarm',
      it: 'Integrare con allarme a sirena',
    },
    tags: ['alarma', 'sirena', 'seguridad'],
  },

  /* ======================================================================
     VINCULACION
     ====================================================================== */
  {
    id: 'vinculacion-punto-a-punto-manual',
    type: 'manual',
    category: 'vinculacion',
    device: 'general',
    updated: '2024-05-01',
    featured: true,
    url: `${CDN}/2024/05/Manual-Vinculacion-MySmartWindow-1.pdf`,
    title: {
      es: 'Vinculación punto a punto',
      en: 'Point-to-point pairing',
      it: 'Associazione punto a punto',
    },
    summary: {
      es: 'El método estándar para emparejar un dispositivo con un cerramiento.',
      en: 'The standard method to pair one device with one enclosure.',
      it: 'Il metodo standard per abbinare un dispositivo a una chiusura.',
    },
    tags: ['emparejar', 'pairing'],
  },
  {
    id: 'multivinculacion-manual',
    type: 'manual',
    category: 'vinculacion',
    device: 'general',
    updated: '2024-06-01',
    url: `${CDN}/2024/06/Manual-de-Multivinculacion-MySmartWindow-1_compressed.pdf`,
    title: { es: 'Multivinculación', en: 'Multi-pairing', it: 'Associazione multipla' },
    summary: {
      es: 'Controla varios cerramientos a la vez desde un mismo mando o botón.',
      en: 'Control several enclosures at once from a single control or button.',
      it: 'Controlla più chiusure contemporaneamente da un unico comando.',
    },
    tags: ['multicast', 'grupo'],
  },
  {
    id: 'c-wall-multivinculacion-manual',
    type: 'manual',
    category: 'vinculacion',
    device: 'c-wall',
    updated: '2025-09-01',
    url: `${CDN}/2025/09/Manual-de-Multivinculacion_C-Wall-MySmartWindow.pdf`,
    title: {
      es: 'C-WALL — Multivinculación',
      en: 'C-WALL — Multi-pairing',
      it: 'C-WALL — Associazione multipla',
    },
  },
  {
    id: 'vinculacion-punto-a-punto-video',
    type: 'video',
    category: 'vinculacion',
    device: 'general',
    youtubeId: 'ItsojJBE0P4',
    featured: true,
    title: {
      es: 'Vinculación punto a punto',
      en: 'Point-to-point pairing',
      it: 'Associazione punto a punto',
    },
  },
  {
    id: 'multivinculacion-video',
    type: 'video',
    category: 'vinculacion',
    device: 'general',
    youtubeId: 'KidyF4ZpdAE',
    title: { es: 'Multivinculación', en: 'Multi-pairing', it: 'Associazione multipla' },
  },
  {
    id: 'vinculacion-c-wall-video',
    type: 'video',
    category: 'vinculacion',
    device: 'c-wall',
    youtubeId: 'myijKC5RsZU',
    title: { es: 'Vinculación C-WALL', en: 'C-WALL pairing', it: 'Associazione C-WALL' },
  },
  {
    id: 'vinculacion-punto-a-punto-tarjeta',
    type: 'tarjeta',
    category: 'vinculacion',
    device: 'general',
    updated: '2025-09-01',
    url: `${CDN}/2025/09/Vinculacion-punto-a-punto_tarjeta.pdf`,
    title: {
      es: 'Vinculación punto a punto',
      en: 'Point-to-point pairing',
      it: 'Associazione punto a punto',
    },
  },
  {
    id: 'vinculacion-c-wall-tarjeta',
    type: 'tarjeta',
    category: 'vinculacion',
    device: 'c-wall',
    updated: '2025-08-01',
    url: `${CDN}/2025/08/Vinculacion-c-wall.pdf`,
    title: { es: 'Vinculación C-WALL', en: 'C-WALL pairing', it: 'Associazione C-WALL' },
  },
  {
    id: 'multivinculacion-tarjeta',
    type: 'tarjeta',
    category: 'vinculacion',
    device: 'general',
    updated: '2025-09-01',
    url: `${CDN}/2025/09/Vinculacion-Multivinculacion.pdf`,
    title: { es: 'Multivinculación', en: 'Multi-pairing', it: 'Associazione multipla' },
  },
]

/* ==========================================================================
   Selectores
   ========================================================================== */
export function getResources(): Resource[] {
  return resources
}

export function getResourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id)
}

export function getFeaturedResources(limit = 6): Resource[] {
  return resources.filter((r) => r.featured).slice(0, limit)
}

/** IDs de YouTube presentes en el catalogo, para enriquecerlos con la API/RSS. */
export function getCatalogVideoIds(): string[] {
  return Array.from(
    new Set(resources.filter((r) => r.type === 'video' && r.youtubeId).map((r) => r.youtubeId!))
  )
}

export function countByCategory(): Record<string, { manual: number; video: number; tarjeta: number; total: number }> {
  const out: Record<string, { manual: number; video: number; tarjeta: number; total: number }> = {}
  for (const r of resources) {
    out[r.category] ??= { manual: 0, video: 0, tarjeta: 0, total: 0 }
    out[r.category][r.type] += 1
    out[r.category].total += 1
  }
  return out
}
