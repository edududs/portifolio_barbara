import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import AboutPage from '../pages/AboutPage'

describe('About page', () => {
  it('renders the editorial hero and approach content', () => {
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
    expect(
      screen.getByText('7 anos transformando conteúdo em conexão')
    ).toBeInTheDocument()
    expect(screen.getByText('Minha Abordagem')).toBeInTheDocument()
    expect(screen.getByText('Estratégia antes da execução')).toBeInTheDocument()
    expect(screen.getByText('Olhar editorial, resultado comercial')).toBeInTheDocument()
    expect(screen.getByText('Da captação à entrega final')).toBeInTheDocument()
  })
})
