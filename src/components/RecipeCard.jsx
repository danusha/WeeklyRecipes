import { useState } from 'react'
import { useApp } from '../context/AppContext'
import RecipeModal from './RecipeModal'

export const MEAL_COLORS = {
  breakfast: { bg: 'bg-amber-500', light: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  lunch: { bg: 'bg-emerald-500', light: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  dinner: { bg: 'bg-indigo-500', light: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' },
  snack: { bg: 'bg-pink-500', light: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700' },
}

export default function RecipeCard({ recipe, day, mealType, compact = false }) {
  const { favorites, toggleFavorite, rerollCard } = useApp()
  const [showModal, setShowModal] = useState(false)
  const [rerolling, setRerolling] = useState(false)

  if (!recipe) return null

  const isFav = favorites.has(recipe.id)
  const colors = MEAL_COLORS[recipe.mealCategory] || MEAL_COLORS.dinner

  const handleReroll = async (e) => {
    e.stopPropagation()
    setRerolling(true)
    await new Promise(r => setTimeout(r, 400))
    rerollCard(day, mealType)
    setRerolling(false)
  }

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={`relative rounded-xl overflow-hidden cursor-pointer border ${colors.border} bg-white shadow-sm hover:shadow-md transition-shadow group ${compact ? '' : ''}`}
      >
        {rerolling && (
          <div className="absolute inset-0 z-10 bg-white/80 flex items-center justify-center rounded-xl">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className={`w-full object-cover ${compact ? 'h-28' : 'h-36'}`}
          />
          <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${colors.bg}`}>
            {recipe.mealCategory?.charAt(0).toUpperCase() + recipe.mealCategory?.slice(1)}
          </div>
        </div>

        <div className="p-3">
          <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
            {recipe.title}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>⏱ {recipe.readyInMinutes}m</span>
            <div className="flex items-center gap-1">
              <button
                onClick={e => { e.stopPropagation(); toggleFavorite(recipe.id) }}
                className={`p-1 rounded-full transition-colors ${isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                aria-label={isFav ? 'Unfavorite' : 'Favorite'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isFav ? 0 : 1.5} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              </button>
              {day && mealType && (
                <button
                  onClick={handleReroll}
                  className="p-1 rounded-full text-gray-400 hover:text-indigo-500 transition-colors"
                  aria-label="Get a different recipe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && <RecipeModal recipe={recipe} onClose={() => setShowModal(false)} />}
    </>
  )
}
