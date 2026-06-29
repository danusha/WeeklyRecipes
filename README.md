# Weekly Recipes

A personal weekly meal planner built with React. Set your dietary preferences, get a generated week of recipes, reroll meals you don't like, save favorites, and build a shopping list automatically.

## Stack

- React 19 + React Router 7
- Tailwind CSS 4
- Vite 8

## Getting Started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Other Commands

| Command | Description |
|---|---|
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |

## Features

- **Onboarding quiz** — 5-step wizard to capture dietary preferences
- **Weekly plan** — auto-generated meal plan for the week, filtered to your preferences
- **Reroll** — swap out individual meals or an entire day
- **Favorites** — save recipes you want to revisit
- **Shopping list** — aggregated ingredient list across the week's plan

## Spoonacular Integration

The app currently uses mock recipe data. When you have a Spoonacular API key, create a `.env` file in the project root:

```
VITE_SPOONACULAR_KEY=your_key_here
```

Then replace the mock functions in [src/services/recipeService.js](src/services/recipeService.js) (`generateWeekPlan`, `rerollDay`, `rerollCategory`) with real API calls.

## Project Structure

```
src/
  context/AppContext.jsx     # Global state (settings, week plan, favorites, shopping list) — persisted to localStorage
  services/recipeService.js  # Mock data + plan generation logic
  pages/
    Quiz.jsx                 # Onboarding wizard
    Home.jsx                 # Dashboard
    WeeklyPlan.jsx           # Weekly meal grid
    Favorites.jsx            # Saved recipes
    ShoppingList.jsx         # Aggregated ingredients
  components/
    RecipeCard.jsx           # Reusable recipe card with favorite + reroll
    RecipeModal.jsx          # Full recipe detail modal
    Sidebar.jsx              # Collapsible navigation
```
