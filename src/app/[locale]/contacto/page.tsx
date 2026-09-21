import { alternates } from '@/lib/seo'
import type { Metadata } from 'next'
import { ExternalLink, LifeBuoy, Linkedin, Mail, MessageCircle, Youtube } from 'lucide-react'

import { PageHeader } from '@/components/layout/PageHeader'
import { GradientTitle } from '@/components/ui/GradientTitle'
import { ContactForm } from '@/components/contact/ContactForm'
import { LogoMark } from '@/components/brand/Logo'
import { EXTERNAL } from '@/lib/navigation'
import { getDictionary } from '@/i18n'
import { getSiteSettings } from '@/lib/content'
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
  const [dict, settings] = await Promise.all([getDictionary(locale), getSiteSettings()])

  function whatsappHref(message: string): string | undefined {
    return settings.whatsappNumber
      ? `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
      : undefined
  }

  const channels = [
    {
      key: 'sales',
      icon: MessageCircle,
      title: dict.contactChannels.sales.title,
      description: dict.contactChannels.sales.description,
      email: settings.salesEmail,
      whatsapp: whatsappHref(settings.salesWhatsappMessage[locale]),
    },
    {
      key: 'support',
      icon: LifeBuoy,
      title: dict.contactChannels.support.title,
      description: dict.contactChannels.support.description,
      email: settings.supportEmail,
      whatsapp: whatsappHref(settings.supportWhatsappMessage[locale]),
    },
  ] as const

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
            <ContactForm dict={dict} locale={locale} />
          </div>

          <aside className="space-y-5">
            <p className="px-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-fg-subtle">
              {dict.contactChannels.eyebrow}
            </p>

            {channels.map(({ key, icon: Icon, title, description, email, whatsapp }) => (
              <div
                key={key}
                className={
                  key === 'sales'
                    ? 'relative overflow-hidden rounded-3xl border border-brand-500/25 bg-brand-500/6 p-7'
                    : 'relative overflow-hidden rounded-3xl border border-amber-500/25 bg-amber-500/8 p-7'
                }
              >
                <h2 className="flex items-center gap-2.5 font-display text-lg font-bold">
                  <span
                    className={
                      key === 'sales'
                        ? 'grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 text-white'
                        : 'grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-500 text-white'
                    }
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </span>
                  {title}
                </h2>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-fg-muted">{description}</p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-bg px-4 text-[0.85rem] font-semibold transition-colors hover:border-fg-subtle"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {dict.contactChannels[key].emailCta}
                    </a>
                  )}
                  {whatsapp && (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-4 text-[0.85rem] font-semibold text-white transition-transform hover:scale-[1.02]"
                    >
                      {dict.contactChannels[key].whatsappCta}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                {email && (
                  <p className="mt-3 text-[0.78rem] text-fg-subtle">{email}</p>
                )}
              </div>
            ))}

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
