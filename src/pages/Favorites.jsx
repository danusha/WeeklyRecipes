import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { getAllRecipes } from '../services/recipeService'
import RecipeCard from '../components/RecipeCard'

export default function Favorites() {
  const { favorites } = useApp()
  const [dismissed, setDismissed] = useState(new Set())

  const allRecipes = getAllRecipes()
  const favRecipes = allRecipes.filter(r => favorites.has(r.id) && !dismissed.has(r.id))

  const handleUnfavorite = (id) => {
    setDismissed(prev => new Set([...prev, id]))
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {favorites.size} saved {favorites.size === 1 ? 'recipe' : 'recipes'}
        </p>
      </div>

      {favRecipes.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-5xl mb-4">💛</p>
          <p className="text-lg font-semibold text-gray-700">No favorites yet</p>
          <p className="text-sm text-gray-500 mt-1">Tap the heart on any recipe card to save it here.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favRecipes.map(recipe => (
            <div key={recipe.id} className="relative">
              <RecipeCard recipe={recipe} />
              <button
                onClick={() => handleUnfavorite(recipe.id)}
                className="absolute top-2 right-2 px-2 py-1 bg-white/90 text-xs text-gray-600 rounded-lg shadow-sm hover:bg-white border border-gray-200 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
