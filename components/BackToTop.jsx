'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './BackToTop.module.css'

export default function BackToTop() {
  const t = useTranslations('common')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const distanceFromBottom = documentHeight - scrollY - windowHeight

      // Show when scrolled past 400px, but hide when near bottom (within 200px of footer)
      setVisible(scrollY > 400 && distanceFromBottom > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`${styles.backToTop} ${visible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label={t('backToTop')}
      title={t('backToTop')}
    >
      <span className={styles.arrow}>↑</span>
    </button>
  )
}
