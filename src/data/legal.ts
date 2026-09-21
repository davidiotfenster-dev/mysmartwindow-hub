import type { Localized } from '@/i18n/config'

/**
 * Textos legales del sitio.
 *
 * Son el catálogo de partida: si Strapi está configurado y tiene la página
 * publicada, manda el CMS (ver `src/lib/content/legal.ts`). Si no, se sirven
 * estos, para que las páginas legales nunca desaparezcan del sitio -que es
 * justo lo que no puede pasar con un aviso legal-.
 *
 * `body` es Markdown de un subconjunto reducido: `##` para los apartados,
 * listas con `-`, tablas con `|`, **negrita** y enlaces `[texto](url)`. Lo
 * pinta `LegalContent` sin insertar HTML crudo. Dentro del texto no se usan
 * comillas invertidas porque colisionan con las plantillas de TypeScript:
 * donde haría falta código en línea, va en negrita.
 */
export interface LegalDocument {
  /** Slug compartido por los tres idiomas; es parte de la URL. */
  id: string
  title: Localized
  /** Entradilla bajo el título, fuera del cuerpo. */
  intro: Localized
  /** Cuerpo en el Markdown reducido descrito arriba. */
  body: Localized
  /** Fecha de la última revisión, en ISO. Se muestra en la cabecera. */
  lastUpdated: string
}

/**
 * Datos identificativos de la empresa, en un solo sitio: aparecen en los tres
 * documentos y en los tres idiomas, y es justo lo que no puede quedar
 * descuadrado entre unos y otros.
 */
export const COMPANY = {
  name: 'IoT Fenster, S.L.',
  /**
   * Letra + 8 caracteres. La política de privacidad del portal antiguo
   * publicaba «B30780191E», con un carácter de más respecto al aviso legal
   * del mismo sitio. Aquí se unifica al que sí tiene formato válido.
   */
  cif: 'B30780191',
  address:
    'Avda. Isaac Peral s/n, Parque Tecnológico Fuente Álamo, Ctra. del Estrecho-Lobosillo, 30320 Fuente Álamo de Murcia (Murcia), España',
  email: 'info@iotfenster.com',
  site: 'www.iotfenster.com',
} as const

/** Fecha de la última revisión de los tres documentos. */
export const LAST_UPDATED = '2026-09-21'

/* ==========================================================================
   Slugs
   ==========================================================================
   Compartidos por los tres idiomas, igual que el resto de rutas del sitio
   (ver `src/lib/navigation.ts`): un enlace a una página legal se puede pasar
   a cualquiera sin preocuparse del idioma con el que se generó.
   ========================================================================== */

export const LEGAL_SLUGS = {
  privacy: 'politica-de-privacidad',
  notice: 'aviso-legal',
  cookies: 'politica-de-cookies',
} as const


/* ==========================================================================
   Política de privacidad
   ========================================================================== */

const privacyEs = `## 1. Responsable del tratamiento

| Dato | Valor |
| --- | --- |
| **Responsable** | ${COMPANY.name} |
| **CIF** | ${COMPANY.cif} |
| **Domicilio** | ${COMPANY.address} |
| **Correo electrónico** | ${COMPANY.email} |
| **Sitio web corporativo** | ${COMPANY.site} |

${COMPANY.name} es responsable del tratamiento de los datos personales que se recogen a través de este sitio —**MySmartWindow**, el centro de recursos de IoT Fenster— y garantiza el cumplimiento del Reglamento (UE) 2016/679 (RGPD) y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).

## 2. Qué datos recogemos y de dónde

Solo tratamos los datos que nos facilitas voluntariamente a través de los formularios de este sitio. No compramos listas ni obtenemos datos de terceros.

**Formulario de contacto**

- Datos identificativos: nombre y apellidos.
- Datos de contacto: correo electrónico.
- Datos profesionales: empresa (opcional) y perfil desde el que escribes (fabricante, distribuidor, instalador o usuario final).
- El asunto y el contenido del mensaje que nos escribas.

**Suscripción al boletín**

- Correo electrónico.

**Navegación**

Este sitio **no utiliza cookies de analítica ni de publicidad** y no elabora perfiles de navegación. El detalle del almacenamiento técnico que sí se usa está en la [Política de cookies](/es/legal/${LEGAL_SLUGS.cookies}).

## 3. Para qué los usamos y con qué base legal

| Finalidad | Base legal (RGPD) |
| --- | --- |
| Responder a las consultas y solicitudes que nos envías por el formulario de contacto | Consentimiento (art. 6.1.a) y medidas precontractuales a petición del interesado (art. 6.1.b) |
| Gestionar solicitudes comerciales, presupuestos y demostraciones de producto | Medidas precontractuales (art. 6.1.b) |
| Mantener la comunicación profesional derivada de una relación comercial ya existente | Ejecución del contrato (art. 6.1.b) e interés legítimo (art. 6.1.f) |
| Enviarte el boletín de novedades, si te has suscrito | Consentimiento (art. 6.1.a) |
| Atender el ejercicio de tus derechos y cumplir obligaciones legales | Obligación legal (art. 6.1.c) |

No usamos tus datos para ninguna finalidad distinta de las anteriores, y no tomamos decisiones automatizadas ni elaboramos perfiles que produzcan efectos jurídicos sobre ti.

## 4. Cuánto tiempo los conservamos

- **Consultas de contacto**: mientras se gestiona la consulta y hasta un año después, salvo que de ella nazca una relación comercial.
- **Relación comercial o profesional**: mientras esté vigente y, después, durante los plazos legales de prescripción (hasta seis años en materia mercantil y fiscal).
- **Boletín**: hasta que te des de baja. Cada envío incluye un enlace para hacerlo en un clic.

Puedes pedirnos la supresión en cualquier momento y, salvo que exista una obligación legal de conservarlos, los borraremos.

## 5. A quién se los comunicamos

No vendemos ni cedemos tus datos a terceros. Solo acceden a ellos los proveedores que necesitamos para prestar el servicio, siempre con un contrato de encargo del tratamiento firmado (art. 28 RGPD):

- Proveedor de alojamiento e infraestructura del sitio y del correo electrónico.
- Proveedor de envío del boletín, si te has suscrito.

Además, podremos comunicarlos a jueces, tribunales, Fuerzas y Cuerpos de Seguridad y administraciones públicas cuando exista una obligación legal de hacerlo.

## 6. Transferencias internacionales

El alojamiento del sitio y el correo electrónico se prestan desde servidores situados en la **Unión Europea**.

Hay una excepción que conviene conocer: este sitio **incrusta vídeos de YouTube** (Google Ireland Ltd.) usando el dominio de privacidad mejorada **youtube-nocookie.com**, que no instala cookies de seguimiento mientras no reproduzcas el vídeo. En cuanto le das al play, Google puede tratar datos —entre ellos tu dirección IP— y transferirlos a Estados Unidos, al amparo del **Marco de Privacidad de Datos UE-EE. UU.** (decisión de adecuación de la Comisión Europea de 10 de julio de 2023) y de cláusulas contractuales tipo. Si prefieres evitarlo, no reproduzcas el vídeo incrustado: el mismo contenido está disponible en nuestro canal de YouTube.

## 7. Tus derechos

Puedes ejercer en cualquier momento los siguientes derechos:

- **Acceso**: saber qué datos tuyos tratamos.
- **Rectificación**: corregir los que sean inexactos o estén incompletos.
- **Supresión**: pedir que los borremos.
- **Limitación**: pedir que los conservemos pero no los usemos.
- **Oposición**: oponerte a un tratamiento basado en nuestro interés legítimo.
- **Portabilidad**: recibir tus datos en un formato estructurado y de uso común.
- **Retirar el consentimiento** en cualquier momento, sin que ello afecte a la licitud del tratamiento anterior a la retirada.

Escríbenos a **${COMPANY.email}** indicando el derecho que quieres ejercer y adjuntando copia de tu documento de identidad. Te responderemos en el plazo máximo de **un mes** desde la recepción de la solicitud, ampliable en dos meses más si la solicitud es especialmente compleja (en ese caso te avisaríamos dentro del primer mes).

**Reclamación ante la autoridad de control.** Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos, C/ Jorge Juan 6, 28001 Madrid — [www.aepd.es](https://www.aepd.es).

## 8. Seguridad

Aplicamos las medidas técnicas y organizativas apropiadas para garantizar la confidencialidad, la integridad y la disponibilidad de los datos, y para evitar su pérdida, alteración, acceso no autorizado o robo. Todo el sitio se sirve cifrado mediante HTTPS.

## 9. Menores de edad

Este sitio se dirige a profesionales del sector y a usuarios adultos de nuestros productos. No recogemos conscientemente datos de menores de 14 años. Si detectas que un menor nos ha facilitado datos, escríbenos y los eliminaremos.

## 10. Cambios en esta política

Podemos actualizar esta política para adaptarla a novedades legislativas, jurisprudenciales o al propio funcionamiento del sitio. La versión vigente es siempre la publicada en esta página, con la fecha de última actualización que figura arriba.

## 11. Aceptación

El uso de este sitio y el envío de cualquiera de sus formularios implican que has leído y aceptas esta Política de Privacidad.`

