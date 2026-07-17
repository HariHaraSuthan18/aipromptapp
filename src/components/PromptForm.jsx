import { useState, useEffect } from 'react'
import { categories } from '../data/initialPrompts'

const emptyForm = {
  title: '',
  content: '',
  category: categories[0],
  tags: '',
  rating: 5,
}

// Form Validation: checks each field and returns an errors object
function validate(form) {
  const errors = {}
  if (!form.title.trim()) errors.title = 'Title is required'
  else if (form.title.trim().length < 4) errors.title = 'Title must be at least 4 characters'

  if (!form.content.trim()) errors.content = 'Prompt content is required'
  else if (form.content.trim().length < 10) errors.content = 'Content must be at least 10 characters'

  return errors
}

export default function PromptForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        content: initialData.content,
        category: initialData.category,
        tags: initialData.tags.join(', '),
        rating: initialData.rating,
      })
    } else {
      setForm(emptyForm)
    }
    setErrors({})
    setTouched({})
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
    setErrors(validate(form))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    setTouched({ title: true, content: true })

    if (Object.keys(validationErrors).length > 0) return

    const tagsArray = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    onSubmit({ ...form, tags: tagsArray, rating: Number(form.rating) })
  }

  return (
    <form onSubmit={handleSubmit} className="modal-form" noValidate>
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="e.g. Cold Email Generator"
        className={touched.title && errors.title ? 'input-error' : ''}
      />
      {touched.title && errors.title && <p className="field-error">{errors.title}</p>}

      <label>Prompt Content</label>
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={5}
        placeholder="Write your AI prompt here. Use {placeholders} for variables."
        className={touched.content && errors.content ? 'input-error' : ''}
      />
      {touched.content && errors.content && <p className="field-error">{errors.content}</p>}

      <div className="form-row">
        <div>
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Rating</label>
          <select name="rating" value={form.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label>Tags (comma separated)</label>
      <input
        type="text"
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="e.g. email, sales, outreach"
      />

      <div className="modal-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialData ? 'Save Changes' : 'Create Prompt'}
        </button>
      </div>
    </form>
  )
}
