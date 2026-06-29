import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { MEAL_COLORS } from './RecipeCard'

export default function RecipeModal({ recipe, onClose }) {
  const { favorites, toggleFavorite } = useApp()
  const isFav = favorites.has(recipe.id)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const steps = recipe.analyzedInstructions?.[0]?.steps || []
  const ingredients = recipe.extendedIngredients || []

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-56 object-cover rounded-t-2xl"
          />
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${MEAL_COLORS[recipe.mealCategory]?.bg || 'bg-gray-500'}`}>
            {recipe.mealCategory?.charAt(0).toUpperCase() + recipe.mealCategory?.slice(1)}
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{recipe.title}</h2>
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className="shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isFav ? 0 : 1.5} className={`w-6 h-6 ${isFav ? 'text-red-500' : 'text-gray-400'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </button>
          </div>

          <div className="flex gap-4 text-sm text-gray-500 mb-6">
            <span>⏱ {recipe.readyInMinutes} min</span>
            <span>👤 {recipe.servings} servings</span>
          </div>

          {recipe.videoUrl && (
            <a
              href={recipe.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
              </svg>
              Watch video
            </a>
          )}

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Ingredients</h3>
            <ul className="space-y-1.5">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                  <span>
                    {ing.amount > 0 && `${ing.amount} ${ing.unit} `}{ing.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Instructions</h3>
            <ol className="space-y-3">
              {steps.map(step => (
                <li key={step.number} className="flex gap-3 text-sm text-gray-700">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center justify-center">
                    {step.number}
                  </span>
                  <span className="pt-0.5">{step.step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
