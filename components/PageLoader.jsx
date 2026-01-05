'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './PageLoader.module.css'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    // Prevent layout shifts during scroll
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    // Strategic Preloading: Critical assets for hero section
    const preloadAssets = async () => {
      const imageAssets = [
        '/assets/images/logo1.svg',
        '/assets/images/knapvaerk-nav-logo.svg',
      ]

      const fontAssets = [
        '/fonts/LibreBaskerville-Regular.woff2',
      ]

      // Preload images
      const imagePromises = imageAssets.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image()
          img.onload = resolve
          img.onerror = reject
          img.src = src
        })
      })

      // Preload fonts
      const fontPromises = fontAssets.map((src) => {
        return new Promise((resolve) => {
          const font = new FontFace('Libre Baskerville', `url(${src})`)
          font.load()
            .then(() => {
              document.fonts.add(font)
              resolve()
            })
            .catch(() => resolve()) // Don't fail on font errors
        })
      })

      try {
        await Promise.all([...imagePromises, ...fontPromises])
        // Wait 300ms for logo fade-in before marking as loaded
        setTimeout(() => {
          setAssetsLoaded(true)
        }, 300)
      } catch (error) {
        // Fallback: If assets fail to load, continue anyway
        console.error('Asset preloading failed:', error)
        setAssetsLoaded(true)
      }
    }

    preloadAssets()
  }, [])

  useEffect(() => {
    if (!assetsLoaded) return

    // Once assets are loaded, elegant dissolve to site (800ms)
    const fadeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    // Remove from DOM after fade-out animation completes (800ms + 600ms fade)
    const removeTimer = setTimeout(() => {
      setShouldRender(false)
    }, 1400)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [assetsLoaded])

  if (!shouldRender) return null

  return (
    <div className={`${styles.loader} ${!isLoading ? styles.fadeOut : ''}`}>
      <div className={styles.logoWrapper}>
        <Image
          src="/assets/images/logo1.svg"
          alt="KNAPVÆRK"
          width={1200}
          height={400}
          priority
          className={styles.logo}
        />
      </div>
    </div>
  )
}
