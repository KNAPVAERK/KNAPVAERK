'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import styles from './Hero.module.css'

export default function Hero({ logoSrc = '/assets/images/logo1.svg' }) {
  const t = useTranslations('hero')
  const logoRef = useRef(null)

  useEffect(() => {
    // Subtle parallax on scroll
    const handleScroll = () => {
      if (!logoRef.current) return

      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.4
      const scale = 1 - scrolled * 0.0002

      logoRef.current.style.transform = `translateY(${parallax}px) scale(${scale})`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToWorks = (e) => {
    e.preventDefault()
    const section = document.getElementById('works')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.hero} id="hero">
      <h1 className="visually-hidden">{t('title')}</h1>
      <div className={styles.logoContainer} ref={logoRef}>
        <img
          src={logoSrc}
          alt="Knapværk logo"
          width="1200"
          height="400"
          className={styles.logo}
        />
      </div>

      <a
        href="#works"
        onClick={scrollToWorks}
        className={styles.cta}
        aria-label={t('cta')}
      >
        <span className={styles.ctaText}>{t('cta')}</span>
        <span className={styles.ctaArrow}>↓</span>
      </a>
    </section>
  )
}