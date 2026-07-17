import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { usePrompts } from '../../context/PromptsContext'
import PromptForm from '../../components/PromptForm'
import Modal from '../../components/Modal'

export default function PromptDetail() {
  // useParams: read the :id from the URL
  const { id } = useParams()
  const navigate = useNavigate()
  const { prompts, dispatch } = usePrompts()
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const prompt = prompts.find((p) => String(p.id) === id)

  useEffect(() => {
    document.title = prompt ? `PromptVerse AI — ${prompt.title}` : 'PromptVerse AI — Not Found'
  }, [prompt])

  // Conditional Rendering: prompt might not exist (bad id, or was deleted)
  if (!prompt) {
    return (
      <div className="page">
        <div className="empty-state">
          <p>This prompt doesn't exist or was deleted.</p>
          <Link to="/prompts" className="btn-primary link-btn">Back to Prompts</Link>
        </div>
      </div>
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content)
    } catch {
      // ignore
    }
    dispatch({ type: 'INCREMENT_USAGE', payload: { id: prompt.id } })
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_PROMPT', payload: { id: prompt.id } })
    navigate('/prompts')
  }

  const handleUpdate = (formData) => {
    dispatch({ type: 'UPDATE_PROMPT', payload: { id: prompt.id, data: formData } })
    setIsEditing(false)
  }

  return (
    <div className="page">
      <Link to="/prompts" className="back-link">← Back to Prompts</Link>

      <div className="detail-card">
        <div className="prompt-card-header">
          <span className="category-tag">{prompt.category}</span>
          <button
            className={`favorite-btn ${prompt.favorite ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: { id: prompt.id } })}
          >
            {prompt.favorite ? '★' : '☆'}
          </button>
        </div>

        <h1>{prompt.title}</h1>
        <p className="detail-content">{prompt.content}</p>

        <div className="tag-row">
          {prompt.tags.map((tag) => (
            <span className="tag-pill" key={tag}>#{tag}</span>
          ))}
        </div>

        <div className="detail-meta">
          <span>Created: {prompt.createdAt}</span>
          <span>Used {prompt.usageCount} times</span>
          <span className="rating">{'★'.repeat(prompt.rating)}{'☆'.repeat(5 - prompt.rating)}</span>
        </div>

        <div className="prompt-actions">
          <button className="btn-primary" onClick={handleCopy}>
            {copied ? 'Copied ✓' : 'Copy to Clipboard'}
          </button>
          <button className="btn-secondary" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <Modal isOpen={isEditing} title="Edit Prompt" onClose={() => setIsEditing(false)}>
        <PromptForm initialData={prompt} onSubmit={handleUpdate} onCancel={() => setIsEditing(false)} />
      </Modal>
    </div>
  )
}
