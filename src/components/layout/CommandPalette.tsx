'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Fuse from 'fuse.js'
import { useRouter } from 'next/navigation'
import { BookOpen, CornerDownLeft, CreditCard, PlayCircle, Search } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { Category, CategoryId } from '@/data/taxonomy'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'
import { routes } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export interface SearchEntry {
  id: string
  type: 'manual' | 'video' | 'tarjeta'
  category: string
  device: string
  title: string
  summary: string
  tags: string[]
}

const OPEN_EVENT = 'msw:open-command-palette'

/** Abre la paleta desde cualquier parte de la app. */
export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

const typeIcon = { manual: BookOpen, video: PlayCircle, tarjeta: CreditCard } as const

export function CommandPalette({
  locale,
  dict,
  index,
  categories,
}: {
  locale: Locale
  dict: Dictionary
  index: SearchEntry[]
  categories: Category[]
}) {
  const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
    CategoryId,
    Category
  >
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const fuse = useMemo(
    () =>
      new Fuse(index, {
        keys: [
          { name: 'title', weight: 0.55 },
          { name: 'tags', weight: 0.25 },
          { name: 'summary', weight: 0.2 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        includeScore: true,
      }),
    [index]
  )

  const results = useMemo(() => {
    if (!query.trim()) return index.slice(0, 8)
    return fuse
      .search(query, { limit: 10 })
      .map((r) => r.item)
  }, [query, fuse, index])

  useEffect(() => setActive(0), [query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  const go = useCallback(
    (entry: SearchEntry) => {
      close()
      // A la ficha propia del recurso, no a un parámetro del explorador
      router.push(`${routes.recursos(locale)}/${entry.id}`)
    },
    [close, locale, router]
  )

  useEffect(() => {
    const onOpen = () => setOpen(true)
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((v) => !v)
      }
      if (event.key === 'Escape') close()
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [close])

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter' && results[active]) {
      event.preventDefault()
      go(results[active])
    }
  }

  useEffect(() => {
    listRef.current
      ?.querySelectorAll('li')
      [active]?.scrollIntoView({ block: 'nearest' })
  }, [active])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-200 flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" onClick={close} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.common.search}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-bg-elevated shadow-2xl"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-4.5 w-4.5 shrink-0 text-brand-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={dict.common.searchPlaceholder}
                aria-label={dict.common.search}
                className="h-15 w-full bg-transparent text-[0.95rem] outline-none placeholder:text-fg-subtle"
              />
              <kbd className="hidden shrink-0 rounded border border-line bg-fg/5 px-1.5 py-0.5 text-[0.65rem] font-semibold text-fg-subtle sm:block">
                ESC
              </kbd>
            </div>

            <ul ref={listRef} className="max-h-[52vh] overflow-auto p-2">
              {results.length === 0 && (
                <li className="px-4 py-10 text-center">
                  <p className="font-semibold">{dict.common.noResults}</p>
                  <p className="mt-1 text-sm text-fg-muted">{dict.common.noResultsHint}</p>
                </li>
              )}

              {results.map((entry, i) => {
                const TypeIcon = typeIcon[entry.type]
                const category = categoryById[entry.category as keyof typeof categoryById]
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(entry)}
                      className={cn(
                        'flex w-full items-center gap-3.5 rounded-2xl px-3.5 py-3 text-left transition-colors',
                        i === active ? 'bg-brand-500/10' : 'hover:bg-fg/4'
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                          i === active ? 'bg-brand-500 text-white' : 'bg-fg/6 text-fg-muted'
                        )}
                      >
                        <TypeIcon className="h-4.5 w-4.5" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{entry.title}</span>
                        <span className="block truncate text-xs text-fg-subtle">
                          {category ? category.name[locale] : entry.category}
                        </span>
                      </span>
                      {i === active && (
                        <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-5 py-2.5 text-[0.7rem] text-fg-subtle">
              <span>
                {results.length} {results.length === 1 ? dict.common.result : dict.common.results}
              </span>
              <span className="hidden items-center gap-3 sm:flex">
                <span>↑↓ {dict.explorer.sortBy.toLowerCase()}</span>
                <span>↵ {dict.common.open.toLowerCase()}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
