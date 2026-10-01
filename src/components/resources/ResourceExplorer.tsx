'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Fuse from 'fuse.js'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowUpRight,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { ResourceGroupCard } from './ResourceCard'
import { ResourceModal } from './ResourceModal'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/primitives'
import { resourceTypeMeta, resourceTypes } from '@/data/taxonomy'
import type { Category, Device } from '@/data/taxonomy'
import { countGroups, groupResources } from '@/lib/resource-groups'
import type { ResourceView } from '@/lib/resource-view'
import { cn, normalize } from '@/lib/utils'
import type { Dictionary } from '@/i18n'
import type { Locale } from '@/i18n/config'

type Sort = 'relevance' | 'recent' | 'az'

const ALL = 'all'

export function ResourceExplorer({
  resources,
  categories,
  devices: visibleDevices,
  locale,
  dict,
}: {
  resources: ResourceView[]
  categories: Category[]
  devices: Device[]
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
  const [browseAll, setBrowseAll] = useState(false)

  /**
   * Los vídeos tienen su propia sección (/videos): aquí no abren tarjeta, solo
   * cuelgan como atajo de la tarjeta de su manual. Se siguen pudiendo abrir
   * por URL (?abrir=id), por eso `resources` conserva la lista completa.
   */
  const listable = useMemo(() => resources.filter((r) => r.type !== 'video'), [resources])
  const videoShortcuts = useMemo(() => resources.filter((r) => r.type === 'video'), [resources])

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
      listable.map((r) => ({
        ...r,
        _title: normalize(r.title),
        _summary: normalize(r.summary),
        _tags: r.tags.map(normalize),
        _category: normalize(r.categoryName),
        _device: normalize(r.deviceName),
      })),
    [listable]
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
      : [...listable]

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
  }, [query, category, type, device, sort, fuse, listable, locale])

  // El manual y su vídeo son el mismo tema: una sola tarjeta, con el vídeo de atajo.
  const groups = useMemo(() => groupResources(results, videoShortcuts), [results, videoShortcuts])

  // Sin buscar ni filtrar se ven las categorías; en cuanto se elige algo, la lista.
  const inList = browseAll || query.trim() !== '' || category !== ALL || type !== ALL || device !== ALL

  // El equipo se elige arriba, en el selector grande; aquí solo cuentan los filtros del lateral.
  const activeFilters = [category, type].filter((v) => v !== ALL).length
  const anyFilter = activeFilters > 0 || device !== ALL

  const deviceOptions = useMemo(
    () =>
      visibleDevices
        .map((d) => ({
          id: d.id as string,
          name: d.name,
          count: countGroups(listable.filter((r) => r.device === d.id)),
        }))
        .filter((d) => d.count > 0),
    [visibleDevices, listable]
  )

  const categoryCards = useMemo(
    () =>
      categories
        .map((c) => ({ ...c, count: countGroups(listable.filter((r) => r.category === c.id)) }))
        .filter((c) => c.count > 0),
    [categories, listable]
  )

  const reset = useCallback(() => {
    setQuery('')
    setCategory(ALL)
    setType(ALL)
    setDevice(ALL)
    setBrowseAll(false)
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
      options: resourceTypes
        .filter((t) => t !== 'video')
        .map((t) => ({ value: t, label: resourceTypeMeta[t].label[locale] })),
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

      {/* ================= ¿Qué equipo tienes? ================= */}
      <div className="mb-8">
        <p className="mb-3 font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-fg-subtle">
          {dict.explorer.deviceQuestion}
        </p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          {[{ id: ALL, name: dict.common.all, count: countGroups(listable) }, ...deviceOptions].map(
            (option) => {
              const active = option.id === device
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setDevice(option.id)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[0.85rem] font-semibold transition-colors',
                    active
                      ? 'border-brand-500 bg-brand-500 text-white'
                      : 'border-line bg-bg-elevated/60 text-fg-muted hover:border-brand-500/40 hover:text-fg'
                  )}
                >
                  {option.name}
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[0.68rem] tabular-nums',
                      active ? 'bg-white/20' : 'bg-fg/8'
                    )}
                  >
                    {option.count}
                  </span>
                </button>
              )
            }
          )}
        </div>
      </div>

      {!inList ? (
        /* ================= Entrada: categorías ================= */
        <section>
          <h2 className="mb-5 font-display text-xl font-bold">{dict.explorer.categoryIntro}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryCards.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-elevated/70 p-6 text-left transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/45 hover:shadow-[0_26px_60px_-32px_rgb(0_151_178/0.55)]"
              >
                <span
                  className="slats pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="relative flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-500 transition-all duration-400 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={c.icon} className="h-5.5 w-5.5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </span>
                <span className="relative mt-5 block font-display text-xl font-bold transition-colors group-hover:text-brand-500">
                  {c.name[locale]}
                </span>
                <span className="relative mt-2 line-clamp-2 text-[0.86rem] leading-relaxed text-fg-muted">
                  {c.description[locale]}
                </span>
                <span className="relative mt-5 border-t border-line pt-4">
                  <Badge tone="brand">{c.count}</Badge>
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setBrowseAll(true)}
            className="mt-6 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-brand-500 hover:text-brand-400"
          >
            {dict.explorer.browseAll} ({countGroups(listable)})
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </section>
      ) : (
      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
        {/* ================= Filtros (escritorio) ================= */}
        <aside className="hidden lg:block">
          <div className="sticky top-36 space-y-7">
            {filterGroups.map((group) => (
              <FilterGroup
                key={group.label}
                {...group}
                allLabel={dict.common.all}
                resources={listable}
              />
            ))}

            {anyFilter && (
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
          <button
            type="button"
            onClick={reset}
            className="mb-4 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-brand-500 hover:text-brand-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {dict.explorer.backToCategories}
          </button>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[0.82rem] text-fg-muted">
              <span className="font-semibold text-fg">{groups.length}</span>{' '}
              {groups.length === 1 ? dict.common.result : dict.common.results}
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
          {anyFilter && (
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
                {groups.map((group) => (
                  <ResourceGroupCard
                    key={group.key}
                    group={group}
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
      )}

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
                    resources={listable}
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
                  {groups.length} {groups.length === 1 ? dict.common.result : dict.common.results}
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
  // Se cuentan temas, no ficheros: el manual y su vídeo son una sola tarjeta.
  const countFor = (optionValue: string) =>
    countGroups(
      resources.filter(
        (r) => r.category === optionValue || r.type === optionValue || r.device === optionValue
      )
    )

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
          const count = option.value === ALL ? countGroups(resources) : countFor(option.value)
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
