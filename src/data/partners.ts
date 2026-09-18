import type { Localized } from '@/i18n/config'

/**
 * Distribuidores oficiales.
 *
 * IoT Fenster es B2B: no se vende directamente al usuario final, así que esta
 * página no tiene "añadir al carrito" en ningún sitio. El único destino
 * posible es la web del distribuidor o su formulario de contacto.
 */
export interface Partner {
  id: string
  name: string
  tagline: Localized
  description: Localized
  /** Marcas o categorías que distribuyen, para dar contexto sin enlazar a cada una. */
  brands: string[]
  url: string
  contactUrl: string
  country: Localized
  /** Color de acento propio de la marca del distribuidor, no el nuestro. */
  accent: string
  /** Logo subido en el CMS, si existe. */
  logo?: string
}

export const partners: Partner[] = [
  {
    id: 'vbh',
    name: 'VBH',
    url: 'https://www.vbh.com.es/',
    contactUrl: 'https://www.vbh.com.es/',
    accent: '#e2001a',
    tagline: {
      es: 'El mayor distribuidor de herrajes para ventanas y puertas',
      en: 'The largest distributor of window and door hardware',
      it: 'Il maggior distributore di ferramenta per finestre e porte',
    },
    description: {
      es: 'VBH Iberia distribuye componentes para cerramientos de madera, PVC y aluminio, además de domótica, seguridad y climatización. Referencia habitual para fabricantes que ya trabajan con herrajes de marca.',
      en: 'VBH Iberia distributes components for timber, PVC and aluminium enclosures, along with home automation, security and climate control. A usual reference for manufacturers already working with branded hardware.',
      it: 'VBH Iberia distribuisce componenti per serramenti in legno, PVC e alluminio, oltre a domotica, sicurezza e climatizzazione. Un riferimento abituale per i produttori che già lavorano con ferramenta di marca.',
    },
    brands: ['HOPPE', 'SIEGENIA', 'KFV', 'greenteQ'],
    country: { es: 'España', en: 'Spain', it: 'Spagna' },
  },
  {
    id: 'procomsa',
    name: 'PROCOMSA',
    url: 'https://www.procomsa.com/',
    contactUrl: 'https://www.procomsa.com/contacto/',
    accent: '#0d3b66',
    tagline: {
      es: 'Herrajes, seguridad, automatismos y control solar',
      en: 'Hardware, security, automation and solar control',
      it: 'Ferramenta, sicurezza, automazione e controllo solare',
    },
    description: {
      es: 'Procomsa forma parte del grupo Gretsch-Unitas y distribuye herrajes para ventanas y puertas, sistemas de apertura automática y control solar, con soluciones especializadas por sector: hospitales, hoteles, colegios, oficinas.',
      en: 'Procomsa is part of the Gretsch-Unitas group and distributes hardware for windows and doors, automatic opening systems and solar control, with sector-specific solutions for hospitals, hotels, schools and offices.',
      it: 'Procomsa fa parte del gruppo Gretsch-Unitas e distribuisce ferramenta per finestre e porte, sistemi di apertura automatica e controllo solare, con soluzioni specifiche per settore: ospedali, hotel, scuole, uffici.',
    },
    brands: ['GU', 'BKS', 'FERCO'],
    country: { es: 'España', en: 'Spain', it: 'Spagna' },
  },
]

export function getPartners(): Partner[] {
  return partners
}
