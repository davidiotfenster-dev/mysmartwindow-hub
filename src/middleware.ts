import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/i18n/config'

const PUBLIC_FILE = /\.(.*)$/

/** Elige idioma a partir de Accept-Language, con español por defecto. */
function detectLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language') ?? ''
  const preferred = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.split('-')[0].toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of preferred) {
    if ((locales as readonly string[]).includes(tag)) return tag
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (hasLocale) {
    // El 404 de Next no recibe params, asi que sin esto no hay forma de saber
    // en que idioma estaba navegando quien se ha perdido.
    const headers = new Headers(request.headers)
    headers.set('x-pathname', pathname)
    return NextResponse.next({ request: { headers } })
  }

  const locale = detectLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
