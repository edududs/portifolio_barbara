import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import AppRoutes from '../AppRoutes'

describe('Navigation and routes', () => {
  it('links the primary Sobre navigation to the dedicated about route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    )

    const primaryNav = screen.getByRole('navigation', { name: 'Primária' })

    expect(within(primaryNav).getByRole('link', { name: 'Sobre' })).toHaveAttribute(
      'href',
      '/sobre'
    )
  })

  it('renders the about page route', () => {
    render(
      <MemoryRouter initialEntries={['/sobre']}>
        <AppRoutes />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /a curadora por trás da estratégia/i
      })
    ).toBeInTheDocument()
  })
})
