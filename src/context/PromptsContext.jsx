import { createContext, useContext, useReducer, useEffect } from 'react'
import { promptsReducer } from '../reducer/promptsReducer'
import { initialPrompts } from '../data/initialPrompts'

const STORAGE_KEY = 'promptverse_prompts_v2'

const PromptsContext = createContext(null)

function loadInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : initialPrompts
  } catch {
    return initialPrompts
  }
}

export function PromptsProvider({ children }) {
  const [prompts, dispatch] = useReducer(promptsReducer, [], loadInitial)

  // Persist to localStorage whenever prompts change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts))
  }, [prompts])

  return (
    <PromptsContext.Provider value={{ prompts, dispatch }}>
      {children}
    </PromptsContext.Provider>
  )
}

// Custom Hook: clean access to the prompts context, with a safety check
export function usePrompts() {
  const ctx = useContext(PromptsContext)
  if (!ctx) throw new Error('usePrompts must be used inside PromptsProvider')
  return ctx
}
