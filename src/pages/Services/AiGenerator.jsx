import { useState, useRef } from 'react'

export default function AiGenerator() {
  const [idea, setIdea] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const textareaRef = useRef(null) // useRef: focus the textarea after generating

  const generateIdea = async () => {
    setLoading(true)
    setError('')
    try {
      // API Integration: live fetch from a public quotes API for inspiration
      const res = await fetch('https://api.quotable.io/random')
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setIdea(data)
      setTimeout(() => textareaRef.current?.focus(), 100)
    } catch (err) {
      setError('Could not fetch an idea right now. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const promptDraft = idea
    ? `Write a short piece of content inspired by this idea: "${idea.content}" (theme by ${idea.author}). Adapt it into a prompt for {your_use_case}.`
    : ''

  return (
    <div className="generator-page">
      <p className="generator-intro">
        Stuck for inspiration? Pull a random idea spark and turn it into a reusable prompt.
      </p>

      <button className="btn-primary" onClick={generateIdea} disabled={loading}>
        {loading ? 'Fetching idea...' : '✨ Generate Idea'}
      </button>

      {/* Conditional Rendering: loading / error / result states */}
      {loading && <p className="hint-text">Talking to the idea API...</p>}
      {error && <p className="field-error">{error}</p>}

      {idea && !loading && (
        <div className="idea-result">
          <blockquote>"{idea.content}"</blockquote>
          <p className="idea-author">— {idea.author}</p>

          <label>Draft prompt (editable)</label>
          <textarea ref={textareaRef} rows={4} value={promptDraft} readOnly />
        </div>
      )}
    </div>
  )
}
