import { Route, Routes } from 'react-router'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre" element={<AboutPage />} />
    </Routes>
  )
}
