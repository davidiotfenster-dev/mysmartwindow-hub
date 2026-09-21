import { COMPANY, LAST_UPDATED, LEGAL_SLUGS, type LegalDocument } from './shared'

const es = `## 1. Responsable del tratamiento

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

const en = `## 1. Data controller

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

const it = `## 1. Titolare del trattamento

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
  body: { es, en, it },
  lastUpdated: LAST_UPDATED,
}
