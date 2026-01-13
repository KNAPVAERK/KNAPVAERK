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
    // Failsafe timeout - never wait more than 3 seconds
    const failsafeTimer = setTimeout(() => {
      setAssetsLoaded(true)
    }, 3000)

    // Strategic Preloading: Critical assets for hero section
    const preloadAssets = async () => {
      const imageAssets = [
        '/assets/images/logo1.svg',
        '/assets/images/knapvaerk-nav-logo.svg',
        '/assets/images/BGhero.jpg', // Hero background - critical for perceived performance
      ]

      // Preload images with individual timeouts
      const imagePromises = imageAssets.map((src) => {
        return new Promise((resolve) => {
          const img = new window.Image()
          const timeout = setTimeout(() => resolve(), 2000)
          img.onload = () => {
            clearTimeout(timeout)
            resolve()
          }
          img.onerror = () => {
            clearTimeout(timeout)
            resolve() // Don't fail, just continue
          }
          img.src = src
        })
      })

      try {
        await Promise.all(imagePromises)
        clearTimeout(failsafeTimer)
        setAssetsLoaded(true)
      } catch (error) {
        // Fallback: If assets fail to load, continue anyway
        clearTimeout(failsafeTimer)
        setAssetsLoaded(true)
      }
    }

    preloadAssets()

    return () => clearTimeout(failsafeTimer)
  }, [])

  useEffect(() => {
    if (!assetsLoaded) return

    // Once assets are loaded, elegant dissolve to site (500ms)
    const fadeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    // Remove from DOM after fade-out animation completes (500ms + 600ms fade)
    const removeTimer = setTimeout(() => {
      setShouldRender(false)
    }, 1100)

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
