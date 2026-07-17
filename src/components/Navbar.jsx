import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/prompts', label: 'Prompts' },
  { to: '/contact', label: 'Contact' },
  { to: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="logo-dot" />
        <h1>
          Prompt<span className="accent">Verse</span> AI
        </h1>
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
    </header>
  )
}
