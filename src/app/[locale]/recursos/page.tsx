import { absolute, alternates, breadcrumbSchema, jsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { ResourceExplorer } from '@/components/resources/ResourceExplorer'
import { getCategories, getResources, getVisibleDevices } from '@/lib/content'
import { getDictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'
import { toResourceViews } from '@/lib/resource-view'
import { getVideoMap } from '@/lib/youtube'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  return {
    title: dict.explorer.title,
    description: dict.explorer.subtitle,
    alternates: alternates('/recursos', locale),
  }
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const [dict, resources, categories, devices, videoMap] = await Promise.all([
    getDictionary(locale),
    getResources(),
    getCategories(),
    getVisibleDevices(),
    getVideoMap(),
  ])

  // Enriquecemos el catálogo curado con los metadatos en vivo de YouTube.
  const views = await toResourceViews(resources, locale, videoMap)

  /**
   * ItemList con las 63 fichas: le dice al buscador que esta página es el
   * índice de un conjunto y le da la ruta a cada URL individual, aunque el
   * listado se filtre en cliente.
   */
  const listSchema = {
    '@type': 'ItemList',
    '@id': absolute(`/${locale}/recursos#list`),
    name: dict.explorer.title,
    numberOfItems: views.length,
    itemListElement: views.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: absolute(`/${locale}/recursos/${item.id}`),
    })),
  }

  const crumbs = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.explorer.title, path: `/${locale}/recursos` },
  ]

  return (
    <>
      <JsonLd data={jsonLd(listSchema, breadcrumbSchema(crumbs))} />

      <PageHeader
        eyebrow={dict.explorer.eyebrow}
        title={<GradientTitle text={dict.explorer.title} />}
        subtitle={dict.explorer.subtitle}
      />

      <div className="container-page py-10 sm:py-14">
        <Suspense fallback={<ExplorerSkeleton />}>
          <ResourceExplorer
            resources={views}
            categories={categories}
            devices={devices}
            locale={locale}
            dict={dict}
          />
        </Suspense>
      </div>
    </>
  )
}

function ExplorerSkeleton() {
  return (
    <div>
      <div className="mb-8 h-14 w-full rounded-full bg-fg/6 shimmer" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 rounded-3xl border border-line bg-fg/4 shimmer" />
        ))}
      </div>
    </div>
  )
}
