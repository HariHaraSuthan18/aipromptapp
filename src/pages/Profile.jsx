import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useTheme } from '../context/ThemeContext'
import { usePrompts } from '../context/PromptsContext'

export default function Profile() {
  const { user, updateUser } = useUser()
  const { theme, toggleTheme } = useTheme()
  const { prompts } = usePrompts()
  const [form, setForm] = useState(user)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    document.title = 'PromptVerse AI — Profile'
  }, [])

  useEffect(() => {
    setForm(user)
  }, [user])

  const favorites = prompts.filter((p) => p.favorite)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSave = (e) => {
    e.preventDefault()
    updateUser(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="page">
      <section className="page-header">
        <h1>Profile</h1>
        <p>Your PromptVerse identity and preferences.</p>
      </section>

      <div className="profile-layout">
        <form className="modal-form" onSubmit={handleSave}>
          <label>Display Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />

          <label>Role</label>
          <input type="text" name="role" value={form.role} onChange={handleChange} />

          <label>Bio</label>
          <textarea name="bio" rows={3} value={form.bio} onChange={handleChange} />

          <button type="submit" className="btn-primary" style={{ marginTop: 12 }}>
            Save Profile
          </button>
          {saved && <p className="success-msg">✓ Profile updated</p>}
        </form>

        <div className="profile-side">
          <div className="stat-card">
            <p className="stat-value">{favorites.length}</p>
            <p className="stat-label">Favorite Prompts</p>
          </div>

          <div className="theme-card">
            <p>Current theme: <strong>{theme}</strong></p>
            <button className="btn-secondary" onClick={toggleTheme}>
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>
      </div>

      <h2 className="section-title">Your Favorites</h2>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>No favorites yet. Star a prompt to see it here.</p>
        </div>
      ) : (
        <ul className="favorites-list">
          {favorites.map((f) => (
            <li key={f.id}>
              <Link to={`/prompts/${f.id}`}>{f.title}</Link>
              <span className="category-tag">{f.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