const privacyEn = `## 1. Data controller

| Item | Value |
| --- | --- |
| **Controller** | ${COMPANY.name} |
| **Tax ID (CIF)** | ${COMPANY.cif} |
| **Registered office** | ${COMPANY.address} |
| **Email** | ${COMPANY.email} |
| **Corporate website** | ${COMPANY.site} |

${COMPANY.name} is the controller of the personal data collected through this site —**MySmartWindow**, the IoT Fenster resource hub— and complies with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 of 5 December on the protection of personal data and the guarantee of digital rights (LOPDGDD).

## 2. What data we collect, and where from

We only process the data you give us voluntarily through the forms on this site. We do not buy lists and we do not obtain data from third parties.

**Contact form**

- Identification data: first name and surname.
- Contact data: email address.
- Professional data: company (optional) and the profile you are writing from (manufacturer, distributor, installer or end user).
- The subject and content of the message you write.

**Newsletter subscription**

- Email address.

**Browsing**

This site **uses no analytics or advertising cookies** and builds no browsing profiles. The technical storage it does use is detailed in the [Cookie policy](/en/legal/${LEGAL_SLUGS.cookies}).

## 3. What we use it for, and on what legal basis

| Purpose | Legal basis (GDPR) |
| --- | --- |
| Answering the enquiries and requests you send through the contact form | Consent (art. 6.1.a) and pre-contractual measures at your request (art. 6.1.b) |
| Handling sales enquiries, quotes and product demonstrations | Pre-contractual measures (art. 6.1.b) |
| Keeping up the professional communication arising from an existing commercial relationship | Performance of a contract (art. 6.1.b) and legitimate interest (art. 6.1.f) |
| Sending you the newsletter, if you subscribed | Consent (art. 6.1.a) |
| Handling the exercise of your rights and meeting legal obligations | Legal obligation (art. 6.1.c) |

We do not use your data for any purpose other than those above, and we make no automated decisions and build no profiles producing legal effects on you.

## 4. How long we keep it

- **Contact enquiries**: while the enquiry is being handled and for up to one year afterwards, unless a commercial relationship arises from it.
- **Commercial or professional relationship**: while it is in force and, afterwards, for the applicable statutory limitation periods (up to six years for commercial and tax matters).
- **Newsletter**: until you unsubscribe. Every email includes a one-click link to do so.

You can ask us to erase your data at any time and, unless we are legally required to keep it, we will delete it.

## 5. Who we share it with

We do not sell or transfer your data to third parties. It is only accessed by the providers we need in order to deliver the service, always under a signed data processing agreement (art. 28 GDPR):

- Hosting and infrastructure provider for the site and for email.
- Newsletter delivery provider, if you subscribed.

We may also disclose it to courts, law enforcement and public authorities where we are legally required to do so.

## 6. International transfers

Site hosting and email are provided from servers located in the **European Union**.

There is one exception worth knowing about: this site **embeds YouTube videos** (Google Ireland Ltd.) through the enhanced privacy domain **youtube-nocookie.com**, which installs no tracking cookies until you play the video. Once you press play, Google may process data —including your IP address— and transfer it to the United States under the **EU-US Data Privacy Framework** (European Commission adequacy decision of 10 July 2023) and standard contractual clauses. If you would rather avoid this, do not play the embedded video: the same content is available on our YouTube channel.

## 7. Your rights

You may exercise the following rights at any time:

- **Access**: find out what data of yours we process.
- **Rectification**: correct data that is inaccurate or incomplete.
- **Erasure**: ask us to delete it.
- **Restriction**: ask us to keep it but not use it.
- **Objection**: object to processing based on our legitimate interest.
- **Portability**: receive your data in a structured, commonly used format.
- **Withdraw your consent** at any time, without affecting the lawfulness of processing carried out before the withdrawal.

Write to **${COMPANY.email}** stating the right you wish to exercise and attaching a copy of your identity document. We will reply within a maximum of **one month** of receiving the request, extendable by two further months if the request is particularly complex (we would tell you within the first month).

**Complaint to the supervisory authority.** If you believe we have not handled your request properly, you may lodge a complaint with the Spanish Data Protection Agency, C/ Jorge Juan 6, 28001 Madrid — [www.aepd.es](https://www.aepd.es).

## 8. Security

We apply appropriate technical and organisational measures to guarantee the confidentiality, integrity and availability of the data and to prevent its loss, alteration, unauthorised access or theft. The whole site is served encrypted over HTTPS.

## 9. Minors

This site is aimed at industry professionals and adult users of our products. We do not knowingly collect data from children under 14. If you find that a minor has given us data, write to us and we will delete it.

## 10. Changes to this policy

We may update this policy to reflect legislative or case-law developments, or changes in how the site works. The version in force is always the one published on this page, with the last-updated date shown above.

## 11. Acceptance

Using this site and submitting any of its forms means you have read and accept this Privacy Policy.`

