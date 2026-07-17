import { useEffect } from 'react'

const milestones = [
  { year: '2026 Q2', text: 'PromptVerse AI started as a class project to solve prompt-hoarding in Notes apps.' },
  { year: '2026 Q2', text: 'Added categories, favorites, and usage tracking based on early feedback.' },
  { year: '2026 Q3', text: 'Rebuilt with React Router, Context API, and useReducer for a full production-style structure.' },
]

export default function About() {
  useEffect(() => {
    document.title = 'PromptVerse AI — About'
  }, [])

  return (
    <div className="page">
      <section className="page-header">
        <h1>About PromptVerse AI</h1>
        <p>
          A small tool built for anyone who talks to AI models every day and keeps losing their
          best prompts in random chat tabs.
        </p>
      </section>

      <section className="about-grid">
        <div className="about-block">
          <h2>Our Mission</h2>
          <p>
            Prompting is quickly becoming its own skill. PromptVerse AI exists so that once you
            write a prompt that works well, you never have to rewrite it from scratch again —
            you save it, tag it, rate it, and reuse it across projects.
          </p>
        </div>
        <div className="about-block">
          <h2>Who It's For</h2>
          <p>
            Students, developers, marketers, and hobbyists who use AI tools daily and want a
            single organized place for their prompt library instead of scattered notes.
          </p>
        </div>
      </section>

      <section>
        <h2 className="section-title">Project Timeline</h2>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div className="timeline-item" key={i}>
              <span className="timeline-dot" />
              <div>
                <p className="timeline-year">{m.year}</p>
                <p>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
