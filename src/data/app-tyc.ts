/**
 * Terminos y Condiciones de Servicio de la app mySmartWindow (IoT FENSTER S.L.)
 * en los seis idiomas de la app, tal cual los entrego el equipo: el texto no se
 * retoca. Se generaron desde los HTML originales para no introducir erratas.
 *
 * Un fragmento `{ b: ... }` va en negrita.
 */

export const TYC_LANGS = ['es', 'en', 'it', 'de', 'fr', 'pt'] as const
export type TycLang = (typeof TYC_LANGS)[number]

export function isTycLang(value: string): value is TycLang {
  return (TYC_LANGS as readonly string[]).includes(value)
}

export type TycSegment = string | { b: string }

export type TycBlock =
  | { t: 'h'; text: string }
  | { t: 'p'; s: TycSegment[] }
  | { t: 'ul'; items: TycSegment[][] }

export interface TycDocument {
  /** Titulo de la pestana del navegador (distinto del encabezado en algunos idiomas). */
  pageTitle: string
  title: string
  version: string
  copyright: string
  logoAlt: string
  blocks: TycBlock[]
}

export const tycDocuments: Record<TycLang, TycDocument> = {
  "es": {
    "pageTitle": "Términos y Condiciones del Servicio",
    "title": "Términos y Condiciones de Servicio",
    "version": "Versión de este documento: 1.0",
    "copyright": "© 2022 - IoT FENSTER, S.L.",
    "logoAlt": "Logo IoT Fenster",
    "blocks": [
      {
        "t": "h",
        "text": "Bienvenido a mySmartWindow, pero antes de empezar a utilizar nuestro servicio, debe aceptar nuestros Términos y Condiciones de Servicio:"
      },
      {
        "t": "p",
        "s": [
          "¡Gracias por interesarse por mySmartWindow! Le invitamos a que acceda y utilice el Servicio de mySmartWindow para disfrutar de una ventana o puerta siempre conectada y con el potencial IoT. Por favor, tenga en cuenta que su registro en el servicio y el sitio web de mySmartWindow y su utilización de los mismos está sujeto a la aceptación de estos Términos y Condiciones de Servicio. El servicio de mySmartWindow se ofrece con ciertas limitaciones y condiciones de uso que cumplen la legislación. Puede que necesitemos cambiar estos Términos y Condiciones de vez en cuando, y nos reservamos el derecho a hacerlo. Por favor, revise aquí la nueva información, la versión de este contrato y la fecha de su entrada en vigor."
        ]
      },
      {
        "t": "h",
        "text": "Este documento es un contrato, así que por favor léalo detenidamente:"
      },
      {
        "t": "p",
        "s": [
          "Este documento describe en detalle sus derechos relativos al Servicio, así que por favor repase detenidamente estos Términos y Condiciones. Estos Términos y Condiciones de Servicio constituyen un contrato entre nosotros. Si no acepta estos Términos, no tendrá derecho a acceder a nuestro Servicio ni a utilizarlo en modo remoto, es decir, desde el exterior de su vivienda.",
          {
            "b": "En caso de no aceptarlo sus ventanas y puertas solo podrán trabajar en modo local y no tendrán el soporte de la nube y por ello algunos de los servicios no serán accesibles"
          },
          ". Si es que utiliza nuestro Servicio, su uso será considerado como una aceptación de los Términos y como su consentimiento en ser una parte de este acuerdo vinculante."
        ]
      },
      {
        "t": "h",
        "text": "Al utilizar este servicio, usted reconoce, acuerda y acepta todas las Condiciones, incluyendo la Política de Privacidad:"
      },
      {
        "t": "p",
        "s": [
          "Al utilizar el Servicio, usted reconoce, acepta y está de acuerdo con todas las cláusulas de la Política de Privacidad, incluyendo, sin limitación, el uso y tratamiento de la Información y los Contenidos de su Cuenta de acuerdo con dicha Política de Privacidad."
        ]
      },
      {
        "t": "h",
        "text": "Partes de este Contrato:"
      },
      {
        "t": "p",
        "s": [
          "Usted es una de las partes de este contrato. La otra parte es IoT FENSTER S.L una empresa privada radicada en España y con su sede social en Fuente Álamo – Murcia, y a la que se aludirá en estas Condiciones de Servicio como \"mySmartWindow\", \"nosotros\" y a veces, \"nos\"."
        ]
      },
      {
        "t": "h",
        "text": "Los Términos y Condiciones de este Contrato pueden cambiar:"
      },
      {
        "t": "p",
        "s": [
          "Es casi seguro que este Contrato esté sujeto a algún cambio, debido a los cambios en nuestro Servicio y en las leyes aplicables a usted y a nosotros. Si hiciéramos algún cambio, nos esforzaríamos al máximo por informarle por adelantado, aunque en ciertas situaciones, como cuando es necesario algún cambio para cumplir requisitos legales aplicables, puede que algún cambio en estas Condiciones tenga que entrar en vigor inmediatamente. Anunciaremos los cambios aquí, en nuestro sitio web, y también podemos decidir avisarle de los cambios mediante el envío de un correo electrónico a la dirección que usted nos haya facilitado. También intentaremos explicar los motivos del cambio. Si estas Condiciones son actualizadas, es usted libre de decidir si acepta estos cambios o si deja de utilizar nuestro Servicio, su uso continuado del Servicio tras la entrada en vigor de la susodicha actualización se considerará que representa su acuerdo con los nuevos Términos y su consentimiento a someterse a los mismos. Excepto para los cambios hechos por nosotros tal y como se describe aquí, ninguna modificación o enmienda de estas Condiciones entrará en vigor mientras no se estipule en un acuerdo por escrito y que lleve su firma y la nuestra. En aras de la claridad, los correos electrónicos y otras comunicaciones no constituirán un acuerdo por escrito efectivo para este fin."
        ]
      },
      {
        "t": "h",
        "text": "Descripción del Servicio de mySmartWindow:"
      },
      {
        "t": "p",
        "s": [
          "El Servicio de mySmartWindow CLOUD consiste en un sitio web y un servidor tipo Cloud que da soporte a las comunicaciones desde el exterior de la vivienda a las comunicaciones con sus ventanas y puertas. Los servicios y los productos de mySmartWindow ofrecidos por IoT FENSTER S.L, ofrecen gracias al servicio mySmartWindow CLOUD otro tipo de servicios complementarios como pueden ser los servicios de alerta. mySmartWindow permite a sus usuarios recopilar, almacenar y compartir datos de sus dispositivos, gestionarlos y programarlos. A cambio de permitirle utilizar el Servicio, usted acepta someterse a estas Condiciones."
        ]
      },
      {
        "t": "h",
        "text": "IoT FENSTER S.L no se hace responsable de los Contenidos y Datos del usuario facilitados por otros usuarios:"
      },
      {
        "t": "p",
        "s": [
          "IoT FENSTER S.L no selecciona ni filtra los Datos ni los Contenidos de los usuarios, y no revisa, comprueba, confirma, aprueba ni verifica ningún Contenido ni Datos de los Usuarios ni la exactitud de dichos Datos o Contenidos. Ni estos Términos y Condiciones, ni la utilización del Servicio por su parte, ni la prestación del Servicio por parte de mySmartWindow, ni el acceso/almacenamiento/uso de los Datos y Contenidos del Usuario por parte de IoT FENSTER S.L implicarán ni crearán ninguna responsabilidad por parte de mySmartWindow en relación con los Datos del Usuario proporcionados por otros usuarios e incluidos en el Servicio. Su acceso al Servicio o a algún contenido y su uso de los mismos es bajo su propia responsabilidad."
        ]
      },
      {
        "t": "p",
        "s": [
          "El Servicio de mySmartWindow CLOUD, almacena temporalmente los datos de temperatura, humedad, Co2, apertura, estados de persiana o apertura. De esta manera podemos brindarle a usted el histórico de operaciones y las gráficas de eficiencia. En caso de no aceptar los términos estos servicios no se ofrecerá y el servidor no almacenará dato alguno temporal."
        ]
      },
      {
        "t": "p",
        "s": [
          "Los datos históricos de sus ventanas se almacenaran cifrados en la base de datos mySmartWindow CLOUD y en ningún momento están vinculados a sus datos personales en las mismas tablas. Todos los datos se identificarán a través de un ID de usuario alfanumérico."
        ]
      },
      {
        "t": "p",
        "s": [
          "El Servicio de mySmartWindow CLOUD se proporciona \"TAL CUAL ES\" y \"SEGÚN DISPONIBILIDAD\":"
        ]
      },
      {
        "t": "p",
        "s": [
          "Usted entiende y acepta que el Servicio se le proporciona \"TAL CUAL ES\" y \"SEGÚN DISPONIBILIDAD\". Hasta nuevo aviso, el Servicio de mySmartWindow CLOUD se ofrece como una edición de software Beta, lo que significa que NO HAY ACUERDO DE NIVEL DE SERVICIO Y NO SE OFRECE GARANTÍA DE DISPONIBILIDAD DEL SERVICIO. IoT FENSTER S.L DENIEGA CUALQUIER GARANTÍA, EXPRESA O IMPLÍCITA, DE COMERCIALIZACIÓN, ADECUACIÓN PARA ALGÚN FIN EN PARTICULAR O NO INFRINGIMIENTO. mySmartWindow no será responsable ni imputada por cualquier pérdida de datos, u otros daños ocasionados por su acceso al uso del Servicio. Usted también acepta que IoT FENSTER S.L no tiene ninguna responsabilidad ni compromiso por el borrado, o el fallo en el almacenamiento o la transmisión, de cualquier contenido mantenido por el Servicio. IoT FENSTER S.L no ofrece garantías de que el Servicio cumpla sus requisitos o esté disponible de manera ininterrumpida, segura o sin errores. Ningún consejo o información obtenidos de IoT FENSTER S.L, ya sea oralmente o por escrito, crearán ninguna garantía no mencionada expresamente en la presente."
        ]
      },
      {
        "t": "h",
        "text": "Registrarse como usuario de mySmartWindow creando una cuenta:"
      },
      {
        "t": "p",
        "s": [
          "Primero tiene que crear una cuenta de mySmartWindow. Usted crea una cuenta facilitándonos un nombre de usuario y una dirección de correo electrónico aceptables, y creando una contraseña. Nos referimos a ello como su \"Información de Cuenta\". Le sugerimos que utilice una combinación de nombre de usuario y contraseña diferenciados y que no sean obvios, lo ideal sería que fueran diferentes de los que utilice para otros servicios. Usted es responsable de asegurar la exactitud, integridad y confidencialidad de su Información de Cuenta, y será responsable de todas las actividades que tengan lugar en su Cuenta, incluyendo las actividades de otros a quienes haya facilitado su Información de Cuenta. No seremos responsables de ninguna pérdida o daño ocasionados por su inobservancia de la obligación de proporcionarnos información exacta o de mantener a salvo su Información de Cuenta. Si usted descubre algún uso no autorizado de su Información de Cuenta o sospecha que alguien pueda ser capaz de acceder a sus Contenidos privados, deberá cambiar inmediatamente su contraseña y avisar a nuestro equipo de Atención al Cliente."
        ]
      },
      {
        "t": "p",
        "s": [
          "Además, mySmartWindow no tiene responsabilidad por la disponibilidad de Internet y de otros servicios de telecomunicaciones necesarios para acceder al Servicio."
        ]
      },
      {
        "t": "h",
        "text": "Sus derechos como Usuario:"
      },
      {
        "t": "p",
        "s": [
          "Una vez que haya creado una cuenta y aceptado estas Condiciones, le proporcionamos una licencia limitada y no exclusiva para el uso del Servicio sujeto a estas Condiciones, en la medida en que no se le deniegue recibir el Servicio en virtud de alguna ley aplicable para usted, hasta que cierre usted su cuenta voluntariamente o hasta que nosotros cerremos su cuenta con arreglo a estas Condiciones. Además, le concedemos una licencia personal, mundial, sin regalías, intransferible y no exclusiva. Para utilizar la APP y el Servicio de mySmartWindow CLOUD, hasta que expiren sus derechos en consonancia con la susodicha licencia y/o estas Condiciones. Usted no obtiene ningún otro derecho o interés en mySmartWindow o el Servicio."
        ]
      },
      {
        "t": "h",
        "text": "Su uso de mySmartWindow y de sus Contenidos:"
      },
      {
        "t": "p",
        "s": [
          "Su uso del Servicio debe estar en consonancia con estas Condiciones. En lo que se refiere a su uso de mySmartWindow, usted acepta ser responsable de su propia conducta y de toda conducta en su Cuenta. Esto significa que todo Contenido - como datos de sus dispositivos, texto, archivos de cualquier clase (imágenes, vídeos y cualquier cosa que se le ocurra), sin importar su forma o su estructura técnica (colectivamente, \"Contenido\") – creado, transmitido, almacenado o exhibido en su Cuenta, es de su responsabilidad exclusiva como la persona que creó su cuenta de usuario y es la única persona conocedora de la misma. Esto se aplica aunque el Contenido se mantenga en privado, se comparta o se transmita utilizando el Servicio o alguna aplicación o servicio de terceros integrados con mySmartWindow."
        ]
      },
      {
        "t": "h",
        "text": "Protección de Datos y Contenidos del Usuario:"
      },
      {
        "t": "ul",
        "items": [
          [
            "Sus Datos son Suyos: Usted conserva sus derechos y cualquier otro derecho sobre sus gráficas temporales recogidas por los dispositivos, antes de enviarlo o publicarlo o exhibirlo en el Servicio o a través del mismo u otro medio. Pero sí que tiene que conceder a mySmartWindow una licencia limitada, tal y como se describe más abajo, de manera que podamos hacer que sus datos estén accesibles y sean utilizables en el Servicio. Aparte de esta licencia limitada y de otros derechos que usted concede en estas Condiciones, mySmartWindow reconoce y acepta que no obtenemos ningún otro derecho, título o interés por parte suya sobre sus Contenidos bajo estas Condiciones. Para permitir a mySmartWindow operar el Servicio, debemos obtener de usted ciertas licencias y otros derechos sobre los Contenidos que nos envíe, de manera que el procesado, mantenimiento, almacenamiento, reproducción técnica, copias de seguridad y distribución y gestión relacionada de sus Contenidos no infrinja la legislación vigente sobre derechos de autor y otras leyes. Esto significa que al usar el Servicio, usted concede a mySmartWindow licencia para exhibir, ejecutar y distribuir cualquiera de sus contenidos, y para modificar (por razones técnicas, p. ej. para asegurarnos de que el Contenido se pueda ver tanto en smartphones como en ordenadores) y reproducir dichos Contenidos y así permitir a mySmartWindow operar el Servicio. Usted también acepta que mySmartWindow posea el derecho a decidir no aceptar, publicar, ejecutar, almacenar, exhibir, publicar o transmitir cualquier Contenido de manera anonima si aportar dato alguno del usuario. Usted acepta que estos derechos de autor y licencias estén libres de regalías, y sean irrevocables y a nivel mundial (en tanto su Contenido esté alojado con nosotros) e incluyen el derecho de mySmartWindow a poner dichos Contenidos, transmitiéndoles también estos derechos, a la disposición de terceros con los que mySmartWindow tiene relaciones contractuales relacionadas con la provisión del Servicio de mySmartWindow, únicamente con el propósito de proporcionar dichos servicios, y por otra parte a permitir el acceso o a mostrar sus Contenidos a terceros si mySmartWindow determinara que dicho acceso fuera necesario para cumplir con sus obligaciones legales. Usted también asume ante nosotros que, al aceptar los términos que sus información no personal pueda ser cedida por mySmartWindow a través de sus API a otros desarrolladores de APP para que a través de estas aPP de tercero pueda acceder a los servicios de sus ventanas y puertas mySmartWindow. Los derechos descritos en estas Condiciones, no está infringiendo los derechos de ninguna persona ni de terceras partes. Finalmente, usted comprende y acepta que mySmartWindow, al llevar a cabo los pasos técnicos para ofrecer el Servicio a nuestros usuarios, puede hacer en sus datos no personales sean necesarios para conformar y adaptar los Contenidos a los requisitos técnicos de las redes de conexión, los dispositivos, los servicios o los medios de comunicación."
          ],
          [
            "Sus Datos y Contenidos están protegidos: La seguridad de sus datos es de capital importancia para nosotros, y realizamos todos los esfuerzos posibles para mantener sus datos seguros y protegidos. No obstante, no asumimos ninguna responsabilidad por cualquier pérdida o distribución no autorizada de sus Contenidos. Su privacidad en sus Contenidos es también nuestra principal preocupación, y esperamos no tener que examinar nunca los Contenidos de nadie. Sin embargo, existen determinadas circunstancias en las que podemos tener la necesidad de examinar sus Contenidos en todo o en parte, como se explica en nuestra Política de Privacidad. Excepto tal y como se describe aquí y en nuestra Política de Privacidad, a menos que usted decida permitir a otros ver o tener acceso a los Contenidos que envíe al Servicio, nadie más deberá ver sus Contenidos sin su consentimiento. Por supuesto, si es que decide publicar o compartir cualquier parte de sus Contenidos creando un flujo de información, o creando un servicio web para publicar los Contenidos, entonces estaría dando permiso a cada uno de los usuarios autorizados para acceder, utilizar, exhibir, ejecutar, distribuir y modificar sus Contenidos (sujeto a cualquier compromiso o acuerdo al que haya podido llegar con dichos usuarios sin la participación de mySmartWindow). Además, mySmartWindow le permite utilizar una gran variedad de servicios y aplicaciones de terceros que interactúan con el Servicio y con sus Contenidos, y usted debería revisar los derechos de acceso que concede a dichos servicios o aplicaciones, pues les puede permitir el acceso a sus Contenidos mediante sus acuerdos con esas terceras partes."
          ],
          [
            "Sus Datos y Contenidos son portátiles: mySmartWindow se compromete a hacer portátiles sus datos. Eso significa que incorporaremos herramientas en nuestro Servicio y Software para que pueda compartir o exportar a archivos sus Datos y Contenidos o hacerlos accesibles mediante servicios web o APIs. Todas esas herramientas estarán disponibles mientras su cuenta esté abierta, sujetas al cumplimiento de nuestra Política de Privacidad. Si tuviera algún problema al exportar Datos o Contenidos, puede ponerse en contacto con nuestro equipo de Atención al Cliente quienes, esforzándose al máximo, intentarán resolver su solicitud si cumple con nuestra Política de Privacidad y acciones legales."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Derecho de mySmartWindow a modificar el Servicio:"
      },
      {
        "t": "p",
        "s": [
          "Mantenemos el derecho para, a nuestra entera discreción, implementar nuevos elementos como parte de y/o auxiliar del Servicio y cualquier Software de la APP de mySmartWindow, incluidos cambios que pueden afectar al modo de operación anterior del Servicio. Esperamos que tales modificaciones mejoren el Servicio en general, pero es posible que usted no esté de acuerdo con nosotros. También nos reservamos el derecho a establecer ciertos límites a la naturaleza o el tamaño del espacio de almacenamiento del que puede disponer, el número de transmisiones y mensajes de correo electrónico, la ejecución del código de su programa, sus Contenidos y otros datos, e impongamos otras limitaciones en cualquier momento, con o sin previo aviso. Por ejemplo, si utiliza el servicio gratuito de mySmartWindow, no disfrutará de todas las ventajas que se ofrecen a los usuarios del servicio Premium de mySmartWindow. Usted también reconoce que ciertas acciones de mySmartWindow pueden dificultarle o impedirle que acceda a sus Contenidos o que utilice el Servicio a determinadas horas y/o en la misma forma, por períodos limitados o permanentemente, y acepta que mySmartWindow no tiene responsabilidad ni imputabilidad ante usted ni ante terceros por ninguna modificación, suspensión o discontinuidad de cualquier parte del Servicio."
        ]
      },
      {
        "t": "h",
        "text": "Almacenamiento de sus Datos y Contenidos:"
      },
      {
        "t": "p",
        "s": [
          "El Servicio de mySmartWindow CLOUD está disponible en todo el mundo, pero nuestras operaciones de proceso de datos se llevan a cabo en España. Si utiliza el Servicio, usted reconoce que puede estar enviando comunicaciones electrónicas (incluyendo la información de su cuenta personal y sus Contenidos) a través de redes informáticas que son propiedad de mySmartWindow y de terceros radicados en España y en otras ubicaciones en Europa e incluso en otros países. En consecuencia, su utilización del Servicio seguramente ocasionará la transmisión internacional de datos, y su utilización del Servicio representará su consentimiento para permitir dichas transmisiones. mySmartWindow podrá cambiar la ubicación de sus operaciones de procesado sin avisarle ni pedirle su consentimiento."
        ]
      },
      {
        "t": "h",
        "text": "En caso de que se cierre su cuenta:"
      },
      {
        "t": "p",
        "s": [
          "Puede cerrar su cuenta con nuestro Servicio en cualquier momento, por cualquier motivo (o sin motivo), sin ni siquiera avisarnos. Sin embargo, si desea desactivar su cuenta, tiene que dar ciertos pasos concretos, que se describen en nuestra documentación. mySmartWindow puede suspender el acceso a su cuenta, o cerrar su cuenta, con o sin previo aviso de acuerdo con estas Condiciones. Las razones para que mySmartWindow suspenda o cierre su cuenta pueden incluir, sin limitación: (i) incumplimiento o violación de estas Condiciones o de cualquier Acuerdo Separado, (ii) un período prolongado de inactividad (determinado a la entera discreción de mySmartWindow), (iii) el impago por su parte de cualquier tarifa u otra cantidad adeudada a mySmartWindow o a terceros y relacionada con su utilización del Servicio (o de cualquier parte del mismo), o (vi) conflictos o problemas técnicos o de seguridad. En la mayor parte de los casos, en el supuesto de que decidiéramos cerrar su cuenta, le avisaríamos con al menos 30 días de antelación en la dirección de correo electrónico que nos haya proporcionado, de forma que tenga la oportunidad de recuperar cualquier Contenido almacenado en los servidores de mySmartWindow (a menos que determinemos que nos está legalmente prohibido permitírselo). Tras el vencimiento de este período de aviso, ya no podrá recuperar los Contenidos incluidos en esa cuenta ni utilizar de cualquier otro modo el Servicio a través de dicha cuenta."
        ]
      },
      {
        "t": "h",
        "text": "Cláusula de Exención de Responsabilidad, derechos de autor e Información de Marcas Registradas:"
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow y el logotipo de mySmartWindow son marcas registradas."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow ha realizado todos los esfuerzos para garantizar la exactitud y fiabilidad de la información ofrecida en el sitio web o en la APP mySmartWindow. Sin embargo, la información se suministra sin garantías. mySmartWindow no acepta ninguna responsabilidad o imputabilidad sobre la exactitud, el contenido, la integridad o la fiabilidad de la información."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow, almacena en su servidor el histórico de informaciones y operaciones para poder mostrarle dicha información y para poder crear estadísticas de eficiencia para su hogar. mySmartWindow, se reserva el derecho de poder ceder a esa información de manera anónima a terceras empresas para poder realizar estadísticas de hogares, modelos predictivos, etc."
        ]
      },
      {
        "t": "p",
        "s": [
          "En caso de no aceptar las condiciones no se guardará ningún dato en el servidor y tan solo se podrá acceder en modo local sin poder disponer de estos servicios."
        ]
      },
      {
        "t": "h",
        "text": "Enlaces a Terceras Partes:"
      },
      {
        "t": "p",
        "s": [
          "Puede que incluyamos o recomendemos recursos, materiales y desarrolladores de terceras partes y/o enlaces a sitios web y aplicaciones de terceras partes como parte del Servicio o en relación con el mismo. No tenemos ningún control sobre dichos sitios o desarrolladores y, en consecuencia, usted reconoce y acepta que: (i) no somos responsables de la disponibilidad de dichos sitios o aplicaciones, (ii) no somos responsables ni imputables por cualquier contenido u otros materiales o funcionalidades disponibles en dichos sitios o aplicaciones, y (iii) no seremos responsables ni imputables, directa o indirectamente, de cualquier daño o pérdida causados o presuntamente ocasionados por o relacionados con el uso de o la confianza en cualquiera de dichos contenidos, materiales o aplicaciones."
        ]
      },
      {
        "t": "p",
        "s": [
          "Indemnidad. Usted acepta mantener indemne y proteger a mySmartWindow, sus subsidiarios, filiales, ejecutivos, agentes, empleados, anunciantes y socios de y frente a toda reclamación, responsabilidades, daños (directos y consecuentes), pérdidas y gastos (incluyendo gastos legales y otros honorarios profesionales), que se deriven de o estén relacionados en algún modo con reclamaciones de terceras partes relativas a su utilización del Servicio, cualquier violación de estas Condiciones de Servicio o cualquier otra acción relacionada con su uso del Servicio (incluidas todas las acciones llevadas a cabo en su cuenta). En el caso de una reclamación así, daremos aviso de la reclamación, demanda o acción a la información de contacto que tengamos para esa cuenta, siempre que algún fallo al entregarle dicho aviso no elimine o reduzca su obligación de indemnidad de acuerdo con la presente."
        ]
      },
      {
        "t": "h",
        "text": "Blog y foro:"
      },
      {
        "t": "p",
        "s": [
          "El servicio de blog y foro le permite participar en los blogs y foros sobre temas de mySmartWindow"
        ]
      },
      {
        "t": "p",
        "s": [
          "También puede publicar un mensaje en el foro de mySmartWindow. Usted reconoce y acepta que si envía algún Contenido al foro, será el único responsable de dichos Contenidos. mySmartWindow no será responsable en ningún modo de tales Contenidos enviados."
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "Además, usted acuerda que:"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "No enviará ningún Contenido que sea molesto, ofensivo, amenazador, dañino, calumnioso o difamatorio, fomente conductas que puedan ser constitutivas de delito o que conlleven responsabilidades civiles, o sea ilegal de cualquier forma."
          ],
          [
            "No enviará ningún Contenido que esté protegido por las leyes de propiedad intelectual o por derechos de confidencialidad, a menos que posea los derechos sobre el mismo o haya recibido todos los consentimientos necesarios. Usted será el único responsable de cualquier violación de derechos de autor, marca registrada u otros derechos de propiedad."
          ],
          [
            "No enviará ningún Contenido que contenga un virus o algún otro componente dañino."
          ],
          [
            "No emprenderá ninguna actividad que interfiera con o perturbe el uso del Sitio Web por parte de otros usuarios."
          ],
          [
            "No enviará ningún Contenido que incite a cometer actividades ilegales, o que facilite consejos o instrucciones sobre dichas actividades ilegales."
          ],
          [
            "No hará ninguna falsa representación, incluyendo la suplantación de personas o entidades y la simulación de su asociación con alguna persona o entidad."
          ],
          [
            "No hará uso del foro de mySmartWindow para fines comerciales, como anunciar algún producto o servicio, revender o publicar la información transmitida o publicada sin consentimiento por escrito."
          ]
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow no previsualiza, supervisa ni edita los Contenidos enviados a los Foros. Sin embargo, mySmartWindow se reserva el derecho de editar, limitar o suprimir cualquier Contenido a su entera discreción. No obstante, usted será el único responsable de cualquier Contenido que envíe o publique."
        ]
      },
      {
        "t": "p",
        "s": [
          "Al enviar Contenidos, mediante cualquier medio, al foro o blog de mySmartWindow, usted concede a mySmartWindow un derecho y una licencia perpetua, sin regalías, irrevocable, no exclusiva y mundial para utilizar, revelar, exhibir, ejecutar, reproducir, modificar, adaptar, publicar, traducir y distribuir dichos Contenidos o incorporar dichos Contenidos en cualquier formulario, medio o tecnología ya conocidos o por desarrollar. Además, mySmartWindow será libre de utilizar cualquier idea, concepto, conocimiento o técnica contenidos en dicha información para cualquier propósito, incluido pero no limitado a la investigación, el desarrollo, la fabricación y la comercialización de productos y otros artículos que incorporen dichas ideas. Si no es el propietario del Contenido enviado, usted garantiza que ha recibido todos los consentimientos necesarios por parte del propietario de dichos derechos. Usted exonerará a mySmartWindow si cualquiera de dichos contenidos enviados infringiera alguno de dichos derechos."
        ]
      },
      {
        "t": "p",
        "s": [
          "Al participar en cualquier blog o foro, puede entrar en contacto con Contenidos que sean inexactos, incompletos o inadecuados. Deberá ser sumamente cauteloso respecto a cualquier Contenido publicado o transmitido en un foro o blog de mySmartWindow. mySmartWindow le insta a que no realice ninguna acción basada en ninguno de estos contenidos. mySmartWindow no será responsable del Contenido ni de la exactitud de cualquier información, y no será responsable de ningún acto o decisión realizados en función de dicha información."
        ]
      },
      {
        "t": "p",
        "s": [
          "En consideración a los esfuerzos de mySmartWindow para perfeccionar y mejorar la Plataforma y sus productos y servicios asociados y responder a las sugerencias de los usuarios, usted accede a transferir dichas ideas, conceptos, conocimientos o técnicas a mySmartWindow sin ninguna compensación a cambio."
        ]
      },
      {
        "t": "p",
        "s": [
          "Usted también accede a llevar a efecto todos y cada uno de los documentos que mySmartWindow pueda solicitar razonablemente en relación con la confirmación de la titularidad por parte de mySmartWindow y de su derecho ilimitado a utilizar dichas ideas, conceptos, conocimientos y técnicas"
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "Al enviar comentarios a mySmartWindow por cualquier medio, ya sea a través del blog, el foro, el buzón de sugerencias de los clientes o similar, usted será el único responsable del contenido de cualquier comentario que haga. Usted acuerda que ninguno de los comentarios que envíe a mySmartWindow:"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "Violará ningún derecho de terceras partes, incluyendo pero no limitado a derechos de autor, marca registrada, confidencialidad u otros derechos personales o de propiedad."
          ],
          [
            "Será calumnioso o contendrá materiales calumniosos o ilegales, insultantes u obscenos, o constituyan una apropiación indebida de los secretos comerciales de terceros."
          ],
          [
            "Menospreciará los productos o servicios de terceros, ni contendrá ninguna información personal (aparte de su dirección de correo electrónico y su nombre de usuario)."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Actividades de Alto Riesgo:"
      },
      {
        "t": "p",
        "s": [
          "Los Servicios de mySmartWindow no son a prueba de fallos y no han sido diseñados, fabricados o concebidos para su uso como o con equipos de control online en entornos peligrosos que requieran un funcionamiento a prueba de fallos."
        ]
      },
      {
        "t": "h",
        "text": "Fuerza Mayor:"
      },
      {
        "t": "p",
        "s": [
          "Ninguna parte será responsable por ningún fallo o retraso en la prestación, o de los datos perdidos de acuerdo con estos Términos y Condiciones (exceptuando el retraso en el pago de dinero, que ha de ser adeudado y pagadero según el presente contrato), en la medida en que estos fallos o retrasos sean causados directamente por: (i) fallos del Servicio, (ii) fenómenos meteorológicos naturales, o (iii) cualquier otra causa que escape al control razonable de esa parte y ocurran sin su falta o negligencia, incluyendo, sin limitación, fallos de los proveedores, subcontratistas y transportistas, o de la parte en cumplir sus obligaciones de manera sustancial de acuerdo con estas Condiciones de Uso, siempre que en todos esos casos, como condición de la reclamación de no responsabilidad, la parte que esté experimentando las dificultades avise con prontitud y por escrito a la otra parte, con todos los detalles referentes al suceso de la causa en que se basa."
        ]
      },
      {
        "t": "h",
        "text": "El Servicio está disponible \"TAL CUAL ES\":"
      },
      {
        "t": "p",
        "s": [
          "El Servicio está disponible \"TAL CUAL ES\". USTED ENTIENDE Y ACEPTA EXPLÍCITAMENTE QUE: (a) SU UTILIZACIÓN DEL SERVICIO ES BAJO SU PROPIA RESPONSABILIDAD. EL SERVICIO SE PROPORCIONA \"TAL CUAL ES\" Y \"SEGÚN DISPONIBILIDAD. EN LA MEDIDA EN QUE LO PERMITA LA LEY, mySmartWindow DENIEGA EXPRESAMENTE TODA GARANTÍA Y CONDICIÓN DE CUALQUIER CLASE, YA SEA EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADA A LAS GARANTÍAS Y CONDICIONES IMPLÍCITAS DE MERCANTIBILIDAD, ADECUACIÓN PARA UN FIN CONCRETO Y NO INFRINGIMIENTO. (b) mySmartWindow NO GARANTIZA QUE (i) EL SERVICIO CUMPLA TODOS SUS REQUISITOS, (ii) EL SERVICIO SEA ININTERRUMPIDO, PUNTUAL, SEGURO O SIN ERRORES, O (iii) SE CORRIJAN TODOS LOS ERRORES EN EL SERVICIO. (c) CUALQUIER MATERIAL DESCARGADO U OBTENIDO DE OTRA FORMA MEDIANTE EL USO DEL SERVICIO SERÁ HECHO BAJO SU RESPONSABILIDAD Y USTED SERÁ EL ÚNICO RESPONSABLE DE CUALQUIER DAÑO A SUS SISTEMAS INFORMÁTICOS U OTROS DISPOSITIVOS O DE LA PÉRDIDA DE DATOS OCASIONADA POR LA DESCARGA DE DICHO MATERIAL. (d) NINGÚN CONSEJO O INFORMACIÓN, YA SEA ORALMENTE O POR ESCRITO, QUE USTED OBTENGA DE mySmartWindow O DEL SERVICIO O A TRAVÉS DEL MISMO, CREARÁ NINGUNA GARANTÍA QUE NO SE MENCIONE EXPRESAMENTE EN ESTAS CONDICIONES DE SERVICIO."
        ]
      },
      {
        "t": "h",
        "text": "Limitación de responsabilidad:"
      },
      {
        "t": "p",
        "s": [
          "USTED ENTIENDE Y ACEPTA EXPRESAMENTE QUE mySmartWindow, SUS SUBSIDIARIOS, FILIALES Y LICENCIATARIOS, Y NUESTROS Y SUS RESPECTIVOS EJECUTIVOS, EMPLEADOS, AGENTES Y HEREDEROS NO SERÁN RESPONSABLES ANTE USTED DE NINGÚN DAÑO DIRECTO, INDIRECTO, INCIDENTAL, ESPECIAL, CONSECUENTE O EJEMPLAR, INCLUIDOS, PERO NO LIMITADOS A, LOS DAÑOS POR PÉRDIDA DE BENEFICIOS, BUENA VOLUNTAD, USO, DATOS, COBERTURA U OTRAS PÉRDIDAS INTANGIBLES (INCLUSO AUNQUE mySmartWindow HAYA SIDO ADVERTIDA DE LA POSIBILIDAD DE DICHOS DAÑOS) CAUSADOS POR: (i) EL USO O LA INCAPACIDAD DE USAR EL SERVICIO, (ii) EL COSTE DEL SUMINISTRO DE BIENES Y SERVICIOS DE SUSTITUCIÓN OCASIONADOS POR CUALQUIER MERCANCÍA, DATO, INFORMACIÓN O SERVICIO ADQUIRIDO U OBTENIDO O MENSAJES RECIBIDOS O TRANSACCIONES EFECTUADAS DESDE O A TRAVÉS DEL SERVICIO, (iii) EL ACCESO NO AUTORIZADO A SUS TRANSMISIONES, CONTENIDOS O DATOS O LA PÉRDIDA, CORRUPCIÓN O ALTERACIÓN DE LOS MISMOS, (iv) AFIRMACIONES O CONDUCTAS DE TERCEROS EN O A TRAVÉS DEL USO DEL SERVICIO, (v) LAS ACCIONES U OMISIONES DE mySmartWindow EN CUANTO A LA FIABILIDAD DE SU INFORMACIÓN DE CUENTA Y CUALQUIER CAMBIO EN LA MISMA, (vi) SUS FALLOS AL PROTEGER LA CONFIDENCIALIDAD DE CUALQUIER CONTRASEÑA O DERECHO DE ACCESO A LA INFORMACIÓN DE SU CUENTA, (vii) LAS ACCIONES U OMISIONES DE TERCEROS QUE USEN O SE INTEGREN CON EL SERVICIO, (viii) CUALQUIER CONTENIDO PUBLICITARIO O EL USO O ADQUISICIÓN POR SU PARTE DE CUALQUIER PRODUCTO O SERVICIO PUBLICITADO, (ix) LA TERMINACIÓN DE SU CUENTA EN CONSONANCIA CON ESTOS TÉRMINOS Y CONDICIONES, O (x) CUALQUIER OTRO ASUNTO RELACIONADO CON EL SERVICIO."
        ]
      },
      {
        "t": "h",
        "text": "Exclusiones y limitaciones."
      },
      {
        "t": "p",
        "s": [
          "NADA EN ESTOS TÉRMINOS Y CONDICIONES ESTÁ CONCEBIDO PARA EXCLUIR O LIMITAR NINGUNA CONDICIÓN, GARANTÍA, DERECHO O RESPONSABILIDAD QUE NO PUEDA SER EXCLUIDA O LIMITADA LEGALMENTE. ALGUNAS JURISDICCIONES NO PERMITEN LA EXCLUSIÓN DE CIERTAS GARANTÍAS O CONDICIONES O LA LIMITACIÓN O EXCLUSIÓN DE RESPONSABILIDAD POR DAÑOS O PÉRDIDAS CAUSADOS POR NEGLIGENCIA, INCUMPLIMIENTO DE CONTRATO O DE TÉRMINOS IMPLÍCITOS, O DE DAÑOS INCIDENTALES O CONSECUENTES. EN CONSECUENCIA, SOLO SE APLICARÁN A USTED AQUELLAS LIMITACIONES QUE SEAN LEGALES EN SU JURISDICCIÓN (SI LAS HUBIERA), Y NUESTRA RESPONSABILIDAD QUEDA LIMITADA AL LÍMITE MÁXIMO PERMITIDO POR LA LEY."
        ]
      }
    ]
  },
  "en": {
    "pageTitle": "Terms and Conditions of Service",
    "title": "Terms and Conditions of Service",
    "version": "Version of this document: 1.0",
    "copyright": "© 2022 - IoT FENSTER, S.L.",
    "logoAlt": "Logo IoT Fenster",
    "blocks": [
      {
        "t": "h",
        "text": "Welcome to mySmartWindow, but before you start using our service, you must agree to our Terms and Conditions of Service:"
      },
      {
        "t": "p",
        "s": [
          "Thank you for your interest in mySmartWindow! We invite you to access and use the mySmartWindow Service to enjoy an always connected window or door with IoT potential. Please note that your registration and use of the mySmartWindow service and website is subject to your acceptance of these Terms and Conditions of Service. The mySmartWindow service is provided subject to certain limitations and terms of use that comply with law. We may need to change these Terms and Conditions from time to time, and we reserve the right to do so. Please check here for new information, the version of this agreement and its effective date."
        ]
      },
      {
        "t": "h",
        "text": "This document is a contract, so please read it carefully:"
      },
      {
        "t": "p",
        "s": [
          "This document describes in detail your rights relating to the Service, so please review these Terms and Conditions carefully. These Terms and Conditions of Service constitute a contract between us. If you do not agree to these Terms, you will not have the right to access or use our Service remotely, i.e. from outside your home. If you do not agree, your windows and doors will only work in local mode and will not be supported by the cloud and therefore some of the services will not be accessible. If you use our Service, your use will be deemed to be acceptance of the Terms and your consent to be a party to this binding agreement."
        ]
      },
      {
        "t": "h",
        "text": "By using this Service, you acknowledge, agree and accept all Terms, including the Privacy Policy:"
      },
      {
        "t": "p",
        "s": [
          "By using the Service, you acknowledge, agree and accept all terms of the Privacy Policy, including, without limitation, the use and treatment of your Account Information and Content in accordance with such Privacy Policy."
        ]
      },
      {
        "t": "h",
        "text": "Parties to this Agreement:"
      },
      {
        "t": "p",
        "s": [
          "You are one of the parties to this contract. The other party is IoT FENSTER S.L a private company based in Spain with its registered office in Fuente Álamo - Murcia, and referred to in these Terms of Service as \"mySmartWindow\", \"we\", and sometimes \"us\"."
        ]
      },
      {
        "t": "h",
        "text": "The Terms and Conditions of this Agreement may change:"
      },
      {
        "t": "p",
        "s": [
          "This Agreement will almost certainly be subject to change, due to changes in our Service and in the laws applicable to you and us. If we make any changes, we will make every effort to inform you in advance, although in certain situations, such as when changes are necessary to comply with applicable legal requirements, any changes to these Terms may need to take effect immediately. We will post changes here on our website and we may also choose to notify you of changes by sending an email to the email address you have provided to us. We will also try to explain the reasons for the change. If these Terms are updated, you are free to decide whether to accept these changes or to stop using our Service, your continued use of the Service after such update becomes effective will be deemed to represent your agreement to the new Terms and your consent to be bound by them. Except for changes made by us as described herein, no modification or amendment to these Terms will be effective unless set forth in a written agreement signed by you and us. For the sake of clarity, e-mails and other communications shall not constitute an effective written agreement for this purpose."
        ]
      },
      {
        "t": "h",
        "text": "Description of the mySmartWindow Service:"
      },
      {
        "t": "p",
        "s": [
          "The mySmartWindow CLOUD Service consists of a website and a Cloud server that supports communications from the outside of the house to the communications with your windows and doors. The mySmartWindow services and products offered by IoT FENSTER S.L, thanks to the mySmartWindow CLOUD service, offer other complementary services such as alert services. mySmartWindow allows its users to collect, store and share data from their devices, manage them and program them. In exchange for allowing you to use the Service, you agree to be bound by these Terms."
        ]
      },
      {
        "t": "h",
        "text": "IoT FENSTER S.L is not responsible for the Content and User Data provided by other users:"
      },
      {
        "t": "p",
        "s": [
          "IoT FENSTER S.L does not screen or filter User Data or Content, and does not review, check, confirm, approve or verify any User Content or User Data or the accuracy of such User Data or Content. Neither these Terms and Conditions, your use of the Service, mySmartWindow's provision of the Service, nor IoT FENSTER S.L's access/storage/use of User Data and Content shall imply or create any responsibility or liability on the part of mySmartWindow for any User Data provided by other users and included in the Service. Your access to and use of the Service or any Content is at your own risk."
        ]
      },
      {
        "t": "p",
        "s": [
          "The mySmartWindow CLOUD service temporarily stores data on temperature, humidity, Co2, opening, roller shutter or opening status. In this way we can provide you with operation history and efficiency graphs. If you do not accept the terms these services will not be offered and the server will not store any temporary data."
        ]
      },
      {
        "t": "p",
        "s": [
          "The historical data of your windows will be stored encrypted in the mySmartWindow CLOUD database and is at no time linked to your personal data in the same tables. All data will be identified by an alphanumeric user ID."
        ]
      },
      {
        "t": "p",
        "s": [
          "The mySmartWindow CLOUD Service is provided on an \"AS IS\" and \"AS AVAILABLE\" basis:"
        ]
      },
      {
        "t": "p",
        "s": [
          "You understand and agree that the Service is provided to you \"AS IS\" and \"AS AVAILABLE\". Until further notice, the mySmartWindow CLOUD Service is offered as a Beta software edition, which means there is NO SERVICE LEVEL AGREEMENT AND NO GUARANTEE OF SERVICE AVAILABILITY. IoT FENSTER S.L DISCLAIMS ANY WARRANTIES, EXPRESS OR IMPLIED, OF MERCHANTABILITY, SUITABILITY FOR ANY PARTICULAR PURPOSE OR NON-INFRINGEMENT. mySmartWindow shall not be responsible or liable for any loss of data, or other damages arising out of your access to or use of the Service. You also agree that IoT FENSTER S.L has no responsibility or liability for the deletion, or the failure to store or transmit, any content maintained by the Service. IoT FENSTER S.L makes no warranty that the Service will meet your requirements or be available on an uninterrupted, secure or error-free basis. No advice or information obtained from IoT FENSTER S.L, whether oral or written, shall create any warranty not expressly stated herein."
        ]
      },
      {
        "t": "h",
        "text": "Register as a mySmartWindow user by creating an account:"
      },
      {
        "t": "p",
        "s": [
          "First you have to create a mySmartWindow account. You create an account by providing us with an acceptable username and email address, and by creating a password. We refer to this as your \"Account Information\". We suggest that you use a distinct and non-obvious username and password combination, ideally different from those you use for other services. You are responsible for ensuring the accuracy, integrity and confidentiality of your Account Information, and you will be responsible for all activities that occur under your Account, including the activities of others to whom you have provided your Account Information. We will not be liable for any loss or damage caused by your failure to provide us with accurate information or to keep your Account Information secure. If you discover any unauthorised use of your Account Information or suspect that someone may be able to access your private Content, you should immediately change your password and notify our Customer Service team."
        ]
      },
      {
        "t": "p",
        "s": [
          "In addition, mySmartWindow is not responsible for the availability of Internet and other telecommunications services necessary to access the Service."
        ]
      },
      {
        "t": "h",
        "text": "Your rights as a User:"
      },
      {
        "t": "p",
        "s": [
          "Once you have created an account and accepted these Terms, we provide you with a limited, non-exclusive license to use the Service subject to these Terms, to the extent you are not denied receiving the Service under any law applicable to you, until you voluntarily close your account or until we close your account pursuant to these Terms. In addition, we grant you a personal, worldwide, royalty-free, non-transferable, non-exclusive, non-transferable licence. To use the mySmartWindow CLOUD APP and Service, until your rights under such licence and/or these Terms expire. You obtain no other right or interest in mySmartWindow or the Service."
        ]
      },
      {
        "t": "h",
        "text": "Your use of mySmartWindow and its Content:"
      },
      {
        "t": "p",
        "s": [
          "Your use of the Service must be in accordance with these Terms. With respect to your use of mySmartWindow, you agree to be responsible for your own conduct and all conduct on your Account. This means that all Content - such as data from your devices, text, files of any kind (images, videos and anything else you can think of), regardless of its form or technical structure (collectively, \"Content\") - created, transmitted, stored or displayed in your Account, is your sole responsibility as the person who created your user account and is the only person with knowledge of it. This applies even if the Content is kept private, shared or transmitted using the Service or any third party application or service integrated with mySmartWindow."
        ]
      },
      {
        "t": "h",
        "text": "Data Protection and User Content:"
      },
      {
        "t": "ul",
        "items": [
          [
            "Your Data is Yours: You retain your rights and any other rights to your temporary graphics collected by the devices, prior to submitting or posting or displaying it on or through the Service or other means. But you do have to grant mySmartWindow a limited license, as described below, so that we can make your data accessible and usable on the Service. Other than this limited license and other rights you grant in these Terms, mySmartWindow acknowledges and agrees that we obtain no other right, title or interest from you in your Content under these Terms. To enable mySmartWindow to operate the Service, we must obtain from you certain licenses and other rights in the Content you submit to us so that the processing, maintenance, storage, technical reproduction, backup and distribution and related management of your Content does not infringe applicable copyright and other laws. This means that by using the Service, you grant mySmartWindow a licence to display, perform and distribute any of your Content, and to modify (for technical reasons, e.g. to ensure that the Content can be viewed on both smartphones and computers) and reproduce such Content to enable mySmartWindow to operate the Service. You also agree that mySmartWindow has the right to choose not to accept, post, perform, store, display, publish or transmit any Content on an anonymous basis without providing any user data. You agree that these copyrights and licenses are royalty-free, irrevocable and worldwide (for so long as your Content is hosted with us) and include the right of mySmartWindow to make such Content, and to transfer such rights to them, available to third parties with whom mySmartWindow has contractual relationships in connection with the provision of the mySmartWindow Service solely for the purpose of providing such services, and otherwise to permit access to or display of your Content to third parties if mySmartWindow determines that such access is necessary to comply with its legal obligations. You also agree with us that, by agreeing to the Terms, your non-personal information may be transferred by mySmartWindow through its APIs to other APP developers so that through these third party APPs you may access your mySmartWindow windows and doors services. The rights described in these Terms, you are not infringing the rights of any person or third party. Finally, you understand and agree that mySmartWindow, in carrying out the technical steps to provide the Service to our users, may make your non-personal data necessary to conform and adapt the Content to the technical requirements of connecting networks, devices, services or media."
          ],
          [
            "Your Data and Content are protected: The security of your data is of utmost importance to us, and we make every effort to keep your data safe and secure. However, we assume no responsibility for any loss or unauthorised distribution of your Content. Your privacy in your Content is also our primary concern, and we hope that we will never have to examine anyone's Content. However, there are certain circumstances in which we may need to screen your Content in whole or in part, as explained in our Privacy Policy. Except as described here and in our Privacy Policy, unless you choose to allow others to view or access the Content you submit to the Service, no one else should view your Content without your consent. Of course, if you choose to publish or share any of your Content by creating a stream, or by creating a web service to publish the Content, then you are giving each authorized user permission to access, use, display, perform, distribute and modify your Content (subject to any commitments or agreements you may have made with such users without mySmartWindow's involvement). In addition, mySmartWindow allows you to use a variety of third party services and applications that interact with the Service and your Content, and you should review the access rights you grant to such services or applications, as you may allow them to access your Content through your agreements with those third parties."
          ],
          [
            "Your Data and Content are portable: mySmartWindow is committed to making your data portable. That means that we will incorporate tools into our Service and Software to enable you to share or export your Data and Content to files or make it accessible via web services or APIs. All such tools will be available for as long as your account is open, subject to compliance with our Privacy Policy. If you have any problems exporting Data or Content, you may contact our Customer Service team who, using their best efforts, will attempt to resolve your request if it complies with our Privacy Policy and legal actions."
          ]
        ]
      },
      {
        "t": "h",
        "text": "mySmartWindow's right to modify the Service:"
      },
      {
        "t": "p",
        "s": [
          "We retain the right to, in our sole discretion, implement new elements as part of and/or ancillary to the Service and any mySmartWindow APP Software, including changes that may affect the Service's previous mode of operation. We hope that such modifications will improve the Service overall, but you may not agree with us. We also reserve the right to set certain limits on the nature or size of the storage space available to you, the number of transmissions and emails, the execution of your program code, your Content and other data, and impose other limitations at any time, with or without notice. For example, if you use the free mySmartWindow service, you will not enjoy all of the benefits offered to users of the premium mySmartWindow service. You also acknowledge that certain actions by mySmartWindow may make it difficult or impossible for you to access your Content or use the Service at certain times and/or in the same manner, for limited periods or permanently, and you agree that mySmartWindow shall have no liability or responsibility to you or to any third party for any modification, suspension or discontinuance of any part of the Service."
        ]
      },
      {
        "t": "h",
        "text": "Storage of your Data and Content:"
      },
      {
        "t": "p",
        "s": [
          "The mySmartWindow CLOUD Service is available worldwide, but our data processing operations are conducted in Spain. If you use the Service, you acknowledge that you may be sending electronic communications (including your personal account information and Content) over computer networks owned by mySmartWindow and by third parties based in the United Kingdom and other locations in Europe and elsewhere. Accordingly, your use of the Service will likely result in the international transmission of data, and your use of the Service constitutes your consent to allow such transmissions. mySmartWindow may change the location of its processing operations without notice to you or your consent."
        ]
      },
      {
        "t": "h",
        "text": "In the event that your account is closed:"
      },
      {
        "t": "p",
        "s": [
          "You may close your account with our Service at any time, for any reason (or no reason), without even notifying us. However, if you wish to deactivate your account, you must take certain specific steps, which are described in our documentation. mySmartWindow may suspend access to your account, or close your account, with or without notice to you in accordance with these Terms. Reasons for mySmartWindow to suspend or terminate your account may include, without limitation: (i) breach or violation of these Terms or any Separate Agreement, (ii) an extended period of inactivity (determined in mySmartWindow's sole discretion), (iii) your failure to pay any fees or other amounts owed to mySmartWindow or any third party related to your use of the Service (or any part thereof), or (vi) technical or security issues or conflicts. In most cases, if we decide to close your account, we will provide you with at least 30 days' notice at the email address you have provided to us, so that you have the opportunity to retrieve any Content stored on the mySmartWindow servers (unless we determine that we are legally prohibited from allowing you to do so). After the expiration of this notice period, you will no longer be able to retrieve Content contained in that account or otherwise use the Service through that account."
        ]
      },
      {
        "t": "h",
        "text": "Disclaimer, Copyright and Trademark Information:"
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow and the mySmartWindow logo are registered trademarks."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow has made every effort to ensure the accuracy and reliability of the information provided on the website or on the mySmartWindow APP. However, the information is provided without warranty. mySmartWindow does not accept any responsibility or liability for the accuracy, content, completeness or reliability of the information."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow stores information and transaction history on its server in order to be able to display this information to you and to be able to create efficiency statistics for your household. mySmartWindow reserves the right to pass on this information anonymously to third party companies in order to be able to create household statistics, predictive models, etc."
        ]
      },
      {
        "t": "p",
        "s": [
          "If you do not accept the conditions, no data will be saved on the server and you will only be able to access in local mode without being able to use these services."
        ]
      },
      {
        "t": "h",
        "text": "Links to Third Parties:"
      },
      {
        "t": "p",
        "s": [
          "We may include or recommend third party resources, materials and developers and/or links to third party websites and applications as part of or in connection with the Service. We have no control over such sites or developers and, accordingly, you acknowledge and agree that: (i) we are not responsible for the availability of such sites or applications, (ii) we are not responsible or liable for any content or other materials or functionality available on such sites or applications, and (iii) we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, materials or applications."
        ]
      },
      {
        "t": "p",
        "s": [
          "Indemnity. You agree to keep safe and hold harmless mySmartWindow, its subsidiaries, affiliates, officers, agents, employees, advertisers and partners from and against all claims, liabilities, damages (direct and consequential), losses and expenses (including legal and other professional fees), arising out of or in any way connected with claims by third parties relating to your use of the Service, any violation of these Terms of Service or any other action related to your use of the Service (including all actions taken in your account). In the event of such a claim, we will give notice of the claim, suit or action to the contact information we have for that account, provided that any failure to give you such notice will not eliminate or reduce your indemnification obligation hereunder."
        ]
      },
      {
        "t": "h",
        "text": "Blog and forum:"
      },
      {
        "t": "p",
        "s": [
          "The blog and forum service allows you to participate in blogs and forums on mySmartWindow topics."
        ]
      },
      {
        "t": "p",
        "s": [
          "You may also post a message on the mySmartWindow forum. You acknowledge and agree that if you submit any Content to the forum, you are solely responsible for such Content. mySmartWindow shall not be responsible or liable in any way for any such Content submitted."
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "You further agree that:"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "You will not submit any Content that is harassing, offensive, threatening, harmful, libelous or defamatory, encourages conduct that could constitute a criminal offense or give rise to civil liability, or is otherwise illegal."
          ],
          [
            "You will not submit any Content that is protected by intellectual property laws or privacy rights unless you own the rights thereto or have received all necessary consents. You shall be solely responsible for any infringement of copyright, trademark or other proprietary rights."
          ],
          [
            "You will not submit any Content that contains a virus or other harmful component."
          ],
          [
            "You will not engage in any activity that interferes with or disrupts other users' use of the Website."
          ],
          [
            "You will not submit any Content that encourages illegal activities, or that provides advice or instructions for such illegal activities."
          ],
          [
            "You will not make any misrepresentation, including impersonating any person or entity and pretending to be associated with any person or entity."
          ],
          [
            "You will not use the mySmartWindow forum for commercial purposes, such as advertising any product or service, reselling, or publishing the information transmitted or posted without written consent."
          ]
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow does not preview, monitor or edit the Content submitted to the Forums. However, mySmartWindow reserves the right to edit, limit or delete any Content in its sole discretion. Nevertheless, you are solely responsible for any Content you submit or post."
        ]
      },
      {
        "t": "p",
        "s": [
          "By submitting Content, by any means, to the mySmartWindow forum or blog, you grant to mySmartWindow a perpetual, royalty-free, irrevocable, non-exclusive, worldwide right and license to use, disclose, display, perform, reproduce, modify, adapt, publish, translate and distribute such Content or to incorporate such Content in any form, media, or technology now known or later developed. Furthermore, mySmartWindow shall be free to use any ideas, concepts, know-how or techniques contained in such information for any purpose whatsoever, including but not limited to researching, developing, manufacturing and marketing products and other items incorporating such ideas. If you are not the owner of the Submitted Content, you warrant that you have received all necessary consents from the owner of such rights. You will indemnify mySmartWindow if any such Submitted Content infringes any such rights."
        ]
      },
      {
        "t": "p",
        "s": [
          "By participating in any blog or forum, you may come into contact with Content that is inaccurate, incomplete or otherwise inappropriate. You should exercise extreme caution with respect to any Content posted or transmitted on a mySmartWindow forum or blog. mySmartWindow urges you not to take any action based on any such Content. mySmartWindow shall not be responsible for the Content or the accuracy of any such information, and shall not be liable for any actions or decisions taken in reliance on such information."
        ]
      },
      {
        "t": "p",
        "s": [
          "In consideration of mySmartWindow's efforts to improve and enhance the Platform and its associated products and services and to respond to user suggestions, you agree to transfer such ideas, concepts, know-how or techniques to mySmartWindow without any compensation in return."
        ]
      },
      {
        "t": "p",
        "s": [
          "You also agree to execute any and all documents that mySmartWindow may reasonably request in connection with mySmartWindow's confirmation of ownership and your unrestricted right to use such ideas, concepts, know-how and techniques"
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "By submitting comments to mySmartWindow by any means, whether through the blog, forum, customer suggestion box or otherwise, you are solely responsible for the content of any comments you make. You agree that any comments you submit to mySmartWindow:"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "Violate any third party rights, including but not limited to copyright, trademark, confidentiality or other personal or proprietary rights."
          ],
          [
            "Be libelous or contain libelous or otherwise unlawful, insulting or obscene material, or constitute a misappropriation of any third party's trade secrets."
          ],
          [
            "disparage the products or services of any third party, or contain any personal information (other than your email address and username)."
          ]
        ]
      },
      {
        "t": "h",
        "text": "High Risk Activities:"
      },
      {
        "t": "p",
        "s": [
          "The mySmartWindow Services are not fail-safe and are not designed, manufactured or intended for use as or with online monitoring equipment in hazardous environments requiring fail-safe operation."
        ]
      },
      {
        "t": "h",
        "text": "Force Majeure:"
      },
      {
        "t": "p",
        "s": [
          "Neither party shall be liable for any failure or delay in performance, or for data lost in accordance with these Terms and Conditions (except for delay in the payment of money, which is due and payable hereunder), to the extent that such failure or delay is directly caused by: (i) failures of the Service, (ii) natural weather phenomena, or (iii) any other cause beyond the reasonable control of that party and occurring through no fault or negligence of that party, including, without limitation, failures of suppliers, subcontractors and carriers, or of the party in performing its obligations substantially in accordance with these Terms of Use, provided that in all such cases, as a condition of the claim of non-liability, the party experiencing the hardship shall give prompt written notice to the other party, with full details concerning the occurrence of the cause upon which it relies."
        ]
      },
      {
        "t": "h",
        "text": "The Service is available \"AS IT IS\":"
      },
      {
        "t": "p",
        "s": [
          "The Service is available \"AS IT IS\". YOU EXPRESSLY UNDERSTAND AND AGREE THAT: (a) YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, mySmartWindow EXPRESSLY DISCLAIMS ALL WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. (b) mySmartWindow DOES NOT WARRANT THAT (i) THE SERVICE WILL MEET ALL OF ITS REQUIREMENTS, (ii) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE, OR (iii) ALL ERRORS IN THE SERVICE WILL BE CORRECTED. (c) ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICE WILL BE DONE AT YOUR SOLE RISK AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEMS OR OTHER DEVICES OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF SUCH MATERIAL. (d) NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM OR THROUGH OR FROM mySmartWindow OR THE SERVICE SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS OF SERVICE."
        ]
      },
      {
        "t": "h",
        "text": "Limitation of Liability:"
      },
      {
        "t": "p",
        "s": [
          "YOU EXPRESSLY UNDERSTAND AND AGREE THAT mySmartWindow, ITS SUBSIDIARIES, AFFILIATES AND LICENSORS, AND OUR AND THEIR RESPECTIVE EXECUTIVES, EMPLOYEES, AGENTS AND HEIRS SHALL NOT BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, COVERAGE OR OTHER INTANGIBLE LOSSES (EVEN IF mySmartWindow HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES) CAUSED BY: (i) THE USE OF OR INABILITY TO USE THE SERVICE, (ii) THE COST OF THE SUPPLY OF SUBSTITUTE GOODS AND SERVICES CAUSED BY ANY GOODS, DATA, INFORMATION OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO FROM OR THROUGH THE SERVICE, (iii) UNAUTHORISED ACCESS TO YOUR TRANSMISSIONS, CONTENT OR DATA OR THE LOSS, CORRUPTION OR ALTERATION THEREOF, (iv) STATEMENTS OR CONDUCT OF THIRD PARTIES ON OR THROUGH USE OF THE SERVICE, (v) mySmartWindow'S ACTIONS OR OMISSIONS WITH REGARD TO THE RELIABILITY OF YOUR ACCOUNT INFORMATION AND ANY CHANGES THEREIN, (vi) ITS FAILURE TO PROTECT THE CONFIDENTIALITY OF ANY PASSWORD OR ACCESS RIGHTS TO YOUR ACCOUNT INFORMATION, (vii) THE ACTIONS OR OMISSIONS OF THIRD PARTIES USING OR INTEGRATING WITH THE SERVICE, (viii) ANY ADVERTISED CONTENT OR YOUR USE OR PURCHASE OF ANY ADVERTISED PRODUCT OR SERVICE, (ix) TERMINATION OF YOUR ACCOUNT CONSISTENT WITH THESE TERMS AND CONDITIONS, OR (x) ANY OTHER MATTER RELATING TO THE SERVICE."
        ]
      },
      {
        "t": "h",
        "text": "Exclusions and Limitations."
      },
      {
        "t": "p",
        "s": [
          "NOTHING IN THESE TERMS AND CONDITIONS IS INTENDED TO EXCLUDE OR LIMIT ANY CONDITION, WARRANTY, RIGHT OR LIABILITY WHICH CANNOT BE LAWFULLY EXCLUDED OR LIMITED. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR CONDITIONS OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR DAMAGES OR LOSS CAUSED BY NEGLIGENCE, BREACH OF CONTRACT OR IMPLIED TERMS, OR FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, ONLY THOSE LIMITATIONS, IF ANY, THAT ARE LAWFUL IN YOUR JURISDICTION APPLY TO YOU, AND OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW."
        ]
      }
    ]
  },
  "it": {
    "pageTitle": "Termini e Condizioni del Servizio",
    "title": "Termini e Condizioni del Servizio",
    "version": "Versione di questo documento: 1.0",
    "copyright": "© 2022 - IoT FENSTER, S.L.",
    "logoAlt": "Logo IoT Fenster",
    "blocks": [
      {
        "t": "h",
        "text": "Benvenuto in mySmartWindow, ma prima di iniziare a utilizzare il nostro servizio, devi accettare i nostri Termini e Condizioni del Servizio:"
      },
      {
        "t": "p",
        "s": [
          "Grazie per il tuo interesse in mySmartWindow! Ti invitiamo ad accedere e utilizzare il servizio mySmartWindow per godere di una finestra o porta sempre connessa con potenzialità IoT. Tieni presente che la registrazione e l'uso del servizio e del sito web mySmartWindow sono soggetti alla tua accettazione di questi Termini e Condizioni del Servizio. Il servizio mySmartWindow viene fornito con determinate limitazioni e termini d'uso conformi alla legge. Potremmo dover modificare questi Termini e Condizioni di tanto in tanto e ci riserviamo il diritto di farlo. Ti preghiamo di controllare qui per nuove informazioni, la versione di questo accordo e la sua data di validità."
        ]
      },
      {
        "t": "h",
        "text": "Questo documento è un contratto, quindi leggilo attentamente:"
      },
      {
        "t": "p",
        "s": [
          "Questo documento descrive in dettaglio i tuoi diritti relativi al Servizio, quindi esamina attentamente questi Termini e Condizioni. Questi Termini e Condizioni del Servizio costituiscono un contratto tra noi. Se non accetti questi Termini, non avrai diritto ad accedere o utilizzare il nostro Servizio da remoto, cioè da fuori casa. Se non accetti, le tue finestre e porte funzioneranno solo in modalità locale e non saranno supportate dal cloud, pertanto alcuni servizi non saranno accessibili. Se utilizzi il nostro Servizio, l'uso sarà considerato un'accettazione dei Termini e il tuo consenso a essere parte di questo accordo vincolante."
        ]
      },
      {
        "t": "h",
        "text": "Utilizzando questo Servizio, riconosci, accetti e approvi tutti i Termini, inclusa la Privacy Policy:"
      },
      {
        "t": "p",
        "s": [
          "Utilizzando il Servizio, riconosci, accetti e approvi tutti i termini della Privacy Policy, inclusi, senza limitazioni, l'uso e il trattamento delle informazioni del tuo Account e dei Contenuti in conformità con tale Privacy Policy."
        ]
      },
      {
        "t": "h",
        "text": "Parti di questo Accordo:"
      },
      {
        "t": "p",
        "s": [
          "Tu sei una delle parti di questo contratto. L'altra parte è IoT FENSTER S.L, una società privata con sede in Spagna, con sede legale a Fuente Álamo - Murcia, indicata in questi Termini di Servizio come \"mySmartWindow\", \"noi\" e talvolta \"ci\"."
        ]
      },
      {
        "t": "h",
        "text": "I Termini e Condizioni di questo Accordo possono cambiare:"
      },
      {
        "t": "p",
        "s": [
          "Questo Accordo sarà quasi certamente soggetto a modifiche, a causa di cambiamenti nel nostro Servizio e nelle leggi applicabili a te e a noi. Se apportiamo modifiche, faremo del nostro meglio per informarti in anticipo, sebbene in alcune situazioni, come quando le modifiche sono necessarie per rispettare i requisiti legali applicabili, le modifiche ai Termini potrebbero entrare in vigore immediatamente. Pubblicheremo i cambiamenti qui sul nostro sito web e potremmo anche scegliere di informarti inviando un'email all'indirizzo che ci hai fornito. Cercheremo anche di spiegare le ragioni del cambiamento. Se questi Termini vengono aggiornati, sei libero di decidere se accettare tali modifiche o smettere di utilizzare il nostro Servizio; il tuo uso continuato del Servizio dopo l'aggiornamento sarà considerato come accettazione dei nuovi Termini e consenso a essere vincolato da essi. Salvo modifiche apportate da noi come descritto in questo documento, nessuna modifica o emendamento a questi Termini sarà efficace se non stabilito in un accordo scritto firmato da te e da noi. Per chiarezza, e-mail e altre comunicazioni non costituiranno un accordo scritto efficace a questo scopo."
        ]
      },
      {
        "t": "h",
        "text": "Descrizione del Servizio mySmartWindow:"
      },
      {
        "t": "p",
        "s": [
          "Il Servizio CLOUD mySmartWindow consiste in un sito web e un server Cloud che supporta le comunicazioni dall'esterno della casa alle comunicazioni con le tue finestre e porte. I servizi e prodotti mySmartWindow offerti da IoT FENSTER S.L, grazie al servizio CLOUD mySmartWindow, offrono altri servizi complementari come i servizi di avviso. mySmartWindow consente ai suoi utenti di raccogliere, archiviare e condividere dati dai propri dispositivi, gestirli e programmarli. In cambio dell'uso del Servizio, accetti di essere vincolato da questi Termini."
        ]
      },
      {
        "t": "h",
        "text": "IoT FENSTER S.L non è responsabile dei Contenuti e dei Dati Utente forniti da altri utenti:"
      },
      {
        "t": "p",
        "s": [
          "IoT FENSTER S.L non seleziona o filtra i Dati Utente o i Contenuti, né esamina, verifica, approva o controlla alcun Contenuto Utente o Dati Utente né la loro accuratezza. Né questi Termini e Condizioni, né l'uso del Servizio, né la fornitura del Servizio da parte di mySmartWindow, né l'accesso/archiviazione/uso dei Dati Utente e dei Contenuti da parte di IoT FENSTER S.L implicano o creano alcuna responsabilità da parte di mySmartWindow per i Dati Utente forniti da altri utenti inclusi nel Servizio. L'accesso e l'uso del Servizio o di qualsiasi Contenuto sono a tuo rischio."
        ]
      },
      {
        "t": "p",
        "s": [
          "Il servizio CLOUD mySmartWindow memorizza temporaneamente dati su temperatura, umidità, Co2, stato di apertura, tapparelle o chiusure. In questo modo possiamo fornirti la cronologia delle operazioni e i grafici di efficienza. Se non accetti i termini, questi servizi non saranno offerti e il server non memorizzerà alcun dato temporaneo."
        ]
      },
      {
        "t": "p",
        "s": [
          "I dati storici delle tue finestre saranno archiviati criptati nel database CLOUD mySmartWindow e non saranno mai collegati ai tuoi dati personali nelle stesse tabelle. Tutti i dati saranno identificati da un ID utente alfanumerico."
        ]
      },
      {
        "t": "p",
        "s": [
          "Il Servizio CLOUD mySmartWindow è fornito \"COSÌ COM'È\" e \"COME DISPONIBILE\":"
        ]
      },
      {
        "t": "p",
        "s": [
          "Comprendi e accetti che il Servizio ti è fornito \"COSÌ COM'È\" e \"COME DISPONIBILE\". Fino a nuovo avviso, il Servizio CLOUD mySmartWindow è offerto come versione Beta del software, il che significa che NON C'È UN ACCORDO SUL LIVELLO DEL SERVIZIO E NESSUNA GARANZIA DI DISPONIBILITÀ DEL SERVIZIO. IoT FENSTER S.L NON FORNISCE ALCUNA GARANZIA, ESPRESSA O IMPLICITA, DI COMMERCIABILITÀ, IDONEITÀ PER UN PARTICOLARE SCOPO O NON VIOLAZIONE. mySmartWindow non sarà responsabile per la perdita di dati o altri danni derivanti dal tuo accesso o uso del Servizio. Accetti inoltre che IoT FENSTER S.L non ha responsabilità per la cancellazione o la mancata memorizzazione o trasmissione di qualsiasi contenuto mantenuto dal Servizio. IoT FENSTER S.L non garantisce che il Servizio soddisferà le tue esigenze o sarà disponibile in modo ininterrotto, sicuro o privo di errori. Nessun consiglio o informazione ottenuti da IoT FENSTER S.L, sia oralmente che per iscritto, costituiranno una garanzia non espressamente dichiarata in questo documento."
        ]
      },
      {
        "t": "h",
        "text": "Registrati come utente mySmartWindow creando un account:"
      },
      {
        "t": "p",
        "s": [
          "Per prima cosa devi creare un account mySmartWindow. Crei un account fornendoci un nome utente e un indirizzo email accettabili, e creando una password. Lo definiamo come le tue \"Informazioni sull'Account\". Ti suggeriamo di utilizzare una combinazione di nome utente e password distinta e non ovvia, idealmente diversa da quelle che usi per altri servizi. Sei responsabile di garantire l'accuratezza, l'integrità e la riservatezza delle tue Informazioni sull'Account e sarai responsabile di tutte le attività che si verificano nel tuo Account, comprese le attività di altri a cui hai fornito le tue Informazioni sull'Account. Non saremo responsabili per eventuali perdite o danni causati dalla tua mancata"
        ]
      },
      {
        "t": "h",
        "text": "I tuoi diritti come Utente:"
      },
      {
        "t": "p",
        "s": [
          "Una volta che hai creato un account e accettato questi Termini, ti forniamo una licenza limitata, non esclusiva, per utilizzare il Servizio soggetto a questi Termini, nella misura in cui non ti sia negata la ricezione del Servizio ai sensi di qualsiasi legge applicabile, fino a quando chiuderai volontariamente il tuo account o fino a quando chiuderemo il tuo account ai sensi di questi Termini. Inoltre, ti concediamo una licenza personale, mondiale, gratuita, non trasferibile, non esclusiva e non trasferibile. Per utilizzare l'APP CLOUD di mySmartWindow e il Servizio, fino a quando i tuoi diritti ai sensi di tale licenza e/o questi Termini non scadono. Non ottieni alcun altro diritto o interesse in mySmartWindow o nel Servizio."
        ]
      },
      {
        "t": "h",
        "text": "Il tuo utilizzo di mySmartWindow e dei suoi Contenuti:"
      },
      {
        "t": "p",
        "s": [
          "Il tuo utilizzo del Servizio deve essere conforme a questi Termini. Per quanto riguarda il tuo utilizzo di mySmartWindow, accetti di essere responsabile della tua condotta e di tutta la condotta nel tuo Account. Ciò significa che tutti i Contenuti - come dati dai tuoi dispositivi, testi, file di qualsiasi tipo (immagini, video e qualsiasi altra cosa tu possa pensare), indipendentemente dalla loro forma o struttura tecnica (collettivamente, \"Contenuti\") - creati, trasmessi, archiviati o visualizzati nel tuo Account, sono tua esclusiva responsabilità come persona che ha creato il tuo account utente e sei l'unica persona a conoscenza di essi. Questo vale anche se i Contenuti sono mantenuti privati, condivisi o trasmessi utilizzando il Servizio o qualsiasi applicazione o servizio di terze parti integrato con mySmartWindow."
        ]
      },
      {
        "t": "h",
        "text": "Protezione dei Dati e Contenuti dell'Utente:"
      },
      {
        "t": "ul",
        "items": [
          [
            "I tuoi dati sono tuoi: Conservi i tuoi diritti e qualsiasi altro diritto sui tuoi grafici temporanei raccolti dai dispositivi, prima di inviarli, pubblicarli o visualizzarli attraverso il Servizio o altri mezzi. Tuttavia, devi concedere a mySmartWindow una licenza limitata, come descritto di seguito, affinché possiamo rendere i tuoi dati accessibili e utilizzabili sul Servizio. Oltre a questa licenza limitata e ad altri diritti concessi in questi Termini, mySmartWindow riconosce e accetta di non ottenere da te alcun altro diritto, titolo o interesse sui tuoi Contenuti ai sensi di questi Termini. Per consentire a mySmartWindow di operare il Servizio, dobbiamo ottenere da te alcune licenze e altri diritti nei Contenuti che ci invii affinché l'elaborazione, la manutenzione, la conservazione, la riproduzione tecnica, il backup e la distribuzione e la gestione correlata dei tuoi Contenuti non violino il copyright applicabile e altre leggi. Ciò significa che, utilizzando il Servizio, concedi a mySmartWindow una licenza per visualizzare, eseguire e distribuire qualsiasi tuo Contenuto e per modificarlo (per ragioni tecniche, ad esempio per garantire che il Contenuto possa essere visualizzato sia su smartphone che su computer) e riprodurlo per consentire a mySmartWindow di operare il Servizio. Accetti inoltre che mySmartWindow abbia il diritto di scegliere di non accettare, pubblicare, eseguire, archiviare, visualizzare, pubblicare o trasmettere qualsiasi Contenuto su base anonima senza fornire dati utente. Accetti che questi copyright e licenze siano esenti da royalty, irrevocabili e validi in tutto il mondo (per tutto il tempo in cui i tuoi Contenuti sono ospitati da noi) e includano il diritto di mySmartWindow di rendere tali Contenuti, e trasferire tali diritti, disponibili a terzi con cui mySmartWindow ha relazioni contrattuali in relazione alla fornitura del Servizio mySmartWindow esclusivamente per lo scopo di fornire tali servizi, e altrimenti per consentire l'accesso o la visualizzazione dei tuoi Contenuti a terzi se mySmartWindow determina che tale accesso è necessario per conformarsi ai suoi obblighi legali. Accetti inoltre con noi che, accettando i Termini, le tue informazioni non personali possano essere trasferite da mySmartWindow tramite le sue API ad altri sviluppatori di APP affinché attraverso queste APP di terze parti tu possa accedere ai tuoi servizi per finestre e porte mySmartWindow. I diritti descritti in questi Termini non violano i diritti di alcuna persona o terza parte. Infine, comprendi e accetti che mySmartWindow, nello svolgere i passaggi tecnici per fornire il Servizio ai nostri utenti, possa rendere i tuoi dati non personali necessari per conformare e adattare i Contenuti ai requisiti tecnici delle reti, dispositivi, servizi o media di connessione."
          ],
          [
            "I tuoi dati e contenuti sono protetti: La sicurezza dei tuoi dati è della massima importanza per noi e facciamo tutto il possibile per mantenerli sicuri e protetti. Tuttavia, non ci assumiamo alcuna responsabilità per eventuali perdite o distribuzioni non autorizzate dei tuoi Contenuti. La tua privacy nei tuoi Contenuti è anche la nostra principale preoccupazione e speriamo di non dover mai esaminare i Contenuti di nessuno. Tuttavia, ci sono alcune circostanze in cui potremmo dover esaminare i tuoi Contenuti in tutto o in parte, come spiegato nella nostra Informativa sulla Privacy. Salvo quanto descritto qui e nella nostra Informativa sulla Privacy, a meno che tu non scelga di consentire ad altri di visualizzare o accedere ai Contenuti che invii al Servizio, nessun altro dovrebbe visualizzare i tuoi Contenuti senza il tuo consenso. Naturalmente, se scegli di pubblicare o condividere uno qualsiasi dei tuoi Contenuti creando un flusso, o creando un servizio web per pubblicare i Contenuti, stai dando a ciascun utente autorizzato il permesso di accedere, utilizzare, visualizzare, eseguire, distribuire e modificare i tuoi Contenuti (soggetto a eventuali impegni o accordi che potresti aver preso con tali utenti senza il coinvolgimento di mySmartWindow). Inoltre, mySmartWindow ti consente di utilizzare una varietà di servizi e applicazioni di terze parti che interagiscono con il Servizio e i tuoi Contenuti, e dovresti rivedere i diritti di accesso che concedi a tali servizi o applicazioni, poiché potresti consentire loro di accedere ai tuoi Contenuti attraverso i tuoi accordi con tali terze parti."
          ],
          [
            "I tuoi dati e contenuti sono portabili: mySmartWindow si impegna a rendere i tuoi dati portabili. Ciò significa che incorporeremo strumenti nel nostro Servizio e Software per consentirti di condividere o esportare i tuoi Dati e Contenuti in file o renderli accessibili tramite servizi web o API. Tutti questi strumenti saranno disponibili per tutto il tempo in cui il tuo account è aperto, nel rispetto della nostra Informativa sulla Privacy. Se hai problemi nell'esportare Dati o Contenuti, puoi contattare il nostro team di Assistenza Clienti che, usando i loro migliori sforzi, tenterà di risolvere la tua richiesta se conforme alla nostra Informativa sulla Privacy e alle azioni legali."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Il diritto di mySmartWindow di modificare il Servizio:"
      },
      {
        "t": "p",
        "s": [
          "Ci riserviamo il diritto, a nostra esclusiva discrezione, di implementare nuovi elementi come parte e/o accessori al Servizio e a qualsiasi Software APP di mySmartWindow, inclusi cambiamenti che potrebbero influenzare il precedente modo di funzionamento del Servizio. Speriamo che tali modifiche migliorino complessivamente il Servizio, ma potresti non essere d'accordo con noi. Ci riserviamo inoltre il diritto di impostare determinati limiti sulla natura o sulla dimensione dello spazio di archiviazione a tua disposizione, sul numero di trasmissioni ed email, sull'esecuzione del tuo codice programma, sui tuoi Contenuti e altri dati, e di imporre altre limitazioni in qualsiasi momento, con o senza preavviso. Ad esempio, se utilizzi il servizio gratuito di mySmartWindow, non usufruirai di tutti i vantaggi offerti agli utenti del servizio premium di mySmartWindow. Riconosci inoltre che alcune azioni di mySmartWindow potrebbero rendere difficile o impossibile accedere ai tuoi Contenuti o utilizzare il Servizio in determinati momenti e/o nello stesso modo, per periodi limitati o permanentemente, e accetti che mySmartWindow non avrà alcuna responsabilità nei tuoi confronti o verso terzi per qualsiasi modifica, sospensione o interruzione di qualsiasi parte del Servizio."
        ]
      },
      {
        "t": "h",
        "text": "Archiviazione dei tuoi Dati e Contenuti:"
      },
      {
        "t": "p",
        "s": [
          "Il Servizio CLOUD di mySmartWindow è disponibile a livello mondiale, ma le nostre operazioni di elaborazione dati si svolgono in Spagna. Se utilizzi il Servizio, riconosci che potresti inviare comunicazioni elettroniche (inclusi i dati del tuo account personale e i Contenuti) tramite reti informatiche di proprietà di mySmartWindow e di terze parti con sede nel Regno Unito e in altre località in Europa e altrove. Di conseguenza, l'utilizzo del Servizio comporterà probabilmente la trasmissione internazionale di dati e il tuo utilizzo del Servizio costituisce il tuo consenso a tali trasmissioni. mySmartWindow può cambiare la posizione delle sue operazioni di elaborazione senza preavviso o il tuo consenso."
        ]
      },
      {
        "t": "h",
        "text": "Nel caso in cui il tuo account venga chiuso:"
      },
      {
        "t": "p",
        "s": [
          "Puoi chiudere il tuo account con il nostro Servizio in qualsiasi momento, per qualsiasi motivo (o senza motivo), senza doverci nemmeno avvisare. Tuttavia, se desideri disattivare il tuo account, devi seguire alcuni passaggi specifici, descritti nella nostra documentazione. mySmartWindow può sospendere l'accesso al tuo account o chiudere il tuo account, con o senza preavviso, in conformità con questi Termini. Le ragioni per cui mySmartWindow può sospendere o terminare il tuo account possono includere, senza limitazioni: (i) violazione o infrangimento di questi Termini o di un Accordo Separato, (ii) un periodo prolungato di inattività (determinato a discrezione di mySmartWindow), (iii) il tuo mancato pagamento di eventuali tariffe o altre somme dovute a mySmartWindow o a terze parti relative all'uso del Servizio (o di parte di esso), o (vi) problemi tecnici o di sicurezza o conflitti. Nella maggior parte dei casi, se decidiamo di chiudere il tuo account, ti forniremo almeno 30 giorni di preavviso all'indirizzo e-mail che ci hai fornito, in modo che tu possa avere l'opportunità di recuperare qualsiasi Contenuto memorizzato sui server di mySmartWindow (a meno che non determinimo che siamo legalmente proibiti dal permetterti di farlo). Dopo la scadenza di questo periodo di preavviso, non sarai più in grado di recuperare il Contenuto contenuto in quell'account o utilizzare il Servizio tramite quell'account."
        ]
      },
      {
        "t": "h",
        "text": "Avviso di responsabilità, Copyright e informazioni sui marchi:"
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow e il logo mySmartWindow sono marchi registrati."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow ha fatto ogni sforzo per garantire l'accuratezza e l'affidabilità delle informazioni fornite sul sito web o sull'APP mySmartWindow. Tuttavia, le informazioni sono fornite senza garanzia. mySmartWindow non si assume alcuna responsabilità o obbligo per l'accuratezza, il contenuto, la completezza o l'affidabilità delle informazioni."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow memorizza le informazioni e la cronologia delle transazioni sui propri server al fine di poter visualizzare queste informazioni e creare statistiche di efficienza per la tua abitazione. mySmartWindow si riserva il diritto di trasferire queste informazioni in modo anonimo a terze parti al fine di creare statistiche domestiche, modelli predittivi, ecc."
        ]
      },
      {
        "t": "p",
        "s": [
          "Se non accetti le condizioni, nessun dato verrà salvato sul server e potrai accedere solo in modalità locale senza poter utilizzare questi servizi."
        ]
      },
      {
        "t": "h",
        "text": "Collegamenti a terze parti:"
      },
      {
        "t": "p",
        "s": [
          "Possiamo includere o consigliare risorse, materiali e sviluppatori di terze parti e/o collegamenti a siti web e applicazioni di terze parti come parte del Servizio o in connessione con esso. Non abbiamo controllo su tali siti o sviluppatori e, di conseguenza, riconosci e accetti che: (i) non siamo responsabili per la disponibilità di tali siti o applicazioni, (ii) non siamo responsabili o obbligati per alcun contenuto, materiale o funzionalità disponibile su tali siti o applicazioni, e (iii) non saremo responsabili o obbligati, direttamente o indirettamente, per danni o perdite causati o presunti causati dall'uso o dalla fiducia su tale contenuto, materiale o applicazioni."
        ]
      },
      {
        "t": "p",
        "s": [
          "Indennizzo. Accetti di tenere indenne e manlevare mySmartWindow, le sue filiali, affiliate, funzionari, agenti, dipendenti, inserzionisti e partner da e contro tutte le richieste, responsabilità, danni (diretti e consequenziali), perdite e spese (inclusi onorari legali e professionali), derivanti o comunque connessi a reclami di terzi relativi al tuo uso del Servizio, qualsiasi violazione di questi Termini di Servizio o qualsiasi altra azione correlata al tuo uso del Servizio (inclusi tutti i provvedimenti presi nel tuo account). In caso di tale reclamo, forniremo notifica del reclamo, causa o azione alle informazioni di contatto che abbiamo per tale account, a condizione che qualsiasi mancata notifica non eliminerà o ridurrà il tuo obbligo di indennizzo previsto nel presente accordo."
        ]
      },
      {
        "t": "h",
        "text": "Blog e forum:"
      },
      {
        "t": "p",
        "s": [
          "Il servizio di blog e forum ti consente di partecipare a blog e forum su argomenti relativi a mySmartWindow."
        ]
      },
      {
        "t": "p",
        "s": [
          "Puoi anche pubblicare un messaggio sul forum di mySmartWindow. Riconosci e accetti che se invii qualsiasi Contenuto al forum, sei l'unico responsabile per tale Contenuto. mySmartWindow non sarà responsabile in alcun modo per qualsiasi Contenuto inviato."
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "Accetti inoltre che:"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "Non invierai alcun Contenuto che sia molesto, offensivo, minaccioso, dannoso, diffamatorio o che incoraggi comportamenti che possano costituire un reato o dar luogo a responsabilità civili, o che sia altrimenti illegale."
          ],
          [
            "Non invierai alcun Contenuto protetto da leggi sulla proprietà intellettuale o diritti sulla privacy, a meno che non possiedi i diritti su di esso o non abbia ricevuto tutti i consensi necessari. Sarai l'unico responsabile per qualsiasi violazione di copyright, marchio commerciale o altri diritti di proprietà."
          ],
          [
            "Non invierai alcun Contenuto che contenga virus o altri componenti dannosi."
          ],
          [
            "Non ti impegnerai in alcuna attività che interferisca o disturbi l'uso del sito da parte di altri utenti."
          ],
          [
            "Non invierai alcun Contenuto che incoraggi attività illegali, o che fornisca consigli o istruzioni per tali attività illegali."
          ],
          [
            "Non farai alcuna falsa dichiarazione, inclusa l'usurpazione di identità o l'impostazione di essere associato a qualsiasi persona o entità."
          ],
          [
            "Non utilizzerai il forum di mySmartWindow per scopi commerciali, come la pubblicità di un prodotto o servizio, la rivendita o la pubblicazione delle informazioni trasmesse o pubblicate senza consenso scritto."
          ]
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow non esamina, monitora né modifica il Contenuto inviato ai Forum. Tuttavia, mySmartWindow si riserva il diritto di modificare, limitare o eliminare qualsiasi Contenuto a sua esclusiva discrezione. Tuttavia, sei l'unico responsabile per qualsiasi Contenuto che invii o pubblichi."
        ]
      },
      {
        "t": "p",
        "s": [
          "Inviando Contenuti, con qualsiasi mezzo, al forum o blog di mySmartWindow, concedi a mySmartWindow un diritto e una licenza perpetui, privi di diritti d'autore, irrevocabili, non esclusivi e mondiali per usare, divulgare, visualizzare, eseguire, riprodurre, modificare, adattare, pubblicare, tradurre e distribuire tale Contenuto o per incorporarlo in qualsiasi forma, media o tecnologia ora conosciuta o sviluppata in futuro. Inoltre, mySmartWindow sarà libera di utilizzare qualsiasi idea, concetto, know-how o tecnica contenuti in tali informazioni per qualsiasi scopo, compreso, ma non limitato a, ricercare, sviluppare, produrre e commercializzare prodotti e altri articoli che incorporano tali idee. Se non sei il proprietario del Contenuto inviato, garantisci di aver ricevuto tutti i consensi necessari dal proprietario di tali diritti. Indennizzerai mySmartWindow se tale Contenuto inviato viola tali diritti."
        ]
      },
      {
        "t": "p",
        "s": [
          "Partecipando a qualsiasi blog o forum, potresti entrare in contatto con Contenuti che sono imprecisi, incompleti o altrimenti inappropriati. Dovresti esercitare la massima cautela riguardo a qualsiasi Contenuto pubblicato o trasmesso su un forum o blog di mySmartWindow. mySmartWindow ti esorta a non intraprendere alcuna azione basata su tale Contenuto. mySmartWindow non sarà responsabile per il Contenuto o per l'accuratezza di tale informazione e non sarà responsabile per alcuna azione o decisione presa basandosi su tale informazione."
        ]
      },
      {
        "t": "p",
        "s": [
          "In considerazione degli sforzi di mySmartWindow per migliorare e potenziare la Piattaforma e i suoi prodotti e servizi associati e per rispondere ai suggerimenti degli utenti, accetti di trasferire tali idee, concetti, know-how o tecniche a mySmartWindow senza alcuna compensazione in cambio."
        ]
      },
      {
        "t": "p",
        "s": [
          "Accetti inoltre di firmare qualsiasi documento che mySmartWindow possa ragionevolmente richiedere in relazione alla conferma della proprietà e al tuo diritto illimitato di utilizzare tali idee, concetti, know-how e tecniche."
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "Inviando commenti a mySmartWindow con qualsiasi mezzo, tramite il blog, il forum, la casella dei suggerimenti del cliente o altro, sei l'unico responsabile per il contenuto di qualsiasi commento che fai. Accetti che qualsiasi commento che invii a mySmartWindow:"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "Violenti i diritti di terzi, compreso ma non limitato a copyright, marchio commerciale, riservatezza o altri diritti personali o di proprietà."
          ],
          [
            "Siano diffamatori o contengano materiale diffamatorio o altrimenti illecito, insultante o osceno, o costituiscano un'appropriazione indebita dei segreti commerciali di terzi."
          ],
          [
            "Denigrano i prodotti o i servizi di terzi, o contengano informazioni personali (ad eccezione del tuo indirizzo email e nome utente)."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Attività ad alto rischio:"
      },
      {
        "t": "p",
        "s": [
          "I servizi di mySmartWindow non sono fail-safe e non sono progettati, fabbricati o destinati per essere utilizzati come o con attrezzature di monitoraggio online in ambienti pericolosi che richiedono un'operazione fail-safe."
        ]
      },
      {
        "t": "h",
        "text": "Forza maggiore:"
      },
      {
        "t": "p",
        "s": [
          "In nessun caso una delle parti sarà responsabile per qualsiasi mancata prestazione o ritardo nell'adempimento, o per la perdita di dati in conformità con questi Termini e Condizioni (eccetto per il ritardo nel pagamento di denaro, che è dovuto e pagabile ai sensi del presente accordo), nella misura in cui tale mancato adempimento o ritardo sia direttamente causato da: (i) guasti del Servizio, (ii) fenomeni atmosferici naturali, o (iii) qualsiasi altra causa al di fuori del controllo ragionevole di quella parte e verificatasi senza colpa o negligenza di quella parte, inclusi, senza limitazioni, guasti di fornitori, subappaltatori e corrieri, o della parte nell'adempimento dei propri obblighi in modo sostanzialmente conforme a questi Termini di Servizio, a condizione che in tutti questi casi, come condizione per il reclamo di non responsabilità, la parte che subisce la difficoltà fornisca una tempestiva notifica scritta all'altra parte, con tutti i dettagli relativi all'occorrenza della causa su cui si basa."
        ]
      },
      {
        "t": "h",
        "text": "Il Servizio è disponibile \"COSÌ COM'È\":"
      },
      {
        "t": "p",
        "s": [
          "Il Servizio è disponibile \"COSÌ COM'È\". COMPRENDI ESPRESSAMENTE E ACCETTI CHE: (a) L'USO DEL SERVIZIO È A TUO ESCLUSIVO RISCHIO. IL SERVIZIO È FORNITO SU UNA BASE \"COSÌ COM'È\" E \"COME DISPONIBILE\". NEL LIMITE MASSIMO CONSENTITO DALLA LEGGE, mySmartWindow DECLINA ESPRESSAMENTE TUTTE LE GARANZIE E CONDIZIONI DI QUALSIASI TIPO, SIA ESPRESSE CHE IMPLICITE, INCLUSI MA NON LIMITATI ALLE GARANZIE E CONDIZIONI IMPLICITE DI COMMERCIABILITÀ, IDONEITÀ PER UNO SCOPO PARTICOLARE E NON VIOLAZIONE. (b) mySmartWindow NON GARANTISCE CHE (i) IL SERVIZIO SODDISFERÀ TUTTI I SUOI REQUISITI, (ii) IL SERVIZIO SARÀ ININTERROTTO, TEMPESTIVO, SICURO O SENZA ERRORI, O (iii) TUTTI GLI ERRORI NEL SERVIZIO SARANNO CORRETTI. (c) QUALSIASI MATERIALE SCARICATO O ALTRIMENTI OTTENUTO TRAMITE L'USO DEL SERVIZIO SARÀ FATTO A TUO ESCLUSIVO RISCHIO E SARAI ESCLUSIVAMENTE RESPONSABILE PER QUALSIASI DANNO AI SISTEMI COMPUTER O AD ALTRI DISPOSITIVI O PERDITA DI DATI DERIVANTE DAL DOWNLOAD DI TALE MATERIALE. (d) NESSUN CONSIGLIO O INFORMAZIONE, SIA ORALE CHE SCRITTA, OTTENUTA DA TE O TRAMITE O DA mySmartWindow O DAL SERVIZIO CREERÀ QUALSIASI GARANZIA NON ESPRESSAMENTE STABILITA IN QUESTI TERMINI DI SERVIZIO."
        ]
      },
      {
        "t": "h",
        "text": "Limitazione di responsabilità:"
      },
      {
        "t": "p",
        "s": [
          "COMPRENDI ESPRESSAMENTE E ACCETTI CHE mySmartWindow, LE SUE FILIALI, AFFILIATI E LICENZIANTI, E I NOSTRI E LORO RISPETTIVI DIRIGENTI, DIPENDENTI, AGENTI ED EREDI NON SARANNO RESPONSABILI VERSO DI TE PER DANNI DIRETTI, INDIRETTI, INCIDENTALI, SPECIALI, CONSEGUENZIALI O ESEMPLARI, INCLUSI, MA NON LIMITATI A, DANNI PER PERDITA DI PROFITTI, REPUTAZIONE, UTILIZZO, DATI, COPERTURA O ALTRI DANNI INTANGIBILI (ANCHE SE mySmartWindow È STATO AVVISATO DELLA POSSIBILITÀ DI TALI DANNI) CAUSATI DA: (i) L'USO O L'IMPOSSIBILITÀ DI UTILIZZARE IL SERVIZIO, (ii) IL COSTO DELLA FORNITURA DI BENI E SERVIZI SOSTITUTIVI CAUSATI DA BENI, DATI, INFORMAZIONI O SERVIZI ACQUISTATI O OBTENUTI O MESSAGGI RICEVUTI O TRANSAZIONI CONCLUSE DA O TRAMITE IL SERVIZIO, (iii) ACCESSO NON AUTORIZZATO ALLE TUE TRASMISSIONI, CONTENUTI O DATI O LA LORO PERDITA, CORRUZIONE O ALTERAZIONE, (iv) DICHIARAZIONI O CONDOTTA DI TERZI SUI O TRAMITE L'USO DEL SERVIZIO, (v) LE AZIONI O LE OMISSIONI DI mySmartWindow RIGUARDO ALL'AFFIDABILITÀ DELLE INFORMAZIONI DEL TUO ACCOUNT E QUALSIASI CAMBIO IN ESSO, (vi) IL FALLIMENTO DI PROTEGGERE LA CONFIDENZIALITÀ DI QUALSIASI PASSWORD O DIRITTI DI ACCESSO ALLE INFORMAZIONI DEL TUO ACCOUNT, (vii) LE AZIONI O LE OMISSIONI DI TERZI CHE UTILIZZANO O SI INTEGRANO CON IL SERVIZIO, (viii) QUALSIASI CONTENUTO PUBBLICIZZATO O IL TUO UTILIZZO O ACQUISTO DI QUALSIASI PRODOTTO O SERVIZIO PUBBLICIZZATO, (ix) LA TERMINAZIONE DEL TUO ACCOUNT IN CONFORMITÀ A QUESTI TERMINI E CONDIZIONI, O (x) QUALSIASI ALTRA QUESTIONE RELATIVA AL SERVIZIO."
        ]
      },
      {
        "t": "h",
        "text": "Esclusioni e limitazioni."
      },
      {
        "t": "p",
        "s": [
          "NESSUNA DISPOSIZIONE DI QUESTI TERMINI E CONDIZIONI È INTESA A ESCLUDERE O LIMITARE QUALSIASI CONDIZIONE, GARANZIA, DIRITTO O RESPONSABILITÀ CHE NON POSSA ESSERE LEGCITTIMAMENTE ESCLUSA O LIMITATA. ALCUNE GIURISDIZIONI NON PERMETTONO L'ESCLUSIONE DI ALCUNE GARANZIE O CONDIZIONI O LA LIMITAZIONE O L'ESCLUSIONE DI RESPONSABILITÀ PER DANNI O PERDITE CAUSATE DA NEGLIGENZA, VIOLAZIONE DI CONTRATTO O TERMINI IMPLICITI, O PER DANNI INCIDENTALI O CONSEGUENZIALI. DI CONSEGUENZA, SOLO LE LIMITAZIONI, SE PRESENTI, CHE SONO LEGALI NELLA TUA GIURISDIZIONE SI APPLICANO A TE, E LA NOSTRA RESPONSABILITÀ È LIMITATA AL LIMITE MASSIMO CONSENTITO DALLA LEGGE."
        ]
      }
    ]
  },
  "de": {
    "pageTitle": "Bedingungen und Konditionen",
    "title": "Allgemeine Geschäftsbedingungen",
    "version": "Dokumentversion: 1.0",
    "copyright": "© 2022 - IoT FENSTER, S.L.",
    "logoAlt": "IoT Fenster-Logo",
    "blocks": [
      {
        "t": "h",
        "text": "Willkommen bei mySmartWindow, aber bevor Sie unseren Service nutzen können, müssen Sie unsere Allgemeinen Geschäftsbedingungen akzeptieren:"
      },
      {
        "t": "p",
        "s": [
          "Danke für Ihr Interesse an mySmartWindow! Wir laden Sie ein, den mySmartWindow-Service zu nutzen, um ein immer verbundenes Fenster oder eine Tür mit IoT-Potenzial zu genießen. Bitte beachten Sie, dass Ihre Registrierung beim mySmartWindow-Service und auf der mySmartWindow-Website und deren Nutzung der Annahme dieser Allgemeinen Geschäftsbedingungen unterliegt. Der mySmartWindow-Service wird mit bestimmten Nutzungseinschränkungen und -bedingungen angeboten, die den gesetzlichen Bestimmungen entsprechen. Wir müssen diese Bedingungen von Zeit zu Zeit ändern und behalten uns das Recht vor, dies zu tun. Bitte überprüfen Sie hier die neuen Informationen, die Version dieses Vertrags und das Datum seines Inkrafttretens."
        ]
      },
      {
        "t": "h",
        "text": "Dieses Dokument ist ein Vertrag, also lesen Sie es bitte sorgfältig durch:"
      },
      {
        "t": "p",
        "s": [
          "Dieses Dokument beschreibt im Detail Ihre Rechte in Bezug auf den Service, also überprüfen Sie bitte sorgfältig diese Bedingungen. Diese Allgemeinen Geschäftsbedingungen stellen einen Vertrag zwischen uns dar. Wenn Sie diese Bedingungen nicht akzeptieren, haben Sie kein Recht, auf unseren Service zuzugreifen oder ihn remote zu nutzen, d.h. von außerhalb Ihres Hauses.",
          {
            "b": "Wenn Sie ihn nicht akzeptieren, können Ihre Fenster und Türen nur im lokalen Modus arbeiten und haben keine Cloud-Unterstützung, und daher werden einige Dienste nicht zugänglich sein"
          },
          ". Wenn Sie unseren Service nutzen, wird Ihre Nutzung als Annahme der Bedingungen und als Ihre Zustimmung angesehen, Teil dieser bindenden Vereinbarung zu sein."
        ]
      },
      {
        "t": "h",
        "text": "Indem Sie diesen Service nutzen, erkennen Sie an, stimmen zu und akzeptieren alle Bedingungen, einschließlich der Datenschutzrichtlinie:"
      },
      {
        "t": "p",
        "s": [
          "Indem Sie den Service nutzen, erkennen Sie an, stimmen zu und akzeptieren alle Klauseln der Datenschutzrichtlinie, einschließlich, ohne Einschränkung, der Nutzung und Verarbeitung der Informationen und Inhalte Ihres Kontos gemäß dieser Datenschutzrichtlinie."
        ]
      },
      {
        "t": "h",
        "text": "Teile dieses Vertrages:"
      },
      {
        "t": "p",
        "s": [
          "Sie sind eine der Parteien dieses Vertrages. Die andere Partei ist IoT FENSTER S.L, ein privates Unternehmen mit Sitz in Spanien und seinem Hauptsitz in Fuente Álamo - Murcia, das in diesen Geschäftsbedingungen als \"mySmartWindow\", \"wir\" und manchmal \"uns\" bezeichnet wird."
        ]
      },
      {
        "t": "h",
        "text": "Die Allgemeinen Geschäftsbedingungen dieses Vertrages können sich ändern:"
      },
      {
        "t": "p",
        "s": [
          "Es ist fast sicher, dass dieser Vertrag Änderungen unterliegen wird, aufgrund von Änderungen in unserem Service und den Gesetzen, die für Sie und uns gelten. Wenn wir Änderungen vornehmen würden, würden wir uns bemühen, Sie im Voraus zu informieren, obwohl in bestimmten Situationen, wie wenn eine Änderung notwendig ist, um gesetzliche Anforderungen zu erfüllen, eine Änderung dieser Bedingungen sofort in Kraft treten muss. Wir werden die Änderungen hier auf unserer Website ankündigen, und wir können uns auch dazu entscheiden, Sie über die Änderungen zu informieren, indem wir eine E-Mail an die Adresse senden, die Sie uns zur Verfügung gestellt haben. Wir werden auch versuchen, die Gründe für die Änderung zu erklären. Wenn diese Bedingungen aktualisiert werden, sind Sie frei zu entscheiden, ob Sie diese Änderungen akzeptieren oder ob Sie aufhören, unseren Service zu nutzen, Ihre fortgesetzte Nutzung des Service nach dem Inkrafttreten des besagten Updates wird als Ihre Zustimmung zu den neuen Bedingungen und Ihre Zustimmung, sich diesen zu unterwerfen, angesehen. Mit Ausnahme der von uns gemachten Änderungen, wie hier beschrieben, wird keine Änderung oder Ergänzung dieser Bedingungen in Kraft treten, es sei denn, sie ist in einer schriftlichen Vereinbarung festgelegt und trägt Ihre Unterschrift und die unsere. Zur Klarstellung, E-Mails und andere Kommunikationen stellen keine wirksame schriftliche Vereinbarung für diesen Zweck dar."
        ]
      },
      {
        "t": "h",
        "text": "Beschreibung des mySmartWindow-Service:"
      },
      {
        "t": "p",
        "s": [
          "Der mySmartWindow CLOUD-Service besteht aus einer Website und einem Cloud-Server, der die Kommunikation von außerhalb des Hauses mit der Kommunikation mit Ihren Fenstern und Türen unterstützt. Die Dienste und Produkte von mySmartWindow, die von IoT FENSTER S.L angeboten werden, bieten dank des mySmartWindow CLOUD-Service zusätzliche Dienste wie Alarmdienste. mySmartWindow ermöglicht es seinen Nutzern, Daten von ihren Geräten zu sammeln, zu speichern und zu teilen, sie zu verwalten und zu programmieren. Im Gegenzug für die Nutzung des Service stimmen Sie zu, sich diesen Bedingungen zu unterwerfen."
        ]
      },
      {
        "t": "h",
        "text": "IoT FENSTER S.L übernimmt keine Verantwortung für die vom Nutzer bereitgestellten Inhalte und Daten anderer Nutzer:"
      },
      {
        "t": "p",
        "s": [
          "IoT FENSTER S.L wählt oder filtert die Daten oder Inhalte der Nutzer nicht aus und überprüft, prüft, bestätigt, genehmigt oder verifiziert keine Inhalte oder Daten der Nutzer oder die Richtigkeit dieser Daten oder Inhalte. Weder diese Allgemeinen Geschäftsbedingungen, noch die Nutzung des Service durch Sie, noch die Bereitstellung des Service durch mySmartWindow, noch der Zugriff/Speicherung/Nutzung der Daten und Inhalte des Nutzers durch IoT FENSTER S.L implizieren oder schaffen irgendeine Haftung seitens mySmartWindow in Bezug auf die vom Nutzer bereitgestellten Daten, die von anderen Nutzern bereitgestellt und im Service enthalten sind. Ihr Zugang zum Service oder zu irgendeinem Inhalt und Ihre Nutzung desselben erfolgt auf eigene Gefahr."
        ]
      },
      {
        "t": "p",
        "s": [
          "Der mySmartWindow CLOUD-Service speichert vorübergehend Daten wie Temperatur, Feuchtigkeit, Co2, Öffnung, Zustände von Rollläden oder Öffnungen. Auf diese Weise können wir Ihnen die Historie der Operationen und die Effizienzdiagramme zur Verfügung stellen. Wenn Sie die Bedingungen nicht akzeptieren, werden diese Dienste nicht angeboten und der Server wird keine temporären Daten speichern."
        ]
      },
      {
        "t": "p",
        "s": [
          "Die historischen Daten Ihrer Fenster werden verschlüsselt in der mySmartWindow CLOUD-Datenbank gespeichert und sind zu keinem Zeitpunkt mit Ihren persönlichen Daten in denselben Tabellen verknüpft. Alle Daten werden über eine alphanumerische Benutzer-ID identifiziert."
        ]
      },
      {
        "t": "p",
        "s": [
          "Der mySmartWindow CLOUD-Service wird \"WIE ER IST\" und \"WIE VERFÜGBAR\" bereitgestellt:"
        ]
      },
      {
        "t": "p",
        "s": [
          "Sie verstehen und akzeptieren, dass der Service Ihnen \"WIE ER IST\" und \"WIE VERFÜGBAR\" zur Verfügung gestellt wird. Bis auf weiteres wird der mySmartWindow CLOUD-Service als Beta-Software-Edition angeboten, was bedeutet, dass KEINE SERVICE LEVEL AGREEMENT UND KEINE VERFÜGBARKEITSGARANTIE DES SERVICE angeboten wird. IoT FENSTER S.L LEHNT JEDE GARANTIE, AUSDRÜCKLICH ODER STILLSCHWEIGEND, DER MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK ODER NICHTVERLETZUNG AB. mySmartWindow haftet nicht und wird nicht haftbar gemacht für jeglichen Datenverlust oder andere Schäden, die durch Ihren Zugang zur Nutzung des Service verursacht werden. Sie akzeptieren auch, dass IoT FENSTER S.L keine Verantwortung oder Verpflichtung für das Löschen oder das Versagen beim Speichern oder Übertragen von Inhalten hat, die vom Service aufrechterhalten werden. IoT FENSTER S.L gibt keine Garantien, dass der Service Ihren Anforderungen entspricht oder ununterbrochen, sicher oder fehlerfrei verfügbar ist. Kein Rat oder Informationen, die von IoT FENSTER S.L, ob mündlich oder schriftlich, erhalten wurden, werden irgendeine Garantie schaffen, die hier nicht ausdrücklich genannt wird."
        ]
      },
      {
        "t": "h",
        "text": "Registrieren Sie sich als mySmartWindow-Benutzer, indem Sie ein Konto erstellen:"
      },
      {
        "t": "p",
        "s": [
          "Zuerst müssen Sie ein mySmartWindow-Konto erstellen. Sie erstellen ein Konto, indem Sie uns einen akzeptablen Benutzernamen und eine E-Mail-Adresse zur Verfügung stellen und ein Passwort erstellen. Wir bezeichnen dies als Ihre \"Kontoinformationen\". Wir empfehlen Ihnen, eine Kombination aus Benutzername und Passwort zu verwenden, die unterschiedlich und nicht offensichtlich sind, idealerweise sollten sie sich von denen unterscheiden, die Sie für andere Dienste verwenden. Sie sind verantwortlich für die Sicherstellung der Genauigkeit, Vollständigkeit und Vertraulichkeit Ihrer Kontoinformationen und sind verantwortlich für alle Aktivitäten, die auf Ihrem Konto stattfinden, einschließlich der Aktivitäten anderer, denen Sie Ihre Kontoinformationen zur Verfügung gestellt haben. Wir haften nicht für Verluste oder Schäden, die durch Ihre Nichtbeachtung der Verpflichtung entstehen, uns genaue Informationen zu liefern oder Ihre Kontoinformationen sicher aufzubewahren. Wenn Sie eine unbefugte Nutzung Ihrer Kontoinformationen entdecken oder vermuten, dass jemand in der Lage sein könnte, auf Ihre privaten Inhalte zuzugreifen, sollten Sie sofort Ihr Passwort ändern und unseren Kundendienst benachrichtigen."
        ]
      },
      {
        "t": "p",
        "s": [
          "Darüber hinaus übernimmt mySmartWindow keine Verantwortung für die Verfügbarkeit des Internets und anderer Telekommunikationsdienste, die für den Zugang zum Service erforderlich sind."
        ]
      },
      {
        "t": "h",
        "text": "Ihre Rechte als Benutzer:"
      },
      {
        "t": "p",
        "s": [
          "Sobald Sie ein Konto erstellt und diese Bedingungen akzeptiert haben, gewähren wir Ihnen eine begrenzte und nicht exklusive Lizenz zur Nutzung des Service, vorbehaltlich dieser Bedingungen, in dem Umfang, in dem Sie nicht gesetzlich daran gehindert sind, den Service zu empfangen, bis Sie Ihr Konto freiwillig schließen oder bis wir Ihr Konto gemäß diesen Bedingungen schließen. Darüber hinaus gewähren wir Ihnen eine persönliche, weltweite, gebührenfreie, nicht übertragbare und nicht exklusive Lizenz. Zur Nutzung der APP und des mySmartWindow CLOUD-Service, bis Ihre Rechte in Übereinstimmung mit der genannten Lizenz und/oder diesen Bedingungen ablaufen. Sie erwerben keine weiteren Rechte oder Interessen an mySmartWindow oder dem Service."
        ]
      },
      {
        "t": "h",
        "text": "Ihre Nutzung von mySmartWindow und seinen Inhalten:"
      },
      {
        "t": "p",
        "s": [
          "Ihre Nutzung des Service muss in Übereinstimmung mit diesen Bedingungen erfolgen. In Bezug auf Ihre Nutzung von mySmartWindow akzeptieren Sie, dass Sie für Ihr eigenes Verhalten und das gesamte Verhalten auf Ihrem Konto verantwortlich sind. Dies bedeutet, dass alle Inhalte - wie Daten von Ihren Geräten, Text, Dateien jeglicher Art (Bilder, Videos und alles, was Ihnen einfällt), unabhängig von ihrer Form oder technischen Struktur (zusammenfassend \"Inhalt\") - die auf Ihrem Konto erstellt, übertragen, gespeichert oder angezeigt werden, ausschließlich in Ihrer Verantwortung liegen als die Person, die Ihr Benutzerkonto erstellt hat und die einzige Person, die davon Kenntnis hat. Dies gilt auch dann, wenn der Inhalt privat gehalten, geteilt oder über den Service oder eine Anwendung oder einen Dienst von Dritten, die mit mySmartWindow integriert sind, übertragen wird."
        ]
      },
      {
        "t": "h",
        "text": "Datenschutz und Benutzerinhalte:"
      },
      {
        "t": "ul",
        "items": [
          [
            "Ihre Daten gehören Ihnen: Sie behalten Ihre Rechte und alle anderen Rechte an Ihren temporären Grafiken, die von den Geräten erfasst wurden, bevor Sie sie senden oder veröffentlichen oder im Service oder über denselben oder ein anderes Medium anzeigen. Aber Sie müssen mySmartWindow eine begrenzte Lizenz gewähren, wie unten beschrieben, damit wir Ihre Daten zugänglich und nutzbar im Service machen können. Abgesehen von dieser begrenzten Lizenz und anderen Rechten, die Sie in diesen Bedingungen gewähren, erkennt und akzeptiert mySmartWindow, dass wir keine weiteren Rechte, Titel oder Interessen von Ihnen an Ihren Inhalten unter diesen Bedingungen erwerben. Um mySmartWindow den Betrieb des Service zu ermöglichen, müssen wir von Ihnen bestimmte Lizenzen und andere Rechte an den Inhalten, die Sie uns senden, erhalten, so dass die Verarbeitung, Wartung, Speicherung, technische Reproduktion, Sicherungskopien und Verteilung und damit verbundene Verwaltung Ihrer Inhalte nicht gegen das geltende Urheberrecht und andere Gesetze verstößt. Dies bedeutet, dass Sie durch die Nutzung des Service mySmartWindow eine Lizenz zur Anzeige, Ausführung und Verteilung eines Ihrer Inhalte gewähren und zur Modifikation (aus technischen Gründen, z. B. um sicherzustellen, dass der Inhalt sowohl auf Smartphones als auch auf Computern angezeigt werden kann) und Reproduktion dieser Inhalte und damit mySmartWindow den Betrieb des Service ermöglichen. Sie akzeptieren auch, dass mySmartWindow das Recht hat, zu entscheiden, ob es irgendeinen Inhalt nicht akzeptiert, veröffentlicht, ausführt, speichert, anzeigt, veröffentlicht oder überträgt, indem es auch diese Rechte an Dritte weitergibt, mit denen mySmartWindow vertragliche Beziehungen im Zusammenhang mit der Bereitstellung des mySmartWindow-Service hat, ausschließlich zum Zweck der Bereitstellung dieser Dienste, und andererseits den Zugang zu oder die Anzeige Ihrer Inhalte für Dritte zu ermöglichen, wenn mySmartWindow feststellt, dass dieser Zugang notwendig ist, um seine gesetzlichen Verpflichtungen zu erfüllen. Sie nehmen auch gegenüber uns an, dass Sie durch die Annahme der Bedingungen, dass Ihre nicht persönlichen Informationen von mySmartWindow über seine API an andere APP-Entwickler weitergegeben werden können, damit sie über diese Drittanbieter-APP Zugang zu den Diensten Ihrer mySmartWindow-Fenster und -Türen haben können. Die in diesen Bedingungen beschriebenen Rechte verletzen nicht die Rechte Dritter. Schließlich verstehen und akzeptieren Sie, dass mySmartWindow, indem es die technischen Schritte zur Bereitstellung des Service für unsere Nutzer durchführt, Ihre nicht persönlichen Daten so verändern und anpassen kann, dass sie den technischen Anforderungen der Verbindungsnetze, der Geräte, der Dienste oder der Kommunikationsmedien entsprechen."
          ],
          [
            "Ihre Daten und Inhalte sind geschützt: Die Sicherheit Ihrer Daten ist für uns von größter Bedeutung, und wir unternehmen alle Anstrengungen, um Ihre Daten sicher und geschützt zu halten. Wir übernehmen jedoch keine Verantwortung für jeglichen Verlust oder unautorisierte Verbreitung Ihrer Inhalte. Ihre Privatsphäre in Ihren Inhalten ist auch unsere größte Sorge, und wir hoffen, dass wir nie die Inhalte von jemandem prüfen müssen. Es gibt jedoch bestimmte Umstände, unter denen wir möglicherweise Ihre Inhalte ganz oder teilweise prüfen müssen, wie in unserer Datenschutzrichtlinie erklärt. Außer wie hier und in unserer Datenschutzrichtlinie beschrieben, sollte niemand sonst Ihre Inhalte sehen, es sei denn, Sie entscheiden sich dafür, anderen den Zugang zu den Inhalten zu ermöglichen, die Sie dem Service senden. Natürlich, wenn Sie sich entscheiden, einen Teil Ihrer Inhalte zu veröffentlichen oder zu teilen, indem Sie einen Informationsfluss erstellen, oder einen Webdienst erstellen, um die Inhalte zu veröffentlichen, dann würden Sie jedem autorisierten Benutzer die Erlaubnis geben, auf Ihre Inhalte zuzugreifen, sie zu nutzen, anzuzeigen, auszuführen, zu verteilen und zu modifizieren (vorbehaltlich jeglicher Verpflichtung oder Vereinbarung, die Sie mit diesen Benutzern ohne Beteiligung von mySmartWindow eingegangen sein könnten). Darüber hinaus ermöglicht Ihnen mySmartWindow die Nutzung einer Vielzahl von Diensten und Anwendungen von Dritten, die mit dem Service und Ihren Inhalten interagieren, und Sie sollten die Zugriffsrechte überprüfen, die Sie diesen Diensten oder Anwendungen gewähren, da sie möglicherweise Zugang zu Ihren Inhalten durch ihre Vereinbarungen mit diesen Dritten ermöglichen."
          ],
          [
            "Ihre Daten und Inhalte sind portabel: mySmartWindow verpflichtet sich, Ihre Daten portabel zu machen. Das bedeutet, dass wir Werkzeuge in unseren Service und Software einbauen werden, damit Sie Ihre Daten und Inhalte teilen oder in Dateien exportieren oder über Webdienste oder APIs zugänglich machen können. Alle diese Werkzeuge werden verfügbar sein, solange Ihr Konto offen ist, vorbehaltlich der Einhaltung unserer Datenschutzrichtlinie. Wenn Sie Probleme beim Exportieren von Daten oder Inhalten haben, können Sie sich an unseren Kundendienst wenden, der sich bemühen wird, Ihre Anfrage zu erfüllen, wenn sie mit unserer Datenschutzrichtlinie und rechtlichen Maßnahmen übereinstimmt."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Recht von mySmartWindow, den Service zu ändern:"
      },
      {
        "t": "p",
        "s": [
          "Wir behalten uns das Recht vor, nach unserem alleinigen Ermessen neue Elemente als Teil und/oder Ergänzung des Service und jeder Software der mySmartWindow APP einzuführen, einschließlich Änderungen, die den bisherigen Betriebsmodus des Service beeinflussen können. Wir hoffen, dass solche Änderungen den Service insgesamt verbessern, aber es ist möglich, dass Sie nicht mit uns übereinstimmen. Wir behalten uns auch das Recht vor, bestimmte Grenzen für die Art oder Größe des Speicherplatzes festzulegen, den Sie nutzen können, die Anzahl der Übertragungen und E-Mails, die Ausführung Ihres Programmcodes, Ihre Inhalte und andere Daten, und andere Einschränkungen jederzeit, mit oder ohne vorherige Ankündigung, festzulegen. Zum Beispiel, wenn Sie den kostenlosen Service von mySmartWindow nutzen, werden Sie nicht alle Vorteile genießen, die den Nutzern des Premium-Service von mySmartWindow angeboten werden. Sie erkennen auch an, dass bestimmte Aktionen von mySmartWindow es Ihnen erschweren oder verhindern können, auf Ihre Inhalte zuzugreifen oder den Service zu bestimmten Zeiten und/oder auf die gleiche Weise zu nutzen, für begrenzte Zeiträume oder dauerhaft, und Sie akzeptieren, dass mySmartWindow keine Verantwortung oder Haftung Ihnen oder Dritten gegenüber hat für jede Änderung, Aussetzung oder Beendigung eines Teils des Service."
        ]
      },
      {
        "t": "h",
        "text": "Speicherung Ihrer Daten und Inhalte:"
      },
      {
        "t": "p",
        "s": [
          "Der mySmartWindow CLOUD-Service ist weltweit verfügbar, aber unsere Datenverarbeitungsoperationen werden in Spanien durchgeführt. Wenn Sie den Service nutzen, erkennen Sie an, dass Sie möglicherweise elektronische Kommunikationen (einschließlich Ihrer persönlichen Kontoinformationen und Ihrer Inhalte) über Computernetzwerke senden, die Eigentum von mySmartWindow und Dritten sind, die in Spanien und an anderen Standorten in Europa und sogar in anderen Ländern ansässig sind. Daher wird Ihre Nutzung des Service wahrscheinlich die internationale Übertragung von Daten verursachen, und Ihre Nutzung des Service wird Ihre Zustimmung zu solchen Übertragungen darstellen. mySmartWindow kann den Standort seiner Verarbeitungsoperationen ändern, ohne Sie zu benachrichtigen oder Ihre Zustimmung einzuholen."
        ]
      },
      {
        "t": "h",
        "text": "Im Falle der Schließung Ihres Kontos:"
      },
      {
        "t": "p",
        "s": [
          "Sie können Ihr Konto mit unserem Service jederzeit, aus irgendeinem Grund (oder ohne Grund), ohne uns sogar zu benachrichtigen, schließen. Wenn Sie jedoch Ihr Konto deaktivieren möchten, müssen Sie bestimmte konkrete Schritte unternehmen, die in unserer Dokumentation beschrieben sind. mySmartWindow kann den Zugang zu Ihrem Konto sperren oder Ihr Konto schließen, mit oder ohne vorherige Ankündigung gemäß diesen Bedingungen. Die Gründe, warum mySmartWindow Ihr Konto sperren oder schließen kann, können unter anderem sein: (i) Verstoß oder Verletzung dieser Bedingungen oder einer separaten Vereinbarung, (ii) eine längere Periode der Inaktivität (nach alleinigem Ermessen von mySmartWindow), (iii) Nichtzahlung von Ihnen jeglicher Gebühr oder anderer Betrag, der mySmartWindow oder Dritten geschuldet ist und in Zusammenhang mit Ihrer Nutzung des Service (oder eines Teils davon) steht, oder (vi) Konflikte oder technische oder Sicherheitsprobleme. In den meisten Fällen, wenn wir uns entscheiden, Ihr Konto zu schließen, würden wir Sie mindestens 30 Tage im Voraus an die E-Mail-Adresse benachrichtigen, die Sie uns zur Verfügung gestellt haben, so dass Sie die Möglichkeit haben, jegliche Inhalte, die auf den mySmartWindow-Servern gespeichert sind, wiederherzustellen (es sei denn, wir bestimmen, dass es uns gesetzlich verboten ist, Ihnen dies zu erlauben). Nach Ablauf dieser Benachrichtigungsfrist können Sie die in diesem Konto enthaltenen Inhalte nicht mehr wiederherstellen oder den Service auf andere Weise über dieses Konto nutzen."
        ]
      },
      {
        "t": "h",
        "text": "Haftungsausschlussklausel, Urheberrechte und Informationen zu eingetragenen Marken:"
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow und das mySmartWindow-Logo sind eingetragene Marken."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow hat alle Anstrengungen unternommen, um die Genauigkeit und Zuverlässigkeit der auf der Website oder in der mySmartWindow APP angebotenen Informationen zu gewährleisten. Die Informationen werden jedoch ohne Gewähr zur Verfügung gestellt. mySmartWindow übernimmt keine Verantwortung oder Haftung für die Genauigkeit, den Inhalt, die Vollständigkeit oder die Zuverlässigkeit der Informationen."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow speichert auf seinem Server die Historie von Informationen und Operationen, um Ihnen diese Informationen anzeigen zu können und um Effizienzstatistiken für Ihr Zuhause erstellen zu können. mySmartWindow behält sich das Recht vor, diese Informationen anonym an Drittunternehmen weiterzugeben, um Statistiken über Haushalte, Vorhersagemodelle usw. erstellen zu können."
        ]
      },
      {
        "t": "p",
        "s": [
          "Wenn Sie die Bedingungen nicht akzeptieren, werden keine Daten auf dem Server gespeichert und Sie können nur im lokalen Modus zugreifen, ohne diese Dienste nutzen zu können."
        ]
      },
      {
        "t": "h",
        "text": "Links zu Dritten:"
      },
      {
        "t": "p",
        "s": [
          "Wir können Ressourcen, Materialien und Entwickler von Dritten und/oder Links zu Websites und Anwendungen von Dritten als Teil des Service oder in Verbindung damit einbeziehen oder empfehlen. Wir haben keine Kontrolle über solche Seiten oder Entwickler und daher erkennen und akzeptieren Sie, dass: (i) wir nicht verantwortlich sind für die Verfügbarkeit solcher Seiten oder Anwendungen, (ii) wir nicht verantwortlich oder haftbar sind für jegliche Inhalte oder andere Materialien oder Funktionen, die auf solchen Seiten oder Anwendungen verfügbar sind, und (iii) wir nicht verantwortlich oder haftbar sind, direkt oder indirekt, für jegliche Schäden oder Verluste, die durch oder in Verbindung mit der Nutzung von oder dem Vertrauen auf solche Inhalte, Materialien oder Anwendungen verursacht oder angeblich verursacht wurden."
        ]
      },
      {
        "t": "p",
        "s": [
          "Haftungsfreistellung. Sie stimmen zu, mySmartWindow, seine Tochtergesellschaften, verbundenen Unternehmen, Führungskräfte, Agenten, Mitarbeiter, Werbetreibende und Partner von und gegen alle Ansprüche, Verbindlichkeiten, Schäden (direkte und Folgeschäden), Verluste und Ausgaben (einschließlich Anwaltskosten und andere professionelle Gebühren) freizustellen und zu schützen, die sich aus oder in irgendeiner Weise im Zusammenhang mit Ansprüchen Dritter in Bezug auf Ihre Nutzung des Service, jegliche Verletzung dieser Servicebedingungen oder jegliche andere Handlung im Zusammenhang mit Ihrer Nutzung des Service (einschließlich aller Handlungen, die auf Ihrem Konto durchgeführt wurden) ergeben. Im Falle einer solchen Klage werden wir Sie über die Klage, Forderung oder Aktion an die Kontaktinformationen, die wir für dieses Konto haben, benachrichtigen, vorausgesetzt, dass ein Versäumnis, Ihnen solche Benachrichtigung zu liefern, Ihre Verpflichtung zur Haftungsfreistellung nach diesem nicht aufheben oder verringern wird."
        ]
      },
      {
        "t": "h",
        "text": "Blog und Forum:"
      },
      {
        "t": "p",
        "s": [
          "Der Blog- und Forumservice ermöglicht es Ihnen, an Blogs und Foren zu mySmartWindow-Themen teilzunehmen."
        ]
      },
      {
        "t": "p",
        "s": [
          "Sie können auch eine Nachricht im mySmartWindow-Forum posten. Sie erkennen an und stimmen zu, dass Sie, wenn Sie Inhalte in das Forum einstellen, allein für diese Inhalte verantwortlich sind. mySmartWindow ist in keiner Weise für solche eingereichten Inhalte verantwortlich."
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "Darüber hinaus stimmen Sie zu, dass:"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "Sie werden keine Inhalte einreichen, die belästigend, beleidigend, bedrohlich, schädlich, verleumderisch oder diffamierend sind, Verhaltensweisen fördern, die eine Straftat darstellen oder zivilrechtliche Haftung nach sich ziehen könnten, oder in irgendeiner Weise illegal sind."
          ],
          [
            "Sie werden keine Inhalte einreichen, die durch Urheberrechtsgesetze oder Vertraulichkeitsrechte geschützt sind, es sei denn, Sie besitzen die Rechte daran oder haben alle notwendigen Zustimmungen erhalten. Sie werden allein verantwortlich sein für jede Verletzung von Urheberrechten, Markenrechten oder anderen Eigentumsrechten."
          ],
          [
            "Sie werden keine Inhalte einreichen, die einen Virus oder eine andere schädliche Komponente enthalten."
          ],
          [
            "Sie werden keine Aktivitäten unternehmen, die die Nutzung der Website durch andere Benutzer stören oder beeinträchtigen."
          ],
          [
            "Sie werden keine Inhalte einreichen, die zu illegalen Aktivitäten anstiften, oder Ratschläge oder Anweisungen zu solchen illegalen Aktivitäten geben."
          ],
          [
            "Sie werden keine falschen Darstellungen machen, einschließlich der Vortäuschung von Personen oder Einrichtungen und der Vortäuschung einer Zugehörigkeit zu einer Person oder Einrichtung."
          ],
          [
            "Sie werden das mySmartWindow-Forum nicht für kommerzielle Zwecke nutzen, wie zum Beispiel die Bewerbung eines Produkts oder Dienstes, den Weiterverkauf oder die Veröffentlichung der übermittelten oder veröffentlichten Informationen ohne schriftliche Zustimmung."
          ]
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow überprüft, überwacht oder bearbeitet die Inhalte, die in die Foren eingestellt werden, nicht. mySmartWindow behält sich jedoch das Recht vor, jeden Inhalt nach eigenem Ermessen zu bearbeiten, zu begrenzen oder zu löschen. Dennoch werden Sie allein verantwortlich sein für alle Inhalte, die Sie einreichen oder veröffentlichen."
        ]
      },
      {
        "t": "p",
        "s": [
          "Indem Sie Inhalte, auf irgendeine Weise, in das mySmartWindow-Forum oder Blog einstellen, gewähren Sie mySmartWindow ein dauerhaftes, gebührenfreies, unwiderrufliches, nicht exklusives und weltweites Recht und eine Lizenz zur Nutzung, Offenlegung, Darstellung, Durchführung, Reproduktion, Modifikation, Anpassung, Veröffentlichung, Übersetzung und Verbreitung solcher Inhalte oder zur Einbeziehung solcher Inhalte in irgendeine Form, Medium oder Technologie, die bereits bekannt ist oder entwickelt wird. Darüber hinaus ist mySmartWindow frei, jede Idee, jedes Konzept, jedes Wissen oder jede Technik, die in solchen Informationen enthalten ist, für jeden Zweck zu nutzen, einschließlich, aber nicht beschränkt auf die Forschung, Entwicklung, Herstellung und Vermarktung von Produkten und anderen Artikeln, die solche Ideen beinhalten. Wenn Sie nicht der Eigentümer des eingereichten Inhalts sind, garantieren Sie, dass Sie alle notwendigen Zustimmungen vom Eigentümer dieser Rechte erhalten haben. Sie werden mySmartWindow freistellen, wenn einer dieser eingereichten Inhalte gegen eines dieser Rechte verstößt."
        ]
      },
      {
        "t": "p",
        "s": [
          "Wenn Sie an einem Blog oder Forum teilnehmen, können Sie auf Inhalte stoßen, die ungenau, unvollständig oder unangemessen sind. Sie sollten äußerst vorsichtig mit allen Inhalten sein, die in einem mySmartWindow-Forum oder Blog veröffentlicht oder übertragen werden. mySmartWindow ist nicht verantwortlich für den Inhalt oder die Genauigkeit von Informationen und ist nicht verantwortlich für Handlungen oder Entscheidungen, die auf solchen Informationen basieren."
        ]
      },
      {
        "t": "p",
        "s": [
          "In Anbetracht der Bemühungen von mySmartWindow, die Plattform und ihre zugehörigen Produkte und Dienstleistungen zu verbessern und auf die Vorschläge der Nutzer zu reagieren, stimmen Sie zu, solche Ideen, Konzepte, Kenntnisse oder Techniken an mySmartWindow ohne Gegenleistung zu übertragen."
        ]
      },
      {
        "t": "p",
        "s": [
          "Sie stimmen auch zu, alle und jeden der Dokumente auszuführen, die mySmartWindow vernünftigerweise anfordern kann, in Bezug auf die Bestätigung des Eigentums von mySmartWindow und seines uneingeschränkten Rechts, solche Ideen, Konzepte, Kenntnisse und Techniken zu nutzen."
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "Indem Sie Kommentare an mySmartWindow senden, auf irgendeine Weise, sei es über das Blog, das Forum, den Kundenfeedback-Posteingang oder ähnliches, sind Sie allein verantwortlich für den Inhalt jedes Kommentars, den Sie machen. Sie stimmen zu, dass keiner der Kommentare, die Sie an mySmartWindow senden:"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "Keine Rechte Dritter verletzen wird, einschließlich, aber nicht beschränkt auf Urheberrechte, Markenrechte, Vertraulichkeitsrechte oder andere persönliche oder Eigentumsrechte."
          ],
          [
            "Verleumderisch sein wird oder verleumderisches oder illegales, beleidigendes oder obszönes Material enthalten wird, oder eine unzulässige Aneignung von Geschäftsgeheimnissen Dritter darstellen wird."
          ],
          [
            "Die Produkte oder Dienstleistungen Dritter nicht herabsetzen wird, und keine persönlichen Informationen enthalten wird (außer Ihrer E-Mail-Adresse und Ihrem Benutzernamen)."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Hochrisiko-Aktivitäten:"
      },
      {
        "t": "p",
        "s": [
          "Die Dienste von mySmartWindow sind nicht ausfallsicher und wurden nicht für den Einsatz als oder mit Online-Steuerungsausrüstung in gefährlichen Umgebungen, die einen ausfallsicheren Betrieb erfordern, entworfen, hergestellt oder konzipiert."
        ]
      },
      {
        "t": "h",
        "text": "Höhere Gewalt:"
      },
      {
        "t": "p",
        "s": [
          "Keine Partei wird für irgendein Versagen oder Verzögerung in der Leistung oder für den Verlust von Daten gemäß diesen Allgemeinen Geschäftsbedingungen (mit Ausnahme der Verzögerung bei der Zahlung von Geld, das gemäß diesem Vertrag geschuldet und zahlbar ist) verantwortlich sein, soweit diese Versagen oder Verzögerungen direkt durch: (i) Versagen des Dienstes, (ii) natürliche Wetterphänomene, oder (iii) jede andere Ursache, die außerhalb der vernünftigen Kontrolle dieser Partei liegt und ohne ihr Verschulden oder ihre Fahrlässigkeit auftritt, einschließlich, aber nicht beschränkt auf, Versagen von Lieferanten, Subunternehmern und Transportunternehmen, oder das Versäumnis der Partei, ihre Verpflichtungen im Wesentlichen gemäß diesen Allgemeinen Geschäftsbedingungen zu erfüllen, vorausgesetzt, dass in allen diesen Fällen, als Bedingung für den Haftungsausschlussanspruch, die Partei, die die Schwierigkeiten erlebt, die andere Partei umgehend und schriftlich benachrichtigt, mit allen Einzelheiten bezüglich des Vorfalls der Ursache, auf die sie sich stützt."
        ]
      },
      {
        "t": "h",
        "text": "Der Service ist \"WIE ER IST\" verfügbar:"
      },
      {
        "t": "p",
        "s": [
          "Der Service ist \"WIE ER IST\" verfügbar. SIE VERSTEHEN UND AKZEPTIEREN AUSDRÜCKLICH, DASS: (a) IHRE NUTZUNG DES SERVICE AUF EIGENE GEFAHR ERFOLGT. DER SERVICE WIRD \"WIE ER IST\" UND \"WIE VERFÜGBAR\" ZUR VERFÜGUNG GESTELLT. IN DEM AUSMASS, WIE ES DAS GESETZ ERLAUBT, LEHNT mySmartWindow AUSDRÜCKLICH ALLE GARANTIEN UND BEDINGUNGEN JEDER ART AB, OB AUSDRÜCKLICH ODER STILLSCHWEIGEND, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE STILLSCHWEIGENDEN GARANTIEN UND BEDINGUNGEN DER MARKTGÄNGIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. (b) mySmartWindow GARANTIERT NICHT, DASS (i) DER SERVICE ALLE IHRE ANFORDERUNGEN ERFÜLLT, (ii) DER SERVICE UNUNTERBROCHEN, RECHTZEITIG, SICHER ODER FEHLERFREI IST, ODER (iii) ALLE FEHLER IM SERVICE KORRIGIERT WERDEN. (c) JEDES MATERIAL, DAS DURCH DIE NUTZUNG DES SERVICE HERUNTERGELADEN ODER AUF ANDERE WEISE ERHALTEN WIRD, WIRD AUF EIGENE VERANTWORTUNG GETAN UND SIE SIND ALLEIN VERANTWORTLICH FÜR JEDEN SCHADEN AN IHREN COMPUTERSYSTEMEN ODER ANDEREN GERÄTEN ODER DEN VERLUST VON DATEN, DER DURCH DEN DOWNLOAD SOLCHEN MATERIALS VERURSACHT WIRD. (d) KEIN RAT ODER INFORMATIONEN, OB MÜNDLICH ODER SCHRIFTLICH, DIE SIE VON mySmartWindow ODER DURCH ODER AUS DEM SERVICE ERHALTEN, WERDEN IRGENDEINE GARANTIE SCHAFFEN, DIE HIER NICHT AUSDRÜCKLICH GENANNT WIRD."
        ]
      },
      {
        "t": "h",
        "text": "Haftungsbeschränkung:"
      },
      {
        "t": "p",
        "s": [
          "SIE VERSTEHEN UND AKZEPTIEREN AUSDRÜCKLICH, DASS mySmartWindow, SEINE TOCHTERGESELLSCHAFTEN, VERBUNDENEN UNTERNEHMEN UND LIZENZNEHMER, UND UNSERE UND IHRE JEWEILIGEN FÜHRUNGSKRÄFTE, MITARBEITER, AGENTEN UND ERBEN NICHT HAFTBAR GEGENÜBER IHNEN FÜR IRGENDWELCHE DIREKTEN, INDIREKTEN, ZUFÄLLIGEN, BESONDEREN, FOLGE- ODER BEISPIELHAFTEN SCHÄDEN, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF, SCHÄDEN FÜR VERLUST VON GEWINNEN, GOODWILL, NUTZUNG, DATEN, DECKUNG ODER ANDERE IMMATERIELLE VERLUSTE (SELBST WENN mySmartWindow VON DER MÖGLICHKEIT SOLCHER SCHÄDEN UNTERRICHTET WURDE), DIE DURCH: (i) DIE NUTZUNG ODER DIE UNFÄHIGKEIT, DEN SERVICE ZU NUTZEN, (ii) DIE KOSTEN DER BESCHAFFUNG VON WAREN UND DIENSTLEISTUNGEN, DIE DURCH JEGLICHE WAREN, DATEN, INFORMATIONEN ODER DIENSTLEISTUNGEN ERWORBEN O ERHALTEN O NACHRICHTEN EMPFANGEN ODER TRANSAKTIONEN EINGEGANGEN WURDEN ÜBER ODER AUS DEM SERVICE, (iii) UNBEFUGTER ZUGRIFF AUF IHRE ÜBERTRAGUNGEN, INHALTE ODER DATEN ODER DER VERLUST, KORRUPTION ODER ÄNDERUNG DERSELBEN, (iv) AUSSAGEN ODER VERHALTEN DRITTER IN ODER DURCH DIE NUTZUNG DES SERVICE, (v) DIE HANDLUNGEN ODER UNTERLASSUNGEN VON mySmartWindow IN BEZUG AUF DIE ZUVERLÄSSIGKEIT IHRER KONTOINFORMATIONEN UND JEGLICHE ÄNDERUNGEN DARAN, (vi) IHRE FEHLER BEI DER SICHERUNG DER VERTRAULICHKEIT JEGLICHER PASSWÖRTER ODER ZUGANGSRECHTE ZU DEN INFORMATIONEN IHRES KONTOS, (vii) DIE HANDLUNGEN ODER UNTERLASSUNGEN DRITTER, DIE DEN SERVICE NUTZEN ODER MIT IHM INTEGRIERT SIND, (viii) JEGLICHE WERBEINHALTE ODER DIE NUTZUNG ODER DEN ERWERB VON JEGLICHEM BEWORBENEN PRODUKT ODER DIENSTLEISTUNG DURCH SIE, (ix) DIE BEENDIGUNG IHRES KONTOS IN ÜBEREINSTIMMUNG MIT DIESEN BEDINGUNGEN UND BEDINGUNGEN, ODER (x) JEGLICHE ANDERE ANGELEGENHEIT IM ZUSAMMENHANG MIT DEM SERVICE VERURSACHT WERDEN."
        ]
      },
      {
        "t": "h",
        "text": "Ausschlüsse und Einschränkungen."
      },
      {
        "t": "p",
        "s": [
          "NICHTS IN DIESEN GESCHÄFTSBEDINGUNGEN IST DAZU BESTIMMT, IRGENDEINE BEDINGUNG, GARANTIE, RECHT ODER HAFTUNG AUSZUSCHLIESSEN ODER ZU BESCHRÄNKEN, DIE NICHT GESETZLICH AUSGESCHLOSSEN ODER BESCHRÄNKT WERDEN KANN. EINIGE GERICHTSBARKEITEN ERLAUBEN DIE AUSNAHME BESTIMMTER GARANTIEN ODER BEDINGUNGEN ODER DIE BESCHRÄNKUNG ODER AUSNAHME DER HAFTUNG FÜR SCHÄDEN ODER VERLUSTE, DIE DURCH FAHRLÄSSIGKEIT, VERTRAGSBRUCH ODER STILLSCHWEIGENDE BEDINGUNGEN, ODER ZUFÄLLIGE ODER FOLGESCHÄDEN VERURSACHT WERDEN. DAHER GELTEN NUR DIESE EINSCHRÄNKUNGEN FÜR SIE, DIE IN IHRER GERICHTSBARKEIT GESETZLICH ZULÄSSIG SIND (WENN ES SOLCHE GIBT), UND UNSERE HAFTUNG IST AUF DAS MAXIMUM BESCHRÄNKT, DAS DAS GESETZ ERLAUBT."
        ]
      }
    ]
  },
  "fr": {
    "pageTitle": "Termes et Conditions de Service",
    "title": "Conditions générales de service",
    "version": "Version de ce document : 1.0",
    "copyright": "© 2022 - IoT FENSTER, S.L.",
    "logoAlt": "Logo IoT Fenster",
    "blocks": [
      {
        "t": "h",
        "text": "Bienvenue sur mySmartWindow, mais avant de commencer à utiliser notre service, vous devez accepter nos Conditions générales de service :"
      },
      {
        "t": "p",
        "s": [
          "Merci de votre intérêt pour mySmartWindow ! Nous vous invitons à accéder et à utiliser le service mySmartWindow pour profiter d'une fenêtre ou d'une porte toujours connectée avec un potentiel IoT. Veuillez noter que votre inscription et l'utilisation du service et du site web mySmartWindow sont soumises à votre acceptation de ces Conditions générales de service. Le service mySmartWindow est fourni sous réserve de certaines limitations et conditions d'utilisation conformes à la loi. Nous pourrions être amenés à modifier ces Conditions générales de temps à autre, et nous nous réservons le droit de le faire. Veuillez consulter cette page pour obtenir de nouvelles informations, la version de cet accord et sa date d'entrée en vigueur."
        ]
      },
      {
        "t": "h",
        "text": "Ce document est un contrat, veuillez donc le lire attentivement :"
      },
      {
        "t": "p",
        "s": [
          "Ce document décrit en détail vos droits relatifs au Service, veuillez donc examiner attentivement ces Conditions générales. Ces Conditions générales de service constituent un contrat entre nous. Si vous n'acceptez pas ces Conditions, vous n'aurez pas le droit d'accéder à notre Service ou de l'utiliser à distance, c'est-à-dire depuis l'extérieur de votre domicile. Si vous n'acceptez pas, vos fenêtres et portes fonctionneront uniquement en mode local et ne seront pas prises en charge par le cloud, ce qui signifie que certains services ne seront pas accessibles. Si vous utilisez notre Service, votre utilisation sera considérée comme une acceptation des Conditions et votre consentement à être partie à cet accord contraignant."
        ]
      },
      {
        "t": "h",
        "text": "En utilisant ce Service, vous reconnaissez, acceptez et adhérez à toutes les Conditions, y compris la Politique de confidentialité :"
      },
      {
        "t": "p",
        "s": [
          "En utilisant le Service, vous reconnaissez, acceptez et adhérez à toutes les conditions de la Politique de confidentialité, y compris, sans limitation, l'utilisation et le traitement de vos Informations de compte et Contenus conformément à cette Politique de confidentialité."
        ]
      },
      {
        "t": "h",
        "text": "Parties à cet Accord :"
      },
      {
        "t": "p",
        "s": [
          "Vous êtes l'une des parties à ce contrat. L'autre partie est IoT FENSTER S.L, une société privée basée en Espagne avec son siège social à Fuente Álamo - Murcie, et désignée dans ces Conditions générales de service comme \"mySmartWindow\", \"nous\", et parfois \"notre\"."
        ]
      },
      {
        "t": "h",
        "text": "Les Conditions générales de cet Accord peuvent changer :"
      },
      {
        "t": "p",
        "s": [
          "Cet Accord sera très probablement sujet à des modifications, en raison des évolutions de notre Service et des lois applicables à vous et à nous. Si nous apportons des modifications, nous ferons tout notre possible pour vous en informer à l'avance. Cependant, dans certaines situations, comme lorsque des modifications sont nécessaires pour se conformer aux exigences légales applicables, ces modifications peuvent devoir prendre effet immédiatement. Nous publierons les modifications ici sur notre site web et nous pourrons également choisir de vous en informer en envoyant un e-mail à l'adresse que vous nous avez fournie. Nous essaierons également d'expliquer les raisons de ces modifications. Si ces Conditions sont mises à jour, vous êtes libre de décider d'accepter ces modifications ou d'arrêter d'utiliser notre Service. Votre utilisation continue du Service après l'entrée en vigueur de cette mise à jour sera considérée comme une acceptation des nouvelles Conditions et votre consentement à être lié par celles-ci. Sauf modifications effectuées par nous comme décrit ici, aucune modification ou amendement à ces Conditions ne sera effectif s'il n'est pas établi dans un accord écrit signé par vous et nous. Pour plus de clarté, les e-mails et autres communications ne constituent pas un accord écrit effectif à cette fin."
        ]
      },
      {
        "t": "h",
        "text": "Description du service mySmartWindow :"
      },
      {
        "t": "p",
        "s": [
          "Le service mySmartWindow CLOUD consiste en un site web et un serveur Cloud qui prend en charge les communications de l'extérieur de la maison vers les communications avec vos fenêtres et portes. Les services et produits mySmartWindow proposés par IoT FENSTER S.L, grâce au service mySmartWindow CLOUD, offrent d'autres services complémentaires tels que les services d'alerte. mySmartWindow permet à ses utilisateurs de collecter, stocker et partager les données de leurs appareils, de les gérer et de les programmer. En échange de l'utilisation du Service, vous acceptez d'être lié par ces Conditions."
        ]
      },
      {
        "t": "h",
        "text": "IoT FENSTER S.L n'est pas responsable du Contenu et des Données Utilisateur fournis par d'autres utilisateurs :"
      },
      {
        "t": "p",
        "s": [
          "IoT FENSTER S.L ne filtre ni ne contrôle les Données Utilisateur ou le Contenu, et ne passe pas en revue, ne vérifie, n'approuve ni ne confirme l'exactitude des Données Utilisateur ou du Contenu Utilisateur. Ni ces Conditions Générales, ni votre utilisation du Service, ni la fourniture du Service par mySmartWindow, ni l'accès/le stockage/l'utilisation des Données et du Contenu Utilisateur par IoT FENSTER S.L n'impliquent ou ne créent une quelconque responsabilité de la part de mySmartWindow pour les Données Utilisateur fournies par d'autres utilisateurs et incluses dans le Service. Votre accès et votre utilisation du Service ou de tout Contenu se font à vos propres risques."
        ]
      },
      {
        "t": "p",
        "s": [
          "Le service mySmartWindow CLOUD stocke temporairement des données sur la température, l'humidité, le CO2, l'ouverture, l'état du volet roulant ou l'état d'ouverture. De cette manière, nous pouvons vous fournir un historique de fonctionnement et des graphiques d'efficacité. Si vous n'acceptez pas les conditions, ces services ne seront pas proposés et le serveur ne stockera aucune donnée temporaire."
        ]
      },
      {
        "t": "p",
        "s": [
          "Les données historiques de vos fenêtres seront stockées sous forme cryptée dans la base de données mySmartWindow CLOUD et ne seront à aucun moment liées à vos données personnelles dans les mêmes tables. Toutes les données seront identifiées par un identifiant utilisateur alphanumérique."
        ]
      },
      {
        "t": "p",
        "s": [
          "Le service mySmartWindow CLOUD est fourni \"TEL QUEL\" et \"SELON DISPONIBILITÉ\" :"
        ]
      },
      {
        "t": "p",
        "s": [
          "Vous comprenez et acceptez que le Service vous est fourni \"TEL QUEL\" et \"SELON DISPONIBILITÉ\". Jusqu'à nouvel ordre, le service mySmartWindow CLOUD est proposé en tant qu'édition logicielle Bêta, ce qui signifie qu'il N'Y A AUCUN ACCORD DE NIVEAU DE SERVICE ET AUCUNE GARANTIE DE DISPONIBILITÉ DU SERVICE. IoT FENSTER S.L DÉCLINE TOUTE GARANTIE, EXPRESSE OU IMPLICITE, DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER OU D'ABSENCE DE CONTREFAÇON. mySmartWindow ne saurait être tenu responsable de toute perte de données ou de tout autre dommage résultant de votre accès ou de votre utilisation du Service. Vous acceptez également que IoT FENSTER S.L ne soit en aucun cas responsable de la suppression, de la non-conservation ou de la non-transmission de tout contenu stocké par le Service. IoT FENSTER S.L ne garantit pas que le Service répondra à vos exigences ou sera disponible de manière ininterrompue, sécurisée ou sans erreur. Aucun conseil ou information obtenu auprès de IoT FENSTER S.L, qu'il soit oral ou écrit, ne pourra créer une garantie non expressément stipulée dans les présentes."
        ]
      },
      {
        "t": "h",
        "text": "Inscrivez-vous en tant qu'utilisateur de mySmartWindow en créant un compte :"
      },
      {
        "t": "p",
        "s": [
          "Vous devez d'abord créer un compte mySmartWindow. Vous créez un compte en nous fournissant un nom d'utilisateur et une adresse e-mail acceptables, ainsi qu'en créant un mot de passe. Nous appelons cela vos \"Informations de compte\". Nous vous recommandons d'utiliser une combinaison de nom d'utilisateur et de mot de passe distincte et non évidente, idéalement différente de celles que vous utilisez pour d'autres services. Vous êtes responsable de l'exactitude, de l'intégrité et de la confidentialité de vos Informations de compte, et vous serez tenu responsable de toutes les activités qui se déroulent sous votre compte, y compris celles d'autres personnes à qui vous avez fourni vos Informations de compte. Nous ne serons pas responsables des pertes ou dommages causés par votre incapacité à nous fournir des informations exactes ou à assurer la sécurité de vos Informations de compte. Si vous découvrez une utilisation non autorisée de vos Informations de compte ou soupçonnez que quelqu'un pourrait accéder à votre contenu privé, vous devez immédiatement modifier votre mot de passe et en informer notre service client."
        ]
      },
      {
        "t": "p",
        "s": [
          "De plus, mySmartWindow n'est pas responsable de la disponibilité d'Internet et des autres services de télécommunications nécessaires pour accéder au Service."
        ]
      },
      {
        "t": "h",
        "text": "Vos droits en tant qu'utilisateur :"
      },
      {
        "t": "p",
        "s": [
          "Une fois que vous avez créé un compte et accepté ces Conditions, nous vous accordons une licence limitée et non exclusive pour utiliser le Service, sous réserve de ces Conditions, dans la mesure où aucune loi applicable ne vous empêche de recevoir le Service, jusqu'à ce que vous fermiez volontairement votre compte ou que nous le fermions conformément à ces Conditions. De plus, nous vous accordons une licence personnelle, mondiale, libre de redevances, non transférable et non exclusive pour utiliser l'APP et le Service mySmartWindow CLOUD, jusqu'à l'expiration de vos droits en vertu de cette licence et/ou de ces Conditions. Vous n'obtenez aucun autre droit ou intérêt sur mySmartWindow ou le Service."
        ]
      },
      {
        "t": "h",
        "text": "Votre utilisation de mySmartWindow et de son Contenu :"
      },
      {
        "t": "p",
        "s": [
          "Votre utilisation du Service doit être conforme à ces Conditions. En ce qui concerne votre utilisation de mySmartWindow, vous acceptez d'être responsable de votre propre conduite et de toutes les actions effectuées sur votre compte. Cela signifie que tout Contenu - comme les données de vos appareils, textes, fichiers de tout type (images, vidéos et tout autre élément que vous pouvez imaginer), quel que soit son format ou sa structure technique (collectivement, le \"Contenu\") - créé, transmis, stocké ou affiché dans votre compte, relève de votre seule responsabilité en tant que créateur de votre compte utilisateur et seule personne en ayant connaissance. Cela s'applique même si le Contenu est privé, partagé ou transmis via le Service ou toute application ou service tiers intégré à mySmartWindow."
        ]
      },
      {
        "t": "h",
        "text": "Protection des données et Contenu utilisateur :"
      },
      {
        "t": "ul",
        "items": [
          [
            "Vos données vous appartiennent : Vous conservez vos droits et tous les autres droits relatifs à vos graphiques temporaires collectés par les appareils, avant de les soumettre, publier ou afficher sur ou via le Service ou tout autre moyen. Cependant, vous devez accorder à mySmartWindow une licence limitée, comme décrit ci-dessous, afin que nous puissions rendre vos données accessibles et utilisables sur le Service. En dehors de cette licence limitée et des autres droits que vous accordez dans ces Conditions, mySmartWindow reconnaît et accepte que nous n'obtenons aucun autre droit, titre ou intérêt sur votre Contenu en vertu de ces Conditions. Pour permettre à mySmartWindow d'exploiter le Service, nous devons obtenir de votre part certaines licences et autres droits sur le Contenu que vous nous soumettez afin que le traitement, la maintenance, le stockage, la reproduction technique, la sauvegarde et la distribution de votre Contenu ne violent pas les lois applicables en matière de droits d'auteur et autres réglementations. Cela signifie qu'en utilisant le Service, vous accordez à mySmartWindow une licence pour afficher, exécuter et distribuer votre Contenu, ainsi que pour le modifier (pour des raisons techniques, par exemple pour s'assurer que le Contenu peut être affiché sur les smartphones et les ordinateurs) et le reproduire afin de permettre à mySmartWindow d'exploiter le Service. Vous acceptez également que mySmartWindow ait le droit de ne pas accepter, publier, stocker, afficher ou transmettre tout Contenu de manière anonyme sans fournir aucune donnée utilisateur. Vous convenez que ces droits d'auteur et licences sont libres de redevances, irrévocables et applicables dans le monde entier (tant que votre Contenu est hébergé chez nous) et incluent le droit de mySmartWindow de rendre ce Contenu accessible à des tiers avec lesquels mySmartWindow a des relations contractuelles uniquement dans le cadre de la fourniture du Service mySmartWindow. De plus, vous acceptez que, en acceptant ces Conditions, vos informations non personnelles puissent être transférées par mySmartWindow via ses API à d'autres développeurs d'APP afin que ces applications tierces puissent vous permettre d'accéder à vos services mySmartWindow pour fenêtres et portes. En accordant ces droits, vous garantissez que vous ne violez pas les droits d'aucune personne ou tierce partie. Enfin, vous comprenez et acceptez que mySmartWindow, dans le cadre de la mise en œuvre des étapes techniques nécessaires à la fourniture du Service, puisse adapter vos données non personnelles aux exigences techniques des réseaux, appareils, services ou médias connectés."
          ],
          [
            "Vos données et votre Contenu sont protégés : La sécurité de vos données est d'une importance capitale pour nous, et nous faisons tout notre possible pour garantir leur sûreté et leur protection. Cependant, nous n'assumons aucune responsabilité en cas de perte ou de diffusion non autorisée de votre Contenu. Votre confidentialité est également une de nos priorités, et nous espérons ne jamais devoir examiner le Contenu de quiconque. Cependant, certaines circonstances peuvent nous obliger à examiner partiellement ou totalement votre Contenu, comme expliqué dans notre Politique de confidentialité. Sauf disposition contraire dans ces Conditions et notre Politique de confidentialité, à moins que vous n'autorisiez d'autres personnes à voir ou accéder au Contenu que vous soumettez au Service, personne d'autre ne devrait voir votre Contenu sans votre consentement. Bien entendu, si vous choisissez de publier ou partager votre Contenu via un flux, ou en créant un service web pour le publier, alors vous autorisez chaque utilisateur habilité à accéder, utiliser, afficher, exécuter, distribuer et modifier votre Contenu (sous réserve des engagements ou accords que vous avez conclus avec ces utilisateurs sans l'implication de mySmartWindow). En outre, mySmartWindow vous permet d'utiliser divers services et applications tiers qui interagissent avec le Service et votre Contenu. Vous devez examiner les droits d'accès que vous accordez à ces services ou applications, car vous pourriez leur permettre d'accéder à votre Contenu via vos accords avec ces tiers."
          ],
          [
            "Vos données et votre Contenu sont portables : mySmartWindow s'engage à garantir la portabilité de vos données. Cela signifie que nous intégrerons des outils à notre Service et notre Logiciel pour vous permettre de partager ou d'exporter vos Données et Contenus sous forme de fichiers ou de les rendre accessibles via des services web ou des API. Tous ces outils seront disponibles tant que votre compte restera actif, sous réserve du respect de notre Politique de confidentialité. Si vous rencontrez des difficultés pour exporter vos Données ou Contenus, vous pouvez contacter notre service client qui fera de son mieux pour répondre à votre demande dans le respect de notre Politique de confidentialité et des obligations légales."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Droit de mySmartWindow de modifier le Service :"
      },
      {
        "t": "p",
        "s": [
          "Nous nous réservons le droit, à notre seule discrétion, d'implémenter de nouveaux éléments dans le cadre du Service et/ou en complément de tout logiciel APP mySmartWindow, y compris des modifications pouvant affecter le fonctionnement précédent du Service. Nous espérons que ces modifications amélioreront le Service dans son ensemble, mais vous pourriez ne pas être d'accord avec nous. Nous nous réservons également le droit d'imposer certaines limites sur la nature ou la taille de l'espace de stockage disponible, le nombre de transmissions et d'e-mails, l'exécution de votre code, votre Contenu et d'autres données, ainsi que d'imposer d'autres restrictions à tout moment, avec ou sans préavis. Par exemple, si vous utilisez le service mySmartWindow gratuit, vous ne bénéficierez pas de toutes les fonctionnalités offertes aux utilisateurs du service mySmartWindow premium. Vous reconnaissez également que certaines actions de mySmartWindow peuvent rendre difficile ou impossible l'accès à votre Contenu ou l'utilisation du Service à certains moments et/ou de la même manière, de manière temporaire ou permanente, et vous acceptez que mySmartWindow ne puisse être tenu responsable envers vous ou tout tiers pour toute modification, suspension ou interruption d'une partie du Service."
        ]
      },
      {
        "t": "h",
        "text": "Stockage de vos Données et Contenu :"
      },
      {
        "t": "p",
        "s": [
          "Le Service mySmartWindow CLOUD est disponible dans le monde entier, mais nos opérations de traitement des données sont effectuées en Espagne. Si vous utilisez le Service, vous reconnaissez que vous pouvez envoyer des communications électroniques (y compris vos informations de compte personnel et votre Contenu) via des réseaux informatiques appartenant à mySmartWindow et à des tiers situés au Royaume-Uni, en Europe et ailleurs. Par conséquent, l'utilisation du Service entraînera probablement la transmission internationale de données, et votre utilisation du Service constitue votre consentement à ces transmissions. mySmartWindow peut modifier l'emplacement de ses opérations de traitement sans préavis ni consentement de votre part."
        ]
      },
      {
        "t": "h",
        "text": "En cas de fermeture de votre compte :"
      },
      {
        "t": "p",
        "s": [
          "Vous pouvez fermer votre compte à tout moment, pour n'importe quelle raison (ou sans raison), sans même nous en informer. Toutefois, si vous souhaitez désactiver votre compte, vous devez suivre certaines étapes spécifiques décrites dans notre documentation. mySmartWindow peut suspendre l'accès à votre compte ou le fermer, avec ou sans préavis, conformément à ces Conditions. Les raisons pouvant justifier la suspension ou la résiliation de votre compte par mySmartWindow incluent, sans s'y limiter : (i) la violation de ces Conditions ou de tout Accord distinct, (ii) une période prolongée d'inactivité (déterminée à la seule discrétion de mySmartWindow), (iii) votre non-paiement de frais ou de montants dus à mySmartWindow ou à un tiers en lien avec votre utilisation du Service (ou d'une partie de celui-ci), ou (vi) des problèmes techniques ou de sécurité. Dans la plupart des cas, si nous décidons de fermer votre compte, nous vous en informerons au moins 30 jours à l'avance à l'adresse e-mail que vous nous avez fournie, afin que vous puissiez récupérer tout Contenu stocké sur les serveurs de mySmartWindow (sauf si nous sommes légalement empêchés de vous permettre de le faire). Une fois ce délai expiré, vous ne pourrez plus récupérer le Contenu de ce compte ni utiliser le Service via ce compte."
        ]
      },
      {
        "t": "h",
        "text": "Clause de non-responsabilité, Droits d'auteur et Informations sur les Marques :"
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow et le logo mySmartWindow sont des marques déposées."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow a fait tous les efforts nécessaires pour garantir l’exactitude et la fiabilité des informations fournies sur le site web ou dans l’application mySmartWindow. Toutefois, ces informations sont fournies sans garantie. mySmartWindow décline toute responsabilité quant à l’exactitude, le contenu, l’exhaustivité ou la fiabilité des informations."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow stocke des informations et l’historique des transactions sur son serveur afin de vous afficher ces informations et de générer des statistiques d’efficacité pour votre foyer. mySmartWindow se réserve le droit de transmettre ces informations de manière anonyme à des entreprises tierces afin de créer des statistiques de consommation, des modèles prédictifs, etc."
        ]
      },
      {
        "t": "p",
        "s": [
          "Si vous n’acceptez pas ces conditions, aucune donnée ne sera enregistrée sur le serveur et vous ne pourrez accéder qu’au mode local sans bénéficier de ces services."
        ]
      },
      {
        "t": "h",
        "text": "Liens vers des tiers :"
      },
      {
        "t": "p",
        "s": [
          "Nous pouvons inclure ou recommander des ressources, des documents et des développeurs tiers et/ou des liens vers des sites web et des applications tierces dans le cadre du Service ou en relation avec celui-ci. Nous n'avons aucun contrôle sur ces sites ou développeurs et, en conséquence, vous reconnaissez et acceptez que : (i) nous ne sommes pas responsables de la disponibilité de ces sites ou applications, (ii) nous ne sommes pas responsables du contenu, des matériaux ou des fonctionnalités disponibles sur ces sites ou applications, et (iii) nous ne pourrons être tenus responsables, directement ou indirectement, de tout dommage ou perte causé ou présumé causé par l'utilisation ou la confiance accordée à ces contenus, matériaux ou applications."
        ]
      },
      {
        "t": "h",
        "text": "Indemnisation :"
      },
      {
        "t": "p",
        "s": [
          "Vous acceptez de protéger et d’indemniser mySmartWindow, ses filiales, affiliés, dirigeants, agents, employés, annonceurs et partenaires contre toute réclamation, responsabilité, dommage (direct et indirect), perte et dépense (y compris les frais juridiques et professionnels), résultant ou lié à des réclamations de tiers concernant votre utilisation du Service, toute violation des présentes Conditions d’utilisation ou toute autre action liée à votre utilisation du Service (y compris toutes les actions effectuées sur votre compte). En cas de réclamation, nous vous informerons à l'adresse de contact associée à votre compte, étant entendu que tout manquement à cette obligation de notification ne réduira ni n’éliminera votre obligation d’indemnisation."
        ]
      },
      {
        "t": "h",
        "text": "Blog et forum :"
      },
      {
        "t": "p",
        "s": [
          "Le service de blog et de forum vous permet de participer à des discussions et des blogs sur les sujets liés à mySmartWindow."
        ]
      },
      {
        "t": "p",
        "s": [
          "Vous pouvez également publier un message sur le forum mySmartWindow. Vous reconnaissez et acceptez que si vous soumettez du Contenu sur le forum, vous êtes seul responsable de ce Contenu. mySmartWindow ne pourra en aucun cas être tenu responsable du Contenu soumis."
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "Vous acceptez également que :"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "Vous ne soumettrez aucun Contenu harcelant, offensant, menaçant, nuisible, diffamatoire ou encourageant une conduite pouvant constituer une infraction pénale ou engager une responsabilité civile, ou tout autre Contenu illégal."
          ],
          [
            "Vous ne soumettrez aucun Contenu protégé par des droits de propriété intellectuelle ou des droits de confidentialité, sauf si vous en détenez les droits ou avez obtenu toutes les autorisations nécessaires. Vous serez seul responsable de toute violation des droits d’auteur, des marques commerciales ou de tout autre droit de propriété."
          ],
          [
            "Vous ne soumettrez aucun Contenu contenant un virus ou tout autre élément nuisible."
          ],
          [
            "Vous ne vous livrerez à aucune activité qui interfère avec l'utilisation du site Web par d'autres utilisateurs ou la perturbe."
          ],
          [
            "Vous ne soumettrez aucun Contenu encourageant des activités illégales ou fournissant des conseils ou instructions pour de telles activités."
          ],
          [
            "Vous ne ferez aucune fausse déclaration, y compris en usurpant l’identité d’une personne ou d’une entité ou en prétendant être associé à une personne ou entité."
          ],
          [
            "Vous n’utiliserez pas le forum mySmartWindow à des fins commerciales, telles que la publicité d’un produit ou service, la revente ou la publication d’informations transmises ou publiées sans consentement écrit."
          ]
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow ne prévisualise pas, ne surveille pas et n'édite pas le contenu soumis aux forums. Cependant, mySmartWindow se réserve le droit d'éditer, de limiter ou de supprimer tout contenu à sa seule discrétion. Néanmoins, vous êtes seul responsable de tout contenu que vous soumettez ou publiez."
        ]
      },
      {
        "t": "p",
        "s": [
          "En soumettant du contenu, par quelque moyen que ce soit, au forum ou au blog de mySmartWindow, vous accordez à mySmartWindow un droit et une licence perpétuels, libres de redevances, irrévocables, non exclusifs et mondiaux pour utiliser, divulguer, afficher, exécuter, reproduire, modifier, adapter, publier, traduire et distribuer ce contenu ou pour incorporer ce contenu sous quelque forme, média ou technologie que ce soit, connue actuellement ou développée ultérieurement. En outre, mySmartWindow est libre d'utiliser les idées, concepts, savoir-faire ou techniques contenus dans ces informations à quelque fin que ce soit, y compris, mais sans s'y limiter, la recherche, le développement, la fabrication et la commercialisation de produits et d'autres éléments incorporant ces idées. Si vous n'êtes pas le propriétaire du contenu soumis, vous garantissez que vous avez reçu tous les consentements nécessaires de la part du propriétaire de ces droits. Vous indemniserez mySmartWindow si le contenu soumis enfreint ces droits."
        ]
      },
      {
        "t": "p",
        "s": [
          "En participant à un blog ou à un forum, vous pouvez entrer en contact avec un contenu inexact, incomplet ou autrement inapproprié. Vous devez faire preuve d'une extrême prudence à l'égard de tout Contenu publié ou transmis sur un forum ou un blog de mySmartWindow. mySmartWindow vous recommande vivement de ne prendre aucune mesure sur la base d'un tel Contenu. mySmartWindow n'est pas responsable du Contenu ou de l'exactitude de ces informations, et ne peut être tenu responsable de toute action ou décision prise sur la base de ces informations."
        ]
      },
      {
        "t": "p",
        "s": [
          "En contrepartie des efforts de mySmartWindow pour améliorer la Plateforme et ses produits et services associés et pour répondre aux suggestions des utilisateurs, vous acceptez de transférer ces idées, concepts, savoir-faire ou techniques à mySmartWindow sans aucune compensation en retour."
        ]
      },
      {
        "t": "p",
        "s": [
          "Vous acceptez également de signer tous les documents que mySmartWindow peut raisonnablement demander en relation avec la confirmation par mySmartWindow de la propriété et de votre droit illimité d'utiliser ces idées, concepts, savoir-faire et techniques"
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "En soumettant des commentaires à mySmartWindow par quelque moyen que ce soit, que ce soit par le biais du blog, du forum, de la boîte à idées des clients ou autre, vous êtes seul responsable du contenu de tous les commentaires que vous faites. Vous acceptez que tout commentaire que vous soumettez à mySmartWindow :"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "Violer les droits d'un tiers, y compris, mais sans s'y limiter, les droits d'auteur, les marques commerciales, la confidentialité ou d'autres droits personnels ou de propriété."
          ],
          [
            "Être diffamatoire ou contenir des propos diffamatoires ou autrement illégaux, insultants ou obscènes, ou constituer une appropriation illicite des secrets commerciaux d'un tiers."
          ],
          [
            "Dénigrer les produits ou services d'un tiers, ou contenir des informations personnelles (autres que votre adresse électronique et votre nom d'utilisateur)."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Activités à haut risque :"
      },
      {
        "t": "p",
        "s": [
          "Les services mySmartWindow ne sont pas à l’épreuve des pannes et ne sont pas conçus, fabriqués ou destinés à être utilisés comme ou avec un équipement de surveillance en ligne dans des environnements dangereux nécessitant un fonctionnement sûr."
        ]
      },
      {
        "t": "h",
        "text": "Force Majeure :"
      },
      {
        "t": "p",
        "s": [
          "Aucune des parties ne sera tenue responsable d'un retard ou d'un manquement à l'exécution de ses obligations, ni de toute perte de données en vertu de ces Conditions Générales (à l'exception d'un retard de paiement d'une somme due), dans la mesure où ce retard ou cet échec est directement causé par : (i) des défaillances du Service, (ii) des phénomènes météorologiques naturels, ou (iii) toute autre cause échappant au contrôle raisonnable de cette partie et ne résultant ni d'une faute ni d'une négligence de sa part, y compris, mais sans s'y limiter, les défaillances des fournisseurs, sous-traitants et transporteurs, à condition que la partie concernée informe rapidement l’autre partie par écrit, en fournissant tous les détails relatifs à l’événement invoqué."
        ]
      },
      {
        "t": "h",
        "text": "Le Service est disponible \"TEL QUEL\" :"
      },
      {
        "t": "p",
        "s": [
          "Le Service est disponible \"TEL QUEL\". VOUS COMPRENEZ ET ACCEPTEZ EXPRESSÉMENT QUE : (a) VOTRE UTILISATION DU SERVICE SE FAIT À VOS PROPRES RISQUES. LE SERVICE EST FOURNI SUR UNE BASE \"TEL QUEL\" ET \"TEL QUE DISPONIBLE\". DANS LA LIMITE AUTORISÉE PAR LA LOI, mySmartWindow DÉCLINE EXPRESSÉMENT TOUTE GARANTIE ET CONDITION DE QUELQUE NATURE QUE CE SOIT, EXPRESSE OU IMPLICITE, Y COMPRIS MAIS SANS S'Y LIMITER, LES GARANTIES ET CONDITIONS IMPLICITES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER ET DE NON-CONTREFAÇON. (b) mySmartWindow NE GARANTIT PAS QUE (i) LE SERVICE RÉPONDRA À TOUTES VOS EXIGENCES, (ii) LE SERVICE SERA ININTERROMPU, SÛR OU EXEMPT D'ERREURS, OU (iii) TOUS LES DYSFONCTIONNEMENTS SERONT CORRIGÉS. (c) TOUT MATÉRIEL TÉLÉCHARGÉ OU OBTENU PAR L'UTILISATION DU SERVICE SE FAIT À VOTRE PROPRE DISCRÉTION ET À VOS RISQUES, ET VOUS SEREZ SEUL RESPONSABLE DE TOUT DOMMAGE À VOS SYSTÈMES INFORMATIQUES OU PERTES DE DONNÉES RÉSULTANT DE CE TÉLÉCHARGEMENT. (d) AUCUN CONSEIL OU INFORMATION, QU'IL SOIT ORAL OU ÉCRIT, OBTENU PAR VOUS AUPRÈS DE mySmartWindow OU DU SERVICE, NE CRÉERA DE GARANTIE NON EXPRESSÉMENT MENTIONNÉE DANS CES CONDITIONS."
        ]
      },
      {
        "t": "h",
        "text": "Limitation de responsabilité :"
      },
      {
        "t": "p",
        "s": [
          "VOUS COMPRENEZ ET ACCEPTEZ EXPRESSÉMENT QUE mySmartWindow, SES FILIALES, AFFILIÉS ET CONCÉDANTS DE LICENCE, AINSI QUE LEURS DIRIGEANTS, EMPLOYÉS, AGENTS ET REPRÉSENTANTS NE SERONT PAS TENUS RESPONSABLES ENVERS VOUS DE TOUT DOMMAGE DIRECT, INDIRECT, ACCESSOIRE, SPÉCIAL, CONSÉCUTIF OU EXEMPLAIRE, Y COMPRIS, MAIS SANS S'Y LIMITER, LES PERTES DE PROFITS, DE CLIENTÈLE, D'UTILISATION, DE DONNÉES OU D'AUTRES PERTES INTANGIBLES (MÊME SI mySmartWindow A ÉTÉ INFORMÉE DE LA POSSIBILITÉ DE TELS DOMMAGES) CAUSÉS PAR : (i) L’UTILISATION OU L’IMPOSSIBILITÉ D’UTILISER LE SERVICE, (ii) LE COÛT DE L’ACHAT DE BIENS ET SERVICES DE SUBSTITUTION RÉSULTANT DE BIENS, DONNÉES, INFORMATIONS OU SERVICES ACHETÉS OU OBTENUS VIA LE SERVICE, (iii) UN ACCÈS NON AUTORISÉ À VOS TRANSMISSIONS, CONTENUS OU DONNÉES OU LEUR PERTE, CORRUPTION OU MODIFICATION, (iv) LES DÉCLARATIONS OU COMPORTEMENTS DE TIERS SUR LE SERVICE, (v) LES ACTIONS OU OMISSIONS DE mySmartWindow CONCERNANT LA FIABILITÉ DE VOS INFORMATIONS DE COMPTE, (vi) LA PROTECTION INSUFFISANTE DES MOTS DE PASSE OU DROITS D'ACCÈS, (vii) LES ACTIONS OU OMISSIONS DE TIERS UTILISANT OU INTÉGRANT LE SERVICE, (viii) TOUT CONTENU PUBLICITAIRE OU VOTRE UTILISATION DE PRODUITS OU SERVICES ANNONCÉS, (ix) LA RÉSILIATION DE VOTRE COMPTE CONFORMÉMENT À CES CONDITIONS, OU (x) TOUT AUTRE ÉLÉMENT LIÉ AU SERVICE."
        ]
      },
      {
        "t": "h",
        "text": "Exclusions et Limitations"
      },
      {
        "t": "p",
        "s": [
          "RIEN DANS CES CONDITIONS GÉNÉRALES N'A POUR OBJECTIF D'EXCLURE OU DE LIMITER UNE CONDITION, UNE GARANTIE, UN DROIT OU UNE RESPONSABILITÉ QUI NE PEUT ÊTRE LÉGALEMENT EXCLUE OU LIMITÉE. CERTAINES JURIDICTIONS N'AUTORISENT PAS L'EXCLUSION DE CERTAINES GARANTIES OU CONDITIONS, NI LA LIMITATION OU L'EXCLUSION DE RESPONSABILITÉ POUR DES DOMMAGES OU PERTES CAUSÉS PAR NÉGLIGENCE, VIOLATION DE CONTRAT OU TERMES IMPLICITES, OU POUR DES DOMMAGES ACCESSOIRES OU CONSÉCUTIFS. PAR CONSÉQUENT, SEULES LES LIMITATIONS QUI SONT LÉGALEMENT APPLICABLES DANS VOTRE JURIDICTION S'APPLIQUENT À VOUS, ET NOTRE RESPONSABILITÉ EST LIMITÉE DANS LA MESURE MAXIMALE PERMISE PAR LA LOI."
        ]
      }
    ]
  },
  "pt": {
    "pageTitle": "Termos e Condições de Serviço",
    "title": "Termos e Condições de Serviço",
    "version": "Versão deste documento: 1.0",
    "copyright": "© 2022 - IoT FENSTER, S.L.",
    "logoAlt": "Logo IoT Fenster",
    "blocks": [
      {
        "t": "h",
        "text": "Bem-vindo ao mySmartWindow, mas antes de começar a usar nosso serviço, você deve aceitar nossos Termos e Condições de Serviço:"
      },
      {
        "t": "p",
        "s": [
          "Obrigado por se interessar pelo mySmartWindow! Convidamos você a acessar e usar o Serviço mySmartWindow para desfrutar de uma janela ou porta sempre conectada e com potencial IoT. Por favor, note que seu registro no serviço e no site mySmartWindow e seu uso dos mesmos estão sujeitos à aceitação destes Termos e Condições de Serviço. O serviço mySmartWindow é oferecido com certas limitações e condições de uso que cumprem a legislação. Podemos precisar mudar estes Termos e Condições de vez em quando, e nos reservamos o direito de fazê-lo. Por favor, verifique aqui as novas informações, a versão deste contrato e a data de sua entrada em vigor."
        ]
      },
      {
        "t": "h",
        "text": "Este documento é um contrato, então por favor leia-o cuidadosamente:"
      },
      {
        "t": "p",
        "s": [
          "Este documento descreve em detalhes seus direitos em relação ao Serviço, então por favor revise cuidadosamente estes Termos e Condições. Estes Termos e Condições de Serviço constituem um contrato entre nós. Se você não aceitar estes Termos, não terá direito de acessar nosso Serviço nem de usá-lo remotamente, ou seja, de fora de sua casa.",
          {
            "b": "Se você não aceitar, suas janelas e portas só poderão funcionar em modo local e não terão o suporte da nuvem e, portanto, alguns dos serviços não serão acessíveis"
          },
          ". Se você usar nosso Serviço, seu uso será considerado como uma aceitação dos Termos e como seu consentimento em ser parte deste acordo vinculativo."
        ]
      },
      {
        "t": "h",
        "text": "Ao utilizar este serviço, você reconhece, concorda e aceita todas as Condições, incluindo a Política de Privacidade:"
      },
      {
        "t": "p",
        "s": [
          "Ao utilizar o Serviço, você reconhece, aceita e concorda com todas as cláusulas da Política de Privacidade, incluindo, sem limitação, o uso e tratamento da Informação e dos Conteúdos de sua Conta de acordo com essa Política de Privacidade."
        ]
      },
      {
        "t": "h",
        "text": "Partes deste Contrato:"
      },
      {
        "t": "p",
        "s": [
          "Você é uma das partes deste contrato. A outra parte é IoT FENSTER S.L uma empresa privada sediada na Espanha e com sede social em Fuente Álamo - Murcia, e que será referida nestas Condições de Serviço como \"mySmartWindow\", \"nós\" e às vezes, \"nos\"."
        ]
      },
      {
        "t": "h",
        "text": "Os Termos e Condições deste Contrato podem mudar:"
      },
      {
        "t": "p",
        "s": [
          "É quase certo que este Contrato estará sujeito a alguma mudança, devido às mudanças em nosso Serviço e nas leis aplicáveis a você e a nós. Se fizermos alguma mudança, nos esforçaremos ao máximo para informá-lo com antecedência, embora em certas situações, como quando é necessário alguma mudança para cumprir requisitos legais aplicáveis, pode ser que alguma mudança nestas Condições tenha que entrar em vigor imediatamente. Anunciaremos as mudanças aqui, em nosso site, e também podemos decidir avisá-lo das mudanças enviando um e-mail para o endereço que você nos forneceu. Também tentaremos explicar os motivos da mudança. Se estas Condições forem atualizadas, você é livre para decidir se aceita estas mudanças ou se deixa de usar nosso Serviço, seu uso contínuo do Serviço após a entrada em vigor da referida atualização será considerado como representando seu acordo com os novos Termos e seu consentimento em submeter-se aos mesmos. Exceto para as mudanças feitas por nós conforme descrito aqui, nenhuma modificação ou emenda destas Condições entrará em vigor a menos que seja estipulada em um acordo por escrito e que leve sua assinatura e a nossa. Para fins de clareza, e-mails e outras comunicações não constituirão um acordo por escrito efetivo para este fim."
        ]
      },
      {
        "t": "h",
        "text": "Descrição do Serviço mySmartWindow:"
      },
      {
        "t": "p",
        "s": [
          "O Serviço mySmartWindow CLOUD consiste em um site e um servidor tipo Cloud que suporta as comunicações de fora da casa para as comunicações com suas janelas e portas. Os serviços e os produtos mySmartWindow oferecidos pela IoT FENSTER S.L, oferecem graças ao serviço mySmartWindow CLOUD outro tipo de serviços complementares como podem ser os serviços de alerta. mySmartWindow permite a seus usuários coletar, armazenar e compartilhar dados de seus dispositivos, gerenciá-los e programá-los. Em troca de permitir que você use o Serviço, você aceita se submeter a estas Condições."
        ]
      },
      {
        "t": "h",
        "text": "IoT FENSTER S.L não se responsabiliza pelos Conteúdos e Dados do usuário fornecidos por outros usuários:"
      },
      {
        "t": "p",
        "s": [
          "IoT FENSTER S.L não seleciona nem filtra os Dados nem os Conteúdos dos usuários, e não revisa, verifica, confirma, aprova nem verifica nenhum Conteúdo nem Dados dos Usuários nem a exatidão desses Dados ou Conteúdos. Nem estes Termos e Condições, nem o uso do Serviço por você, nem a prestação do Serviço por mySmartWindow, nem o acesso/armazenamento/uso dos Dados e Conteúdos do Usuário por IoT FENSTER S.L implicarão nem criarão nenhuma responsabilidade por parte de mySmartWindow em relação aos Dados do Usuário fornecidos por outros usuários e incluídos no Serviço. Seu acesso ao Serviço ou a algum conteúdo e seu uso dos mesmos é de sua própria responsabilidade."
        ]
      },
      {
        "t": "p",
        "s": [
          "O Serviço mySmartWindow CLOUD, armazena temporariamente os dados de temperatura, umidade, Co2, abertura, estados de persiana ou abertura. Desta forma, podemos fornecer a você o histórico de operações e os gráficos de eficiência. Caso você não aceite os termos, estes serviços não serão oferecidos e o servidor não armazenará nenhum dado temporário."
        ]
      },
      {
        "t": "p",
        "s": [
          "Os dados históricos de suas janelas serão armazenados criptografados na base de dados mySmartWindow CLOUD e em nenhum momento estão vinculados a seus dados pessoais nas mesmas tabelas. Todos os dados serão identificados através de um ID de usuário alfanumérico."
        ]
      },
      {
        "t": "p",
        "s": [
          "O Serviço mySmartWindow CLOUD é fornecido \"COMO ESTÁ\" e \"CONFORME DISPONÍVEL\":"
        ]
      },
      {
        "t": "p",
        "s": [
          "Você entende e aceita que o Serviço é fornecido a você \"COMO ESTÁ\" e \"CONFORME DISPONÍVEL\". Até novo aviso, o Serviço mySmartWindow CLOUD é oferecido como uma edição de software Beta, o que significa que NÃO HÁ ACORDO DE NÍVEL DE SERVIÇO E NÃO É OFERECIDA GARANTIA DE DISPONIBILIDADE DO SERVIÇO. IoT FENSTER S.L NEGA QUALQUER GARANTIA, EXPRESSA OU IMPLÍCITA, DE COMERCIALIZAÇÃO, ADEQUAÇÃO PARA UM PROPÓSITO PARTICULAR OU NÃO VIOLAÇÃO. mySmartWindow não será responsável nem imputada por qualquer perda de dados, ou outros danos causados por seu acesso ao uso do Serviço. Você também aceita que IoT FENSTER S.L não tem nenhuma responsabilidade nem compromisso pelo apagamento, ou falha no armazenamento ou na transmissão, de qualquer conteúdo mantido pelo Serviço. IoT FENSTER S.L não oferece garantias de que o Serviço atenda às suas necessidades ou esteja disponível de maneira ininterrupta, segura ou sem erros. Nenhum conselho ou informação obtidos de IoT FENSTER S.L, seja oralmente ou por escrito, criarão nenhuma garantia não mencionada expressamente neste documento."
        ]
      },
      {
        "t": "h",
        "text": "Registrar-se como usuário do mySmartWindow criando uma conta:"
      },
      {
        "t": "p",
        "s": [
          "Primeiro você tem que criar uma conta no mySmartWindow. Você cria uma conta fornecendo-nos um nome de usuário e um endereço de e-mail aceitáveis, e criando uma senha. Referimo-nos a isso como sua \"Informação de Conta\". Sugerimos que você use uma combinação de nome de usuário e senha diferenciados e que não sejam óbvios, o ideal seria que fossem diferentes dos que você usa para outros serviços. Você é responsável por garantir a exatidão, integridade e confidencialidade de sua Informação de Conta, e será responsável por todas as atividades que ocorram em sua Conta, incluindo as atividades de outros a quem você tenha fornecido sua Informação de Conta. Não seremos responsáveis por qualquer perda ou dano causados por sua falha em nos fornecer informações precisas ou manter sua Informação de Conta segura. Se você descobrir qualquer uso não autorizado de sua Informação de Conta ou suspeitar que alguém possa ser capaz de acessar seus Conteúdos privados, você deve mudar imediatamente sua senha e notificar nossa equipe de Atendimento ao Cliente."
        ]
      },
      {
        "t": "p",
        "s": [
          "Além disso, mySmartWindow não tem responsabilidade pela disponibilidade da Internet e de outros serviços de telecomunicações necessários para acessar o Serviço."
        ]
      },
      {
        "t": "h",
        "text": "Seus direitos como Usuário:"
      },
      {
        "t": "p",
        "s": [
          "Uma vez que você tenha criado uma conta e aceitado estas Condições, nós lhe fornecemos uma licença limitada e não exclusiva para o uso do Serviço sujeito a estas Condições, na medida em que você não seja negado a receber o Serviço sob qualquer lei aplicável a você, até que você feche voluntariamente sua conta ou até que nós fechemos sua conta de acordo com estas Condições. Além disso, concedemos-lhe uma licença pessoal, mundial, sem royalties, intransferível e não exclusiva. Para utilizar o APP e o Serviço mySmartWindow CLOUD, até que seus direitos expirem de acordo com a referida licença e/ou estas Condições. Você não obtém nenhum outro direito ou interesse no mySmartWindow ou no Serviço."
        ]
      },
      {
        "t": "h",
        "text": "Seu uso do mySmartWindow e de seus Conteúdos:"
      },
      {
        "t": "p",
        "s": [
          "Seu uso do Serviço deve estar de acordo com estas Condições. Em relação ao seu uso do mySmartWindow, você concorda em ser responsável por sua própria conduta e por toda conduta em sua Conta. Isso significa que todo Conteúdo - como dados de seus dispositivos, texto, arquivos de qualquer tipo (imagens, vídeos e qualquer coisa que você possa pensar), independentemente de sua forma ou estrutura técnica (coletivamente, \"Conteúdo\") - criado, transmitido, armazenado ou exibido em sua Conta, é de sua exclusiva responsabilidade como a pessoa que criou sua conta de usuário e é a única pessoa conhecedora da mesma. Isso se aplica mesmo que o Conteúdo seja mantido em privado, compartilhado ou transmitido usando o Serviço ou qualquer aplicativo ou serviço de terceiros integrado ao mySmartWindow."
        ]
      },
      {
        "t": "h",
        "text": "Proteção de Dados e Conteúdos do Usuário:"
      },
      {
        "t": "ul",
        "items": [
          [
            "Seus Dados são Seus: Você mantém seus direitos e qualquer outro direito sobre seus gráficos temporais coletados pelos dispositivos, antes de enviá-los ou publicá-los ou exibi-los no Serviço ou através dele ou de outro meio. Mas você tem que conceder ao mySmartWindow uma licença limitada, conforme descrito abaixo, para que possamos tornar seus dados acessíveis e utilizáveis no Serviço. Além desta licença limitada e de outros direitos que você concede nestas Condições, mySmartWindow reconhece e aceita que não obtemos nenhum outro direito, título ou interesse de sua parte sobre seus Conteúdos sob estas Condições. Para permitir que mySmartWindow opere o Serviço, devemos obter de você certas licenças e outros direitos sobre os Conteúdos que você nos envia, de modo que o processamento, manutenção, armazenamento, reprodução técnica, backup e distribuição e gerenciamento relacionado de seus Conteúdos não infrinjam a legislação vigente sobre direitos autorais e outras leis. Isso significa que ao usar o Serviço, você concede ao mySmartWindow licença para exibir, executar e distribuir qualquer um de seus conteúdos, e para modificar (por razões técnicas, por exemplo, para garantir que o Conteúdo possa ser visto tanto em smartphones como em computadores) e reproduzir tais Conteúdos e assim permitir que mySmartWindow opere o Serviço. Você também aceita que mySmartWindow tem o direito de decidir não aceitar, publicar, executar, armazenar, exibir, publicar ou transmitir qualquer Conteúdo de maneira anônima se fornecer qualquer dado do usuário. Você aceita que estes direitos autorais e licenças são livres de royalties, e são irrevogáveis e globais (enquanto seu Conteúdo estiver hospedado conosco) e incluem o direito de mySmartWindow colocar tais Conteúdos, transmitindo também esses direitos, à disposição de terceiros com os quais mySmartWindow tem relações contratuais relacionadas à prestação do Serviço mySmartWindow, apenas com o propósito de fornecer tais serviços, e por outro lado para permitir o acesso ou para mostrar seus Conteúdos a terceiros se mySmartWindow determinar que tal acesso é necessário para cumprir suas obrigações legais. Você também assume perante nós que, ao aceitar os termos que suas informações não pessoais possam ser cedidas pelo mySmartWindow através de suas API a outros desenvolvedores de APP para que através destas APP de terceiros possam acessar os serviços de suas janelas e portas mySmartWindow. Os direitos descritos nestas Condições, não está infringindo os direitos de nenhuma pessoa nem de terceiros. Finalmente, você entende e aceita que mySmartWindow, ao realizar os passos técnicos para oferecer o Serviço a nossos usuários, pode fazer em seus dados não pessoais sejam necessários para conformar e adaptar os Conteúdos aos requisitos técnicos das redes de conexão, dos dispositivos, dos serviços ou dos meios de comunicação."
          ],
          [
            "Seus Dados e Conteúdos estão protegidos: A segurança de seus dados é de suma importância para nós, e fazemos todos os esforços possíveis para manter seus dados seguros e protegidos. No entanto, não assumimos nenhuma responsabilidade por qualquer perda ou distribuição não autorizada de seus Conteúdos. Sua privacidade em seus Conteúdos também é nossa principal preocupação, e esperamos nunca ter que examinar os Conteúdos de ninguém. No entanto, existem certas circunstâncias em que podemos ter a necessidade de examinar seus Conteúdos em todo ou em parte, como explicado em nossa Política de Privacidade. Exceto conforme descrito aqui e em nossa Política de Privacidade, a menos que você decida permitir que outros vejam ou tenham acesso aos Conteúdos que você envia ao Serviço, ninguém mais deverá ver seus Conteúdos sem seu consentimento. Claro, se você decidir publicar ou compartilhar qualquer parte de seus Conteúdos criando um fluxo de informação, ou criando um serviço web para publicar os Conteúdos, então você estaria dando permissão a cada um dos usuários autorizados para acessar, usar, exibir, executar, distribuir e modificar seus Conteúdos (sujeito a qualquer compromisso ou acordo que você possa ter chegado com tais usuários sem a participação do mySmartWindow). Além disso, mySmartWindow permite que você use uma grande variedade de serviços e aplicativos de terceiros que interagem com o Serviço e com seus Conteúdos, e você deve revisar os direitos de acesso que concede a tais serviços ou aplicativos, pois eles podem permitir o acesso a seus Conteúdos através de seus acordos com essas terceiras partes."
          ],
          [
            "Seus Dados e Conteúdos são portáteis: mySmartWindow se compromete a tornar seus dados portáteis. Isso significa que incorporaremos ferramentas em nosso Serviço e Software para que você possa compartilhar ou exportar para arquivos seus Dados e Conteúdos ou torná-los acessíveis por meio de serviços web ou APIs. Todas essas ferramentas estarão disponíveis enquanto sua conta estiver aberta, sujeitas ao cumprimento de nossa Política de Privacidade. Se você tiver algum problema ao exportar Dados ou Conteúdos, pode entrar em contato com nossa equipe de Atendimento ao Cliente que, se esforçando ao máximo, tentará resolver seu pedido se estiver em conformidade com nossa Política de Privacidade e ações legais."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Direito do mySmartWindow de modificar o Serviço:"
      },
      {
        "t": "p",
        "s": [
          "Mantemos o direito de, a nosso critério, implementar novos elementos como parte de e/ou auxiliar do Serviço e qualquer Software do APP mySmartWindow, incluindo mudanças que podem afetar o modo de operação anterior do Serviço. Esperamos que tais modificações melhorem o Serviço em geral, mas é possível que você não concorde conosco. Também nos reservamos o direito de estabelecer certos limites para a natureza ou o tamanho do espaço de armazenamento que você pode dispor, o número de transmissões e mensagens de e-mail, a execução do código de seu programa, seus Conteúdos e outros dados, e impor outras limitações a qualquer momento, com ou sem aviso prévio. Por exemplo, se você usar o serviço gratuito do mySmartWindow, não desfrutará de todas as vantagens oferecidas aos usuários do serviço Premium do mySmartWindow. Você também reconhece que certas ações do mySmartWindow podem dificultar ou impedir que você acesse seus Conteúdos ou use o Serviço em determinados horários e/ou da mesma forma, por períodos limitados ou permanentemente, e aceita que mySmartWindow não tem responsabilidade nem responsabilidade perante você ou terceiros por qualquer modificação, suspensão ou descontinuação de qualquer parte do Serviço."
        ]
      },
      {
        "t": "h",
        "text": "Armazenamento de seus Dados e Conteúdos:"
      },
      {
        "t": "p",
        "s": [
          "O Serviço mySmartWindow CLOUD está disponível em todo o mundo, mas nossas operações de processamento de dados são realizadas na Espanha. Se você usar o Serviço, reconhece que pode estar enviando comunicações eletrônicas (incluindo as informações de sua conta pessoal e seus Conteúdos) através de redes de computadores que são propriedade do mySmartWindow e de terceiros localizados na Espanha e em outros locais na Europa e até mesmo em outros países. Consequentemente, seu uso do Serviço provavelmente resultará na transmissão internacional de dados, e seu uso do Serviço representará seu consentimento para permitir tais transmissões. mySmartWindow pode mudar a localização de suas operações de processamento sem avisá-lo ou pedir seu consentimento."
        ]
      },
      {
        "t": "h",
        "text": "No caso de sua conta ser fechada:"
      },
      {
        "t": "p",
        "s": [
          "Você pode fechar sua conta com nosso Serviço a qualquer momento, por qualquer motivo (ou sem motivo), sem sequer nos avisar. No entanto, se você deseja desativar sua conta, deve seguir certos passos específicos, que são descritos em nossa documentação. mySmartWindow pode suspender o acesso à sua conta, ou fechar sua conta, com ou sem aviso prévio de acordo com estas Condições. As razões para mySmartWindow suspender ou fechar sua conta podem incluir, sem limitação: (i) violação ou violação destas Condições ou de qualquer Acordo Separado, (ii) um período prolongado de inatividade (determinado a critério exclusivo do mySmartWindow), (iii) o não pagamento de qualquer taxa ou outra quantia devida ao mySmartWindow ou a terceiros e relacionada ao seu uso do Serviço (ou de qualquer parte dele), ou (vi) conflitos ou problemas técnicos ou de segurança. Na maioria dos casos, no caso de decidirmos fechar sua conta, avisaremos com pelo menos 30 dias de antecedência no endereço de e-mail que você nos forneceu, para que você tenha a oportunidade de recuperar qualquer Conteúdo armazenado nos servidores do mySmartWindow (a menos que determinemos que estamos legalmente proibidos de permitir isso). Após o vencimento deste período de aviso, você não poderá mais recuperar os Conteúdos incluídos nessa conta nem usar de qualquer outra forma o Serviço através dessa conta."
        ]
      },
      {
        "t": "h",
        "text": "Cláusula de Isenção de Responsabilidade, direitos autorais e Informações de Marcas Registradas:"
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow e o logotipo do mySmartWindow são marcas registradas."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow fez todos os esforços para garantir a precisão e confiabilidade das informações oferecidas no site ou no APP mySmartWindow. No entanto, as informações são fornecidas sem garantias. mySmartWindow não aceita qualquer responsabilidade ou responsabilidade pela precisão, conteúdo, integridade ou confiabilidade das informações."
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow, armazena em seu servidor o histórico de informações e operações para poder mostrar-lhe essas informações e para poder criar estatísticas de eficiência para sua casa. mySmartWindow, reserva-se o direito de poder ceder essas informações de maneira anônima a terceiros para poder realizar estatísticas de casas, modelos preditivos, etc."
        ]
      },
      {
        "t": "p",
        "s": [
          "No caso de não aceitar as condições, nenhum dado será armazenado no servidor e só poderá ser acessado localmente sem poder dispor desses serviços."
        ]
      },
      {
        "t": "h",
        "text": "Links para Terceiros:"
      },
      {
        "t": "p",
        "s": [
          "Pode ser que incluamos ou recomendemos recursos, materiais e desenvolvedores de terceiros e/ou links para sites e aplicativos de terceiros como parte do Serviço ou em relação a ele. Não temos controle sobre tais sites ou desenvolvedores e, consequentemente, você reconhece e aceita que: (i) não somos responsáveis pela disponibilidade de tais sites ou aplicativos, (ii) não somos responsáveis nem responsáveis por qualquer conteúdo ou outros materiais ou funcionalidades disponíveis nesses sites ou aplicativos, e (iii) não seremos responsáveis nem responsáveis, direta ou indiretamente, por qualquer dano ou perda causados ou supostamente causados por ou relacionados ao uso de ou confiança em qualquer um desses conteúdos, materiais ou aplicativos."
        ]
      },
      {
        "t": "p",
        "s": [
          "Indenização. Você concorda em manter indene e proteger mySmartWindow, suas subsidiárias, afiliadas, executivos, agentes, funcionários, anunciantes e parceiros de e contra qualquer reivindicação, responsabilidades, danos (diretos e consequentes), perdas e despesas (incluindo despesas legais e outras taxas profissionais), que resultem de ou estejam relacionadas de alguma forma com reivindicações de terceiros relativas ao seu uso do Serviço, qualquer violação destas Condições de Serviço ou qualquer outra ação relacionada ao seu uso do Serviço (incluindo todas as ações realizadas em sua conta). No caso de uma reivindicação assim, daremos aviso da reivindicação, demanda ou ação para as informações de contato que temos para essa conta, desde que qualquer falha em entregar tal aviso não elimine ou reduza sua obrigação de indenizar de acordo com o presente."
        ]
      },
      {
        "t": "h",
        "text": "Blog e fórum:"
      },
      {
        "t": "p",
        "s": [
          "O serviço de blog e fórum permite que você participe em blogs e fóruns sobre temas do mySmartWindow"
        ]
      },
      {
        "t": "p",
        "s": [
          "Você também pode postar uma mensagem no fórum do mySmartWindow. Você reconhece e aceita que se enviar algum Conteúdo para o fórum, será o único responsável por tais Conteúdos. mySmartWindow não será responsável de forma alguma por tais Conteúdos enviados."
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "Além disso, você concorda que:"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "Não enviará nenhum Conteúdo que seja incômodo, ofensivo, ameaçador, prejudicial, calunioso ou difamatório, promova condutas que possam ser constitutivas de delito ou que envolvam responsabilidades civis, ou seja ilegal de qualquer forma."
          ],
          [
            "Não enviará nenhum Conteúdo que esteja protegido pelas leis de propriedade intelectual ou por direitos de confidencialidade, a menos que possua os direitos sobre o mesmo ou tenha recebido todos os consentimentos necessários. Você será o único responsável por qualquer violação de direitos autorais, marca registrada ou outros direitos de propriedade."
          ],
          [
            "Não enviará nenhum Conteúdo que contenha um vírus ou algum outro componente prejudicial."
          ],
          [
            "Não empreenderá nenhuma atividade que interfira com ou perturbe o uso do Site Web por parte de outros usuários."
          ],
          [
            "Não enviará nenhum Conteúdo que incite a cometer atividades ilegais, ou que facilite conselhos ou instruções sobre tais atividades ilegais."
          ],
          [
            "Não fará nenhuma falsa representação, incluindo a usurpação de pessoas ou entidades e a simulação de sua associação com alguma pessoa ou entidade."
          ],
          [
            "Não fará uso do fórum do mySmartWindow para fins comerciais, como anunciar algum produto ou serviço, revender ou publicar a informação transmitida ou publicada sem consentimento por escrito."
          ]
        ]
      },
      {
        "t": "p",
        "s": [
          "mySmartWindow não pré-visualiza, supervisiona nem edita os Conteúdos enviados aos Fóruns. No entanto, mySmartWindow reserva-se o direito de editar, limitar ou suprimir qualquer Conteúdo a seu inteiro critério. No entanto, você será o único responsável por qualquer Conteúdo que envie ou publique."
        ]
      },
      {
        "t": "p",
        "s": [
          "Ao enviar Conteúdos, por qualquer meio, ao fórum ou blog do mySmartWindow, você concede a mySmartWindow um direito e uma licença perpétua, sem royalties, irrevogável, não exclusiva e mundial para utilizar, revelar, exibir, executar, reproduzir, modificar, adaptar, publicar, traduzir e distribuir tais Conteúdos ou incorporar tais Conteúdos em qualquer forma, meio ou tecnologia já conhecidos ou por desenvolver. Além disso, mySmartWindow será livre para utilizar qualquer ideia, conceito, conhecimento ou técnica contidos em tal informação para qualquer propósito, incluído mas não limitado à pesquisa, o desenvolvimento, a fabricação e a comercialização de produtos e outros artigos que incorporem tais ideias. Se você não for o proprietário do Conteúdo enviado, você garante que recebeu todos os consentimentos necessários por parte do proprietário de tais direitos. Você isentará a mySmartWindow se qualquer um desses conteúdos enviados infringir algum desses direitos."
        ]
      },
      {
        "t": "p",
        "s": [
          "Ao participar em qualquer blog ou fórum, pode entrar em contato com Conteúdos que sejam inexatos, incompletos ou inadequados. Deverá ser extremamente cauteloso em relação a qualquer Conteúdo publicado ou transmitido em um fórum ou blog do mySmartWindow. mySmartWindow insta a que não realize nenhuma ação baseada em nenhum destes conteúdos. mySmartWindow não será responsável pelo Conteúdo nem pela exatidão de qualquer informação, e não será responsável por nenhum ato ou decisão realizados com base em tal informação."
        ]
      },
      {
        "t": "p",
        "s": [
          "Em consideração aos esforços de mySmartWindow para aperfeiçoar e melhorar a Plataforma e seus produtos e serviços associados e responder às sugestões dos usuários, você concorda em transferir tais ideias, conceitos, conhecimentos ou técnicas para mySmartWindow sem qualquer compensação em troca."
        ]
      },
      {
        "t": "p",
        "s": [
          "Você também concorda em realizar todos e cada um dos documentos que mySmartWindow possa solicitar razoavelmente em relação à confirmação da titularidade por parte de mySmartWindow e de seu direito ilimitado de utilizar tais ideias, conceitos, conhecimentos e técnicas"
        ]
      },
      {
        "t": "p",
        "s": [
          {
            "b": "Ao enviar comentários a mySmartWindow por qualquer meio, seja através do blog, do fórum, da caixa de sugestões dos clientes ou similar, você será o único responsável pelo conteúdo de qualquer comentário que faça. Você concorda que nenhum dos comentários que envie a mySmartWindow:"
          }
        ]
      },
      {
        "t": "ul",
        "items": [
          [
            "Violará nenhum direito de terceiros, incluindo mas não limitado a direitos autorais, marca registrada, confidencialidade ou outros direitos pessoais ou de propriedade."
          ],
          [
            "Será calunioso ou conterá materiais caluniosos ou ilegais, insultantes ou obscenos, ou constituirão uma apropriação indevida dos segredos comerciais de terceiros."
          ],
          [
            "Menosprezará os produtos ou serviços de terceiros, nem conterá nenhuma informação pessoal (além de seu endereço de e-mail e seu nome de usuário)."
          ]
        ]
      },
      {
        "t": "h",
        "text": "Atividades de Alto Risco:"
      },
      {
        "t": "p",
        "s": [
          "Os Serviços de mySmartWindow não são à prova de falhas e não foram projetados, fabricados ou concebidos para seu uso como ou com equipamentos de controle online em ambientes perigosos que requerem um funcionamento à prova de falhas."
        ]
      },
      {
        "t": "h",
        "text": "Força Maior:"
      },
      {
        "t": "p",
        "s": [
          "Nenhuma parte será responsável por qualquer falha ou atraso na prestação, ou dos dados perdidos de acordo com estes Termos e Condições (excetuando o atraso no pagamento de dinheiro, que deve ser devido e pagável de acordo com o presente contrato), na medida em que essas falhas ou atrasos sejam causados diretamente por: (i) falhas do Serviço, (ii) fenômenos meteorológicos naturais, ou (iii) qualquer outra causa que escape ao controle razoável dessa parte e ocorra sem sua falta ou negligência, incluindo, sem limitação, falhas dos fornecedores, subcontratantes e transportadores, ou da parte em cumprir suas obrigações de maneira substancial de acordo com estas Condições de Uso, desde que em todos esses casos, como condição da reclamação de não responsabilidade, a parte que esteja experimentando as dificuldades avise prontamente e por escrito à outra parte, com todos os detalhes referentes ao evento da causa em que se baseia."
        ]
      },
      {
        "t": "h",
        "text": "O Serviço está disponível \"TAL COMO ESTÁ\":"
      },
      {
        "t": "p",
        "s": [
          "O Serviço está disponível \"TAL COMO ESTÁ\". VOCÊ ENTENDE E ACEITA EXPRESSAMENTE QUE: (a) SEU USO DO SERVIÇO É POR SUA PRÓPRIA CONTA E RISCO. O SERVIÇO É FORNECIDO \"TAL COMO ESTÁ\" E \"CONFORME DISPONIBILIDADE. NA MEDIDA EM QUE A LEI PERMITA, mySmartWindow NEGA EXPRESSAMENTE TODA GARANTIA E CONDIÇÃO DE QUALQUER TIPO, SEJA EXPRESSA OU IMPLÍCITA, INCLUINDO MAS NÃO LIMITADA ÀS GARANTIAS E CONDIÇÕES IMPLÍCITAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO PARA UM PROPÓSITO ESPECÍFICO E NÃO INFRAÇÃO. (b) mySmartWindow NÃO GARANTE QUE (i) O SERVIÇO ATENDERÁ A TODOS OS SEUS REQUISITOS, (ii) O SERVIÇO SERÁ ININTERRUPTO, PONTUAL, SEGURO OU SEM ERROS, OU (iii) TODOS OS ERROS NO SERVIÇO SERÃO CORRIGIDOS. (c) QUALQUER MATERIAL BAIXADO OU OBTIDO DE OUTRA FORMA ATRAVÉS DO USO DO SERVIÇO SERÁ FEITO POR SUA CONTA E RISCO E VOCÊ SERÁ O ÚNICO RESPONSÁVEL POR QUALQUER DANO A SEUS SISTEMAS DE COMPUTADOR OU OUTROS DISPOSITIVOS OU PELA PERDA DE DADOS CAUSADA PELA DESCARGA DE TAL MATERIAL. (d) NENHUM CONSELHO OU INFORMAÇÃO, SEJA ORAL OU ESCRITO, QUE VOCÊ OBTENHA DE mySmartWindow OU DO SERVIÇO OU ATRAVÉS DO MESMO, CRIARÁ QUALQUER GARANTIA QUE NÃO SEJA EXPRESSAMENTE MENCIONADA nestas CONDIÇÕES DE SERVIÇO."
        ]
      },
      {
        "t": "h",
        "text": "Limitação de responsabilidade:"
      },
      {
        "t": "p",
        "s": [
          "VOCÊ ENTENDE E ACEITA EXPRESSAMENTE QUE mySmartWindow, SUAS SUBSIDIÁRIAS, AFILIADAS E LICENCIATÁRIOS, E NOSSOS E SEUS RESPECTIVOS EXECUTIVOS, FUNCIONÁRIOS, AGENTES E HERDEIROS NÃO SERÃO RESPONSÁVEIS PERANTE VOCÊ POR NENHUM DANO DIRETO, INDIRETO, INCIDENTAL, ESPECIAL, CONSEQUENTE OU EXEMPLAR, INCLUINDO, MAS NÃO LIMITADO A, DANOS POR PERDA DE LUCROS, BOA VONTADE, USO, DADOS, COBERTURA OU OUTRAS PERDAS INTANGÍVEIS (MESMO QUE mySmartWindow TENHA SIDO ADVERTIDA DA POSSIBILIDADE DE TAIS DANOS) CAUSADOS POR: (i) O USO OU A INCAPACIDADE DE USAR O SERVIÇO, (ii) O CUSTO DO FORNECIMENTO DE BENS E SERVIÇOS DE SUBSTITUIÇÃO RESULTANTES DE QUALQUER MERCADORIA, DADO, INFORMAÇÃO OU SERVIÇO ADQUIRIDO OU OBTIDO OU MENSAGENS RECEBIDAS OU TRANSAÇÕES EFETUADAS DE OU ATRAVÉS DO SERVIÇO, (iii) O ACESSO NÃO AUTORIZADO ÀS SUAS TRANSMISSÕES, CONTEÚDOS OU DADOS OU A PERDA, CORRUPÇÃO OU ALTERAÇÃO DOS MESMOS, (iv) AFIRMAÇÕES OU CONDUTAS DE TERCEIROS EM OU ATRAVÉS DO USO DO SERVIÇO, (v) AS AÇÕES OU OMISSÕES DE mySmartWindow QUANTO À CONFIABILIDADE DE SUA INFORMAÇÃO DE CONTA E QUALQUER MUDANÇA NA MESMA, (vi) SUAS FALHAS EM PROTEGER A CONFIDENCIALIDADE DE QUALQUER SENHA OU DIREITO DE ACESSO À INFORMAÇÃO DE SUA CONTA, (vii) AS AÇÕES OU OMISSÕES DE TERCEIROS QUE USEM OU SE INTEGREM COM O SERVIÇO, (viii) QUALQUER CONTEÚDO PUBLICITÁRIO OU O USO OU AQUISIÇÃO POR SUA PARTE DE QUALQUER PRODUTO OU SERVIÇO ANUNCIADO, (ix) A TERMINAÇÃO DE SUA CONTA EM CONSONÂNCIA COM ESTES TERMOS E CONDIÇÕES, OU (x) QUALQUER OUTRO ASSUNTO RELACIONADO AO SERVIÇO."
        ]
      },
      {
        "t": "h",
        "text": "Exclusões e limitações."
      },
      {
        "t": "p",
        "s": [
          "NADA NESTES TERMOS E CONDIÇÕES ESTÁ CONCEBIDO PARA EXCLUIR OU LIMITAR QUALQUER CONDIÇÃO, GARANTIA, DIREITO OU RESPONSABILIDADE QUE NÃO POSSA SER EXCLUÍDA OU LIMITADA LEGALMENTE. ALGUMAS JURISDIÇÕES NÃO PERMITEM A EXCLUSÃO DE CERTAS GARANTIAS OU CONDIÇÕES OU A LIMITAÇÃO OU EXCLUSÃO DE RESPONSABILIDADE POR DANOS OU PERDAS CAUSADOS POR NEGLIGÊNCIA, INADIMPLEMENTO DE CONTRATO OU DE TERMOS IMPLÍCITOS, OU DE DANOS INCIDENTAIS OU CONSEQUENTES. CONSEQUENTEMENTE, SÓ SE APLICARÃO A VOCÊ AQUELAS LIMITAÇÕES QUE SEJAM LEGAIS EM SUA JURISDIÇÃO (SE HOUVER), E NOSSA RESPONSABILIDADE FICA LIMITADA AO LIMITE MÁXIMO PERMITIDO PELA LEI."
        ]
      }
    ]
  }
}