const privacyIt = `## 1. Titolare del trattamento

| Voce | Valore |
| --- | --- |
| **Titolare** | ${COMPANY.name} |
| **Codice fiscale (CIF)** | ${COMPANY.cif} |
| **Sede** | ${COMPANY.address} |
| **Email** | ${COMPANY.email} |
| **Sito web aziendale** | ${COMPANY.site} |

${COMPANY.name} è il titolare del trattamento dei dati personali raccolti attraverso questo sito —**MySmartWindow**, il centro risorse di IoT Fenster— e garantisce il rispetto del Regolamento (UE) 2016/679 (GDPR) e della Legge Organica spagnola 3/2018, del 5 dicembre, sulla protezione dei dati personali e la garanzia dei diritti digitali (LOPDGDD).

## 2. Quali dati raccogliamo e da dove

Trattiamo solo i dati che ci fornisci volontariamente tramite i moduli di questo sito. Non acquistiamo elenchi e non otteniamo dati da terzi.

**Modulo di contatto**

- Dati identificativi: nome e cognome.
- Dati di contatto: indirizzo email.
- Dati professionali: azienda (facoltativo) e profilo da cui ci scrivi (produttore, distributore, installatore o utente finale).
- L’oggetto e il contenuto del messaggio che ci scrivi.

**Iscrizione alla newsletter**

- Indirizzo email.

**Navigazione**

Questo sito **non utilizza cookie di analisi né pubblicitari** e non elabora profili di navigazione. Il dettaglio dell’archiviazione tecnica effettivamente usata si trova nella [Politica sui cookie](/it/legal/${LEGAL_SLUGS.cookies}).

## 3. Per quali finalità e su quale base giuridica

| Finalità | Base giuridica (GDPR) |
| --- | --- |
| Rispondere alle richieste inviate tramite il modulo di contatto | Consenso (art. 6.1.a) e misure precontrattuali su tua richiesta (art. 6.1.b) |
| Gestire richieste commerciali, preventivi e dimostrazioni di prodotto | Misure precontrattuali (art. 6.1.b) |
| Mantenere la comunicazione professionale derivante da un rapporto commerciale già esistente | Esecuzione del contratto (art. 6.1.b) e legittimo interesse (art. 6.1.f) |
| Inviarti la newsletter, se ti sei iscritto | Consenso (art. 6.1.a) |
| Gestire l’esercizio dei tuoi diritti e adempiere a obblighi di legge | Obbligo legale (art. 6.1.c) |

Non usiamo i tuoi dati per finalità diverse da quelle sopra indicate e non prendiamo decisioni automatizzate né elaboriamo profili con effetti giuridici nei tuoi confronti.

## 4. Per quanto tempo li conserviamo

- **Richieste di contatto**: per il tempo necessario a gestirle e fino a un anno dopo, salvo che ne nasca un rapporto commerciale.
- **Rapporto commerciale o professionale**: finché è in essere e, successivamente, per i termini di prescrizione di legge (fino a sei anni in materia commerciale e fiscale).
- **Newsletter**: finché non ti cancelli. Ogni invio contiene un link per farlo con un clic.

Puoi chiederci la cancellazione in qualsiasi momento e, salvo obblighi di legge di conservazione, procederemo a eliminarli.

## 5. A chi li comunichiamo

Non vendiamo né cediamo i tuoi dati a terzi. Vi accedono solo i fornitori necessari per erogare il servizio, sempre con un contratto di responsabile del trattamento firmato (art. 28 GDPR):

- Fornitore di hosting e infrastruttura del sito e della posta elettronica.
- Fornitore di invio della newsletter, se ti sei iscritto.

Potremo inoltre comunicarli ad autorità giudiziarie, forze dell’ordine e pubbliche amministrazioni quando sussista un obbligo di legge.

## 6. Trasferimenti internazionali

L’hosting del sito e la posta elettronica sono erogati da server situati nell’**Unione Europea**.

C’è un’eccezione che è bene conoscere: questo sito **incorpora video di YouTube** (Google Ireland Ltd.) tramite il dominio a privacy avanzata **youtube-nocookie.com**, che non installa cookie di tracciamento finché non riproduci il video. Appena premi play, Google può trattare dati —tra cui il tuo indirizzo IP— e trasferirli negli Stati Uniti in base al **Data Privacy Framework UE-USA** (decisione di adeguatezza della Commissione europea del 10 luglio 2023) e a clausole contrattuali tipo. Se preferisci evitarlo, non riprodurre il video incorporato: lo stesso contenuto è disponibile sul nostro canale YouTube.

## 7. I tuoi diritti

Puoi esercitare in qualsiasi momento i seguenti diritti:

- **Accesso**: sapere quali tuoi dati trattiamo.
- **Rettifica**: correggere quelli inesatti o incompleti.
- **Cancellazione**: chiederci di eliminarli.
- **Limitazione**: chiederci di conservarli senza utilizzarli.
- **Opposizione**: opporti a un trattamento basato sul nostro legittimo interesse.
- **Portabilità**: ricevere i tuoi dati in un formato strutturato e di uso comune.
- **Revocare il consenso** in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente alla revoca.

Scrivici a **${COMPANY.email}** indicando il diritto che vuoi esercitare e allegando copia del tuo documento di identità. Ti risponderemo entro un massimo di **un mese** dalla ricezione della richiesta, prorogabile di ulteriori due mesi se la richiesta è particolarmente complessa (in tal caso te lo comunicheremo entro il primo mese).

**Reclamo all’autorità di controllo.** Se ritieni che non abbiamo gestito correttamente la tua richiesta, puoi presentare reclamo all’Agenzia spagnola per la protezione dei dati, C/ Jorge Juan 6, 28001 Madrid — [www.aepd.es](https://www.aepd.es).

## 8. Sicurezza

Adottiamo le misure tecniche e organizzative adeguate per garantire la riservatezza, l’integrità e la disponibilità dei dati e per evitarne la perdita, l’alterazione, l’accesso non autorizzato o il furto. L’intero sito è servito cifrato tramite HTTPS.

## 9. Minori

Questo sito si rivolge a professionisti del settore e a utenti adulti dei nostri prodotti. Non raccogliamo consapevolmente dati di minori di 14 anni. Se rilevi che un minore ci ha fornito dati, scrivici e li elimineremo.

## 10. Modifiche a questa politica

Possiamo aggiornare questa politica per adeguarla a novità legislative, giurisprudenziali o al funzionamento del sito stesso. La versione in vigore è sempre quella pubblicata in questa pagina, con la data di ultimo aggiornamento indicata sopra.

## 11. Accettazione

L’uso di questo sito e l’invio di uno qualsiasi dei suoi moduli implicano che hai letto e accetti la presente Informativa sulla privacy.`

