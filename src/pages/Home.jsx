import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import RecipeCard from '../components/RecipeCard'

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const DAY_NAMES = { sunday: 'Sunday', monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday' }

function greeting(name) {
  const hour = new Date().getHours()
  if (hour < 12) return `Good morning, ${name}!`
  if (hour < 17) return `Good afternoon, ${name}!`
  return `Good evening, ${name}!`
}

function getTodayKey() {
  return DAYS[new Date().getDay()]
}

export default function Home() {
  const { settings, weekPlan } = useApp()
  const todayKey = getTodayKey()
  const todayPlan = weekPlan?.[todayKey] || {}
  const meals = settings?.meals || []
  const todayRecipes = meals.map(meal => ({ meal, recipe: todayPlan[meal] })).filter(r => r.recipe)

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {greeting(settings?.name || 'there')}
        </h1>
        <p className="text-gray-500">{DAY_NAMES[todayKey]} — here's what's on the menu today.</p>
      </div>

      {todayRecipes.length === 0 ? (
        <div className="py-16 text-center text-gray-400">
          <p className="text-5xl mb-4">🍽️</p>
          <p className="text-lg font-medium text-gray-600">No meals planned for today</p>
          <p className="text-sm mt-1">Go to the Weekly Plan to set things up.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {todayRecipes.map(({ meal, recipe }) => (
            <RecipeCard key={meal} recipe={recipe} day={todayKey} mealType={meal} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/weekly-plan"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          View full week →
        </Link>
      </div>
    </div>
  )
}
