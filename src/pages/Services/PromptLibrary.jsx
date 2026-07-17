import { useState, useMemo } from 'react'
import { serviceTemplates } from '../../data/serviceTemplates'
import { categories } from '../../data/initialPrompts'
import { useDebounce } from '../../hooks/useDebounce'

export default function PromptLibrary() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const debouncedSearch = useDebounce(search, 300)
  const [copiedId, setCopiedId] = useState(null)

  // useMemo-free filtering kept simple; recalculates on render (fine at this data size)
  const filtered = useMemo(() => {
    return serviceTemplates.filter((t) => {
      const matchesCategory = category === 'All' || t.category === category
      const matchesSearch = t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [category, debouncedSearch])

  const handleCopy = async (t) => {
    try {
      await navigator.clipboard.writeText(t.content)
    } catch {
      // clipboard permissions might be blocked; ignore
    }
    setCopiedId(t.id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <div>
      <div className="library-controls">
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional Rendering: empty state vs list */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No templates match your search.</p>
        </div>
      ) : (
        <div className="template-grid">
          {filtered.map((t) => (
            <div className="template-card" key={t.id}>
              <span className="category-tag">{t.category}</span>
              <h3>{t.title}</h3>
              <p>{t.content}</p>
              <button className="btn-secondary" onClick={() => handleCopy(t)}>
                {copiedId === t.id ? 'Copied ✓' : 'Copy Template'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
