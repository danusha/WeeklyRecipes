import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Quiz from './pages/Quiz'
import Home from './pages/Home'
import WeeklyPlan from './pages/WeeklyPlan'
import Favorites from './pages/Favorites'
import ShoppingList from './pages/ShoppingList'

function AppShell() {
  const { quizDone } = useApp()

  if (!quizDone) return <Quiz />

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weekly-plan" element={<WeeklyPlan />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </BrowserRouter>
  )
}
