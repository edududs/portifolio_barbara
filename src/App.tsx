import { useEffect } from 'react'
import { BrowserRouter, useLocation } from 'react-router'
import AppRoutes from './AppRoutes'

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnRouteChange />
      <AppRoutes />
    </BrowserRouter>
  )
}
