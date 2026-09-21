import { COMPANY, LAST_UPDATED, LEGAL_SLUGS, type LegalDocument } from './shared'

const es = `## 1. Datos identificativos

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

const en = `## 1. Identification details

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

const it = `## 1. Dati identificativi

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
  body: { es, en, it },
  lastUpdated: LAST_UPDATED,
}
