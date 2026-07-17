import { useState, useEffect, useRef } from 'react'

const initialForm = { name: '', email: '', subject: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address'
  if (!form.subject.trim()) errors.subject = 'Subject is required'
  if (!form.message.trim()) errors.message = 'Message is required'
  else if (form.message.trim().length < 15) errors.message = 'Message should be at least 15 characters'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const nameInputRef = useRef(null) // useRef: focus first field on mount + on validation error

  useEffect(() => {
    document.title = 'PromptVerse AI — Contact'
    nameInputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!submitted) return
    const timer = setTimeout(() => setSubmitted(false), 4000)
    return () => clearTimeout(timer)
  }, [submitted])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      nameInputRef.current?.focus()
      return
    }

    // No backend here — this simulates a successful submission
    setSubmitted(true)
    setForm(initialForm)
    setErrors({})
  }

  return (
    <div className="page">
      <section className="page-header">
        <h1>Contact Us</h1>
        <p>Questions, feedback, or feature requests — send them over.</p>
      </section>

      <div className="contact-layout">
        <form onSubmit={handleSubmit} className="modal-form contact-form" noValidate>
          <label>Name</label>
          <input
            ref={nameInputRef}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="field-error">{errors.name}</p>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="field-error">{errors.email}</p>}

          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={errors.subject ? 'input-error' : ''}
          />
          {errors.subject && <p className="field-error">{errors.subject}</p>}

          <label>Message</label>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className={errors.message ? 'input-error' : ''}
          />
          {errors.message && <p className="field-error">{errors.message}</p>}

          <button type="submit" className="btn-primary" style={{ marginTop: 12 }}>
            Send Message
          </button>

          {/* Conditional Rendering: success confirmation */}
          {submitted && <p className="success-msg">✓ Message sent! We'll get back to you soon.</p>}
        </form>

        <div className="contact-info">
          <h3>Other ways to reach us</h3>
          <p>📧 support@promptverse.ai</p>
          <p>🌐 Response time: usually within 24 hours</p>
          <p>💬 We read every message — even the short ones.</p>
        </div>
      </div>
    </div>
  )
}
