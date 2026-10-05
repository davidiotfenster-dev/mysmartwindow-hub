/**
 * Terminos y Condiciones de Servicio de la app Konect (PROFINE IBERIA SAU), tal
 * cual estaban en la pagina original: el texto es del documento v1.0 y no se
 * retoca. Se generaron desde el HTML original para no introducir erratas.
 *
 * Un fragmento `{ b: ... }` va en negrita.
 */

export type TycSegment = string | { b: string }

export type TycBlock =
  | { t: 'h'; text: string }
  | { t: 'p'; s: TycSegment[] }
  | { t: 'ul'; items: TycSegment[][] }

export const TYC_VERSION = '1.0'

export const tycBlocks: TycBlock[] = [
  {
    "t": "h",
    "text": "Bienvenido a Konect, pero antes de empezar a utilizar nuestro servicio, debe aceptar nuestros Términos y Condiciones de Servicio:"
  },
  {
    "t": "p",
    "s": [
      "¡Gracias por interesarse por Konect! Le invitamos a que acceda y utilice el Servicio de Konect para disfrutar de una ventana o puerta siempre conectada y con el potencial IoT. Por favor, tenga en cuenta que su registro en el servicio y el sitio web de Konect y su utilización de los mismos está sujeto a la aceptación de estos Términos y Condiciones de Servicio. El servicio de Konect se ofrece con ciertas limitaciones y condiciones de uso que cumplen la legislación. Puede que necesitemos cambiar estos Términos y Condiciones de vez en cuando, y nos reservamos el derecho a hacerlo. Por favor, revise aquí la nueva información, la versión de este contrato y la fecha de su entrada en vigor."
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
      "Usted es una de las partes de este contrato. La otra parte es PROFINE IBERIA SAU una empresa privada radicada en España y con su sede social en Camarma de Esteruelas, y a la que se aludirá en estas Condiciones de Servicio como \"Konect\", \"nosotros\" y a veces, \"nos\"."
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
    "text": "Descripción del Servicio de Konect:"
  },
  {
    "t": "p",
    "s": [
      "El Servicio de Konect CLOUD consiste en un sitio web y un servidor tipo Cloud que da soporte a las comunicaciones desde el exterior de la vivienda a las comunicaciones con sus ventanas y puertas. Los servicios y los productos de Konect ofrecidos por PROFINE IBERIA SAU, ofrecen gracias al servicio Konect CLOUD otro tipo de servicios complementarios como pueden ser los servicios de alerta. Konect permite a sus usuarios recopilar, almacenar y compartir datos de sus dispositivos, gestionarlos y programarlos. A cambio de permitirle utilizar el Servicio, usted acepta someterse a estas Condiciones."
    ]
  },
  {
    "t": "h",
    "text": "PROFINE IBERIA SAU no se hace responsable de los Contenidos y Datos del usuario facilitados por otros usuarios:"
  },
  {
    "t": "p",
    "s": [
      "PROFINE IBERIA SAU no selecciona ni filtra los Datos ni los Contenidos de los usuarios, y no revisa, comprueba, confirma, aprueba ni verifica ningún Contenido ni Datos de los Usuarios ni la exactitud de dichos Datos o Contenidos. Ni estos Términos y Condiciones, ni la utilización del Servicio por su parte, ni la prestación del Servicio por parte de Konect, ni el acceso/almacenamiento/uso de los Datos y Contenidos del Usuario por parte de PROFINE IBERIA SAU implicarán ni crearán ninguna responsabilidad por parte de Konect en relación con los Datos del Usuario proporcionados por otros usuarios e incluidos en el Servicio. Su acceso al Servicio o a algún contenido y su uso de los mismos es bajo su propia responsabilidad."
    ]
  },
  {
    "t": "p",
    "s": [
      "El Servicio de Konect CLOUD, almacena temporalmente los datos de temperatura, humedad, Co2, apertura, estados de persiana o apertura. De esta manera podemos brindarle a usted el histórico de operaciones y las gráficas de eficiencia. En caso de no aceptar los términos estos servicios no se ofrecerá y el servidor no almacenará dato alguno temporal."
    ]
  },
  {
    "t": "p",
    "s": [
      "Los datos históricos de sus ventanas se almacenaran cifrados en la base de datos Konect CLOUD y en ningún momento están vinculados a sus datos personales en las mismas tablas. Todos los datos se identificarán a través de un ID de usuario alfanumérico."
    ]
  },
  {
    "t": "p",
    "s": [
      "El Servicio de Konect CLOUD se proporciona \"TAL CUAL ES\" y \"SEGÚN DISPONIBILIDAD\":"
    ]
  },
  {
    "t": "p",
    "s": [
      "Usted entiende y acepta que el Servicio se le proporciona \"TAL CUAL ES\" y \"SEGÚN DISPONIBILIDAD\". Hasta nuevo aviso, el Servicio de Konect CLOUD se ofrece como una edición de software Beta, lo que significa que NO HAY ACUERDO DE NIVEL DE SERVICIO Y NO SE OFRECE GARANTÍA DE DISPONIBILIDAD DEL SERVICIO. PROFINE IBERIA SAU DENIEGA CUALQUIER GARANTÍA, EXPRESA O IMPLÍCITA, DE COMERCIALIZACIÓN, ADECUACIÓN PARA ALGÚN FIN EN PARTICULAR O NO INFRINGIMIENTO. Konect no será responsable ni imputada por cualquier pérdida de datos, u otros daños ocasionados por su acceso al uso del Servicio. Usted también acepta que PROFINE IBERIA SAU no tiene ninguna responsabilidad ni compromiso por el borrado, o el fallo en el almacenamiento o la transmisión, de cualquier contenido mantenido por el Servicio. PROFINE IBERIA SAU no ofrece garantías de que el Servicio cumpla sus requisitos o esté disponible de manera ininterrumpida, segura o sin errores. Ningún consejo o información obtenidos de PROFINE IBERIA SAU, ya sea oralmente o por escrito, crearán ninguna garantía no mencionada expresamente en la presente."
    ]
  },
  {
    "t": "h",
    "text": "Registrarse como usuario de Konect creando una cuenta:"
  },
  {
    "t": "p",
    "s": [
      "Primero tiene que crear una cuenta de Konect. Usted crea una cuenta facilitándonos un nombre de usuario y una dirección de correo electrónico aceptables, y creando una contraseña. Nos referimos a ello como su \"Información de Cuenta\". Le sugerimos que utilice una combinación de nombre de usuario y contraseña diferenciados y que no sean obvios, lo ideal sería que fueran diferentes de los que utilice para otros servicios. Usted es responsable de asegurar la exactitud, integridad y confidencialidad de su Información de Cuenta, y será responsable de todas las actividades que tengan lugar en su Cuenta, incluyendo las actividades de otros a quienes haya facilitado su Información de Cuenta. No seremos responsables de ninguna pérdida o daño ocasionados por su inobservancia de la obligación de proporcionarnos información exacta o de mantener a salvo su Información de Cuenta. Si usted descubre algún uso no autorizado de su Información de Cuenta o sospecha que alguien pueda ser capaz de acceder a sus Contenidos privados, deberá cambiar inmediatamente su contraseña y avisar a nuestro equipo de Atención al Cliente."
    ]
  },
  {
    "t": "p",
    "s": [
      "Además, Konect no tiene responsabilidad por la disponibilidad de Internet y de otros servicios de telecomunicaciones necesarios para acceder al Servicio."
    ]
  },
  {
    "t": "h",
    "text": "Sus derechos como Usuario:"
  },
  {
    "t": "p",
    "s": [
      "Una vez que haya creado una cuenta y aceptado estas Condiciones, le proporcionamos una licencia limitada y no exclusiva para el uso del Servicio sujeto a estas Condiciones, en la medida en que no se le deniegue recibir el Servicio en virtud de alguna ley aplicable para usted, hasta que cierre usted su cuenta voluntariamente o hasta que nosotros cerremos su cuenta con arreglo a estas Condiciones. Además, le concedemos una licencia personal, mundial, sin regalías, intransferible y no exclusiva. Para utilizar la APP y el Servicio de Konect CLOUD, hasta que expiren sus derechos en consonancia con la susodicha licencia y/o estas Condiciones. Usted no obtiene ningún otro derecho o interés en Konect o el Servicio."
    ]
  },
  {
    "t": "h",
    "text": "Su uso de Konect y de sus Contenidos:"
  },
  {
    "t": "p",
    "s": [
      "Su uso del Servicio debe estar en consonancia con estas Condiciones. En lo que se refiere a su uso de Konect, usted acepta ser responsable de su propia conducta y de toda conducta en su Cuenta. Esto significa que todo Contenido - como datos de sus dispositivos, texto, archivos de cualquier clase (imágenes, vídeos y cualquier cosa que se le ocurra), sin importar su forma o su estructura técnica (colectivamente, \"Contenido\") – creado, transmitido, almacenado o exhibido en su Cuenta, es de su responsabilidad exclusiva como la persona que creó su cuenta de usuario y es la única persona conocedora de la misma. Esto se aplica aunque el Contenido se mantenga en privado, se comparta o se transmita utilizando el Servicio o alguna aplicación o servicio de terceros integrados con Konect."
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
        "Sus Datos son Suyos: Usted conserva sus derechos y cualquier otro derecho sobre sus gráficas temporales recogidas por los dispositivos, antes de enviarlo o publicarlo o exhibirlo en el Servicio o a través del mismo u otro medio. Pero sí que tiene que conceder a Konect una licencia limitada, tal y como se describe más abajo, de manera que podamos hacer que sus datos estén accesibles y sean utilizables en el Servicio. Aparte de esta licencia limitada y de otros derechos que usted concede en estas Condiciones, Konect reconoce y acepta que no obtenemos ningún otro derecho, título o interés por parte suya sobre sus Contenidos bajo estas Condiciones. Para permitir a Konect operar el Servicio, debemos obtener de usted ciertas licencias y otros derechos sobre los Contenidos que nos envíe, de manera que el procesado, mantenimiento, almacenamiento, reproducción técnica, copias de seguridad y distribución y gestión relacionada de sus Contenidos no infrinja la legislación vigente sobre derechos de autor y otras leyes. Esto significa que al usar el Servicio, usted concede a Konect licencia para exhibir, ejecutar y distribuir cualquiera de sus contenidos, y para modificar (por razones técnicas, p. ej. para asegurarnos de que el Contenido se pueda ver tanto en smartphones como en ordenadores) y reproducir dichos Contenidos y así permitir a Konect operar el Servicio. Usted también acepta que Konect posea el derecho a decidir no aceptar, publicar, ejecutar, almacenar, exhibir, publicar o transmitir cualquier Contenido de manera anonima si aportar dato alguno del usuario. Usted acepta que estos derechos de autor y licencias estén libres de regalías, y sean irrevocables y a nivel mundial (en tanto su Contenido esté alojado con nosotros) e incluyen el derecho de Konect a poner dichos Contenidos, transmitiéndoles también estos derechos, a la disposición de terceros con los que Konect tiene relaciones contractuales relacionadas con la provisión del Servicio de Konect, únicamente con el propósito de proporcionar dichos servicios, y por otra parte a permitir el acceso o a mostrar sus Contenidos a terceros si Konect determinara que dicho acceso fuera necesario para cumplir con sus obligaciones legales. Usted también asume ante nosotros que, al aceptar los términos que sus información no personal pueda ser cedida por Konect a través de sus API a otros desarrolladores de APP para que a través de estas aPP de tercero pueda acceder a los servicios de sus ventanas y puertas Konect. Los derechos descritos en estas Condiciones, no está infringiendo los derechos de ninguna persona ni de terceras partes. Finalmente, usted comprende y acepta que Konect, al llevar a cabo los pasos técnicos para ofrecer el Servicio a nuestros usuarios, puede hacer en sus datos no personales sean necesarios para conformar y adaptar los Contenidos a los requisitos técnicos de las redes de conexión, los dispositivos, los servicios o los medios de comunicación."
      ],
      [
        "Sus Datos y Contenidos están protegidos: La seguridad de sus datos es de capital importancia para nosotros, y realizamos todos los esfuerzos posibles para mantener sus datos seguros y protegidos. No obstante, no asumimos ninguna responsabilidad por cualquier pérdida o distribución no autorizada de sus Contenidos. Su privacidad en sus Contenidos es también nuestra principal preocupación, y esperamos no tener que examinar nunca los Contenidos de nadie. Sin embargo, existen determinadas circunstancias en las que podemos tener la necesidad de examinar sus Contenidos en todo o en parte, como se explica en nuestra Política de Privacidad. Excepto tal y como se describe aquí y en nuestra Política de Privacidad, a menos que usted decida permitir a otros ver o tener acceso a los Contenidos que envíe al Servicio, nadie más deberá ver sus Contenidos sin su consentimiento. Por supuesto, si es que decide publicar o compartir cualquier parte de sus Contenidos creando un flujo de información, o creando un servicio web para publicar los Contenidos, entonces estaría dando permiso a cada uno de los usuarios autorizados para acceder, utilizar, exhibir, ejecutar, distribuir y modificar sus Contenidos (sujeto a cualquier compromiso o acuerdo al que haya podido llegar con dichos usuarios sin la participación de Konect). Además, Konect le permite utilizar una gran variedad de servicios y aplicaciones de terceros que interactúan con el Servicio y con sus Contenidos, y usted debería revisar los derechos de acceso que concede a dichos servicios o aplicaciones, pues les puede permitir el acceso a sus Contenidos mediante sus acuerdos con esas terceras partes."
      ],
      [
        "Sus Datos y Contenidos son portátiles: Konect se compromete a hacer portátiles sus datos. Eso significa que incorporaremos herramientas en nuestro Servicio y Software para que pueda compartir o exportar a archivos sus Datos y Contenidos o hacerlos accesibles mediante servicios web o APIs. Todas esas herramientas estarán disponibles mientras su cuenta esté abierta, sujetas al cumplimiento de nuestra Política de Privacidad. Si tuviera algún problema al exportar Datos o Contenidos, puede ponerse en contacto con nuestro equipo de Atención al Cliente quienes, esforzándose al máximo, intentarán resolver su solicitud si cumple con nuestra Política de Privacidad y acciones legales."
      ]
    ]
  },
  {
    "t": "h",
    "text": "Derecho de Konect a modificar el Servicio:"
  },
  {
    "t": "p",
    "s": [
      "Mantenemos el derecho para, a nuestra entera discreción, implementar nuevos elementos como parte de y/o auxiliar del Servicio y cualquier Software de la APP de Konect, incluidos cambios que pueden afectar al modo de operación anterior del Servicio. Esperamos que tales modificaciones mejoren el Servicio en general, pero es posible que usted no esté de acuerdo con nosotros. También nos reservamos el derecho a establecer ciertos límites a la naturaleza o el tamaño del espacio de almacenamiento del que puede disponer, el número de transmisiones y mensajes de correo electrónico, la ejecución del código de su programa, sus Contenidos y otros datos, e impongamos otras limitaciones en cualquier momento, con o sin previo aviso. Por ejemplo, si utiliza el servicio gratuito de Konect, no disfrutará de todas las ventajas que se ofrecen a los usuarios del servicio Premium de Konect. Usted también reconoce que ciertas acciones de Konect pueden dificultarle o impedirle que acceda a sus Contenidos o que utilice el Servicio a determinadas horas y/o en la misma forma, por períodos limitados o permanentemente, y acepta que Konect no tiene responsabilidad ni imputabilidad ante usted ni ante terceros por ninguna modificación, suspensión o discontinuidad de cualquier parte del Servicio."
    ]
  },
  {
    "t": "h",
    "text": "Almacenamiento de sus Datos y Contenidos:"
  },
  {
    "t": "p",
    "s": [
      "El Servicio de Konect CLOUD está disponible en todo el mundo, pero nuestras operaciones de proceso de datos se llevan a cabo en España. Si utiliza el Servicio, usted reconoce que puede estar enviando comunicaciones electrónicas (incluyendo la información de su cuenta personal y sus Contenidos) a través de redes informáticas que son propiedad de Konect y de terceros radicados en España y en otras ubicaciones en Europa e incluso en otros países. En consecuencia, su utilización del Servicio seguramente ocasionará la transmisión internacional de datos, y su utilización del Servicio representará su consentimiento para permitir dichas transmisiones. Konect podrá cambiar la ubicación de sus operaciones de procesado sin avisarle ni pedirle su consentimiento."
    ]
  },
  {
    "t": "h",
    "text": "En caso de que se cierre su cuenta:"
  },
  {
    "t": "p",
    "s": [
      "Puede cerrar su cuenta con nuestro Servicio en cualquier momento, por cualquier motivo (o sin motivo), sin ni siquiera avisarnos. Sin embargo, si desea desactivar su cuenta, tiene que dar ciertos pasos concretos, que se describen en nuestra documentación. Konect puede suspender el acceso a su cuenta, o cerrar su cuenta, con o sin previo aviso de acuerdo con estas Condiciones. Las razones para que Konect suspenda o cierre su cuenta pueden incluir, sin limitación: (i) incumplimiento o violación de estas Condiciones o de cualquier Acuerdo Separado, (ii) un período prolongado de inactividad (determinado a la entera discreción de Konect), (iii) el impago por su parte de cualquier tarifa u otra cantidad adeudada a Konect o a terceros y relacionada con su utilización del Servicio (o de cualquier parte del mismo), o (vi) conflictos o problemas técnicos o de seguridad. En la mayor parte de los casos, en el supuesto de que decidiéramos cerrar su cuenta, le avisaríamos con al menos 30 días de antelación en la dirección de correo electrónico que nos haya proporcionado, de forma que tenga la oportunidad de recuperar cualquier Contenido almacenado en los servidores de Konect (a menos que determinemos que nos está legalmente prohibido permitírselo). Tras el vencimiento de este período de aviso, ya no podrá recuperar los Contenidos incluidos en esa cuenta ni utilizar de cualquier otro modo el Servicio a través de dicha cuenta."
    ]
  },
  {
    "t": "h",
    "text": "Cláusula de Exención de Responsabilidad, derechos de autor e Información de Marcas Registradas:"
  },
  {
    "t": "p",
    "s": [
      "Konect y el logotipo de Konect son marcas registradas."
    ]
  },
  {
    "t": "p",
    "s": [
      "Konect ha realizado todos los esfuerzos para garantizar la exactitud y fiabilidad de la información ofrecida en el sitio web o en la APP Konect. Sin embargo, la información se suministra sin garantías. Konect no acepta ninguna responsabilidad o imputabilidad sobre la exactitud, el contenido, la integridad o la fiabilidad de la información."
    ]
  },
  {
    "t": "p",
    "s": [
      "Konect, almacena en su servidor el histórico de informaciones y operaciones para poder mostrarle dicha información y para poder crear estadísticas de eficiencia para su hogar. Konect, se reserva el derecho de poder ceder a esa información de manera anónima a terceras empresas para poder realizar estadísticas de hogares, modelos predictivos, etc."
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
      "Indemnidad. Usted acepta mantener indemne y proteger a Konect, sus subsidiarios, filiales, ejecutivos, agentes, empleados, anunciantes y socios de y frente a toda reclamación, responsabilidades, daños (directos y consecuentes), pérdidas y gastos (incluyendo gastos legales y otros honorarios profesionales), que se deriven de o estén relacionados en algún modo con reclamaciones de terceras partes relativas a su utilización del Servicio, cualquier violación de estas Condiciones de Servicio o cualquier otra acción relacionada con su uso del Servicio (incluidas todas las acciones llevadas a cabo en su cuenta). En el caso de una reclamación así, daremos aviso de la reclamación, demanda o acción a la información de contacto que tengamos para esa cuenta, siempre que algún fallo al entregarle dicho aviso no elimine o reduzca su obligación de indemnidad de acuerdo con la presente."
    ]
  },
  {
    "t": "h",
    "text": "Blog y foro:"
  },
  {
    "t": "p",
    "s": [
      "El servicio de blog y foro le permite participar en los blogs y foros sobre temas de Konect"
    ]
  },
  {
    "t": "p",
    "s": [
      "También puede publicar un mensaje en el foro de Konect. Usted reconoce y acepta que si envía algún Contenido al foro, será el único responsable de dichos Contenidos. Konect no será responsable en ningún modo de tales Contenidos enviados."
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
        "No hará uso del foro de Konect para fines comerciales, como anunciar algún producto o servicio, revender o publicar la información transmitida o publicada sin consentimiento por escrito."
      ]
    ]
  },
  {
    "t": "p",
    "s": [
      "Konect no previsualiza, supervisa ni edita los Contenidos enviados a los Foros. Sin embargo, Konect se reserva el derecho de editar, limitar o suprimir cualquier Contenido a su entera discreción. No obstante, usted será el único responsable de cualquier Contenido que envíe o publique."
    ]
  },
  {
    "t": "p",
    "s": [
      "Al enviar Contenidos, mediante cualquier medio, al foro o blog de Konect, usted concede a Konect un derecho y una licencia perpetua, sin regalías, irrevocable, no exclusiva y mundial para utilizar, revelar, exhibir, ejecutar, reproducir, modificar, adaptar, publicar, traducir y distribuir dichos Contenidos o incorporar dichos Contenidos en cualquier formulario, medio o tecnología ya conocidos o por desarrollar. Además, Konect será libre de utilizar cualquier idea, concepto, conocimiento o técnica contenidos en dicha información para cualquier propósito, incluido pero no limitado a la investigación, el desarrollo, la fabricación y la comercialización de productos y otros artículos que incorporen dichas ideas. Si no es el propietario del Contenido enviado, usted garantiza que ha recibido todos los consentimientos necesarios por parte del propietario de dichos derechos. Usted exonerará a Konect si cualquiera de dichos contenidos enviados infringiera alguno de dichos derechos."
    ]
  },
  {
    "t": "p",
    "s": [
      "Al participar en cualquier blog o foro, puede entrar en contacto con Contenidos que sean inexactos, incompletos o inadecuados. Deberá ser sumamente cauteloso respecto a cualquier Contenido publicado o transmitido en un foro o blog de Konect. Konect le insta a que no realice ninguna acción basada en ninguno de estos contenidos. Konect no será responsable del Contenido ni de la exactitud de cualquier información, y no será responsable de ningún acto o decisión realizados en función de dicha información."
    ]
  },
  {
    "t": "p",
    "s": [
      "En consideración a los esfuerzos de Konect para perfeccionar y mejorar la Plataforma y sus productos y servicios asociados y responder a las sugerencias de los usuarios, usted accede a transferir dichas ideas, conceptos, conocimientos o técnicas a Konect sin ninguna compensación a cambio."
    ]
  },
  {
    "t": "p",
    "s": [
      "Usted también accede a llevar a efecto todos y cada uno de los documentos que Konect pueda solicitar razonablemente en relación con la confirmación de la titularidad por parte de Konect y de su derecho ilimitado a utilizar dichas ideas, conceptos, conocimientos y técnicas"
    ]
  },
  {
    "t": "p",
    "s": [
      {
        "b": "Al enviar comentarios a Konect por cualquier medio, ya sea a través del blog, el foro, el buzón de sugerencias de los clientes o similar, usted será el único responsable del contenido de cualquier comentario que haga. Usted acuerda que ninguno de los comentarios que envíe a Konect:"
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
      "Los Servicios de Konect no son a prueba de fallos y no han sido diseñados, fabricados o concebidos para su uso como o con equipos de control online en entornos peligrosos que requieran un funcionamiento a prueba de fallos."
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
      "El Servicio está disponible \"TAL CUAL ES\". USTED ENTIENDE Y ACEPTA EXPLÍCITAMENTE QUE: (a) SU UTILIZACIÓN DEL SERVICIO ES BAJO SU PROPIA RESPONSABILIDAD. EL SERVICIO SE PROPORCIONA \"TAL CUAL ES\" Y \"SEGÚN DISPONIBILIDAD. EN LA MEDIDA EN QUE LO PERMITA LA LEY, BlickDomi DENIEGA EXPRESAMENTE TODA GARANTÍA Y CONDICIÓN DE CUALQUIER CLASE, YA SEA EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADA A LAS GARANTÍAS Y CONDICIONES IMPLÍCITAS DE MERCANTIBILIDAD, ADECUACIÓN PARA UN FIN CONCRETO Y NO INFRINGIMIENTO. (b) BlickDomi NO GARANTIZA QUE (i) EL SERVICIO CUMPLA TODOS SUS REQUISITOS, (ii) EL SERVICIO SEA ININTERRUMPIDO, PUNTUAL, SEGURO O SIN ERRORES, O (iii) SE CORRIJAN TODOS LOS ERRORES EN EL SERVICIO. (c) CUALQUIER MATERIAL DESCARGADO U OBTENIDO DE OTRA FORMA MEDIANTE EL USO DEL SERVICIO SERÁ HECHO BAJO SU RESPONSABILIDAD Y USTED SERÁ EL ÚNICO RESPONSABLE DE CUALQUIER DAÑO A SUS SISTEMAS INFORMÁTICOS U OTROS DISPOSITIVOS O DE LA PÉRDIDA DE DATOS OCASIONADA POR LA DESCARGA DE DICHO MATERIAL. (d) NINGÚN CONSEJO O INFORMACIÓN, YA SEA ORALMENTE O POR ESCRITO, QUE USTED OBTENGA DE BlickDomi O DEL SERVICIO O A TRAVÉS DEL MISMO, CREARÁ NINGUNA GARANTÍA QUE NO SE MENCIONE EXPRESAMENTE EN ESTAS CONDICIONES DE SERVICIO."
    ]
  },
  {
    "t": "h",
    "text": "Limitación de responsabilidad:"
  },
  {
    "t": "p",
    "s": [
      "USTED ENTIENDE Y ACEPTA EXPRESAMENTE QUE Konect, SUS SUBSIDIARIOS, FILIALES Y LICENCIATARIOS, Y NUESTROS Y SUS RESPECTIVOS EJECUTIVOS, EMPLEADOS, AGENTES Y HEREDEROS NO SERÁN RESPONSABLES ANTE USTED DE NINGÚN DAÑO DIRECTO, INDIRECTO, INCIDENTAL, ESPECIAL, CONSECUENTE O EJEMPLAR, INCLUIDOS, PERO NO LIMITADOS A, LOS DAÑOS POR PÉRDIDA DE BENEFICIOS, BUENA VOLUNTAD, USO, DATOS, COBERTURA U OTRAS PÉRDIDAS INTANGIBLES (INCLUSO AUNQUE BlickDomi HAYA SIDO ADVERTIDA DE LA POSIBILIDAD DE DICHOS DAÑOS) CAUSADOS POR: (i) EL USO O LA INCAPACIDAD DE USAR EL SERVICIO, (ii) EL COSTE DEL SUMINISTRO DE BIENES Y SERVICIOS DE SUSTITUCIÓN OCASIONADOS POR CUALQUIER MERCANCÍA, DATO, INFORMACIÓN O SERVICIO ADQUIRIDO U OBTENIDO O MENSAJES RECIBIDOS O TRANSACCIONES EFECTUADAS DESDE O A TRAVÉS DEL SERVICIO, (iii) EL ACCESO NO AUTORIZADO A SUS TRANSMISIONES, CONTENIDOS O DATOS O LA PÉRDIDA, CORRUPCIÓN O ALTERACIÓN DE LOS MISMOS, (iv) AFIRMACIONES O CONDUCTAS DE TERCEROS EN O A TRAVÉS DEL USO DEL SERVICIO, (v) LAS ACCIONES U OMISIONES DE BlickDomi EN CUANTO A LA FIABILIDAD DE SU INFORMACIÓN DE CUENTA Y CUALQUIER CAMBIO EN LA MISMA, (vi) SUS FALLOS AL PROTEGER LA CONFIDENCIALIDAD DE CUALQUIER CONTRASEÑA O DERECHO DE ACCESO A LA INFORMACIÓN DE SU CUENTA, (vii) LAS ACCIONES U OMISIONES DE TERCEROS QUE USEN O SE INTEGREN CON EL SERVICIO, (viii) CUALQUIER CONTENIDO PUBLICITARIO O EL USO O ADQUISICIÓN POR SU PARTE DE CUALQUIER PRODUCTO O SERVICIO PUBLICITADO, (ix) LA TERMINACIÓN DE SU CUENTA EN CONSONANCIA CON ESTOS TÉRMINOS Y CONDICIONES, O (x) CUALQUIER OTRO ASUNTO RELACIONADO CON EL SERVICIO."
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
