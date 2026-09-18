import type { Localized } from '@/i18n/config'

/**
 * Noticias de ejemplo.
 *
 * Es el modelo que ocupara Strapi en la fase 2: mismo contrato, mismos campos.
 * Cuando exista el CMS, `getNews()` pasa a leer la API y nada mas cambia.
 */
export interface NewsPost {
  slug: string
  title: Localized
  excerpt: Localized
  body: Localized
  tag: Localized
  publishedAt: string
  readingMinutes: number
  /** Degradado de portada; el CMS traera una imagen real. */
  gradient: string
  featured?: boolean
}

export const news: NewsPost[] = [
  {
    slug: 'connect-evo-documentacion',
    publishedAt: '2026-09-08',
    readingMinutes: 4,
    featured: true,
    gradient: 'from-brand-500/30 via-signal-500/15 to-transparent',
    tag: { es: 'Producto', en: 'Product', it: 'Prodotto' },
    title: {
      es: 'Connect EVO ya tiene su documentación completa',
      en: 'Connect EVO now has its complete documentation',
      it: 'Connect EVO ha ora la sua documentazione completa',
    },
    excerpt: {
      es: 'Publicamos el manual de funcionalidades y la guía de instalación del nuevo controlador de la familia Connect.',
      en: 'We published the feature manual and the installation guide for the newest controller in the Connect family.',
      it: 'Abbiamo pubblicato il manuale delle funzionalità e la guida all’installazione del nuovo controller della famiglia Connect.',
    },
    body: {
      es: 'El Connect EVO cierra el círculo de la familia: mantiene la compatibilidad con los motores de siempre y simplifica la instalación hasta dejarla en unos pocos pasos.\n\nCon esta publicación ya están disponibles tanto la documentación de funcionalidades como la guía de instalación paso a paso, ambas en el centro de recursos, bajo las categorías Dispositivos e Instalación.\n\nSi vienes de un Connect-1 o de un Connect-2, la vinculación funciona igual: punto a punto para un cerramiento, multivinculación cuando quieras mover varios a la vez.',
      en: 'The Connect EVO closes the loop for the family: it keeps compatibility with the usual motors and simplifies installation down to a handful of steps.\n\nWith this release both the feature documentation and the step-by-step installation guide are available in the resource hub, under the Devices and Installation categories.\n\nIf you are coming from a Connect-1 or a Connect-2, pairing works the same: point to point for a single enclosure, multi-pairing when you want to move several at once.',
      it: 'Il Connect EVO chiude il cerchio della famiglia: mantiene la compatibilità con i motori di sempre e semplifica l’installazione in pochi passaggi.\n\nCon questa pubblicazione sono disponibili sia la documentazione delle funzionalità sia la guida all’installazione passo passo, entrambe nel centro risorse, nelle categorie Dispositivi e Installazione.\n\nSe arrivi da un Connect-1 o da un Connect-2, l’associazione funziona allo stesso modo: punto a punto per una chiusura, associazione multipla per muoverne diverse insieme.',
    },
  },
  {
    slug: 'vinculacion-ap-multicast-c-pulsar',
    publishedAt: '2026-07-29',
    readingMinutes: 3,
    gradient: 'from-signal-500/30 via-brand-500/12 to-transparent',
    tag: { es: 'Tutorial', en: 'Tutorial', it: 'Tutorial' },
    title: {
      es: 'Dos formas de vincular el C-Pulsar: AP y multicast',
      en: 'Two ways to pair the C-Pulsar: AP and multicast',
      it: 'Due modi per associare il C-Pulsar: AP e multicast',
    },
    excerpt: {
      es: 'Nuevos vídeos en el canal explicando el método AP, con el dispositivo en Hard Reset, y la multivinculación por multicast.',
      en: 'New videos on the channel explaining the AP method, with the device in Hard Reset, and multicast multi-pairing.',
      it: 'Nuovi video sul canale che spiegano il metodo AP, con il dispositivo in Hard Reset, e l’associazione multipla multicast.',
    },
    body: {
      es: 'El C-Pulsar admite dos rutas de vinculación y conviene saber cuándo usar cada una.\n\nEl método AP crea una red temporal desde el propio dispositivo: es el camino directo cuando vinculas una unidad concreta, y exige tener el dispositivo en modo Hard Reset.\n\nEl método multicast, en cambio, está pensado para cuando quieres dejar listos varios dispositivos de una tacada. Ambos vídeos están ya en la sección de vídeos, sincronizados automáticamente desde el canal.',
      en: 'The C-Pulsar supports two pairing routes and it is worth knowing when to use each.\n\nThe AP method creates a temporary network from the device itself: it is the direct path when pairing one specific unit, and it requires the device to be in Hard Reset mode.\n\nThe multicast method, in contrast, is meant for getting several devices ready in one go. Both videos are already in the videos section, synced automatically from the channel.',
      it: 'Il C-Pulsar supporta due percorsi di associazione ed è utile sapere quando usare ciascuno.\n\nIl metodo AP crea una rete temporanea dal dispositivo stesso: è la via diretta per associare una singola unità e richiede il dispositivo in modalità Hard Reset.\n\nIl metodo multicast, invece, serve a preparare più dispositivi in una sola volta. Entrambi i video sono già nella sezione video, sincronizzati automaticamente dal canale.',
    },
  },
  {
    slug: 'multiwifi-cobertura',
    publishedAt: '2026-09-02',
    readingMinutes: 5,
    gradient: 'from-amber-500/25 via-brand-500/12 to-transparent',
    tag: { es: 'Conectividad', en: 'Connectivity', it: 'Connettività' },
    title: {
      es: 'Multiwifi: que la persiana del fondo deje de desconectarse',
      en: 'Multi-WiFi: stop the far-end blind from dropping off',
      it: 'Multiwifi: basta disconnessioni per la tapparella più lontana',
    },
    excerpt: {
      es: 'La causa número uno de incidencias no es el dispositivo: es la cobertura. Explicamos cómo configurar una red complementaria.',
      en: 'The number one cause of issues is not the device: it is coverage. Here is how to set up a complementary network.',
      it: 'La causa numero uno dei problemi non è il dispositivo: è la copertura. Ecco come configurare una rete complementare.',
    },
    body: {
      es: 'Cuando un cerramiento se desconecta de forma intermitente, casi siempre es cuestión de señal, no de hardware.\n\nLa función de wifi complementario permite guardar una segunda red en el dispositivo. Si la principal falla o queda lejos, el Connect salta a la otra sin intervención.\n\nEn el centro de recursos tienes el manual completo, el vídeo del proceso y la guía de ampliación de cobertura. Un apunte importante: los dispositivos trabajan en la banda de 2.4 GHz, así que conviene revisar que el router no esté forzando 5 GHz en la misma SSID.',
      en: 'When an enclosure drops intermittently, it is almost always about signal, not hardware.\n\nThe complementary WiFi feature lets you store a second network on the device. If the main one fails or is too far, the Connect switches over without intervention.\n\nThe resource hub has the full manual, the walkthrough video and the coverage extension guide. One important note: the devices work on the 2.4 GHz band, so it is worth checking that the router is not forcing 5 GHz on the same SSID.',
      it: 'Quando una chiusura si disconnette a intermittenza, quasi sempre è questione di segnale, non di hardware.\n\nLa funzione WiFi complementare consente di salvare una seconda rete sul dispositivo. Se la principale non risponde o è troppo lontana, il Connect passa all’altra senza interventi.\n\nNel centro risorse trovi il manuale completo, il video del procedimento e la guida all’estensione della copertura. Una nota importante: i dispositivi lavorano sulla banda 2.4 GHz, quindi conviene verificare che il router non stia forzando i 5 GHz sulla stessa SSID.',
    },
  },
  {
    slug: 'tarjetas-paso-a-paso',
    publishedAt: '2025-09-15',
    readingMinutes: 2,
    gradient: 'from-brand-500/25 via-transparent to-signal-500/15',
    tag: { es: 'Documentación', en: 'Documentation', it: 'Documentazione' },
    title: {
      es: 'Tarjetas paso a paso: una página, un objetivo',
      en: 'Step-by-step cards: one page, one goal',
      it: 'Schede passo passo: una pagina, un obiettivo',
    },
    excerpt: {
      es: 'Formato pensado para el instalador que tiene las manos ocupadas y no va a leerse un manual de doce páginas.',
      en: 'A format for the installer whose hands are busy and who is not going to read a twelve-page manual.',
      it: 'Un formato per l’installatore che ha le mani occupate e non leggerà un manuale di dodici pagine.',
    },
    body: {
      es: 'Un manual completo es imprescindible, pero no siempre es lo que necesitas a pie de obra.\n\nLas tarjetas condensan un único procedimiento en una página imprimible: vinculación punto a punto, multivinculación, hard reset, perfiles de usuario. Nada más.\n\nEstán disponibles en el centro de recursos filtrando por el formato Tarjetas.',
      en: 'A full manual is essential, but it is not always what you need on site.\n\nCards condense a single procedure into one printable page: point-to-point pairing, multi-pairing, hard reset, user profiles. Nothing else.\n\nThey are available in the resource hub by filtering for the Cards format.',
      it: 'Un manuale completo è indispensabile, ma non è sempre ciò che serve in cantiere.\n\nLe schede condensano un’unica procedura in una pagina stampabile: associazione punto a punto, associazione multipla, hard reset, profili utente. Nient’altro.\n\nSono disponibili nel centro risorse filtrando per il formato Schede.',
    },
  },
]

export function getNews(): NewsPost[] {
  return [...news].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getNewsPost(slug: string): NewsPost | undefined {
  return news.find((post) => post.slug === slug)
}
