'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations('languageSwitcher')
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = () => {
    const newLocale = locale === 'da' ? 'en' : 'da'

    // Remove current locale prefix if present
    let newPath = pathname
    if (pathname.startsWith('/en')) {
      newPath = pathname.replace('/en', '') || '/'
    }

    // Add new locale prefix if switching to English
    if (newLocale === 'en') {
      newPath = `/en${newPath === '/' ? '' : newPath}`
    }

    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <button
      onClick={switchLocale}
      className={styles.toggle}
      disabled={isPending}
      aria-label={locale === 'da' ? t('switchToEnglish') : t('switchToDanish')}
    >
      <span className={locale === 'da' ? styles.active : ''}>DA</span>
      <span className={styles.divider}>/</span>
      <span className={locale === 'en' ? styles.active : ''}>EN</span>
    </button>
  )
}
