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
  const content = data?.content || 'KNAPVÆRK er et eksklusivt modebrand, der specialiserer sig i håndlavede værker af høj kvalitet. Vores filosofi bygger på en dyb respekt for håndværk, materialernes ægthed og tidløst design.\n\nHver knap, hvert stykke er nøje udvalgt og skabt med omhu for detaljer. Vi tror på, at de små elementer gør den store forskel – at ægte kvalitet ligger i hver eneste syning, hver kurve, og i den passion, der lægges i arbejdet.\n\nVores værker er til dem, der værdsætter det autentiske, det eksklusive, og det varige.'
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
