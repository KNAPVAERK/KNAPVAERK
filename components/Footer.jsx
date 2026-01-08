'use client'

import { useEffect, useState } from 'react'
import styles from './Footer.module.css'

export default function Footer({
  brandName = "KNAPVÆRK",
  cvrNumber = "40292195",
  address = "Stavrevej 512, 5300 Kerteminde"
}) {
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
            CVR: {cvrNumber} – {address}
          </div>
        </div>

        <div className={`${styles.backToTop} ${scrolled ? styles.visible : ''}`}>
          <a
            href="#hero"
            onClick={scrollToTop}
            aria-label="Tilbage til top"
            title="Tilbage til top"
          >
            ↑
          </a>
        </div>
      </div>

      <div className={styles.footerYear}>
        © {new Date().getFullYear()} {brandName}. Håndlavet i Danmark.
      </div>
    </footer>
  )
}