'use client'

import { useEffect, useState } from 'react'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.pageYOffset
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progressPercent = total > 0 ? (scrolled / total) * 100 : 0
      setProgress(progressPercent)
    }

    // Initial calculation
    updateProgress()

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true })

    // Update on resize (content height might change)
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progressFill}
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  )
}
