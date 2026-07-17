import { NavLink, Outlet } from 'react-router-dom'

export default function Services() {
  return (
    <div className="page">
      <section className="page-header">
        <h1>Our Services</h1>
        <p>Three ways PromptVerse AI helps you get more out of every prompt.</p>
      </section>

      {/* Nested Routing sub-navigation */}
      <div className="tabs">
        <NavLink to="/services" end className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
          Overview
        </NavLink>
        <NavLink to="/services/library" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
          Prompt Library
        </NavLink>
        <NavLink to="/services/generator" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
          AI Idea Generator
        </NavLink>
        <NavLink to="/services/analytics" className={({ isActive }) => `tab ${isActive ? 'active' : ''}`}>
          Analytics
        </NavLink>
      </div>

      {/* Nested route content renders here */}
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  )
}