export const privacy: LegalDocument = {
  id: LEGAL_SLUGS.privacy,
  title: {
    es: 'Política de privacidad',
    en: 'Privacy policy',
    it: 'Informativa sulla privacy',
  },
  intro: {
    es: 'Cómo tratamos los datos personales que nos facilitas a través de este sitio: qué recogemos, para qué, cuánto tiempo los guardamos y qué puedes hacer al respecto.',
    en: 'How we handle the personal data you give us through this site: what we collect, what for, how long we keep it and what you can do about it.',
    it: 'Come trattiamo i dati personali che ci fornisci attraverso questo sito: cosa raccogliamo, per quali finalità, per quanto tempo li conserviamo e cosa puoi fare al riguardo.',
  },
  body: { es: privacyEs, en: privacyEn, it: privacyIt },
  lastUpdated: LAST_UPDATED,
}


/* ==========================================================================
   Aviso legal
   ========================================================================== */

const noticeEs = `## 1. Datos identificativos

En cumplimiento del deber de información del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE):

| Dato | Valor |
| --- | --- |
| **Titular** | ${COMPANY.name} |
| **CIF** | ${COMPANY.cif} |
| **Domicilio** | ${COMPANY.address} |
| **Correo electrónico** | ${COMPANY.email} |
| **Sitio web corporativo** | ${COMPANY.site} |

**MySmartWindow** es el centro de recursos de ${COMPANY.name}: reúne los manuales, videotutoriales y fichas de los dispositivos de la marca. Es un sitio informativo y de soporte; no se venden productos ni se contratan servicios a través de él.

## 2. Objeto y aceptación

Lee todos los apartados de este Aviso Legal antes de utilizar el sitio: las condiciones que siguen son vinculantes para cualquier usuario.

El acceso al sitio es gratuito y no exige registro previo. Navegar por él te atribuye la condición de usuario e implica la aceptación plena de estas condiciones en la versión publicada en cada momento.

## 3. Uso del sitio y obligaciones del usuario

El usuario se compromete a utilizar el sitio, sus contenidos y sus servicios sin contravenir la legislación vigente, los usos generalmente aceptados y el orden público. Queda prohibido el uso del sitio con fines ilícitos o lesivos contra ${COMPANY.name} o contra un tercero, o que de cualquier forma puedan causar perjuicio o impedir su normal funcionamiento.

En particular, queda prohibido:

- Reproducir, publicar, distribuir o modificar, total o parcialmente, los contenidos del sitio sin autorización previa y por escrito de sus legítimos titulares, salvo en lo legalmente permitido.
- Utilizar los contenidos con fines comerciales o publicitarios distintos de los expresamente permitidos.
- Introducir virus o cualquier otro programa que pueda dañar los sistemas de ${COMPANY.name} o de terceros.
- Realizar cualquier acción que vulnere los derechos de ${COMPANY.name} o de los legítimos titulares de los contenidos.

${COMPANY.name} garantiza que los contenidos y servicios que ofrece el sitio respetan el principio de dignidad de la persona, la protección de la juventud y la infancia y la no discriminación por razón de raza, sexo, religión, opinión, nacionalidad, discapacidad o cualquier otra circunstancia personal o social, y se compromete a no realizar publicidad engañosa.

## 4. Propiedad intelectual e industrial

Todos los derechos de propiedad industrial e intelectual sobre el sitio y sobre sus contenidos —textos, manuales, documentación técnica, fotografías, vídeos, diseños, código, marcas y logotipos, incluidos **MySmartWindow**, **IoT Fenster**, **Connect**, **C-EVO**, **C-Pulsar** y **C-WALL**— pertenecen a ${COMPANY.name} o esta cuenta con la debida autorización de sus titulares para difundirlos.

La documentación descargable (manuales y tarjetas en PDF) se pone a disposición de clientes, distribuidores e instaladores para el uso y la instalación de los productos. Se permite descargarla e imprimirla con esa finalidad; cualquier otro uso, y en especial su reproducción, distribución o modificación con fines comerciales, requiere autorización previa y por escrito.

Las marcas de terceros que aparecen en el sitio (Amazon Alexa, Google Home y otros ecosistemas compatibles) pertenecen a sus respectivos titulares y se citan únicamente con fines informativos de compatibilidad, sin que ello implique relación, patrocinio o aprobación alguna.

Si consideras que algún contenido del sitio vulnera tus derechos de propiedad intelectual o industrial, comunícanoslo a **${COMPANY.email}** indicando:

- Tus datos personales como titular de los derechos presuntamente infringidos o, si actúas por cuenta de un tercero, la representación con la que actúas.
- Los contenidos protegidos y su ubicación exacta en el sitio.
- La acreditación de los derechos alegados y una declaración expresa de que te responsabilizas de la veracidad de la información facilitada.

## 5. Enlaces

**Enlaces salientes.** Este sitio contiene enlaces a sitios web propios (entre ellos ${COMPANY.site} y el Área de Cliente) y a contenidos de terceros, como los vídeos alojados en YouTube o las páginas de nuestros distribuidores. Su único objeto es facilitar al usuario el acceso a esa información. ${COMPANY.name} no controla esos sitios y no se responsabiliza en ningún caso de sus contenidos ni de los resultados que puedan derivarse de su acceso.

**Enlaces entrantes.** Quien quiera establecer un enlace hacia este sitio deberá obtener la autorización previa y por escrito de ${COMPANY.name}. El enlace no implica relación alguna entre ${COMPANY.name} y el titular del sitio que enlaza, ni la aceptación o aprobación de sus contenidos o servicios. El sitio que enlaza no podrá incluir ninguna marca, denominación, logotipo, eslogan u otro signo distintivo de ${COMPANY.name} salvo los expresamente autorizados.

## 6. Modificación y duración

${COMPANY.name} se reserva el derecho a modificar, en cualquier momento y sin previo aviso, la presentación, la configuración y los contenidos del sitio, así como el presente Aviso Legal, y a suspender temporal o definitivamente su prestación.

## 7. Exclusión de garantías y de responsabilidad

${COMPANY.name} no otorga ninguna garantía ni se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran derivarse de:

- La falta de disponibilidad, mantenimiento o efectivo funcionamiento del sitio, de sus servicios o de sus contenidos.
- La existencia de virus, programas maliciosos o lesivos en los contenidos.
- El uso ilícito, negligente, fraudulento o contrario a estas condiciones, a la buena fe, a los usos generalmente aceptados o al orden público, del sitio, de sus servicios o de sus contenidos por parte de los usuarios.
- La falta de veracidad, exactitud o actualidad de los contenidos, sin perjuicio del esfuerzo razonable por mantener al día la documentación técnica publicada.

La documentación publicada se refiere a las versiones de producto y de la aplicación indicadas en cada documento. Ante cualquier duda sobre la instalación o el uso de un dispositivo, consulta con nuestro servicio de soporte antes de actuar.

Nada de lo dispuesto en este apartado excluye o limita la responsabilidad de ${COMPANY.name} en los supuestos en que la legislación aplicable no lo permita, en particular frente a consumidores y usuarios.

## 8. Protección de datos y cookies

El tratamiento de los datos personales que se recogen a través de este sitio se explica en la [Política de privacidad](/es/legal/${LEGAL_SLUGS.privacy}), y el almacenamiento técnico que usa el navegador, en la [Política de cookies](/es/legal/${LEGAL_SLUGS.cookies}). ${COMPANY.name} ha adoptado los niveles de seguridad adecuados a los datos que trata e incorpora los medios y medidas técnicas a su alcance para garantizar su confidencialidad y evitar su mal uso, pérdida, alteración, acceso no autorizado o robo.

## 9. Nulidad parcial

Si alguna de estas condiciones fuera declarada nula o ineficaz, se tendrá por no puesta y las demás seguirán siendo plenamente válidas.

## 10. Legislación aplicable y jurisdicción

Estas condiciones se rigen por la legislación española. Para cualquier controversia derivada del acceso o del uso del sitio, las partes se someten a los juzgados y tribunales de la ciudad de **Murcia (España)**, salvo que la normativa aplicable —en particular, la de defensa de los consumidores y usuarios— establezca un fuero distinto de carácter imperativo.

## 11. Contacto

Para cualquier duda o comentario sobre este Aviso Legal puedes escribir a **${COMPANY.email}** o enviar una comunicación escrita al domicilio que consta en el apartado 1.`

