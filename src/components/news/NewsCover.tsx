import Image from 'next/image'

/**
 * Portada de una noticia que se ve entera sea cual sea su proporción.
 *
 * Quien sube la portada puede usar una foto vertical de producto, una captura
 * o una panorámica. Recortarla para llenar el marco (`object-cover`) corta el
 * producto; mostrarla entera deja franjas vacías. Se hacen las dos cosas: la
 * foto entera delante y, detrás, la misma foto desenfocada rellenando el
 * marco, de modo que las franjas toman el color de la propia imagen.
 *
 * El marco lo pone quien la usa (tamaño y bordes): este componente solo se
 * ocupa de rellenarlo.
 */
export function NewsCover({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string
  alt: string
  sizes: string
  priority?: boolean
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="160px"
        className="scale-125 object-cover blur-2xl"
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain"
      />
    </>
  )
}
