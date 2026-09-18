import Link from 'next/link'
import { Linkedin, Youtube, ExternalLink } from 'lucide-react'

import { Logo } from '@/components/brand/Logo'
import { NewsletterForm } from './NewsletterForm'
import { SlatDivider } from '@/components/ui/primitives'
import { EXTERNAL, mainNav, routes } from '@/lib/navigation'
import { getCategories } from '@/lib/content'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.7a5.68 5.68 0 0 0-.77-.05A5.68 5.68 0 1 0 15.54 15.4V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48Z" />
    </svg>
  )
}

export async function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const nav = mainNav(locale, dict)
  const categories = await getCategories()
  const year = new Date().getFullYear()

  const socials = [
    { href: EXTERNAL.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: EXTERNAL.youtube, label: 'YouTube', Icon: Youtube },
    { href: EXTERNAL.tiktok, label: 'TikTok', Icon: TikTokIcon },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-subtle">
      {/* Lamas decorativas del motivo de marca */}
      <div className="slats pointer-events-none absolute inset-x-0 top-0 h-40 opacity-60" aria-hidden="true" />

      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Marca */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {dict.footer.tagline}
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg-muted transition-all hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-fg-subtle">{dict.footer.social}</p>
          </div>

          {/* Navegación */}
          <nav aria-label={dict.footer.quickLinks}>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-fg">
              {dict.footer.quickLinks}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-fg-muted transition-colors hover:text-brand-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={EXTERNAL.clientArea}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-brand-500"
                >
                  {dict.nav.areaCliente}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Categorías */}
          <nav aria-label={dict.footer.resources}>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-fg">
              {dict.footer.resources}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`${routes.recursos(locale)}?cat=${category.id}`}
                    className="text-sm text-fg-muted transition-colors hover:text-brand-500"
                  >
                    {category.name[locale]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={routes.recursos(locale)}
                  className="text-sm font-semibold text-brand-500 transition-colors hover:text-brand-400"
                >
                  {dict.common.viewAll} →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-fg">
              {dict.newsletter.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">{dict.newsletter.subtitle}</p>
            <div className="mt-5">
              <NewsletterForm dict={dict} />
            </div>
          </div>
        </div>

        <SlatDivider className="my-10" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-fg-subtle sm:flex-row sm:items-center">
          <p>
            © {year} IoT Fenster. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={EXTERNAL.privacy}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand-500"
            >
              {dict.footer.privacy}
            </a>
            <a
              href={EXTERNAL.legal}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand-500"
            >
              {dict.footer.notice}
            </a>
            <a
              href={EXTERNAL.corporate}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand-500"
            >
              www.iotfenster.com
            </a>
          </div>
        </div>

        <p className="mt-5 text-[0.7rem] leading-relaxed text-fg-subtle/70">
          {dict.footer.builtWith}
        </p>
      </div>
    </footer>
  )
}
