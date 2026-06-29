import { useState } from 'react'
import { useApp } from '../context/AppContext'
import RecipeCard from '../components/RecipeCard'

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const DAY_LABELS = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' }
const DAY_FULL = { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday' }

function getTodayKey() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[new Date().getDay()]
}

export default function WeeklyPlan() {
  const { weekPlan, settings, rerollWeek, rerollSingleDay } = useApp()
  const [rerollingWeek, setRerollingWeek] = useState(false)
  const [rerollingDay, setRerollingDay] = useState(null)
  const meals = settings?.meals || []
  const today = getTodayKey()

  const handleRerollWeek = async () => {
    setRerollingWeek(true)
    await new Promise(r => setTimeout(r, 600))
    rerollWeek()
    setRerollingWeek(false)
  }

  const handleRerollDay = async (day) => {
    setRerollingDay(day)
    await new Promise(r => setTimeout(r, 400))
    rerollSingleDay(day)
    setRerollingDay(null)
  }

  if (!weekPlan) return (
    <div className="flex items-center justify-center h-64 text-gray-400">Loading plan…</div>
  )

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Weekly Plan</h1>
          <p className="text-sm text-gray-500 mt-0.5">Your meal plan for the week</p>
        </div>
        <button
          onClick={handleRerollWeek}
          disabled={rerollingWeek}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60"
        >
          {rerollingWeek ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
            </svg>
          )}
          Reroll week
        </button>
      </div>

      <div className="space-y-6">
        {DAYS.map(day => {
          const dayPlan = weekPlan[day] || {}
          const isToday = day === today
          const isRerollingThis = rerollingDay === day

          return (
            <div key={day} className={`rounded-2xl border ${isToday ? 'border-indigo-300 bg-indigo-50/30' : 'border-gray-200 bg-white'} p-5`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-gray-900">{DAY_FULL[day]}</h2>
                  {isToday && (
                    <span className="px-2 py-0.5 text-xs bg-indigo-600 text-white rounded-full font-medium">Today</span>
                  )}
                </div>
                <button
                  onClick={() => handleRerollDay(day)}
                  disabled={!!rerollingDay}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors disabled:opacity-50"
                >
                  {isRerollingThis ? (
                    <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                    </svg>
                  )}
                  Reroll day
                </button>
              </div>

              <div className={`grid gap-3 ${meals.length === 1 ? 'grid-cols-1 max-w-xs' : meals.length === 2 ? 'grid-cols-2' : meals.length === 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
                {meals.map(meal => (
                  <div key={meal} className={`transition-opacity ${isRerollingThis ? 'opacity-40' : 'opacity-100'}`}>
                    <RecipeCard
                      recipe={dayPlan[meal]}
                      day={day}
                      mealType={meal}
                      compact
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
