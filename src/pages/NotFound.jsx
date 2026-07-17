import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <div className="not-found">
        <h1>404</h1>
        <p>This page wandered off. Let's get you back.</p>
        <Link to="/" className="btn-primary link-btn">Back to Home</Link>
      </div>
    </div>
  )
}
