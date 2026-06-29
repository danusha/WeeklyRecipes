import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { generateWeekPlan, rerollCategory, rerollDay } from '../services/recipeService'

const AppContext = createContext(null)

const STORAGE_KEYS = {
  settings: 'wr_settings',
  quizDone: 'wr_quiz_done',
  weekPlan: 'wr_week_plan',
  favorites: 'wr_favorites',
  checkedItems: 'wr_checked_items',
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(() => load(STORAGE_KEYS.settings, null))
  const [quizDone, setQuizDone] = useState(() => load(STORAGE_KEYS.quizDone, false))
  const [weekPlan, setWeekPlan] = useState(() => load(STORAGE_KEYS.weekPlan, null))
  const [favorites, setFavorites] = useState(() => new Set(load(STORAGE_KEYS.favorites, [])))
  const [checkedItems, setCheckedItems] = useState(() => new Set(load(STORAGE_KEYS.checkedItems, [])))

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings)) }, [settings])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.quizDone, JSON.stringify(quizDone)) }, [quizDone])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.weekPlan, JSON.stringify(weekPlan)) }, [weekPlan])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify([...favorites])) }, [favorites])
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.checkedItems, JSON.stringify([...checkedItems])) }, [checkedItems])

  const completeQuiz = useCallback((answers) => {
    setSettings(answers)
    setQuizDone(true)
    const plan = generateWeekPlan(answers)
    setWeekPlan(plan)
    setCheckedItems(new Set())
  }, [])

  const rerollWeek = useCallback(() => {
    setWeekPlan(generateWeekPlan(settings))
    setCheckedItems(new Set())
  }, [settings])

  const rerollSingleDay = useCallback((day) => {
    setWeekPlan(prev => ({ ...prev, [day]: rerollDay(settings) }))
  }, [settings])

  const rerollCard = useCallback((day, mealType) => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: { ...prev[day], [mealType]: rerollCategory(mealType, settings) },
    }))
  }, [settings])

  const toggleFavorite = useCallback((recipeId) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(recipeId) ? next.delete(recipeId) : next.add(recipeId)
      return next
    })
  }, [])

  const toggleChecked = useCallback((key) => {
    setCheckedItems(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }, [])

  const updateSettings = useCallback((newSettings) => {
    setSettings(newSettings)
  }, [])

  return (
    <AppContext.Provider value={{
      settings, quizDone, weekPlan, favorites, checkedItems,
      completeQuiz, rerollWeek, rerollSingleDay, rerollCard,
      toggleFavorite, toggleChecked, updateSettings,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
