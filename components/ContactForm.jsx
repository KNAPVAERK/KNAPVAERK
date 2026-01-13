'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import styles from './ContactForm.module.css'

export default function ContactForm({ data }) {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [formVisible, setFormVisible] = useState(true)
  const [validation, setValidation] = useState({
    email: { valid: null, message: '' },
    subject: { valid: null, message: '' },
    message: { valid: null, message: '' }
  })
  // Track which fields have been touched (blurred) - only validate after first blur
  const [touched, setTouched] = useState({
    email: false,
    subject: false,
    message: false
  })

  // Content from Sanity with fallbacks (using translations)
  const title = data?.title || t('title')
  const subtitle = data?.subtitle || t('subtitle')
  const successTitle = data?.successTitle || t('successTitle')
  const successMessage = data?.successMessage || t('successMessage')
  const emailFallbackText = data?.emailFallbackText || t('emailFallback')
  const contactEmail = data?.contactEmail || 'info@knapvaerk.com'
  const buttonText = data?.buttonText || t('submitButton')

  // Check if form is valid (all fields have valid: true)
  const isFormValid = validation.email.valid === true &&
                      validation.subject.valid === true &&
                      validation.message.valid === true

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Validation logic extracted for reuse
  const validateField = (field, value) => {
    if (field === 'email') {
      if (value.length === 0) return { valid: null, message: '' }
      if (validateEmail(value)) return { valid: true, message: '' }
      return { valid: false, message: t('emailError') }
    }
    if (field === 'subject') {
      if (value.length === 0) return { valid: null, message: '' }
      if (value.length >= 3) return { valid: true, message: '' }
      return { valid: false, message: t('subjectError') }
    }
    if (field === 'message') {
      if (value.length === 0) return { valid: null, message: '' }
      if (value.length >= 10) return { valid: true, message: '' }
      return { valid: false, message: t('messageError') }
    }
    return { valid: null, message: '' }
  }

  // onChange: Only validate if field has been touched OR value is valid (allow positive feedback)
  const handleEmailChange = (e) => {
    const value = e.target.value
    const result = validateField('email', value)
    // Show validation only if touched, or if valid (positive feedback while typing)
    if (touched.email || result.valid === true) {
      setValidation(prev => ({ ...prev, email: result }))
    }
  }

  const handleSubjectChange = (e) => {
    const value = e.target.value
    const result = validateField('subject', value)
    if (touched.subject || result.valid === true) {
      setValidation(prev => ({ ...prev, subject: result }))
    }
  }

  const handleMessageChange = (e) => {
    const value = e.target.value
    const result = validateField('message', value)
    if (touched.message || result.valid === true) {
      setValidation(prev => ({ ...prev, message: result }))
    }
  }

  // onBlur: Mark field as touched and validate
  const handleBlur = (field) => (e) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const result = validateField(field, e.target.value)
    setValidation(prev => ({ ...prev, [field]: result }))
  }

  const createRipple = (e) => {
    const button = e.currentTarget
    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.classList.add(styles.ripple)

    button.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    const formData = new FormData(e.target)

    // Honeypot spam protection - check if bot filled the hidden field
    if (formData.get('_gotcha')) {
      setLoading(false)
      setStatus({
        type: 'error',
        message: t('spamError')
      })
      return
    }

    // Convert FormData to JSON (include locale for localized API responses)
    const formValues = {
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      locale
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues)
      })

      const result = await res.json()

      if (res.ok) {
        setLoading(false)
        setStatus({
          type: 'success',
          message: successTitle
        })
        setFormVisible(false)
      } else {
        throw new Error(result.error || 'Form submission failed')
      }
    } catch (error) {
      setLoading(false)
      setStatus({
        type: 'error',
        message: error.message || t('genericError')
      })
    }
  }

  return (
    <section className={`${styles.section} ${styles.subtleBg}`} id="contact">
      <div className={styles.textBlock}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className={styles.formContainer}>
        {!formVisible && status.type === 'success' ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}></div>
            <div>
              <h3 className={styles.successTitle}>{successTitle}</h3>
              <p className={styles.successText}>{successMessage}</p>
            </div>
          </div>
        ) : (
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className={styles.form}
            noValidate
          >
            {/* Honeypot field for spam protection - hidden from users */}
            <input
              type="text"
              name="_gotcha"
              tabIndex="-1"
              autoComplete="off"
              style={{ display: 'none' }}
            />

            <div className={`${styles.formField} ${validation.email.valid === false ? styles.error : ''} ${validation.email.valid === true ? styles.valid : ''}`}>
              <label htmlFor="email">{t('emailLabel')}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleEmailChange}
                onBlur={handleBlur('email')}
                aria-describedby="email-error"
                aria-invalid={validation.email.valid === false}
              />
              <div
                id="email-error"
                className={`${styles.validationMessage} ${validation.email.message ? styles.visible : ''}`}
                aria-live="polite"
                role="alert"
              >
                {validation.email.message}
              </div>
            </div>

            <div className={`${styles.formField} ${validation.subject.valid === false ? styles.error : ''} ${validation.subject.valid === true ? styles.valid : ''}`}>
              <label htmlFor="subject">{t('subjectLabel')}</label>
              <input
                id="subject"
                name="subject"
                type="text"
                onChange={handleSubjectChange}
                onBlur={handleBlur('subject')}
                aria-describedby="subject-error"
                aria-invalid={validation.subject.valid === false}
              />
              <div
                id="subject-error"
                className={`${styles.validationMessage} ${validation.subject.message ? styles.visible : ''}`}
                aria-live="polite"
                role="alert"
              >
                {validation.subject.message}
              </div>
            </div>

            <div className={`${styles.formField} ${validation.message.valid === false ? styles.error : ''} ${validation.message.valid === true ? styles.valid : ''}`}>
              <label htmlFor="message">{t('messageLabel')}</label>
              <textarea
                id="message"
                name="message"
                required
                onChange={handleMessageChange}
                onBlur={handleBlur('message')}
                aria-describedby="message-error"
                aria-invalid={validation.message.valid === false}
              />
              <div
                id="message-error"
                className={`${styles.validationMessage} ${validation.message.message ? styles.visible : ''}`}
                aria-live="polite"
                role="alert"
              >
                {validation.message.message}
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} ${loading ? styles.isLoading : ''} ${!isFormValid ? styles.disabled : ''}`}
              disabled={loading || !isFormValid}
              onClick={createRipple}
              aria-busy={loading}
            >
              <span className={styles.btnText}>{buttonText}</span>
              <span className={styles.btnLoader} aria-hidden="true"></span>
            </button>

            {status.type === 'error' && (
              <div className={`${styles.formStatus} ${styles.error} ${styles.visible}`}>
                {status.message}
              </div>
            )}
          </form>
        )}

        {/* Email fallback text */}
        {formVisible && (
          <div className={styles.emailFallback}>
            <p>{emailFallbackText} <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
          </div>
        )}
      </div>
    </section>
  )
}
