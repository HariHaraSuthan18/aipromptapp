import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePrompts } from '../../context/PromptsContext'
import { categories } from '../../data/initialPrompts'
import { useDebounce } from '../../hooks/useDebounce'
import PromptCard from '../../components/PromptCard'
import PromptForm from '../../components/PromptForm'
import Modal from '../../components/Modal'

export default function PromptsList() {
  const { prompts, dispatch } = usePrompts()

  // useSearchParams: filters live in the URL so they're shareable/bookmarkable
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'All'
  const sort = searchParams.get('sort') || 'newest'
  const query = searchParams.get('q') || ''

  const [searchInput, setSearchInput] = useState(query)
  const debouncedSearch = useDebounce(searchInput, 300)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState(null)

  useEffect(() => {
    document.title = 'PromptVerse AI — My Prompts'
  }, [])

  // keep the URL's ?q= in sync with the debounced search text
  useEffect(() => {
    const next = new URLSearchParams(searchParams)
    if (debouncedSearch) next.set('q', debouncedSearch)
    else next.delete('q')
    setSearchParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value === 'All' || !value) next.delete(key)
    else next.set(key, value)
    setSearchParams(next)
  }

  let filtered = prompts.filter((p) => {
    const matchesCategory = category === 'All' ? true : category === 'Favorites' ? p.favorite : p.category === category
    const matchesSearch =
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  if (sort === 'newest') filtered = [...filtered].sort((a, b) => b.id - a.id)
  if (sort === 'usage') filtered = [...filtered].sort((a, b) => b.usageCount - a.usageCount)
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)

  const handleCopy = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content)
    } catch {
      // ignore clipboard errors
    }
    dispatch({ type: 'INCREMENT_USAGE', payload: { id: prompt.id } })
  }

  const handleDelete = (id) => dispatch({ type: 'DELETE_PROMPT', payload: { id } })
  const handleToggleFavorite = (id) => dispatch({ type: 'TOGGLE_FAVORITE', payload: { id } })

  const handleNew = () => {
    setEditingPrompt(null)
    setIsModalOpen(true)
  }

  const handleFormSubmit = (formData) => {
    if (editingPrompt) {
      dispatch({ type: 'UPDATE_PROMPT', payload: { id: editingPrompt.id, data: formData } })
    } else {
      dispatch({ type: 'ADD_PROMPT', payload: formData })
    }
    setIsModalOpen(false)
    setEditingPrompt(null)
  }

  return (
    <div className="page">
      <section className="page-header prompts-header">
        <div>
          <h1>My Prompts</h1>
          <p>{filtered.length} of {prompts.length} prompts shown</p>
        </div>
        <button className="btn-primary" onClick={handleNew}>
          + New Prompt
        </button>
      </section>

      <div className="library-controls">
        <input
          type="text"
          placeholder="Search title or tags..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select value={category} onChange={(e) => updateParam('category', e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Favorites">★ Favorites</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => updateParam('sort', e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="usage">Most Used</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No prompts found. Try a different search or create a new one.</p>
        </div>
      ) : (
        <div className="prompt-grid">
          {filtered.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onCopy={handleCopy}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title={editingPrompt ? 'Edit Prompt' : 'New Prompt'}
        onClose={() => setIsModalOpen(false)}
      >
        <PromptForm
          initialData={editingPrompt}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
