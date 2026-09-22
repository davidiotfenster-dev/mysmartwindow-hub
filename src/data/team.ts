import type { Localized } from '@/i18n/config'

/**
 * El equipo. Esto es el respaldo del codigo: lo que manda es el CMS, donde se
 * dan de alta y de baja las personas sin tocar nada de aqui.
 *
 * Los textos vienen del WordPress corporativo que se retira. Son bastante
 * genericos ("un estratega audaz que lidera con vision y determinacion"), asi
 * que ganarian mucho reescritos con datos concretos -que ha construido cada
 * uno, cuantos anos lleva-, que ademas es lo que hace que una pagina se cite.
 */
export interface TeamMember {
  id: string
  name: string
  /** Menor primero. Deja huecos para poder intercalar sin renumerar todo. */
  order: number
  role: Localized
  bio: Localized
  photo?: string
  linkedin?: string
}

export const team: TeamMember[] = [
  {
    id: 'julio-fuertes',
    name: 'Julio Fuertes',
    order: 10,
    role: {
      es: 'CEO',
      en: 'CEO',
      it: 'CEO',
    },
    bio: {
      es: 'Lidera la estrategia de IoT Fenster y su enfoque hacia el cliente, anticipando hacia dónde se mueve el mercado del IoT aplicado a los cerramientos.',
      en: 'Leads IoT Fenster’s strategy and its customer-first approach, anticipating where the market for IoT in window and door systems is heading.',
      it: 'Guida la strategia di IoT Fenster e il suo orientamento al cliente, anticipando la direzione del mercato dell’IoT applicato ai serramenti.',
    },
  },
  {
    id: 'fran-perez',
    name: 'Fran Pérez',
    order: 20,
    role: {
      es: 'CTO',
      en: 'CTO',
      it: 'CTO',
    },
    bio: {
      es: 'Dirige la tecnología del ecosistema y marca el rumbo técnico del equipo: qué se diseña dentro, qué se integra y cómo encajan todas las piezas.',
      en: 'Heads the technology behind the ecosystem and sets the team’s technical direction: what gets designed in house, what gets integrated and how every piece fits together.',
      it: 'Dirige la tecnologia dell’ecosistema e definisce la rotta tecnica del team: cosa si progetta internamente, cosa si integra e come si incastrano i pezzi.',
    },
  },
  {
    id: 'jorge-martinez',
    name: 'Jorge Martínez',
    order: 30,
    role: {
      es: 'Arquitecto de aplicaciones',
      en: 'Application architect',
      it: 'Architetto di applicazioni',
    },
    bio: {
      es: 'Diseña la arquitectura de las aplicaciones del ecosistema, con más de una década de experiencia en conectividad y sistemas distribuidos.',
      en: 'Designs the architecture of the ecosystem’s applications, with over a decade of experience in connectivity and distributed systems.',
      it: 'Progetta l’architettura delle applicazioni dell’ecosistema, con oltre dieci anni di esperienza in connettività e sistemi distribuiti.',
    },
  },
  {
    id: 'dennis-martinez',
    name: 'Dennis Martínez',
    order: 40,
    role: {
      es: 'Ingeniero electrónico',
      en: 'Electronics engineer',
      it: 'Ingegnere elettronico',
    },
    bio: {
      es: 'Desarrolla el hardware y el firmware de los dispositivos: la electrónica que vive dentro del perfil de la carpintería.',
      en: 'Develops the hardware and firmware of the devices: the electronics that live inside the window profile itself.',
      it: 'Sviluppa l’hardware e il firmware dei dispositivi: l’elettronica che vive dentro il profilo del serramento.',
    },
  },
  {
    id: 'boryana-angelakieva',
    name: 'Boryana Angelakieva',
    order: 50,
    role: {
      es: 'Directora de marketing',
      en: 'Marketing director',
      it: 'Direttrice marketing',
    },
    bio: {
      es: 'Dirige la estrategia de marketing y el análisis de mercado, y traduce lo que piden los fabricantes en decisiones de producto.',
      en: 'Leads marketing strategy and market analysis, turning what manufacturers ask for into product decisions.',
      it: 'Guida la strategia di marketing e l’analisi di mercato, traducendo le richieste dei produttori in decisioni di prodotto.',
    },
  },
  {
    id: 'enrique-pagan',
    name: 'Enrique Pagán',
    order: 60,
    role: {
      es: 'Marketing digital',
      en: 'Digital marketing',
      it: 'Marketing digitale',
    },
    bio: {
      es: 'Se ocupa de la presencia digital y del diseño web, con el foco puesto en que encontrar lo que buscas cueste lo menos posible.',
      en: 'Looks after the digital presence and web design, focused on making what you are looking for as easy to find as possible.',
      it: 'Si occupa della presenza digitale e del design web, con l’obiettivo di rendere il più semplice possibile trovare ciò che si cerca.',
    },
  },
]
