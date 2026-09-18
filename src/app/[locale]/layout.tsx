import type { Metadata, Viewport } from 'next'
import { League_Spartan, Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'

import { Suspense } from 'react'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { NavigationProgress } from '@/components/layout/NavigationProgress'
import { JsonLd } from '@/components/seo/JsonLd'
import { alternates, jsonLd, organizationSchema, websiteSchema, SITE_URL } from '@/lib/seo'
import { BackToTop } from '@/components/layout/BackToTop'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { SupportAssistant } from '@/components/layout/SupportAssistant'
import { getDictionary } from '@/i18n'
import { isLocale, locales, localeMeta, type Locale } from '@/i18n/config'
import { getCategories, getResources, getSiteSettings, getVisibleDevices } from '@/lib/content'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-league-spartan',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  const settings = await getSiteSettings()
  const title = settings.seo.metaTitle || dict.meta.title
  const description = settings.seo.metaDescription || dict.meta.description
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · MySmartWindow` },
    description,
    applicationName: 'MySmartWindow',
    authors: [{ name: 'IoT Fenster', url: 'https://www.iotfenster.com' }],
    // hreflang completo: el portal original declara es/en pero se deja fuera el
    // italiano pese a publicarlo, y no declara x-default.
    alternates: alternates('/', isLocale(locale) ? locale : 'es'),
    openGraph: {
      type: 'website',
      siteName: 'MySmartWindow — IoT Fenster',
      title,
      description,
      locale: localeMeta[isLocale(locale) ? locale : 'es'].htmlLang,
      ...(settings.seo.ogImage ? { images: [{ url: settings.seo.ogImage }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
    icons: { icon: '/icon.svg' },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f8f9' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e11' },
  ],
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const typedLocale = locale as Locale
  const dict = getDictionary(typedLocale)
  const [resources, categories, settings, devices] = await Promise.all([
    getResources(),
    getCategories(),
    getSiteSettings(),
    getVisibleDevices(),
  ])

  // El asistente ofrece WhatsApp como salida; sin número configurado, no lo propone.
  const whatsapp = settings.whatsappNumber
    ? {
        sales: `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(settings.salesWhatsappMessage[typedLocale])}`,
        support: `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(settings.supportWhatsappMessage[typedLocale])}`,
      }
    : undefined

  // El paletazo ⌘K necesita el índice completo, pero sólo los campos que usa.
  const searchIndex = resources.map((r) => ({
    id: r.id,
    type: r.type,
    category: r.category,
    device: r.device,
    title: r.title[typedLocale],
    summary: r.summary?.[typedLocale] ?? '',
    tags: r.tags ?? [],
  }))

  return (
    <html
      lang={localeMeta[typedLocale].htmlLang}
      suppressHydrationWarning
      className={`${leagueSpartan.variable} ${montserrat.variable}`}
    >
      <body className="min-h-dvh antialiased">
        {/* Identidad del sitio y de la empresa, una sola vez para todo el dominio */}
        <JsonLd
          data={jsonLd(
            organizationSchema(settings.organizationDescription[typedLocale]),
            websiteSchema(typedLocale)
          )}
        />

        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
          >
            {dict.nav.skipToContent}
          </a>

          <ScrollProgress />
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          <Header locale={typedLocale} dict={dict} />

          <main id="main" className="relative">
            {children}
          </main>

          <Footer locale={typedLocale} dict={dict} />

          <BackToTop />
          <SupportAssistant
            locale={typedLocale}
            dict={dict}
            devices={devices.map((device) => ({ id: device.id, name: device.name }))}
            whatsapp={whatsapp}
          />
          <CookieBanner dict={dict} locale={typedLocale} />
          <CommandPalette locale={typedLocale} dict={dict} index={searchIndex} categories={categories} />
        </Providers>
      </body>
    </html>
  )
}
