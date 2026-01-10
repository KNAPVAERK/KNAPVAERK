'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import styles from './AboutSection.module.css'

export default function AboutSection({ data }) {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

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

  // Default placeholder data
  const title = data?.title || 'Om KNAPVÆRK'
  const content = data?.content || 'KNAPVÆRK er et værksted, der arbejder altovervejende i træ. Alle knapper begynder og slutter ved materialets struktur, styrker og begrænsninger.\n\nArbejdet udføres med traditionelle metoder. Primært håndværktøj. Træet udvælges nøje og bearbejdes med stadig opmærksomhed på åretegning, densitet og overflade. Præcision opbygges gennem gentagelse og håndelag.\n\nTræsorter som ibenholt, ahorn og valnød vælges for deres egenskaber og måde at ældes på. Formgivningen er enkel og altid baseret lige dele på funktion og æstetik.'
  const image = data?.image

  return (
    <section
      id="om"
      ref={sectionRef}
      className={`${styles.about} ${visible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.text}>
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className={styles.imageContainer}>
          {image ? (
            <Image
              src={image}
              alt={title}
              width={800}
              height={1000}
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>Billede kommer her</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
