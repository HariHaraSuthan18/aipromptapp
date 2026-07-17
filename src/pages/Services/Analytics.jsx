import { usePrompts } from '../../context/PromptsContext'
import { categories } from '../../data/initialPrompts'

export default function Analytics() {
  const { prompts } = usePrompts()

  const maxCount = Math.max(1, ...categories.map((c) => prompts.filter((p) => p.category === c).length))

  const avgRating =
    prompts.length > 0
      ? (prompts.reduce((sum, p) => sum + p.rating, 0) / prompts.length).toFixed(1)
      : 0

  return (
    <div>
      {prompts.length === 0 ? (
        <div className="empty-state">
          <p>No prompts saved yet. Add some in the Prompts page to see analytics.</p>
        </div>
      ) : (
        <>
          <div className="dashboard">
            <div className="stat-card">
              <p className="stat-value">{prompts.length}</p>
              <p className="stat-label">Total Prompts</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">{prompts.reduce((s, p) => s + p.usageCount, 0)}</p>
              <p className="stat-label">Total Copies</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">{avgRating} ★</p>
              <p className="stat-label">Avg Rating</p>
            </div>
          </div>

          <h2 className="section-title">By Category</h2>
          <div className="bar-chart">
            {categories.map((c) => {
              const count = prompts.filter((p) => p.category === c).length
              const widthPct = (count / maxCount) * 100
              return (
                <div className="bar-row" key={c}>
                  <span className="bar-label">{c}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${widthPct}%` }} />
                  </div>
                  <span className="bar-count">{count}</span>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
