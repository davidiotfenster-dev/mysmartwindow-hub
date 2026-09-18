'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, X, ChevronRight, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Logo } from '@/components/brand/Logo'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ButtonLink } from '@/components/ui/primitives'
import { EXTERNAL, mainNav, routes } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'
import { openCommandPalette } from './CommandPalette'

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const nav = mainNav(locale, dict)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el cajón al navegar
  useEffect(() => setDrawerOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-90 transition-all duration-400',
          scrolled ? 'py-2.5' : 'py-4'
        )}
      >
        <div className="container-page">
          <div
            className={cn(
              'flex min-w-0 items-center gap-2 rounded-full px-2.5 transition-all duration-400 sm:gap-3 sm:px-4',
              scrolled
                ? 'glass h-14 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)]'
                : 'h-16 border border-transparent'
            )}
          >
            <Link
              href={routes.home(locale)}
              className="shrink-0 rounded-full py-1 pr-1 transition-opacity hover:opacity-80 sm:pr-2"
              aria-label="MySmartWindow — IoT Fenster"
            >
              {/* En móviles estrechos sólo el isotipo: si no, el menú se sale */}
              <Logo wordmarkClassName="hidden xs:inline" />
            </Link>

            <nav className="ml-2 hidden items-center gap-0.5 lg:flex" aria-label="Principal">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-[0.82rem] font-semibold tracking-tight transition-colors',
                    isActive(item.href)
                      ? 'text-brand-500'
                      : 'text-fg-muted hover:text-fg'
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-500/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-1.5">
              <button
                type="button"
                onClick={openCommandPalette}
                className="group hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-[0.78rem] text-fg-subtle transition-colors hover:border-brand-500/40 hover:text-fg md:flex"
                aria-label={dict.common.search}
              >
                <Search className="h-3.5 w-3.5" />
                <span className="pr-6">{dict.common.search}</span>
                <kbd className="rounded border border-line bg-fg/5 px-1.5 py-0.5 font-sans text-[0.65rem] font-semibold">
                  ⌘K
                </kbd>
              </button>

              <button
                type="button"
                onClick={openCommandPalette}
                className="rounded-full p-2.5 text-fg-muted transition-colors hover:bg-fg/6 hover:text-fg md:hidden"
                aria-label={dict.common.search}
              >
                <Search className="h-4.5 w-4.5" />
              </button>

              <LanguageSwitcher locale={locale} />
              <ThemeToggle />

              <ButtonLink
                href={routes.contacto(locale)}
                size="sm"
                className="hidden xl:inline-flex"
              >
                {dict.nav.contacto}
              </ButtonLink>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="rounded-full p-2.5 text-fg transition-colors hover:bg-fg/6 lg:hidden"
                aria-label={dict.nav.menu}
                aria-expanded={drawerOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cajón móvil */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-100 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              className="absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col border-l border-line bg-bg-elevated"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Logo />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label={dict.nav.closeMenu}
                  className="rounded-full p-2 text-fg-muted transition-colors hover:bg-fg/6 hover:text-fg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-auto px-3 py-4" aria-label={dict.nav.menu}>
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-semibold transition-colors',
                        isActive(item.href)
                          ? 'bg-brand-500/10 text-brand-500'
                          : 'text-fg hover:bg-fg/5'
                      )}
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 opacity-40" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-2 border-t border-line p-4">
                <ButtonLink href={routes.contacto(locale)} className="w-full">
                  {dict.nav.contacto}
                </ButtonLink>
                <ButtonLink
                  href={EXTERNAL.clientArea}
                  external
                  variant="outline"
                  className="w-full"
                >
                  {dict.nav.areaCliente}
                  <ExternalLink className="h-3.5 w-3.5" />
                </ButtonLink>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
