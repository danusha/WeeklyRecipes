import { useState } from 'react'
import { useApp } from '../context/AppContext'

const DIETS = [
  { id: 'mediterranean', label: 'Mediterranean', icon: '🫒' },
  { id: 'paleo', label: 'Paleo', icon: '🥩' },
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥦' },
  { id: 'low-sodium', label: 'Low Sodium', icon: '🧂' },
  { id: 'low-gi', label: 'Low GI', icon: '📉' },
  { id: 'keto', label: 'Keto', icon: '🥑' },
  { id: 'whole30', label: 'Whole30', icon: '🌱' },
  { id: 'none', label: 'None', icon: '✓' },
]

const ALLERGIES = [
  { id: 'nuts', label: 'Nuts', icon: '🥜' },
  { id: 'shellfish', label: 'Shellfish', icon: '🦐' },
  { id: 'pork', label: 'Pork', icon: '🐷' },
  { id: 'soy', label: 'Soy', icon: '🫘' },
  { id: 'none', label: 'None', icon: '✓' },
]

const AVOID_INGREDIENTS = [
  { id: 'shellfish', label: 'Shellfish', icon: '🦀' },
  { id: 'pork', label: 'Pork', icon: '🐷' },
  { id: 'beef', label: 'Beef', icon: '🐄' },
  { id: 'chicken', label: 'Chicken', icon: '🐔' },
  { id: 'fish', label: 'Fish', icon: '🐟' },
  { id: 'mushrooms', label: 'Mushrooms', icon: '🍄' },
]

const MEALS = [
  { id: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { id: 'lunch', label: 'Lunch', icon: '☀️' },
  { id: 'dinner', label: 'Dinner', icon: '🌙' },
  { id: 'snack', label: 'Snacks', icon: '🍎' },
]

const TOTAL_STEPS = 5

function ToggleChip({ label, icon, selected, onClick, isNone = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
        selected
          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function CustomTagInput({ value, onChange }) {
  const [inputVal, setInputVal] = useState('')

  const add = () => {
    const trimmed = inputVal.trim()
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed])
    }
    setInputVal('')
  }

  const remove = (item) => onChange(value.filter(v => v !== item))

  return (
    <div className="mt-4">
      <div className="flex gap-2 flex-wrap mb-3">
        {value.map(item => (
          <span key={item} className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full border border-indigo-200">
            {item}
            <button type="button" onClick={() => remove(item)} className="ml-1 text-indigo-400 hover:text-indigo-600">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="Add another ingredient…"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default function Quiz() {
  const { completeQuiz } = useApp()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    birthday: '',
    diets: [],
    allergies: [],
    customAllergies: [],
    avoidances: [],
    customAvoidances: [],
    meals: ['breakfast', 'lunch', 'dinner'],
  })
  const [errors, setErrors] = useState({})

  const toggleSet = (field, id, isNone = false) => {
    setForm(prev => {
      const cur = prev[field]
      if (isNone) return { ...prev, [field]: ['none'] }
      const without = cur.filter(v => v !== 'none')
      const next = without.includes(id) ? without.filter(v => v !== id) : [...without, id]
      return { ...prev, [field]: next }
    })
  }

  const validate = () => {
    const e = {}
    if (step === 1) {
      if (!form.name.trim()) e.name = 'Name is required'
      if (!form.birthday) e.birthday = 'Birthday is required'
    }
    if (step === 5) {
      if (!form.meals.length) e.meals = 'Select at least one meal'
    }
    setErrors(e)
    return !Object.keys(e).length
  }

  const next = () => {
    if (!validate()) return
    if (step < TOTAL_STEPS) setStep(s => s + 1)
    else handleSubmit()
  }

  const handleSubmit = () => {
    completeQuiz({
      name: form.name.trim(),
      birthday: form.birthday,
      diets: form.diets.filter(d => d !== 'none'),
      allergies: [...form.allergies.filter(a => a !== 'none'), ...form.customAllergies],
      avoidances: [...form.avoidances, ...form.customAvoidances],
      meals: form.meals,
    })
  }

  const stepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Alex"
                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.name ? 'border-red-400' : 'border-gray-300 focus:border-indigo-500'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Birthday</label>
              <input
                type="date"
                value={form.birthday}
                onChange={e => setForm(p => ({ ...p, birthday: e.target.value }))}
                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${errors.birthday ? 'border-red-400' : 'border-gray-300 focus:border-indigo-500'}`}
              />
              {errors.birthday && <p className="text-red-500 text-xs mt-1">{errors.birthday}</p>}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="flex flex-wrap gap-2">
            {DIETS.map(d => (
              <ToggleChip
                key={d.id}
                label={d.label}
                icon={d.icon}
                selected={form.diets.includes(d.id)}
                onClick={() => toggleSet('diets', d.id, d.id === 'none')}
              />
            ))}
          </div>
        )
      case 3:
        return (
          <>
            <div className="flex flex-wrap gap-2">
              {ALLERGIES.map(a => (
                <ToggleChip
                  key={a.id}
                  label={a.label}
                  icon={a.icon}
                  selected={form.allergies.includes(a.id)}
                  onClick={() => toggleSet('allergies', a.id, a.id === 'none')}
                />
              ))}
            </div>
            <CustomTagInput value={form.customAllergies} onChange={v => setForm(p => ({ ...p, customAllergies: v }))} />
          </>
        )
      case 4:
        return (
          <>
            <div className="flex flex-wrap gap-2">
              {AVOID_INGREDIENTS.map(a => (
                <ToggleChip
                  key={a.id}
                  label={a.label}
                  icon={a.icon}
                  selected={form.avoidances.includes(a.id)}
                  onClick={() => toggleSet('avoidances', a.id)}
                />
              ))}
            </div>
            <CustomTagInput value={form.customAvoidances} onChange={v => setForm(p => ({ ...p, customAvoidances: v }))} />
          </>
        )
      case 5:
        return (
          <div>
            <div className="flex flex-wrap gap-2">
              {MEALS.map(m => (
                <ToggleChip
                  key={m.id}
                  label={m.label}
                  icon={m.icon}
                  selected={form.meals.includes(m.id)}
                  onClick={() => toggleSet('meals', m.id)}
                />
              ))}
            </div>
            {errors.meals && <p className="text-red-500 text-xs mt-2">{errors.meals}</p>}
          </div>
        )
      default:
        return null
    }
  }

  const stepTitles = [
    'Let\'s get to know you',
    'Do you follow a special diet?',
    'Any allergies?',
    'Ingredients you\'d rather avoid?',
    'Which meals do you want to plan?',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <div className="flex gap-1 mb-6">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${i < step ? 'bg-indigo-500' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <p className="text-xs font-medium text-indigo-600 mb-1">Step {step} of {TOTAL_STEPS}</p>
          <h1 className="text-2xl font-bold text-gray-900">{stepTitles[step - 1]}</h1>
        </div>

        <div className="mb-8">
          {stepContent()}
        </div>

        <div className="flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={next}
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            {step === TOTAL_STEPS ? 'Get my meal plan →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
