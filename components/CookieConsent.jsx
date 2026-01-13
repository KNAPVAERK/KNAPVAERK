'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import styles from './CookieConsent.module.css'

export default function CookieConsent() {
  const t = useTranslations('cookie')
  const [visible, setVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Check if user has already accepted
    const hasConsented = localStorage.getItem('knapvaerk_cookie_consent')

    if (!hasConsented) {
      // Show banner after a short delay for better UX
      setTimeout(() => setVisible(true), 1500)
    }
  }, [])

  const handleAccept = () => {
    setIsClosing(true)
    localStorage.setItem('knapvaerk_cookie_consent', 'accepted')

    setTimeout(() => {
      setVisible(false)
    }, 400)
  }

  if (!visible) return null

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <div className={styles.banner}>
        <p id="cookie-description" className={styles.text}>
          {t('message')}
        </p>

        <button
          onClick={handleAccept}
          className={styles.button}
          aria-label="OK"
        >
          OK
        </button>
      </div>
    </div>
  )
}
