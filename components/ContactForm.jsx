'use client'

import { useState } from 'react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [formVisible, setFormVisible] = useState(true)
  const [validation, setValidation] = useState({
    email: { valid: null, message: '' },
    subject: { valid: null, message: '' },
    message: { valid: null, message: '' }
  })

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e) => {
    const email = e.target.value
    if (email.length === 0) {
      setValidation(prev => ({
        ...prev,
        email: { valid: null, message: '' }
      }))
    } else if (validateEmail(email)) {
      setValidation(prev => ({
        ...prev,
        email: { valid: true, message: '' }
      }))
    } else {
      setValidation(prev => ({
        ...prev,
        email: { valid: false, message: 'Venligst indtast en gyldig email' }
      }))
    }
  }

  const handleSubjectChange = (e) => {
    const subject = e.target.value
    if (subject.length === 0) {
      setValidation(prev => ({
        ...prev,
        subject: { valid: null, message: '' }
      }))
    } else if (subject.length >= 3) {
      setValidation(prev => ({
        ...prev,
        subject: { valid: true, message: '' }
      }))
    } else {
      setValidation(prev => ({
        ...prev,
        subject: { valid: false, message: 'Emne skal være mindst 3 tegn' }
      }))
    }
  }

  const handleMessageChange = (e) => {
    const message = e.target.value
    if (message.length === 0) {
      setValidation(prev => ({
        ...prev,
        message: { valid: null, message: '' }
      }))
    } else if (message.length >= 10) {
      setValidation(prev => ({
        ...prev,
        message: { valid: true, message: '' }
      }))
    } else {
      setValidation(prev => ({
        ...prev,
        message: { valid: false, message: 'Besked skal være mindst 10 tegn' }
      }))
    }
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
        message: 'Spam detected. Please try again.'
      })
      return
    }

    // Convert FormData to JSON
    const data = {
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await res.json()

      if (res.ok) {
        setLoading(false)
        setStatus({
          type: 'success',
          message: 'Tak for din besked.'
        })
        setFormVisible(false)
      } else {
        throw new Error(result.error || 'Form submission failed')
      }
    } catch (error) {
      setLoading(false)
      setStatus({
        type: 'error',
        message: error.message || 'Noget gik galt. Prøv igen.'
      })
    }
  }

  return (
    <section className={`${styles.section} ${styles.subtleBg}`} id="contact" data-section="03">
      <div className={styles.textBlock}>
        <h2>Kontakt</h2>
        <p>Send en besked. Jeg vender tilbage hurtigst muligt.</p>
      </div>

      <div className={styles.formContainer}>
        {!formVisible && status.type === 'success' ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}></div>
            <h3 className={styles.successTitle}>Tak for din besked</h3>
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
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleEmailChange}
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
              <label htmlFor="subject">Emne</label>
              <input
                id="subject"
                name="subject"
                type="text"
                onChange={handleSubjectChange}
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
              <label htmlFor="message">Besked</label>
              <textarea
                id="message"
                name="message"
                required
                onChange={handleMessageChange}
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
              className={`${styles.submitBtn} ${loading ? styles.isLoading : ''}`}
              disabled={loading}
              onClick={createRipple}
              aria-busy={loading}
              aria-label={loading ? "Sender besked..." : "Send besked"}
            >
              <span className={styles.btnText}>Send</span>
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
            <p>Foretrækkes direkte email? Skriv til <a href="mailto:info@knapvaerk.com">info@knapvaerk.com</a></p>
          </div>
        )}
      </div>
    </section>
  )
}