import { useState, useEffect } from 'react'

// Custom Hook: syncs a piece of state with localStorage automatically
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage might be full or unavailable; ignore silently
    }
  }, [key, value])

  return [value, setValue]
}
