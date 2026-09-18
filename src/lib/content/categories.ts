import { cache } from 'react'

import { categories as staticCategories, type Category, type CategoryId } from '@/data/taxonomy'
import {
  anyEntry,
  fetchCollectionAllLocales,
  pickLocalized,
  zipByDocumentId,
} from './strapi-client'

/**
 * Categorias del catalogo. El listado de ids (`categoryIds` en
 * `src/data/taxonomy.ts`) sigue mandando en el codigo -las rutas y los
 * filtros dependen de el-, pero el nombre, la descripcion y el icono de cada
 * una pueden venir del CMS.
 */
export const getCategories = cache(async (): Promise<Category[]> => {
  const byLocale = await fetchCollectionAllLocales('/api/categories', '*')
  if (!byLocale) return staticCategories

  const merged: Category[] = []
  for (const bucket of zipByDocumentId(byLocale).values()) {
    const base = anyEntry(bucket)
    if (!base?.slug) continue
    merged.push({
      id: base.slug as CategoryId,
      icon: (base.icon as string) ?? '',
      name: pickLocalized(bucket, 'name'),
      description: pickLocalized(bucket, 'description'),
    })
  }

  return merged.length ? merged : staticCategories
})

export const getCategoryMap = cache(async (): Promise<Record<CategoryId, Category>> => {
  const list = await getCategories()
  return Object.fromEntries(list.map((c) => [c.id, c])) as Record<CategoryId, Category>
})
