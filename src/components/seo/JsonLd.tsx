/**
 * Inserta datos estructurados. El contenido lo genera el servidor a partir de
 * nuestros propios datos, nunca de entrada del usuario, asi que el JSON es
 * seguro; aun asi escapamos `<` para no poder cerrar la etiqueta script.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
