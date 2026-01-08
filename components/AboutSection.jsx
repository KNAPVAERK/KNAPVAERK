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
  const content = data?.content || 'KNAPVÆRK er et eksklusivt brand født fra en passion for håndværk. Vi skaber værker af ekstraordinær kvalitet – fra små knapper til fulde sammenføjninger – hvor hver detalje fortæller en historie om dedikation og mesterlighed.\n\nVores filosofi bygger på en dyb respekt for materialet, for processen og for det håndværk, som moderne produktion har glemt. Vi arbejder langsomt, med traditionelle metoder og primært håndværktøj. Hvert stykke træ udvælges enkeltvis – vi ser efter kvalitet, farvetone og fiber. Intet er automatiseret. Intet er hastværk.\n\nDe små elementer gør den store forskel. Ægte kvalitet ligger ikke i det, man ser på afstand, men i hver syning, hver kurve, hver finishflade. Det ligger i håndens indtryk, i den tålmodighed, der kræves, og i den passion, der udsender sig fra arbejdet.\n\nVores værker er til dem, der kan mærke forskellen. Til dem, der værdsætter autentisitet over mængde, tradition over trends, og varige ting over engangsting.'
  const image = data?.image

  return (
    <section
      id="om"
      ref={sectionRef}
      className={`${styles.about} ${visible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.sectionNumber}>03</div>
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
