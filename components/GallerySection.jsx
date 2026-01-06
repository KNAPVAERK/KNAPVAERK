'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '../lib/sanity'
import styles from './GallerySection.module.css'

export default function GallerySection({
  id,
  title,
  subtitle,
  metaText,
  images = [],
  sectionNumber
}) {
  const [visible, setVisible] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)
  const sectionRef = useRef(null)

  const openLightbox = (image, index) => {
    // Prevent body scrolling when lightbox opens
    document.body.style.overflow = 'hidden'
    setLightboxImage({ ...image, index })
  }

  const closeLightbox = () => {
    // Re-enable body scrolling when lightbox closes
    document.body.style.overflow = 'unset'
    setLightboxImage(null)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxImage])

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ''}`}
      id={id}
      data-section={sectionNumber}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && (
            <div className={styles.subtitle}>
              {subtitle.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
          {metaText && <div className={styles.metaText}>{metaText}</div>}
        </div>

        <div className={styles.imagesContainer}>
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div key={index} className={styles.imageWrapper}>
                <Image
                  onClick={() => openLightbox(image, index)}
                  src={urlFor(image.asset).width(1000).url()}
                  alt={image.alt || `${title} billede ${index + 1}`}
                  width={1000}
                  height={1333}
                  loading="lazy"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
                {image.caption && (
                  <p className={styles.caption}>{image.caption}</p>
                )}
              </div>
            ))
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>Billeder vil blive vist her når de er tilføjet i Sanity CMS</span>
            </div>
          )}
        </div>
      </div>

      {lightboxImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={urlFor(lightboxImage.asset).width(2000).url()}
              alt={lightboxImage.alt || `${title} billede ${lightboxImage.index + 1}`}
              width={2000}
              height={2667}
              quality={95}
              sizes="90vw"
              className={styles.lightboxImage}
            />
            <button className={styles.closeButton} onClick={closeLightbox}>
              ✕
            </button>
            {lightboxImage.caption && (
              <p className={styles.lightboxCaption}>{lightboxImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
