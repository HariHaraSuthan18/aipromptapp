import { Link } from 'react-router-dom'

// Props: this component receives everything it needs from its parent
export default function PromptCard({ prompt, onCopy, onDelete, onToggleFavorite }) {
  return (
    <div className="prompt-card">
      <div className="prompt-card-header">
        <span className="category-tag">{prompt.category}</span>
        <button
          className={`favorite-btn ${prompt.favorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(prompt.id)}
          title="Toggle favorite"
        >
          {prompt.favorite ? '★' : '☆'}
        </button>
      </div>

      <Link to={`/prompts/${prompt.id}`} className="prompt-title-link">
        <h3 className="prompt-title">{prompt.title}</h3>
      </Link>
      <p className="prompt-content">{prompt.content}</p>

      <div className="tag-row">
        {prompt.tags.map((tag) => (
          <span className="tag-pill" key={tag}>
            #{tag}
          </span>
        ))}
      </div>

      <div className="prompt-footer">
        <span className="usage-count">Used {prompt.usageCount}x</span>
        <span className="rating">
          {'★'.repeat(prompt.rating)}
          {'☆'.repeat(5 - prompt.rating)}
        </span>
      </div>

      <div className="prompt-actions">
        <button className="btn-secondary" onClick={() => onCopy(prompt)}>
          Copy
        </button>
        <Link to={`/prompts/${prompt.id}`} className="btn-secondary link-btn">
          View
        </Link>
        <button className="btn-danger" onClick={() => onDelete(prompt.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}
