import { useApp } from '../context/AppContext'

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

function fractionStr(num) {
  if (!num) return ''
  if (num === Math.floor(num)) return String(num)
  const frac = { 0.25: '¼', 0.5: '½', 0.75: '¾', 0.33: '⅓', 0.67: '⅔' }
  const whole = Math.floor(num)
  const decimal = Math.round((num - whole) * 100) / 100
  const f = frac[decimal] || `${num}`
  return whole > 0 ? `${whole} ${f}` : f
}

function aggregateIngredients(weekPlan) {
  const map = {}

  DAYS.forEach(day => {
    const dayPlan = weekPlan?.[day] || {}
    Object.values(dayPlan).forEach(recipe => {
      if (!recipe) return
      ;(recipe.extendedIngredients || []).forEach(ing => {
        const key = `${ing.name.toLowerCase()}_${ing.unit}`
        if (map[key]) {
          map[key].amount += ing.amount
        } else {
          map[key] = { name: ing.name, amount: ing.amount, unit: ing.unit, key }
        }
      })
    })
  })

  return Object.values(map).sort((a, b) => a.name.localeCompare(b.name))
}

const PRODUCE_KEYWORDS = ['apple', 'avocado', 'banana', 'basil', 'bell pepper', 'broccoli', 'cabbage', 'carrot', 'celery', 'cherry tomato', 'cilantro', 'cucumber', 'dill', 'edamame', 'garlic', 'ginger', 'green onion', 'lemon', 'lettuce', 'lime', 'mushroom', 'onion', 'potato', 'spinach', 'squash', 'tomato', 'zucchini']
const DAIRY_KEYWORDS = ['butter', 'cheese', 'coconut milk', 'egg', 'feta', 'milk', 'mozzarella', 'parmesan', 'yogurt']
const PROTEIN_KEYWORDS = ['beef', 'chicken', 'fish', 'pork', 'salmon', 'shrimp', 'steak', 'tofu', 'turkey']
const GRAIN_KEYWORDS = ['bread', 'cornstarch', 'flour', 'granola', 'noodle', 'oat', 'pasta', 'penne', 'quinoa', 'rice', 'tortilla']

function categorize(name) {
  const n = name.toLowerCase()
  if (PRODUCE_KEYWORDS.some(k => n.includes(k))) return 'Produce'
  if (DAIRY_KEYWORDS.some(k => n.includes(k))) return 'Dairy & Eggs'
  if (PROTEIN_KEYWORDS.some(k => n.includes(k))) return 'Meat & Seafood'
  if (GRAIN_KEYWORDS.some(k => n.includes(k))) return 'Grains & Bread'
  return 'Pantry & Other'
}

const CATEGORY_ORDER = ['Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Grains & Bread', 'Pantry & Other']
const CATEGORY_ICONS = { 'Produce': '🥦', 'Dairy & Eggs': '🥛', 'Meat & Seafood': '🥩', 'Grains & Bread': '🌾', 'Pantry & Other': '🫙' }

export default function ShoppingList() {
  const { weekPlan, checkedItems, toggleChecked } = useApp()

  const ingredients = aggregateIngredients(weekPlan)
  const grouped = {}
  ingredients.forEach(ing => {
    const cat = categorize(ing.name)
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(ing)
  })

  const totalCount = ingredients.length
  const checkedCount = ingredients.filter(i => checkedItems.has(i.key)).length

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shopping List</h1>
        <p className="text-sm text-gray-500 mt-0.5">{checkedCount} of {totalCount} items checked</p>
      </div>

      {totalCount === 0 ? (
        <div className="py-24 text-center">
          <p className="text-5xl mb-4">🛒</p>
          <p className="text-lg font-semibold text-gray-700">No ingredients yet</p>
          <p className="text-sm text-gray-500 mt-1">Complete the quiz and get a meal plan first.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {CATEGORY_ORDER.filter(cat => grouped[cat]?.length).map(cat => (
            <div key={cat}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>{CATEGORY_ICONS[cat]}</span> {cat}
              </h2>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                {grouped[cat].map(ing => {
                  const checked = checkedItems.has(ing.key)
                  return (
                    <label
                      key={ing.key}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleChecked(ing.key)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className={`flex-1 text-sm ${checked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {ing.name}
                      </span>
                      <span className={`text-xs ${checked ? 'text-gray-300' : 'text-gray-500'}`}>
                        {fractionStr(ing.amount)} {ing.unit}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
