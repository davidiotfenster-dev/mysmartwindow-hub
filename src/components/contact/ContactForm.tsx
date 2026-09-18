'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Send } from 'lucide-react'
import { useState } from 'react'

import { EXTERNAL } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/i18n'
import { withBasePath } from '@/lib/base-path'

type Field = 'name' | 'email' | 'profile' | 'subject' | 'message' | 'consent'
type Status = 'idle' | 'loading' | 'ok' | 'error'

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    profile: '',
    subject: '',
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<Status>('idle')

  // Saber si escribe un fabricante, un distribuidor o un usuario final cambia
  // por completo la respuesta, así que se pregunta antes que nada.
  const profiles = [
    { value: 'manufacturer', label: dict.contact.profiles.manufacturer },
    { value: 'distributor', label: dict.contact.profiles.distributor },
    { value: 'installer', label: dict.contact.profiles.installer },
    { value: 'user', label: dict.contact.profiles.user },
  ]

  const subjects = [
    { value: 'support', label: dict.contact.subjects.support },
    { value: 'commercial', label: dict.contact.subjects.commercial },
    { value: 'docs', label: dict.contact.subjects.docs },
    { value: 'other', label: dict.contact.subjects.other },
  ]

  function validate() {
    const next: Partial<Record<Field, string>> = {}
    if (values.name.trim().length < 2) next.name = dict.contact.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = dict.contact.errors.email
    if (!values.profile) next.profile = dict.contact.errors.profile
    if (!values.subject) next.subject = dict.contact.errors.subject
    if (values.message.trim().length < 10) next.message = dict.contact.errors.message
    if (!values.consent) next.consent = dict.contact.errors.consent
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      const res = await fetch(withBasePath('/api/contacto'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('bad response')
      setStatus('ok')
      setValues({
        name: '',
        email: '',
        company: '',
        profile: '',
        subject: '',
        message: '',
        consent: false,
      })
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = (error?: string) =>
    cn(
      'w-full rounded-2xl border bg-bg px-4 py-3 text-[0.92rem] outline-none transition-colors placeholder:text-fg-subtle',
      error ? 'border-red-500/60 focus:border-red-500' : 'border-line focus:border-brand-500'
    )

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Perfil: en botones y por delante de todo, para que se responda sin pensarlo */}
      <fieldset>
        <legend className="mb-2.5 text-[0.82rem] font-semibold">
          {dict.contact.profile}
          <span className="ml-0.5 text-brand-500">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {profiles.map((option) => {
            const selected = values.profile === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setValues({ ...values, profile: option.value })}
                aria-pressed={selected}
                className={cn(
                  'h-10 rounded-full border px-4 text-[0.85rem] font-semibold transition-all duration-200',
                  selected
                    ? 'border-brand-500 bg-brand-500/12 text-brand-500'
                    : 'border-line text-fg-muted hover:border-brand-500/50 hover:text-fg'
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
        {errors.profile && <p className="mt-1.5 text-[0.78rem] text-red-500">{errors.profile}</p>}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={dict.contact.name} error={errors.name} htmlFor="name" required>
          <input
            id="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className={fieldClass(errors.name)}
            autoComplete="name"
          />
        </Field>

        <Field label={dict.contact.email} error={errors.email} htmlFor="email" required>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className={fieldClass(errors.email)}
            autoComplete="email"
          />
        </Field>

        <Field label={dict.contact.company} htmlFor="company">
          <input
            id="company"
            value={values.company}
            onChange={(e) => setValues({ ...values, company: e.target.value })}
            className={fieldClass()}
            autoComplete="organization"
          />
        </Field>

        <Field label={dict.contact.subject} error={errors.subject} htmlFor="subject" required>
          <select
            id="subject"
            value={values.subject}
            onChange={(e) => setValues({ ...values, subject: e.target.value })}
            className={fieldClass(errors.subject)}
          >
            <option value="">—</option>
            {subjects.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={dict.contact.message} error={errors.message} htmlFor="message" required>
        <textarea
          id="message"
          rows={6}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          placeholder={dict.contact.messagePlaceholder}
          className={cn(fieldClass(errors.message), 'resize-y')}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.85rem] text-fg-muted">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => setValues({ ...values, consent: e.target.checked })}
            className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-[var(--color-brand-500)]"
          />
          <span>
            {dict.contact.consent}{' '}
            <a
              href={EXTERNAL.privacy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-500 underline-offset-4 hover:underline"
            >
              ↗
            </a>
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-[0.78rem] text-red-500">{errors.consent}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            'inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-[0.92rem] font-semibold text-white transition-all disabled:opacity-60',
            status === 'ok'
              ? 'bg-emerald-600'
              : 'bg-brand-500 hover:bg-brand-400 hover:-translate-y-0.5 shadow-[0_10px_34px_-12px_rgb(0_151_178/0.85)]'
          )}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {dict.contact.sending}
            </>
          ) : status === 'ok' ? (
            <>
              <Check className="h-4 w-4" />
              {dict.contact.submit}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {dict.contact.submit}
            </>
          )}
        </button>

        <AnimatePresence>
          {(status === 'ok' || status === 'error') && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className={cn(
                'text-[0.85rem] font-medium',
                status === 'ok' ? 'text-emerald-500' : 'text-red-500'
              )}
            >
              {status === 'ok' ? dict.contact.success : dict.contact.error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[0.82rem] font-semibold">
        {label}
        {required && <span className="ml-0.5 text-brand-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[0.78rem] text-red-500">{error}</p>}
    </div>
  )
}
