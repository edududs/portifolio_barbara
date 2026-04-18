import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import HomePage from '../pages/HomePage'

describe('Home page content', () => {
  it('renders the landing sections without the old about section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Como ajudo sua marca' })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', {
        level: 2,
        name: 'A Curadora por Trás da Estratégia'
      })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Especialização' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Pronto para elevar sua marca?'
      })
    ).toBeInTheDocument()
  })
})
