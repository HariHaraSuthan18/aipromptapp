import { Link } from 'react-router-dom'

const serviceCards = [
  {
    to: '/services/library',
    icon: '📚',
    title: 'Prompt Library',
    desc: 'Browse curated, ready-to-use prompt templates across 6 categories — copy and adapt instantly.',
  },
  {
    to: '/services/generator',
    icon: '🤖',
    title: 'AI Idea Generator',
    desc: 'Stuck for inspiration? Fetch a random creative spark from a live API to kickstart your next prompt.',
  },
  {
    to: '/services/analytics',
    icon: '📈',
    title: 'Analytics',
    desc: 'See a breakdown of your saved prompts by category, rating, and usage at a glance.',
  },
]

export default function ServicesOverview() {
  return (
    <div className="service-overview-grid">
      {serviceCards.map((s) => (
        <Link to={s.to} className="service-card" key={s.title}>
          <div className="feature-icon">{s.icon}</div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <span className="service-link">Open →</span>
        </Link>
      ))}
    </div>
  )
}
