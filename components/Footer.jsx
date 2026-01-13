'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './Footer.module.css'

export default function Footer({
  brandName = "KNAPVÆRK",
  cvrNumber = "40292195",
  address = "Stavrevej 512, 5300 Kerteminde"
}) {
  const t = useTranslations('footer')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.contentWrapper}>
        <div className={styles.footerContent}>
          <div className={styles.footerLine1}>{brandName}</div>
          <div className={styles.footerLine2}>
            CVR: {cvrNumber} · {address} · © {new Date().getFullYear()}
          </div>
        </div>

        <a
          href="https://instagram.com/knapvaerkcom"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.instagram}
          aria-label={t('followInstagram')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>

        <div className={`${styles.backToTop} ${scrolled ? styles.visible : ''}`}>
          <a
            href="#hero"
            onClick={scrollToTop}
            aria-label={t('backToTop')}
            title={t('backToTop')}
          >
            ↑
          </a>
        </div>
      </div>
    </footer>
  )
}