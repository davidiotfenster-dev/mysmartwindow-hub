import type { Localized } from '@/i18n/config'

export interface Ecosystem {
  id: string
  name: string
  vendor: string
  /** Etiqueta corta para la cinta de logos. */
  description: Localized
  /** Tags con los que se filtran los recursos relacionados. */
  match: string[]
  color: string
}

export const ecosystems: Ecosystem[] = [
  {
    id: 'alexa',
    name: 'Alexa',
    vendor: 'Amazon',
    match: ['alexa'],
    color: '#00CAFF',
    description: {
      es: 'Vincula tu cuenta y controla persianas y ventanas con la voz. Incluye rutinas y tareas programadas.',
      en: 'Link your account and control blinds and windows with your voice. Routines and scheduled tasks included.',
      it: 'Collega il tuo account e controlla tapparelle e finestre con la voce. Routine e attività programmate incluse.',
    },
  },
  {
    id: 'google-home',
    name: 'Google Home',
    vendor: 'Google',
    match: ['google home'],
    color: '#4285F4',
    description: {
      es: 'Integra los cerramientos en tus rutinas de Google y prográmalos por hora o por puesta de sol.',
      en: 'Bring enclosures into your Google routines and schedule them by time or by sunset.',
      it: 'Integra le chiusure nelle routine Google e programmale per orario o al tramonto.',
    },
  },
  {
    id: 'ifttt',
    name: 'IFTTT',
    vendor: 'IFTTT',
    match: ['ifttt'],
    color: '#000000',
    description: {
      es: 'Conecta MySmartWindow con cientos de servicios mediante applets condicionales.',
      en: 'Connect MySmartWindow to hundreds of services through conditional applets.',
      it: 'Collega MySmartWindow a centinaia di servizi tramite applet condizionali.',
    },
  },
  {
    id: 'aidoo',
    name: 'Aidoo',
    vendor: 'Airzone',
    match: ['aidoo', 'airzone'],
    color: '#E4002B',
    description: {
      es: 'Skills de climatización que conviven con el control de cerramientos en la misma casa.',
      en: 'Climate control skills that live alongside enclosure control in the same home.',
      it: 'Skill di climatizzazione che convivono con il controllo delle chiusure nella stessa casa.',
    },
  },
]
