'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Fuse from 'fuse.js'
import { useRouter, useSearchParams } from 'next/navigation'
import { LayoutGrid, List, Search, SlidersHorizontal, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { ResourceCard } from './ResourceCard'
import { ResourceModal } from './ResourceModal'
import { Badge } from '@/components/ui/primitives'
import { categories, resourceTypeMeta, resourceTypes, visibleDevices } from '@/data/taxonomy'
import type { ResourceView } from '@/lib/resource-view'
import { cn, normalize } from '@/lib/utils'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

type Sort = 'relevance' | 'recent' | 'az'

const ALL = 'all'

export function ResourceExplorer({
  resources,
  locale,
  dict,
}: {
  resources: ResourceView[]
  locale: Locale
  dict: Dictionary
}) {
  const router = useRouter()
  const params = useSearchParams()

  const [query, setQuery] = useState(params.get('q') ?? '')
  const [category, setCategory] = useState(params.get('cat') ?? ALL)
  const [type, setType] = useState(params.get('tipo') ?? ALL)
  const [device, setDevice] = useState(params.get('dispositivo') ?? ALL)
  const [sort, setSort] = useState<Sort>('relevance')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selected, setSelected] = useState<ResourceView | null>(null)

  /* ---- Estado reflejado en la URL: las búsquedas se pueden compartir ---- */
  useEffect(() => {
    const next = new URLSearchParams()
    if (query.trim()) next.set('q', query.trim())
    if (category !== ALL) next.set('cat', category)
    if (type !== ALL) next.set('tipo', type)
    if (device !== ALL) next.set('dispositivo', device)
    const qs = next.toString()
    const url = qs ? `?${qs}` : window.location.pathname
    window.history.replaceState(null, '', url)
  }, [query, category, type, device])

  /* ---- Apertura directa de un recurso por URL (?abrir=id) ---- */
  useEffect(() => {
    const id = params.get('abrir')
    if (!id) return
    const match = resources.find((r) => r.id === id)
    if (match) setSelected(match)
  }, [params, resources])

  /**
   * Índice con los campos ya normalizados (sin acentos, en minúsculas): así
   * "instalacion" encuentra "Instalación" sin depender de internals de Fuse.
   */
  const indexed = useMemo(
    () =>
      resources.map((r) => ({
        ...r,
        _title: normalize(r.title),
        _summary: normalize(r.summary),
        _tags: r.tags.map(normalize),
        _category: normalize(r.categoryName),
        _device: normalize(r.deviceName),
      })),
    [resources]
  )

  const fuse = useMemo(
    () =>
      new Fuse(indexed, {
        keys: [
          { name: '_title', weight: 0.5 },
          { name: '_tags', weight: 0.22 },
          { name: '_summary', weight: 0.16 },
          { name: '_category', weight: 0.06 },
          { name: '_device', weight: 0.06 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
      }),
    [indexed]
  )

  const results = useMemo(() => {
    let list: ResourceView[] = query.trim()
      ? fuse.search(normalize(query)).map((r) => r.item as ResourceView)
      : [...resources]

    if (category !== ALL) list = list.filter((r) => r.category === category)
    if (type !== ALL) list = list.filter((r) => r.type === type)
    if (device !== ALL) list = list.filter((r) => r.device === device)

    if (sort === 'az') {
      list.sort((a, b) => a.title.localeCompare(b.title, locale))
    } else if (sort === 'recent') {
      list.sort((a, b) => (b.updated ?? '').localeCompare(a.updated ?? ''))
    } else if (!query.trim()) {
      // Sin consulta, "relevancia" = destacados primero
      list.sort((a, b) => Number(b.featured) - Number(a.featured))
    }

    return list
  }, [query, category, type, device, sort, fuse, resources, locale])

  const activeFilters = [category, type, device].filter((v) => v !== ALL).length

  const reset = useCallback(() => {
    setQuery('')
    setCategory(ALL)
    setType(ALL)
    setDevice(ALL)
  }, [])

  const closeModal = useCallback(() => {
    setSelected(null)
    const next = new URLSearchParams(window.location.search)
    next.delete('abrir')
    const qs = next.toString()
    router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false })
  }, [router])

  /* ---- Grupos de filtros, reutilizados en escritorio y en la hoja móvil ---- */
  const filterGroups = [
    {
      label: dict.common.category,
      value: category,
      set: setCategory,
      options: categories.map((c) => ({ value: c.id, label: c.name[locale] })),
    },
    {
      label: dict.common.type,
      value: type,
      set: setType,
      options: resourceTypes.map((t) => ({ value: t, label: resourceTypeMeta[t].label[locale] })),
    },
    {
      label: dict.common.device,
      value: device,
      set: setDevice,
      options: visibleDevices.map((d) => ({ value: d.id, label: d.name })),
    },
  ]

  return (
    <div>
      {/* ================= Barra de búsqueda ================= */}
      <div className="sticky top-[4.5rem] z-40 -mx-4 mb-6 px-4 py-3 sm:top-20 sm:mx-0 sm:px-0">
        <div className="glass flex items-center gap-2 rounded-2xl p-2 shadow-lg sm:rounded-full sm:p-2.5">
          <Search className="ml-2 h-4.5 w-4.5 shrink-0 text-brand-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.common.searchPlaceholder}
            aria-label={dict.explorer.searchLabel}
            className="min-w-0 flex-1 bg-transparent py-1.5 text-[0.9rem] outline-none placeholder:text-fg-subtle"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={dict.common.clearFilters}
              className="rounded-full p-1.5 text-fg-subtle transition-colors hover:bg-fg/8 hover:text-fg"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Botón de filtros: sólo móvil/tablet */}
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-[0.8rem] font-semibold text-white lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">{dict.common.filters}</span>
            {activeFilters > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[0.65rem] font-bold text-brand-600">
                {activeFilters}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
        {/* ================= Filtros (escritorio) ================= */}
        <aside className="hidden lg:block">
          <div className="sticky top-36 space-y-7">
            {filterGroups.map((group) => (
              <FilterGroup
                key={group.label}
                {...group}
                allLabel={dict.common.all}
                resources={resources}
              />
            ))}

            {activeFilters > 0 && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-brand-500 hover:text-brand-400"
              >
                <X className="h-3.5 w-3.5" />
                {dict.common.clearFilters}
              </button>
            )}
          </div>
        </aside>

        {/* ================= Resultados ================= */}
        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[0.82rem] text-fg-muted">
              <span className="font-semibold text-fg">{results.length}</span>{' '}
              {results.length === 1 ? dict.common.result : dict.common.results}
              {query && (
                <>
                  {' '}
                  · {dict.explorer.resultsFor} <span className="text-brand-500">“{query}”</span>
                </>
              )}
            </p>

            <div className="flex items-center gap-2">
              <label className="sr-only" htmlFor="sort">
                {dict.explorer.sortBy}
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-9 rounded-full border border-line bg-bg-elevated px-3 text-[0.78rem] font-medium outline-none transition-colors hover:border-brand-500/40 focus:border-brand-500"
              >
                <option value="relevance">{dict.explorer.sortRelevance}</option>
                <option value="recent">{dict.explorer.sortRecent}</option>
                <option value="az">{dict.explorer.sortAZ}</option>
              </select>

              <div className="hidden items-center rounded-full border border-line p-0.5 sm:flex">
                {(['grid', 'list'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setLayout(mode)}
                    aria-label={mode === 'grid' ? dict.common.grid : dict.common.list}
                    aria-pressed={layout === mode}
                    className={cn(
                      'rounded-full p-1.5 transition-colors',
                      layout === mode
                        ? 'bg-brand-500 text-white'
                        : 'text-fg-subtle hover:text-fg'
                    )}
                  >
                    {mode === 'grid' ? (
                      <LayoutGrid className="h-3.5 w-3.5" />
                    ) : (
                      <List className="h-3.5 w-3.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chips de filtros activos */}
          {activeFilters > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {category !== ALL && (
                <FilterChip
                  label={categories.find((c) => c.id === category)?.name[locale] ?? category}
                  onClear={() => setCategory(ALL)}
                />
              )}
              {type !== ALL && (
                <FilterChip
                  label={resourceTypeMeta[type as keyof typeof resourceTypeMeta].label[locale]}
                  onClear={() => setType(ALL)}
                />
              )}
              {device !== ALL && (
                <FilterChip
                  label={visibleDevices.find((d) => d.id === device)?.name ?? device}
                  onClear={() => setDevice(ALL)}
                />
              )}
              <button
                type="button"
                onClick={reset}
                className="text-[0.75rem] font-semibold text-fg-subtle underline-offset-4 hover:text-brand-500 hover:underline"
              >
                {dict.common.clearFilters}
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-line px-6 py-20 text-center">
              <p className="font-display text-xl font-bold">{dict.common.noResults}</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-fg-muted">
                {dict.common.noResultsHint}
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400"
              >
                {dict.common.clearFilters}
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className={cn(
                layout === 'grid'
                  ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'
                  : 'flex flex-col gap-2.5'
              )}
            >
              <AnimatePresence mode="popLayout">
                {results.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    locale={locale}
                    dict={dict}
                    onOpen={setSelected}
                    view={layout}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* ================= Hoja de filtros (móvil) ================= */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            className="fixed inset-0 z-100 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-auto rounded-t-3xl border-t border-line bg-bg-elevated"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg-elevated px-5 py-4">
                <h2 className="font-display text-lg font-bold">{dict.common.filters}</h2>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  aria-label={dict.common.close}
                  className="rounded-full p-2 text-fg-muted transition-colors hover:bg-fg/6"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-7 p-5">
                {filterGroups.map((group) => (
                  <FilterGroup
                    key={group.label}
                    {...group}
                    allLabel={dict.common.all}
                    resources={resources}
                    variant="chips"
                  />
                ))}
              </div>

              <div className="sticky bottom-0 flex gap-2 border-t border-line bg-bg-elevated p-4">
                <button
                  type="button"
                  onClick={reset}
                  className="h-12 flex-1 rounded-full border border-line text-sm font-semibold transition-colors hover:border-brand-500 hover:text-brand-500"
                >
                  {dict.common.clearFilters}
                </button>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="h-12 flex-[1.6] rounded-full bg-brand-500 text-sm font-semibold text-white"
                >
                  {results.length} {results.length === 1 ? dict.common.result : dict.common.results}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ResourceModal resource={selected} locale={locale} dict={dict} onClose={closeModal} />
    </div>
  )
}

/* ==========================================================================
   Piezas auxiliares
   ========================================================================== */
function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/12 py-1.5 pl-3 pr-1.5 text-[0.75rem] font-semibold text-brand-600 dark:text-brand-300">
      {label}
      <button
        type="button"
        onClick={onClear}
        className="rounded-full p-0.5 transition-colors hover:bg-brand-500/20"
        aria-label={`${label} ✕`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}

function FilterGroup({
  label,
  value,
  set,
  options,
  allLabel,
  resources,
  variant = 'list',
}: {
  label: string
  value: string
  set: (value: string) => void
  options: { value: string; label: string }[]
  allLabel: string
  resources: ResourceView[]
  variant?: 'list' | 'chips'
}) {
  const countFor = (optionValue: string) =>
    resources.filter(
      (r) => r.category === optionValue || r.type === optionValue || r.device === optionValue
    ).length

  const all = [{ value: ALL, label: allLabel }, ...options]

  if (variant === 'chips') {
    return (
      <div>
        <h3 className="mb-3 font-display text-[0.8rem] font-bold uppercase tracking-[0.14em] text-fg-subtle">
          {label}
        </h3>
        <div className="flex flex-wrap gap-2">
          {all.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => set(option.value)}
              className={cn(
                'rounded-full border px-3.5 py-2 text-[0.8rem] font-medium transition-colors',
                option.value === value
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-line text-fg-muted hover:border-brand-500/40 hover:text-fg'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="mb-2.5 font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-fg-subtle">
        {label}
      </h3>
      <ul className="space-y-0.5">
        {all.map((option) => {
          const active = option.value === value
          const count = option.value === ALL ? resources.length : countFor(option.value)
          if (count === 0 && option.value !== ALL) return null
          return (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => set(option.value)}
                className={cn(
                  'group flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-[0.85rem] transition-colors',
                  active
                    ? 'bg-brand-500/10 font-semibold text-brand-500'
                    : 'text-fg-muted hover:bg-fg/4 hover:text-fg'
                )}
              >
                <span className="truncate">{option.label}</span>
                <Badge tone={active ? 'brand' : 'neutral'} className="shrink-0 px-2 py-0.5">
                  {count}
                </Badge>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
