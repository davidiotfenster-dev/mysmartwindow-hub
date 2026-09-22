import { notFound } from 'next/navigation'

/**
 * Cualquier direccion inventada bajo un idioma (`/it/lo-que-sea`) cae aqui y
 * de aqui al 404 del sitio, con su cabecera, su pie y su idioma. Sin esto
 * Next servia su 404 pelado, en ingles y sin salida hacia el resto del sitio.
 *
 * Las rutas de verdad siguen teniendo preferencia: una ruta comodin es lo
 * ultimo que Next prueba.
 */
export default function RutaDesconocida() {
  notFound()
}
