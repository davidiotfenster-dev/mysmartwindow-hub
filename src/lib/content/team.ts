import { cache } from 'react'

import { team as staticTeam, type TeamMember } from '@/data/team'
import {
  anyEntry,
  fetchCollectionAllLocales,
  mediaUrl,
  pickLocalized,
  zipByDocumentId,
} from './strapi-client'

export const getTeam = cache(async (): Promise<TeamMember[]> => {
  const byLocale = await fetchCollectionAllLocales('/api/team-members', 'photo')
  if (!byLocale) return staticTeam

  const merged: TeamMember[] = []
  for (const bucket of zipByDocumentId(byLocale).values()) {
    const base = anyEntry(bucket)
    if (!base?.slug) continue
    merged.push({
      id: base.slug as string,
      name: (base.name as string) ?? '',
      order: typeof base.order === 'number' ? base.order : 100,
      linkedin: (base.linkedin as string) || undefined,
      // Si en el CMS no han subido foto, se usa la del codigo en vez de dejar
      // el hueco: dar de alta a alguien en el panel no deberia hacer
      // desaparecer la foto que ya se veia.
      photo: mediaUrl(base.photo) ?? staticTeam.find((m) => m.id === base.slug)?.photo,
      role: pickLocalized(bucket, 'role'),
      bio: pickLocalized(bucket, 'bio'),
    })
  }

  if (!merged.length) return staticTeam
  return merged.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
})
