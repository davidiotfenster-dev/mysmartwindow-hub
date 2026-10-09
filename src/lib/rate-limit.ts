/**
 * Limite de envios por visitante, en memoria. Basta para frenar a quien pulsa
 * el boton en bucle o a un bot torpe; no es una defensa contra un ataque
 * serio (eso se haria en Caddy o con un servicio externo). Al reiniciar el
 * contenedor se vacia, lo cual aqui no importa.
 */
const hits = new Map<string, number[]>()

/** Devuelve true si `key` ya ha hecho `max` peticiones en los ultimos `windowMs`. */
export function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs)
  const blocked = recent.length >= max
  if (!blocked) recent.push(now)
  hits.set(key, recent)

  // Que el mapa no crezca sin fin con visitantes que ya no vuelven
  if (hits.size > 1000) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(k)
    }
  }
  return blocked
}

/** IP del visitante tal como la pasa Caddy (primer valor de X-Forwarded-For). */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded ? forwarded.split(',')[0].trim() : 'desconocida'
}
