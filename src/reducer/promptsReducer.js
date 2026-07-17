export const promptsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROMPTS':
      return action.payload

    case 'ADD_PROMPT': {
      const newPrompt = {
        id: Date.now(),
        favorite: false,
        usageCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        ...action.payload,
      }
      return [newPrompt, ...state]
    }

    case 'UPDATE_PROMPT':
      return state.map((p) =>
        p.id === action.payload.id ? { ...p, ...action.payload.data } : p
      )

    case 'DELETE_PROMPT':
      return state.filter((p) => p.id !== action.payload.id)

    case 'TOGGLE_FAVORITE':
      return state.map((p) =>
        p.id === action.payload.id ? { ...p, favorite: !p.favorite } : p
      )

    case 'INCREMENT_USAGE':
      return state.map((p) =>
        p.id === action.payload.id ? { ...p, usageCount: p.usageCount + 1 } : p
      )

    default:
      return state
  }
}