const noticeEn = `## 1. Identification details

In compliance with the duty of information under article 10 of Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE):

| Item | Value |
| --- | --- |
| **Owner** | ${COMPANY.name} |
| **Tax ID (CIF)** | ${COMPANY.cif} |
| **Registered office** | ${COMPANY.address} |
| **Email** | ${COMPANY.email} |
| **Corporate website** | ${COMPANY.site} |

**MySmartWindow** is the ${COMPANY.name} resource hub: it brings together the manuals, video tutorials and device pages for the brand. It is an information and support site; no products are sold and no services are contracted through it.

## 2. Purpose and acceptance

Please read every section of this Legal Notice before using the site: the conditions below are binding on any user.

Access to the site is free of charge and requires no prior registration. Browsing it makes you a user and implies full acceptance of these conditions in the version published at any given time.

## 3. Use of the site and user obligations

The user undertakes to use the site, its contents and its services without contravening applicable law, generally accepted practice or public order. Use of the site for unlawful purposes, or purposes harmful to ${COMPANY.name} or to a third party, or which may in any way cause damage or prevent its normal operation, is prohibited.

In particular, the following is prohibited:

- Reproducing, publishing, distributing or modifying, in whole or in part, the contents of the site without prior written authorisation from their rightful owners, except as legally permitted.
- Using the contents for commercial or advertising purposes other than those expressly permitted.
- Introducing viruses or any other program that may damage the systems of ${COMPANY.name} or of third parties.
- Taking any action that infringes the rights of ${COMPANY.name} or of the rightful owners of the contents.

${COMPANY.name} guarantees that the contents and services offered by the site respect the principle of human dignity, the protection of young people and children and non-discrimination on grounds of race, sex, religion, opinion, nationality, disability or any other personal or social circumstance, and undertakes not to engage in misleading advertising.

## 4. Intellectual and industrial property

All industrial and intellectual property rights over the site and its contents —texts, manuals, technical documentation, photographs, videos, designs, code, trade marks and logos, including **MySmartWindow**, **IoT Fenster**, **Connect**, **C-EVO**, **C-Pulsar** and **C-WALL**— belong to ${COMPANY.name}, or it holds due authorisation from their owners to publish them.

The downloadable documentation (manuals and cards in PDF) is made available to customers, distributors and installers for the use and installation of the products. You may download and print it for that purpose; any other use, and in particular its reproduction, distribution or modification for commercial purposes, requires prior written authorisation.

Third-party trade marks appearing on the site (Amazon Alexa, Google Home and other compatible ecosystems) belong to their respective owners and are cited solely to inform about compatibility, without implying any relationship, sponsorship or approval.

If you believe that any content on the site infringes your intellectual or industrial property rights, please tell us at **${COMPANY.email}**, stating:

- Your personal details as owner of the allegedly infringed rights or, if you are acting on behalf of a third party, the capacity in which you act.
- The protected contents and their exact location on the site.
- Evidence of the rights claimed and an express declaration that you take responsibility for the accuracy of the information provided.

## 5. Links

**Outgoing links.** This site contains links to our own websites (including ${COMPANY.site} and the Client Area) and to third-party content, such as videos hosted on YouTube or our distributors' pages. Their sole purpose is to give the user access to that information. ${COMPANY.name} does not control those sites and is in no case responsible for their contents or for any consequences of accessing them.

**Incoming links.** Anyone wishing to link to this site must obtain prior written authorisation from ${COMPANY.name}. The link implies no relationship between ${COMPANY.name} and the owner of the linking site, nor acceptance or approval of its contents or services. The linking site may not include any trade mark, name, logo, slogan or other distinctive sign of ${COMPANY.name} other than those expressly authorised.

## 6. Modification and duration

${COMPANY.name} reserves the right to modify, at any time and without prior notice, the presentation, configuration and contents of the site, as well as this Legal Notice, and to suspend its provision temporarily or permanently.

## 7. Exclusion of warranties and liability

${COMPANY.name} gives no warranty and accepts no liability, in any case, for damages of any nature that may arise from:

- The lack of availability, maintenance or effective operation of the site, its services or its contents.
- The existence of viruses or malicious or harmful programs in the contents.
- Unlawful, negligent or fraudulent use of the site, its services or its contents by users, or use contrary to these conditions, to good faith, to generally accepted practice or to public order.
- Any lack of truthfulness, accuracy or currency in the contents, without prejudice to reasonable efforts to keep the published technical documentation up to date.

The published documentation refers to the product and app versions stated in each document. If in any doubt about installing or using a device, check with our support team before acting.

Nothing in this section excludes or limits the liability of ${COMPANY.name} in cases where applicable law does not permit it, in particular towards consumers and users.

## 8. Data protection and cookies

The processing of personal data collected through this site is explained in the [Privacy policy](/en/legal/${LEGAL_SLUGS.privacy}), and the technical storage used by the browser in the [Cookie policy](/en/legal/${LEGAL_SLUGS.cookies}). ${COMPANY.name} has adopted security levels appropriate to the data it processes and applies the technical means and measures available to it to guarantee confidentiality and prevent misuse, loss, alteration, unauthorised access or theft.

## 9. Partial invalidity

If any of these conditions is declared null or ineffective, it shall be deemed not to have been included and the remainder shall remain fully valid.

## 10. Applicable law and jurisdiction

These conditions are governed by Spanish law. For any dispute arising from access to or use of the site, the parties submit to the courts and tribunals of the city of **Murcia (Spain)**, unless applicable law —in particular consumer protection law— establishes a different mandatory venue.

## 11. Contact

For any question or comment about this Legal Notice you may write to **${COMPANY.email}** or send written communication to the address given in section 1.`

