import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import AboutPage from '../pages/AboutPage'

describe('About page', () => {
  it('renders the editorial hero, approach content, and principles section', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'A Curadora por Trás da Estratégia'
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Minha Abordagem')).toBeInTheDocument()
    expect(screen.getByText('Meus Princípios')).toBeInTheDocument()
    expect(screen.getByText('Intencionalidade')).toBeInTheDocument()
    expect(screen.getByText('Excelência Estética')).toBeInTheDocument()
    expect(screen.getByText('Resultados Mensuráveis')).toBeInTheDocument()
    expect(screen.getByText('Curadora Estratégica')).toBeInTheDocument()
  })
})
