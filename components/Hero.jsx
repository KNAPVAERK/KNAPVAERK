'use client'

import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero({ logoSrc = '/assets/images/logo1.svg' }) {
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
      <h1 className="visually-hidden">Knapværk – Håndlavede knapper af ekstraordinær kvalitet</h1>
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
        aria-label="Udforsk vores håndlavede knapper"
      >
        <span className={styles.ctaText}>Udforsk vores håndlavede knapper</span>
        <span className={styles.ctaArrow}>↓</span>
      </a>
    </section>
  )
}