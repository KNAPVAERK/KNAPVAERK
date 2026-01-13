'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import styles from './Navigation.module.css'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const t = useTranslations('navigation')
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [showLogo, setShowLogo] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset

      // Add scrolled class
      setScrolled(currentScrollY > 120)

      // Determine scroll direction and logo visibility
      if (currentScrollY > 100) {
        if (currentScrollY < lastScrollY) {
          // Scrolling up
          setShowLogo(true)
        } else {
          // Scrolling down
          setShowLogo(false)
        }
      } else {
        // At top of page
        setShowLogo(false)
      }

      setLastScrollY(currentScrollY)

      // Determine active section
      const sections = ['hero', 'works', 'craft', 'om', 'contact']
      const scrollPosition = currentScrollY + 140

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const top = section.offsetTop
          const bottom = top + section.offsetHeight

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    setMobileMenuOpen(false) // Close mobile menu on navigation
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = (e) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <>
      <nav
        id="main-nav"
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        aria-label={t('mainNav')}
      >
        {/* Desktop Logo */}
        <div
          className={`${styles.navLogo} ${showLogo ? styles.showLogo : ''} ${styles.desktop}`}
          onClick={scrollToTop}
          role="button"
          tabIndex={0}
          aria-label={t('scrollToTop')}
        >
          <img
            src="/assets/images/knapvaerk-nav-logo.svg"
            alt="KNAPVÆRK"
            width="120"
            height="20"
            className={styles.logoImage}
          />
        </div>

        {/* Mobile Layout */}
        <div className={styles.mobileNav}>
          <button
            className={`${styles.plusButton} ${mobileMenuOpen ? styles.open : ''}`}
            onClick={toggleMobileMenu}
            aria-label={t('toggleMenu')}
            aria-expanded={mobileMenuOpen}
          >
            <span className={styles.plusLine}></span>
            <span className={styles.plusLine}></span>
          </button>

          <div
            className={`${styles.mobileLogo} ${showLogo ? styles.showLogo : ''}`}
            onClick={scrollToTop}
            role="button"
            tabIndex={0}
            aria-label={t('scrollToTop')}
          >
            <img
              src="/assets/images/knapvaerk-nav-logo.svg"
              alt="KNAPVÆRK"
              width="108"
              height="18"
              className={styles.logoImage}
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className={`${styles.navList} ${styles.desktop}`}>
          <li>
            <a
              href="#works"
              onClick={(e) => scrollToSection(e, 'works')}
              className={activeSection === 'works' ? styles.active : ''}
            >
              {t('sortiment')}
            </a>
          </li>
          <li>
            <a
              href="#craft"
              onClick={(e) => scrollToSection(e, 'craft')}
              className={activeSection === 'craft' ? styles.active : ''}
            >
              {t('haandvaerk')}
            </a>
          </li>
          <li>
            <a
              href="#om"
              onClick={(e) => scrollToSection(e, 'om')}
              className={activeSection === 'om' ? styles.active : ''}
            >
              {t('om')}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={activeSection === 'contact' ? styles.active : ''}
            >
              {t('kontakt')}
            </a>
          </li>
          <li className={styles.languageSwitcher}>
            <LanguageSwitcher />
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.open : ''}`} onClick={toggleMobileMenu}></div>
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <img
            src="/assets/images/knapvaerk-nav-logo.svg"
            alt="KNAPVÆRK"
            width="96"
            height="16"
            className={styles.mobileMenuLogo}
          />
        </div>
        <ul className={styles.mobileMenuList}>
          <li>
            <a
              href="#works"
              onClick={(e) => scrollToSection(e, 'works')}
              className={activeSection === 'works' ? styles.active : ''}
            >
              <span className={styles.mobileMenuText}>{t('sortiment')}</span>
              {activeSection === 'works' && <span className={styles.activeIndicator}></span>}
            </a>
          </li>
          <li>
            <a
              href="#craft"
              onClick={(e) => scrollToSection(e, 'craft')}
              className={activeSection === 'craft' ? styles.active : ''}
            >
              <span className={styles.mobileMenuText}>{t('haandvaerk')}</span>
              {activeSection === 'craft' && <span className={styles.activeIndicator}></span>}
            </a>
          </li>
          <li>
            <a
              href="#om"
              onClick={(e) => scrollToSection(e, 'om')}
              className={activeSection === 'om' ? styles.active : ''}
            >
              <span className={styles.mobileMenuText}>{t('om')}</span>
              {activeSection === 'om' && <span className={styles.activeIndicator}></span>}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={activeSection === 'contact' ? styles.active : ''}
            >
              <span className={styles.mobileMenuText}>{t('kontakt')}</span>
              {activeSection === 'contact' && <span className={styles.activeIndicator}></span>}
            </a>
          </li>
          <li className={styles.mobileLanguageSwitcher}>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </>
  )
}