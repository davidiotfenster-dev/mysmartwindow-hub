import type { ResourceView } from '@/lib/resource-view'

/** Un tema con todos sus formatos: el manual y su vídeo son el mismo contenido. */
export interface ResourceGroup {
  key: string
  primary: ResourceView
  others: ResourceView[]
}

/** `perfiles-de-usuario-manual` y `perfiles-de-usuario-video` comparten esta clave. */
export function groupKey(id: string): string {
  return id.replace(/-(manual|video|tarjeta)$/, '')
}

// En la tarjeta manda el documento; el vídeo y la tarjeta quedan como atajos.
const PRIORITY = { manual: 0, tarjeta: 1, video: 2 } as const

/**
 * Junta los formatos de un mismo tema respetando el orden en que llegan.
 * `shortcuts` son recursos que no abren tarjeta propia pero sí se enlazan
 * desde la de su tema (los vídeos, que viven en su propia sección).
 */
export function groupResources(
  list: ResourceView[],
  shortcuts: ResourceView[] = []
): ResourceGroup[] {
  const groups = new Map<string, ResourceView[]>()
  for (const resource of list) {
    const key = groupKey(resource.id)
    const members = groups.get(key)
    if (members) members.push(resource)
    else groups.set(key, [resource])
  }

  for (const shortcut of shortcuts) {
    const members = groups.get(groupKey(shortcut.id))
    if (members && !members.some((m) => m.id === shortcut.id)) members.push(shortcut)
  }

  return [...groups.entries()].map(([key, members]) => {
    const sorted = [...members].sort((a, b) => PRIORITY[a.type] - PRIORITY[b.type])
    return { key, primary: sorted[0], others: sorted.slice(1) }
  })
}

export function countGroups(list: ResourceView[]): number {
  return new Set(list.map((r) => groupKey(r.id))).size
}