const noticeIt = `## 1. Dati identificativi

In adempimento dell’obbligo di informazione previsto dall’articolo 10 della Legge spagnola 34/2002, dell’11 luglio, sui servizi della società dell’informazione e sul commercio elettronico (LSSI-CE):

| Voce | Valore |
| --- | --- |
| **Titolare** | ${COMPANY.name} |
| **Codice fiscale (CIF)** | ${COMPANY.cif} |
| **Sede** | ${COMPANY.address} |
| **Email** | ${COMPANY.email} |
| **Sito web aziendale** | ${COMPANY.site} |

**MySmartWindow** è il centro risorse di ${COMPANY.name}: raccoglie i manuali, i videotutorial e le schede dei dispositivi del marchio. È un sito informativo e di supporto; non vi si vendono prodotti né si stipulano servizi.

## 2. Oggetto e accettazione

Leggi tutte le sezioni di queste Note legali prima di utilizzare il sito: le condizioni che seguono sono vincolanti per qualsiasi utente.

L’accesso al sito è gratuito e non richiede registrazione. Navigarlo ti attribuisce la qualifica di utente e implica la piena accettazione di queste condizioni nella versione pubblicata di volta in volta.

## 3. Uso del sito e obblighi dell’utente

L’utente si impegna a utilizzare il sito, i suoi contenuti e i suoi servizi senza contravvenire alla normativa vigente, agli usi generalmente accettati e all’ordine pubblico. È vietato l’uso del sito per finalità illecite o lesive nei confronti di ${COMPANY.name} o di terzi, o che possano in qualsiasi modo arrecare danno o impedirne il normale funzionamento.

In particolare, è vietato:

- Riprodurre, pubblicare, distribuire o modificare, in tutto o in parte, i contenuti del sito senza previa autorizzazione scritta dei legittimi titolari, salvo quanto legalmente consentito.
- Utilizzare i contenuti per finalità commerciali o pubblicitarie diverse da quelle espressamente consentite.
- Introdurre virus o qualsiasi altro programma che possa danneggiare i sistemi di ${COMPANY.name} o di terzi.
- Compiere qualsiasi azione che leda i diritti di ${COMPANY.name} o dei legittimi titolari dei contenuti.

${COMPANY.name} garantisce che i contenuti e i servizi offerti dal sito rispettano il principio di dignità della persona, la tutela dei giovani e dell’infanzia e la non discriminazione per motivi di razza, sesso, religione, opinione, nazionalità, disabilità o qualsiasi altra condizione personale o sociale, e si impegna a non praticare pubblicità ingannevole.

## 4. Proprietà intellettuale e industriale

Tutti i diritti di proprietà industriale e intellettuale sul sito e sui suoi contenuti —testi, manuali, documentazione tecnica, fotografie, video, progetti grafici, codice, marchi e loghi, tra cui **MySmartWindow**, **IoT Fenster**, **Connect**, **C-EVO**, **C-Pulsar** e **C-WALL**— appartengono a ${COMPANY.name} o quest’ultima dispone della dovuta autorizzazione dei titolari per diffonderli.

La documentazione scaricabile (manuali e schede in PDF) è messa a disposizione di clienti, distributori e installatori per l’uso e l’installazione dei prodotti. È consentito scaricarla e stamparla per tale finalità; qualsiasi altro uso, e in particolare la riproduzione, la distribuzione o la modifica a fini commerciali, richiede previa autorizzazione scritta.

I marchi di terzi presenti nel sito (Amazon Alexa, Google Home e altri ecosistemi compatibili) appartengono ai rispettivi titolari e sono citati unicamente a fini informativi di compatibilità, senza che ciò implichi alcun rapporto, sponsorizzazione o approvazione.

Se ritieni che un contenuto del sito leda i tuoi diritti di proprietà intellettuale o industriale, segnalacelo a **${COMPANY.email}** indicando:

- I tuoi dati personali in qualità di titolare dei diritti presuntamente violati o, se agisci per conto di terzi, la rappresentanza con cui agisci.
- I contenuti protetti e la loro esatta collocazione nel sito.
- La prova dei diritti rivendicati e una dichiarazione espressa con cui ti assumi la responsabilità della veridicità delle informazioni fornite.

## 5. Collegamenti

**Collegamenti in uscita.** Questo sito contiene collegamenti a siti web di nostra proprietà (tra cui ${COMPANY.site} e l’Area Cliente) e a contenuti di terzi, come i video ospitati su YouTube o le pagine dei nostri distributori. Il loro unico scopo è consentire all’utente di accedere a tali informazioni. ${COMPANY.name} non controlla tali siti e non risponde in alcun caso dei loro contenuti né delle conseguenze derivanti dall’accesso.

**Collegamenti in entrata.** Chi intenda stabilire un collegamento verso questo sito dovrà ottenere la previa autorizzazione scritta di ${COMPANY.name}. Il collegamento non implica alcun rapporto tra ${COMPANY.name} e il titolare del sito che collega, né l’accettazione o l’approvazione dei suoi contenuti o servizi. Il sito che collega non potrà includere marchi, denominazioni, loghi, slogan o altri segni distintivi di ${COMPANY.name} diversi da quelli espressamente autorizzati.

## 6. Modifica e durata

${COMPANY.name} si riserva il diritto di modificare, in qualsiasi momento e senza preavviso, la presentazione, la configurazione e i contenuti del sito, nonché le presenti Note legali, e di sospenderne temporaneamente o definitivamente l’erogazione.

## 7. Esclusione di garanzie e di responsabilità

${COMPANY.name} non presta alcuna garanzia e non risponde, in alcun caso, dei danni di qualsiasi natura che possano derivare da:

- La mancata disponibilità, manutenzione o effettivo funzionamento del sito, dei suoi servizi o dei suoi contenuti.
- La presenza di virus o di programmi dannosi nei contenuti.
- L’uso illecito, negligente o fraudolento del sito, dei suoi servizi o dei suoi contenuti da parte degli utenti, o contrario alle presenti condizioni, alla buona fede, agli usi generalmente accettati o all’ordine pubblico.
- La mancata veridicità, esattezza o attualità dei contenuti, fermo restando il ragionevole impegno a mantenere aggiornata la documentazione tecnica pubblicata.

La documentazione pubblicata si riferisce alle versioni di prodotto e di applicazione indicate in ciascun documento. In caso di dubbi sull’installazione o sull’uso di un dispositivo, rivolgiti al nostro servizio di supporto prima di agire.

Nulla di quanto previsto in questa sezione esclude o limita la responsabilità di ${COMPANY.name} nei casi in cui la normativa applicabile non lo consenta, in particolare nei confronti di consumatori e utenti.

## 8. Protezione dei dati e cookie

Il trattamento dei dati personali raccolti attraverso questo sito è illustrato nell’[Informativa sulla privacy](/it/legal/${LEGAL_SLUGS.privacy}), e l’archiviazione tecnica utilizzata dal browser nella [Politica sui cookie](/it/legal/${LEGAL_SLUGS.cookies}). ${COMPANY.name} ha adottato livelli di sicurezza adeguati ai dati che tratta e applica i mezzi e le misure tecniche a sua disposizione per garantirne la riservatezza ed evitarne l’uso improprio, la perdita, l’alterazione, l’accesso non autorizzato o il furto.

## 9. Nullità parziale

Qualora una di queste condizioni fosse dichiarata nulla o inefficace, si intenderà come non apposta e le restanti resteranno pienamente valide.

## 10. Legge applicabile e foro competente

Le presenti condizioni sono regolate dalla legge spagnola. Per qualsiasi controversia derivante dall’accesso o dall’uso del sito, le parti si sottopongono ai tribunali della città di **Murcia (Spagna)**, salvo che la normativa applicabile —in particolare quella a tutela dei consumatori e degli utenti— stabilisca un foro diverso di carattere imperativo.

## 11. Contatti

Per qualsiasi dubbio o commento sulle presenti Note legali puoi scrivere a **${COMPANY.email}** o inviare una comunicazione scritta all’indirizzo indicato nella sezione 1.`

