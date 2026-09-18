'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Section, SectionHeading, ButtonLink } from '@/components/ui/primitives'
import { faqs } from '@/data/faq'
import { routes } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

export function Faq({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow={dict.faq.eyebrow}
            title={dict.faq.title}
            subtitle={dict.faq.subtitle}
          />
          <div className="mt-8 rounded-3xl border border-line bg-bg-elevated/60 p-6">
            <p className="font-display text-lg font-bold">{dict.faq.stillNeedHelp}</p>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-fg-muted">
              {dict.contact.subtitle}
            </p>
            <ButtonLink href={routes.contacto(locale)} size="sm" className="mt-5">
              {dict.faq.contactUs}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ButtonLink>
          </div>
        </div>

        <ul className="divide-y divide-[var(--border)] border-y border-line">
          {faqs.map((item) => {
            const isOpen = open === item.id
            return (
              <li key={item.id}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-5 py-5 text-left"
                  >
                    <span
                      className={cn(
                        'font-display text-[1.05rem] font-bold leading-snug transition-colors sm:text-lg',
                        isOpen ? 'text-brand-500' : 'group-hover:text-brand-500'
                      )}
                    >
                      {item.question[locale]}
                    </span>
                    <span
                      className={cn(
                        'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300',
                        isOpen
                          ? 'rotate-45 border-brand-500 bg-brand-500 text-white'
                          : 'border-line text-fg-subtle group-hover:border-brand-500 group-hover:text-brand-500'
                      )}
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-12">
                        <p className="text-[0.92rem] leading-relaxed text-fg-muted">
                          {item.answer[locale]}
                        </p>
                        {item.resourceId && (
                          <Link
                            href={`${routes.recursos(locale)}/${item.resourceId}`}
                            className="mt-3.5 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-brand-500 hover:text-brand-400"
                          >
                            {dict.common.open}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
