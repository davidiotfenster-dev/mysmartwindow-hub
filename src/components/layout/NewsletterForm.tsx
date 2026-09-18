'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Send } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { Dictionary } from '@/i18n'
import { withBasePath } from '@/lib/base-path'

type Status = 'idle' | 'loading' | 'ok' | 'error'

export function NewsletterForm({ dict }: { dict: Dictionary }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(withBasePath('/api/newsletter'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('bad response')
      setStatus('ok')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          {dict.newsletter.placeholder}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
          placeholder={dict.newsletter.placeholder}
          className="h-11 min-w-0 flex-1 rounded-full border border-line bg-bg/60 px-5 text-sm outline-none transition-colors placeholder:text-fg-subtle focus:border-brand-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            'inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-all',
            status === 'ok'
              ? 'bg-emerald-600'
              : 'bg-brand-500 hover:bg-brand-400 hover:-translate-y-0.5',
            status === 'loading' && 'opacity-70'
          )}
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === 'ok' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          {dict.newsletter.submit}
        </button>
      </form>

      <AnimatePresence>
        {(status === 'ok' || status === 'error') && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              'mt-2.5 text-[0.78rem]',
              status === 'ok' ? 'text-emerald-500' : 'text-red-500'
            )}
            role="status"
          >
            {status === 'ok' ? dict.newsletter.success : dict.newsletter.error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
