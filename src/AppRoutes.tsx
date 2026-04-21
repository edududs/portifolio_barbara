import { Route, Routes } from 'react-router'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre" element={<AboutPage />} />
      <Route path="/servicos" element={<ServicesPage />} />
      <Route path="/contato" element={<ContactPage />} />
    </Routes>
  )
}
