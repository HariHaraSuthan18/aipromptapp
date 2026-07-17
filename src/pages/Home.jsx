import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePrompts } from '../context/PromptsContext'

const features = [
  { icon: '🗂️', title: 'Organize', desc: 'Group your AI prompts into categories and tags so nothing gets lost.' },
  { icon: '⚡', title: 'Reuse Instantly', desc: 'Copy any prompt to clipboard in one click and drop it straight into your favorite AI tool.' },
  { icon: '📊', title: 'Track Usage', desc: 'See which prompts you actually use, and rate them as you go.' },
  { icon: '🌟', title: 'Favorites', desc: 'Pin your best-performing prompts so you can find them fast.' },
]

export default function Home() {
  const { prompts } = usePrompts()

  // useEffect: set the document title when this page mounts
  useEffect(() => {
    document.title = 'PromptVerse AI — Home'
  }, [])

  const totalUsage = prompts.reduce((sum, p) => sum + p.usageCount, 0)

  return (
    <div className="page">
      <section className="hero">
        <h1>
          Manage your <span className="accent">AI prompts</span> like a pro
        </h1>
        <p>
          PromptVerse AI is a lightweight workspace to create, organize, and reuse your best
          prompts for ChatGPT, Claude, Gemini, or any AI tool you work with.
        </p>
        <div className="hero-actions">
          <Link to="/prompts" className="btn-primary">
            Browse My Prompts
          </Link>
          <Link to="/services" className="btn-secondary link-btn">
            Explore Services
          </Link>
        </div>
      </section>

      <section className="dashboard">
        <div className="stat-card">
          <p className="stat-value">{prompts.length}</p>
          <p className="stat-label">Saved Prompts</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{totalUsage}</p>
          <p className="stat-label">Total Uses</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{prompts.filter((p) => p.favorite).length}</p>
          <p className="stat-label">Favorites</p>
        </div>
      </section>

      <section>
        <h2 className="section-title">Why PromptVerse?</h2>
        <div className="feature-grid">
          {/* List Rendering: mapping over static feature data */}
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
