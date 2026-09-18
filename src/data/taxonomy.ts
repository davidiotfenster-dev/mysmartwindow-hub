import type { Localized } from '@/i18n/config'

/* ==========================================================================
   Tipos de recurso
   ========================================================================== */
export const resourceTypes = ['manual', 'video', 'tarjeta'] as const
export type ResourceType = (typeof resourceTypes)[number]

export const resourceTypeMeta: Record<
  ResourceType,
  { label: Localized; short: Localized; icon: string; accent: string }
> = {
  manual: {
    label: { es: 'Manuales', en: 'Manuals', it: 'Manuali' },
    short: { es: 'Manual', en: 'Manual', it: 'Manuale' },
    icon: 'book',
    accent: 'brand',
  },
  video: {
    label: { es: 'Vídeos', en: 'Videos', it: 'Video' },
    short: { es: 'Vídeo', en: 'Video', it: 'Video' },
    icon: 'play',
    accent: 'signal',
  },
  tarjeta: {
    label: { es: 'Tarjetas', en: 'Cards', it: 'Schede' },
    short: { es: 'Tarjeta', en: 'Card', it: 'Scheda' },
    icon: 'card',
    accent: 'amber',
  },
}

/* ==========================================================================
   Categorias - las 9 del portal original
   ========================================================================== */
export const categoryIds = [
  'administracion',
  'conectividad',
  'app',
  'dispositivos',
  'ecosistemas',
  'instalacion',
  'soporte',
  'seguridad',
  'vinculacion',
] as const
export type CategoryId = (typeof categoryIds)[number]

export interface Category {
  id: CategoryId
  name: Localized
  description: Localized
  icon: string
}

