import { geolocation, next } from '@vercel/edge'

// Regions that should default to the Chinese site.
const CN_REGIONS = new Set(['CN', 'HK', 'MO'])

const LANG_COOKIE = 'protoys-lang'

export default function middleware(request: Request) {
  const cookieHeader = request.headers.get('cookie') ?? ''
  const hasLangCookie = new RegExp(`(?:^|; )${LANG_COOKIE}=`).test(cookieHeader)

  // A visitor who already has a lang cookie has either been geo-detected
  // before or explicitly picked a language — leave it alone either way.
  if (hasLangCookie) {
    return next()
  }

  const { country } = geolocation(request)
  const lang = country && CN_REGIONS.has(country) ? 'cn' : 'en'

  return next({
    headers: {
      'Set-Cookie': `${LANG_COOKIE}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`,
    },
  })
}

export const config = {
  // Run on page navigations only, skip static assets (anything with a file
  // extension) and the built assets folder.
  matcher: ['/((?!assets|.*\\..*).*)'],
}
