import { alternates } from '@/lib/seo'
import type { Metadata } from 'next'
import { ExternalLink, Linkedin, Youtube } from 'lucide-react'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { ContactForm } from '@/components/contact/ContactForm'
import { LogoMark } from '@/components/brand/Logo'
import { EXTERNAL } from '@/lib/navigation'
import { getDictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
    alternates: alternates('/contacto', locale),
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <>
      <PageHeader
        eyebrow={dict.contact.eyebrow}
        title={<GradientTitle text={dict.contact.title} />}
        subtitle={dict.contact.subtitle}
      />

      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="rounded-3xl border border-line bg-bg-elevated/60 p-6 sm:p-9">
            <ContactForm dict={dict} />
          </div>

          <aside className="space-y-5">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-elevated/60 p-7">
              <LogoMark className="pointer-events-none absolute -right-5 -top-3 h-24 w-24 text-brand-500/8" />
              <h2 className="relative font-display text-xl font-bold">IoT Fenster</h2>
              <p className="relative mt-3 text-[0.88rem] leading-relaxed text-fg-muted">
                {dict.footer.tagline}
              </p>
              <a
                href={EXTERNAL.corporate}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-brand-500 hover:text-brand-400"
              >
                www.iotfenster.com
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-3xl border border-line bg-bg-elevated/60 p-7">
              <h2 className="font-display text-lg font-bold">{dict.nav.areaCliente}</h2>
              <p className="mt-2.5 text-[0.86rem] leading-relaxed text-fg-muted">
                {dict.values.support.description}
              </p>
              <a
                href={EXTERNAL.clientArea}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[0.85rem] font-semibold transition-colors hover:border-brand-500 hover:text-brand-500"
              >
                {dict.nav.areaCliente}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-3xl border border-line bg-bg-elevated/60 p-7">
              <h2 className="font-display text-lg font-bold">{dict.footer.social}</h2>
              <div className="mt-4 flex gap-2">
                <a
                  href={EXTERNAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg-muted transition-all hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-500"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={EXTERNAL.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg-muted transition-all hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-500"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
