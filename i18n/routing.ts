import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['da', 'en'],
  defaultLocale: 'da',
  localePrefix: 'as-needed', // Hide /da prefix for default locale
  localeDetection: false // Don't auto-detect browser language, always start with Danish
})

// Lightweight wrappers around Next.js navigation APIs
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
