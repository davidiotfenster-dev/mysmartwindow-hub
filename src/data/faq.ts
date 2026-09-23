import type { Localized } from '@/i18n/config'

export interface FaqItem {
  id: string
  question: Localized
  answer: Localized
  /** Recurso del catálogo al que lleva la respuesta, si lo hay. */
  resourceId?: string
  /**
   * Enlace directo, para cuando la respuesta no señala UN recurso concreto
   * sino un listado (p.ej. "consulta el manual de tu dispositivo": cada
   * modelo tiene el suyo, así que se enlaza a todos los manuales filtrados,
   * no a uno). Sin el idioma delante -se añade al construir la pagina-. Si
   * hay `href`, manda sobre `resourceId`.
   */
  href?: string
}

export const faqs: FaqItem[] = [
  {
    id: 'banda-wifi',
    resourceId: 'configuracion-del-router-video',
    question: {
      es: '¿Por qué mi dispositivo no encuentra la red Wi-Fi?',
      en: 'Why can’t my device find the Wi-Fi network?',
      it: 'Perché il mio dispositivo non trova la rete Wi-Fi?',
    },
    answer: {
      es: 'Los dispositivos trabajan en la banda de 2.4 GHz. Si tu router emite 2.4 y 5 GHz con el mismo nombre de red, sepáralas temporalmente o crea una red específica de 2.4 GHz para la vinculación.',
      en: 'The devices work on the 2.4 GHz band. If your router broadcasts 2.4 and 5 GHz under the same network name, split them temporarily or create a dedicated 2.4 GHz network for pairing.',
      it: 'I dispositivi lavorano sulla banda 2.4 GHz. Se il router trasmette 2.4 e 5 GHz con lo stesso nome di rete, separale temporaneamente o crea una rete dedicata a 2.4 GHz per l’associazione.',
    },
  },
  {
    // Cada dispositivo tiene su propio procedimiento de hard reset -el del
    // CONNECT-1 es Reset + Subir/Bajar 5 s, pero no hay una guia equivalente
    // para todos los demas-, asi que se enlaza al listado de manuales en vez
    // de a uno solo que no le sirve a quien tenga otro modelo.
    id: 'hard-reset',
    href: '/recursos?tipo=manual',
    question: {
      es: '¿Cómo devuelvo el dispositivo a su estado de fábrica?',
      en: 'How do I restore the device to factory settings?',
      it: 'Come riporto il dispositivo alle impostazioni di fabbrica?',
    },
    answer: {
      es: 'Con el Hard Reset por botones. Cada dispositivo tiene su propio procedimiento: consulta el manual del tuyo para ver la combinación exacta y cuánto hay que mantenerla pulsada.',
      en: 'Through the button-based Hard Reset. Each device has its own procedure: check your model’s manual for the exact combination and how long to hold it.',
      it: 'Con l’Hard Reset tramite pulsanti. Ogni dispositivo ha la propria procedura: consulta il manuale del tuo modello per la combinazione esatta e per quanto tenerla premuta.',
    },
  },
  {
    id: 'compartir-control',
    resourceId: 'perfiles-de-usuario-manual',
    question: {
      es: '¿Puede mi familia controlar los cerramientos?',
      en: 'Can my family control the enclosures?',
      it: 'La mia famiglia può controllare le chiusure?',
    },
    answer: {
      es: 'Sí. El sistema de perfiles de usuario permite invitar a otras personas y decidir qué puede hacer cada una. Lo tienes explicado en el manual y en la tarjeta de perfiles.',
      en: 'Yes. The user profile system lets you invite other people and decide what each one can do. It is explained in the manual and in the profiles card.',
      it: 'Sì. Il sistema di profili utente permette di invitare altre persone e decidere cosa può fare ciascuna. È spiegato nel manuale e nella scheda dei profili.',
    },
  },
  {
    id: 'asistentes-voz',
    resourceId: 'alexa-vinculacion-con-mysmartwindow-manual',
    question: {
      es: '¿Funciona con Alexa y Google Home?',
      en: 'Does it work with Alexa and Google Home?',
      it: 'Funziona con Alexa e Google Home?',
    },
    answer: {
      es: 'Con ambos, además de IFTTT y Aidoo. Hay manual y vídeo para vincular la cuenta en cada ecosistema, y guías de rutinas como subir la persiana a una hora o bajarla al anochecer.',
      en: 'With both, plus IFTTT and Aidoo. There is a manual and a video for linking the account in each ecosystem, and routine guides such as raising the blind at a set time or lowering it at dusk.',
      it: 'Con entrambi, oltre a IFTTT e Aidoo. Ci sono manuale e video per collegare l’account in ogni ecosistema e guide alle routine, come alzare la tapparella a un’ora o abbassarla al tramonto.',
    },
  },
  {
    id: 'sin-internet',
    // Solo la parte del wifi complementario tiene manual propio y verificado;
    // del "servicio offline" del CONNECT-2 no hay ninguno en el catalogo.
    resourceId: 'multiwifi-wifi-complementario-manual',
    question: {
      es: '¿Qué pasa si se cae internet?',
      en: 'What happens if the internet goes down?',
      it: 'Cosa succede se cade la connessione?',
    },
    answer: {
      es: 'El CONNECT-2 dispone de servicio offline y de la opción de wifi complementario, de modo que el cerramiento sigue siendo operable aunque la red principal falle.',
      en: 'The CONNECT-2 provides an offline service and a complementary WiFi option, so the enclosure stays operable even if the main network fails.',
      it: 'Il CONNECT-2 dispone di un servizio offline e dell’opzione WiFi complementare, così la chiusura resta operativa anche se la rete principale non risponde.',
    },
  },
]