export const notice: LegalDocument = {
  id: LEGAL_SLUGS.notice,
  title: {
    es: 'Aviso legal',
    en: 'Legal notice',
    it: 'Note legali',
  },
  intro: {
    es: 'Quién está detrás de este sitio, en qué condiciones puedes usarlo y a quién pertenecen los contenidos que publicamos.',
    en: 'Who is behind this site, the terms on which you may use it and who owns the content we publish.',
    it: 'Chi c’è dietro questo sito, a quali condizioni puoi usarlo e a chi appartengono i contenuti che pubblichiamo.',
  },
  body: { es: noticeEs, en: noticeEn, it: noticeIt },
  lastUpdated: LAST_UPDATED,
}


/* ==========================================================================
   Política de cookies
   ========================================================================== */

const cookiesEs = `## 1. Qué son las cookies

Una cookie es un pequeño fichero que un sitio web guarda en tu navegador cuando lo visitas. Junto a las cookies existen otras tecnologías de almacenamiento equivalentes —**localStorage** y **sessionStorage**— que cumplen la misma función y a las que se aplican las mismas reglas. En esta política las llamamos a todas «cookies» por sencillez.

## 2. Resumen: qué usa este sitio

**Este sitio no usa cookies de analítica, de publicidad ni de seguimiento.** No medimos tu navegación, no elaboramos perfiles y no compartimos nada con redes publicitarias ni con proveedores de estadísticas.

Lo único que se guarda en tu navegador son dos datos técnicos, del propio sitio, que no se envían a nuestros servidores:

| Nombre | Tipo | Finalidad | Duración |
| --- | --- | --- | --- |
| **msw-cookie-choice** | localStorage, propia, técnica | Recordar si has aceptado o rechazado este aviso, para no volver a mostrártelo en cada visita | Hasta que borres los datos del navegador |
| **theme** | localStorage, propia, de preferencia | Recordar si prefieres ver el sitio en modo claro u oscuro | Hasta que borres los datos del navegador |

Ambas están **exentas del deber de obtener consentimiento** conforme al artículo 22.2 de la LSSI y a la *Guía sobre el uso de las cookies* de la Agencia Española de Protección de Datos, por ser estrictamente necesarias para prestar un servicio que tú has solicitado: recordar tu elección y tu preferencia de visualización. Aun así te las contamos aquí, porque creemos que debes saber qué hay en tu navegador.

## 3. Contenido incrustado de terceros: los vídeos

Los videotutoriales del centro de recursos están alojados en **YouTube** (Google Ireland Ltd.) y se incrustan a través del dominio **youtube-nocookie.com**, el modo de privacidad mejorada de YouTube: **no instala cookies de seguimiento mientras no reproduzcas el vídeo**.

En cuanto pulsas el play, YouTube puede guardar información en tu dispositivo y tratar datos —entre ellos tu dirección IP— conforme a su propia política, con posible transferencia a Estados Unidos. No tenemos control sobre esas cookies ni acceso a lo que recogen.

- Política de privacidad de Google: [policies.google.com/privacy](https://policies.google.com/privacy)
- Cómo usa Google las cookies: [policies.google.com/technologies/cookies](https://policies.google.com/technologies/cookies)

Si prefieres evitarlo por completo, no pulses el play en el reproductor incrustado: puedes ver el mismo vídeo directamente en nuestro canal de YouTube o pedirnos el contenido por escrito desde el [formulario de contacto](/es/contacto).

Las tipografías del sitio se sirven desde nuestro propio servidor: **no se realiza ninguna petición a Google Fonts** al visitarlo.

## 4. Cómo gestionar o retirar tu consentimiento

- **Desde el propio sitio**: usa el enlace **Cookies** del pie de página para volver a abrir el aviso y cambiar tu elección cuando quieras.
- **Desde el navegador**: puedes borrar el almacenamiento de este sitio y bloquear cookies en cualquier momento. Rechazar o borrar estos datos no impide usar el sitio: como mucho volverás a ver el aviso y el sitio se abrirá con el tema por defecto.

Instrucciones de los navegadores más habituales:

- [Google Chrome](https://support.google.com/chrome/answer/95647)
- [Mozilla Firefox](https://support.mozilla.org/kb/Borrar%20cookies)
- [Microsoft Edge](https://support.microsoft.com/microsoft-edge)
- [Safari](https://support.apple.com/es-es/guide/safari/sfri11471/mac)

## 5. Cambios en esta política

Si en el futuro incorporamos cookies de analítica o de cualquier otro tipo no exento, actualizaremos esta página y volveremos a pedirte el consentimiento **antes** de instalarlas.

## 6. Más información

Para cualquier duda sobre esta política puedes escribirnos a **${COMPANY.email}**. El tratamiento de datos personales se explica con detalle en la [Política de privacidad](/es/legal/${LEGAL_SLUGS.privacy}).`