export const categories: Category[] = [
  {
    id: 'administracion',
    icon: 'users',
    name: { es: 'Administración', en: 'Administration', it: 'Amministrazione' },
    description: {
      es: 'Perfiles de usuario, permisos y preguntas frecuentes sobre la gestión de tu cuenta.',
      en: 'User profiles, permissions and frequently asked questions about managing your account.',
      it: 'Profili utente, permessi e domande frequenti sulla gestione del tuo account.',
    },
  },
  {
    id: 'conectividad',
    icon: 'wifi',
    name: { es: 'Conectividad', en: 'Connectivity', it: 'Connettività' },
    description: {
      es: 'Wi-Fi, cobertura, redes complementarias y configuración del router.',
      en: 'Wi-Fi, coverage, complementary networks and router configuration.',
      it: 'Wi-Fi, copertura, reti complementari e configurazione del router.',
    },
  },
  {
    id: 'app',
    icon: 'smartphone',
    name: { es: 'App', en: 'App', it: 'App' },
    description: {
      es: 'Menús, ajustes y funciones de la aplicación MySmartWindow.',
      en: 'Menus, settings and features of the MySmartWindow application.',
      it: 'Menu, impostazioni e funzioni dell’applicazione MySmartWindow.',
    },
  },
  {
    id: 'dispositivos',
    icon: 'cpu',
    name: { es: 'Dispositivos', en: 'Devices', it: 'Dispositivi' },
    description: {
      es: 'Documentación de funcionalidades, botones y resets de cada dispositivo.',
      en: 'Feature documentation, buttons and resets for every device.',
      it: 'Documentazione delle funzionalità, pulsanti e reset di ogni dispositivo.',
    },
  },
  {
    id: 'ecosistemas',
    icon: 'sparkles',
    name: { es: 'Ecosistemas', en: 'Ecosystems', it: 'Ecosistemi' },
    description: {
      es: 'Alexa, Google Home, IFTTT y Aidoo: vinculación, rutinas y tareas programadas.',
      en: 'Alexa, Google Home, IFTTT and Aidoo: account linking, routines and scheduled tasks.',
      it: 'Alexa, Google Home, IFTTT e Aidoo: collegamento, routine e attività programmate.',
    },
  },
  {
    id: 'instalacion',
    icon: 'wrench',
    name: { es: 'Instalación', en: 'Installation', it: 'Installazione' },
    description: {
      es: 'Montaje del dispositivo, motorización y sensores paso a paso.',
      en: 'Device mounting, motorisation and sensors, step by step.',
      it: 'Montaggio del dispositivo, motorizzazione e sensori passo dopo passo.',
    },
  },
  {
    id: 'soporte',
    icon: 'lifebuoy',
    name: { es: 'Soporte', en: 'Support', it: 'Supporto' },
    description: {
      es: 'Resolución de incidencias frecuentes y ajustes avanzados de red.',
      en: 'Troubleshooting for common issues and advanced network settings.',
      it: 'Risoluzione dei problemi comuni e impostazioni di rete avanzate.',
    },
  },
  {
    id: 'seguridad',
    icon: 'shield',
    name: { es: 'Seguridad', en: 'Security', it: 'Sicurezza' },
    description: {
      es: 'Integración con alarmas y protección del hogar.',
      en: 'Alarm integration and home protection.',
      it: 'Integrazione con allarmi e protezione della casa.',
    },
  },
  {
    id: 'vinculacion',
    icon: 'link',
    name: { es: 'Vinculación', en: 'Pairing', it: 'Associazione' },
    description: {
      es: 'Punto a punto, multivinculación y emparejado de cada dispositivo.',
      en: 'Point to point, multi-pairing and device linking.',
      it: 'Punto a punto, associazione multipla e abbinamento dei dispositivi.',
    },
  },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  CategoryId,
  Category
>

/* ==========================================================================
   Dispositivos del ecosistema IoT Fenster
   ========================================================================== */
export const deviceIds = [
  'connect-1',
  'connect-2',
  'connect-evo',
  'c-pulsar',
  'c-wall',
  'c-wall-sky',
  'c-wall-shutter',
  'remote-witooth',
  'sensor-rc33',
  'general',
] as const
export type DeviceId = (typeof deviceIds)[number]

export interface Device {
  id: DeviceId
  name: string
  tagline: Localized
  description: Localized
  /** No listar en el escaparate de dispositivos (p.ej. "general"). */
  hidden?: boolean
  features: Localized[]
  url?: string
}

export const devices: Device[] = [
  {
    id: 'connect-2',
    name: 'CONNECT-2',
    url: 'https://www.iotfenster.com/connect-2/',
    tagline: {
      es: 'El cerebro de tu cerramiento',
      en: 'The brain of your enclosure',
      it: 'Il cervello della tua chiusura',
    },
    description: {
      es: 'Segunda generación del controlador que conecta persianas, ventanas y motores a la app y a tus asistentes de voz.',
      en: 'Second generation of the controller that connects blinds, windows and motors to the app and your voice assistants.',
      it: 'Seconda generazione del controller che collega tapparelle, finestre e motori all’app e agli assistenti vocali.',
    },
    features: [
      { es: 'Servicio de alertas', en: 'Alert service', it: 'Servizio di avvisi' },
      { es: 'Modo offline', en: 'Offline mode', it: 'Modalità offline' },
      { es: 'Sensor magnético RC-33', en: 'RC-33 magnetic sensor', it: 'Sensore magnetico RC-33' },
    ],
  },
  {
    id: 'connect-1',
    name: 'CONNECT-1',
    url: 'http://iotfenster.com/connect-1',
    tagline: {
      es: 'La primera generación, plenamente soportada',
      en: 'The first generation, fully supported',
      it: 'La prima generazione, pienamente supportata',
    },
    description: {
      es: 'El dispositivo que abrió el ecosistema. Mantiene documentación, vídeos y soporte completos.',
      en: 'The device that opened the ecosystem. Complete documentation, videos and support are maintained.',
      it: 'Il dispositivo che ha aperto l’ecosistema. Documentazione, video e supporto completi.',
    },
    features: [
      { es: 'Hard reset por botones', en: 'Hard reset via buttons', it: 'Hard reset tramite pulsanti' },
      { es: 'Menú de edición en app', en: 'In-app edit menu', it: 'Menu di modifica in app' },
      { es: 'Vinculación punto a punto', en: 'Point-to-point pairing', it: 'Associazione punto a punto' },
    ],
  },
  {
    id: 'connect-evo',
    name: 'CONNECT EVO',
    tagline: {
      es: 'La evolución del controlador',
      en: 'The controller, evolved',
      it: 'L’evoluzione del controller',
    },
    description: {
      es: 'Última iteración del Connect, con instalación simplificada y nuevas funcionalidades documentadas.',
      en: 'Latest Connect iteration, with simplified installation and newly documented features.',
      it: 'Ultima iterazione di Connect, con installazione semplificata e nuove funzionalità documentate.',
    },
    features: [
      { es: 'Instalación simplificada', en: 'Simplified installation', it: 'Installazione semplificata' },
      { es: 'Documentación dedicada', en: 'Dedicated documentation', it: 'Documentazione dedicata' },
    ],
  },
  {
    id: 'c-pulsar',
    name: 'C-PULSAR',
    url: 'https://www.iotfenster.com/c-pulsar-para-aluminio/',
    tagline: {
      es: 'Pensado para aluminio',
      en: 'Designed for aluminium',
      it: 'Pensato per l’alluminio',
    },
    description: {
      es: 'Solución específica para carpintería de aluminio, con vinculación AP y multicast.',
      en: 'Purpose-built for aluminium joinery, with AP and multicast pairing.',
      it: 'Soluzione specifica per serramenti in alluminio, con associazione AP e multicast.',
    },
    features: [
      { es: 'Vinculación AP', en: 'AP pairing', it: 'Associazione AP' },
      { es: 'Vinculación multicast', en: 'Multicast pairing', it: 'Associazione multicast' },
    ],
  },
  {
    id: 'c-wall',
    name: 'C-WALL',
    url: 'https://www.iotfenster.com/c-wall/',
    tagline: {
      es: 'El interruptor que piensa',
      en: 'The switch that thinks',
      it: 'L’interruttore che pensa',
    },
    description: {
      es: 'Mando de pared conectado: controla uno o varios cerramientos sin sacar el móvil.',
      en: 'Connected wall control: operate one or many enclosures without reaching for your phone.',
      it: 'Comando a parete connesso: controlla una o più chiusure senza usare il telefono.',
    },
    features: [
      { es: 'Multivinculación', en: 'Multi-pairing', it: 'Associazione multipla' },
      { es: 'Instalación empotrada', en: 'Flush installation', it: 'Installazione a incasso' },
    ],
  },
  {
    id: 'c-wall-sky',
    name: 'C-WALL Sky',
    url: 'https://www.iotfenster.com/c-wall-sky/',
    tagline: {
      es: 'Control para techos y claraboyas',
      en: 'Control for roofs and skylights',
      it: 'Controllo per tetti e lucernari',
    },
    description: {
      es: 'Variante del C-WALL orientada a cerramientos cenitales y ventanas de techo.',
      en: 'C-WALL variant aimed at overhead enclosures and roof windows.',
      it: 'Variante del C-WALL per chiusure zenitali e finestre da tetto.',
    },
    features: [{ es: 'Cerramientos cenitales', en: 'Overhead enclosures', it: 'Chiusure zenitali' }],
  },
  {
    id: 'c-wall-shutter',
    name: 'C-WALL Shutter',
    url: 'https://www.iotfenster.com/c-wall-shutter/',
    tagline: {
      es: 'Especialista en persianas',
      en: 'Roller shutter specialist',
      it: 'Specialista delle tapparelle',
    },
    description: {
      es: 'Versión del C-WALL dedicada al control de persianas enrollables.',
      en: 'C-WALL version dedicated to roller shutter control.',
      it: 'Versione del C-WALL dedicata al controllo delle tapparelle.',
    },
    features: [{ es: 'Control de persiana', en: 'Shutter control', it: 'Controllo tapparella' }],
  },
  {
    id: 'remote-witooth',
    name: 'RemoteWiTooth',
    tagline: {
      es: 'Puente entre radio y app',
      en: 'Bridge between radio and app',
      it: 'Ponte tra radio e app',
    },
    description: {
      es: 'Lleva mandos por radiofrecuencia al ecosistema conectado de MySmartWindow.',
      en: 'Brings radio-frequency remotes into the connected MySmartWindow ecosystem.',
      it: 'Porta i telecomandi a radiofrequenza nell’ecosistema connesso MySmartWindow.',
    },
    features: [{ es: 'Compatibilidad RF', en: 'RF compatibility', it: 'Compatibilità RF' }],
  },
  {
    id: 'sensor-rc33',
    name: 'Sensor RC-33',
    url: 'https://www.iotfenster.com/sensor-magnetico-rc-33/',
    tagline: {
      es: 'Sabe si está abierto',
      en: 'Knows when it is open',
      it: 'Sa quando è aperto',
    },
    description: {
      es: 'Sensor magnético de apertura compatible con CONNECT-2: estado real del cerramiento y alertas.',
      en: 'Magnetic opening sensor compatible with CONNECT-2: real enclosure state and alerts.',
      it: 'Sensore magnetico di apertura compatibile con CONNECT-2: stato reale e avvisi.',
    },
    features: [{ es: 'Alertas de apertura', en: 'Opening alerts', it: 'Avvisi di apertura' }],
  },
  {
    id: 'general',
    name: 'Ecosistema',
    hidden: true,
    tagline: { es: 'Común a todos', en: 'Common to all', it: 'Comune a tutti' },
    description: {
      es: 'Contenido transversal, válido para cualquier dispositivo del ecosistema.',
      en: 'Cross-cutting content, valid for any device in the ecosystem.',
      it: 'Contenuto trasversale, valido per qualsiasi dispositivo dell’ecosistema.',
    },
    features: [],
  },
]

export const deviceById = Object.fromEntries(devices.map((d) => [d.id, d])) as Record<DeviceId, Device>

export const visibleDevices = devices.filter((d) => !d.hidden)