const cookiesEn = `## 1. What cookies are

A cookie is a small file that a website stores in your browser when you visit it. Alongside cookies there are equivalent storage technologies —**localStorage** and **sessionStorage**— that do the same job and are subject to the same rules. For simplicity this policy calls all of them "cookies".

## 2. Summary: what this site uses

**This site uses no analytics, advertising or tracking cookies.** We do not measure your browsing, we build no profiles and we share nothing with ad networks or analytics providers.

The only things stored in your browser are two technical items, belonging to the site itself, which are never sent to our servers:

| Name | Type | Purpose | Duration |
| --- | --- | --- | --- |
| **msw-cookie-choice** | localStorage, first-party, technical | Remember whether you accepted or rejected this notice, so it is not shown on every visit | Until you clear your browser data |
| **theme** | localStorage, first-party, preference | Remember whether you prefer the site in light or dark mode | Until you clear your browser data |

Both are **exempt from the consent requirement** under article 22.2 of the Spanish LSSI and the Spanish Data Protection Agency's *Guide on the use of cookies*, being strictly necessary to provide a service you have requested: remembering your choice and your display preference. We list them here anyway, because you should know what is in your browser.

## 3. Third-party embedded content: the videos

The video tutorials in the resource hub are hosted on **YouTube** (Google Ireland Ltd.) and embedded through the **youtube-nocookie.com** domain, YouTube's enhanced privacy mode: **it installs no tracking cookies until you play the video**.

As soon as you press play, YouTube may store information on your device and process data —including your IP address— under its own policy, with a possible transfer to the United States. We have no control over those cookies and no access to what they collect.

- Google privacy policy: [policies.google.com/privacy](https://policies.google.com/privacy)
- How Google uses cookies: [policies.google.com/technologies/cookies](https://policies.google.com/technologies/cookies)

If you would rather avoid this entirely, do not press play on the embedded player: you can watch the same video directly on our YouTube channel, or ask us for the content in writing through the [contact form](/en/contacto).

The site's fonts are served from our own server: **no request is made to Google Fonts** when you visit.

## 4. How to manage or withdraw your consent

- **From the site itself**: use the **Cookies** link in the footer to reopen the notice and change your choice whenever you want.
- **From your browser**: you can clear this site's storage and block cookies at any time. Rejecting or deleting this data does not stop you using the site: at most you will see the notice again and the site will open with the default theme.

Instructions for the most common browsers:

- [Google Chrome](https://support.google.com/chrome/answer/95647)
- [Mozilla Firefox](https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox)
- [Microsoft Edge](https://support.microsoft.com/microsoft-edge)
- [Safari](https://support.apple.com/guide/safari/sfri11471/mac)

## 5. Changes to this policy

If in future we add analytics cookies, or any other kind that is not exempt, we will update this page and ask for your consent again **before** installing them.

## 6. More information

For any question about this policy, write to us at **${COMPANY.email}**. The processing of personal data is explained in detail in the [Privacy policy](/en/legal/${LEGAL_SLUGS.privacy}).`

const cookiesIt = `## 1. Che cosa sono i cookie

Un cookie è un piccolo file che un sito web salva nel tuo browser quando lo visiti. Accanto ai cookie esistono altre tecnologie di archiviazione equivalenti —**localStorage** e **sessionStorage**— che svolgono la stessa funzione e sono soggette alle stesse regole. In questa politica le chiamiamo tutte «cookie» per semplicità.

## 2. In sintesi: cosa usa questo sito

**Questo sito non usa cookie di analisi, pubblicitari o di tracciamento.** Non misuriamo la tua navigazione, non elaboriamo profili e non condividiamo nulla con reti pubblicitarie o fornitori di statistiche.

Nel tuo browser vengono salvati soltanto due dati tecnici, del sito stesso, che non vengono inviati ai nostri server:

| Nome | Tipo | Finalità | Durata |
| --- | --- | --- | --- |
| **msw-cookie-choice** | localStorage, propria, tecnica | Ricordare se hai accettato o rifiutato questo avviso, per non mostrartelo a ogni visita | Fino alla cancellazione dei dati del browser |
| **theme** | localStorage, propria, di preferenza | Ricordare se preferisci il sito in modalità chiara o scura | Fino alla cancellazione dei dati del browser |

Entrambi sono **esenti dall’obbligo di consenso** ai sensi dell’articolo 22.2 della LSSI spagnola e della *Guida sull’uso dei cookie* dell’Agenzia spagnola per la protezione dei dati, essendo strettamente necessari per erogare un servizio da te richiesto: ricordare la tua scelta e la tua preferenza di visualizzazione. Te li elenchiamo comunque, perché riteniamo che tu debba sapere cosa c’è nel tuo browser.

## 3. Contenuti incorporati di terzi: i video

I videotutorial del centro risorse sono ospitati su **YouTube** (Google Ireland Ltd.) e incorporati tramite il dominio **youtube-nocookie.com**, la modalità di privacy avanzata di YouTube: **non installa cookie di tracciamento finché non riproduci il video**.

Non appena premi play, YouTube può memorizzare informazioni sul tuo dispositivo e trattare dati —tra cui il tuo indirizzo IP— secondo la propria politica, con possibile trasferimento negli Stati Uniti. Non abbiamo alcun controllo su tali cookie né accesso a ciò che raccolgono.

- Informativa sulla privacy di Google: [policies.google.com/privacy](https://policies.google.com/privacy)
- Come Google usa i cookie: [policies.google.com/technologies/cookies](https://policies.google.com/technologies/cookies)

Se preferisci evitarlo del tutto, non premere play nel lettore incorporato: puoi guardare lo stesso video direttamente sul nostro canale YouTube oppure richiederci il contenuto per iscritto dal [modulo di contatto](/it/contacto).

I caratteri tipografici del sito sono serviti dal nostro server: **non viene effettuata alcuna richiesta a Google Fonts** durante la visita.

## 4. Come gestire o revocare il consenso

- **Dal sito stesso**: usa il link **Cookie** nel piè di pagina per riaprire l’avviso e cambiare la tua scelta quando vuoi.
- **Dal browser**: puoi cancellare l’archiviazione di questo sito e bloccare i cookie in qualsiasi momento. Rifiutare o cancellare questi dati non impedisce di usare il sito: al massimo rivedrai l’avviso e il sito si aprirà con il tema predefinito.

Istruzioni dei browser più diffusi:

- [Google Chrome](https://support.google.com/chrome/answer/95647)
- [Mozilla Firefox](https://support.mozilla.org/kb/eliminare-i-cookie-e-i-dati-dei-siti-in-firefox)
- [Microsoft Edge](https://support.microsoft.com/microsoft-edge)
- [Safari](https://support.apple.com/it-it/guide/safari/sfri11471/mac)

## 5. Modifiche a questa politica

Se in futuro introdurremo cookie di analisi o di qualsiasi altro tipo non esente, aggiorneremo questa pagina e ti chiederemo nuovamente il consenso **prima** di installarli.

## 6. Maggiori informazioni

Per qualsiasi dubbio su questa politica puoi scriverci a **${COMPANY.email}**. Il trattamento dei dati personali è illustrato nel dettaglio nell’[Informativa sulla privacy](/it/legal/${LEGAL_SLUGS.privacy}).`

export const cookies: LegalDocument = {
  id: LEGAL_SLUGS.cookies,
  title: {
    es: 'Política de cookies',
    en: 'Cookie policy',
    it: 'Politica sui cookie',
  },
  intro: {
    es: 'Qué se guarda en tu navegador cuando visitas este sitio, por qué, y cómo cambiar tu elección en cualquier momento.',
    en: 'What gets stored in your browser when you visit this site, why, and how to change your choice at any time.',
    it: 'Cosa viene salvato nel tuo browser quando visiti questo sito, perché e come cambiare la tua scelta in qualsiasi momento.',
  },
  body: { es: cookiesEs, en: cookiesEn, it: cookiesIt },
  lastUpdated: LAST_UPDATED,
}


/**
 * Orden en el que aparecen en el pie de página y en los enlaces cruzados al
 * final de cada documento: privacidad primero, porque es el que más se
 * consulta.
 */
export const legalDocuments: LegalDocument[] = [privacy, notice, cookies]
