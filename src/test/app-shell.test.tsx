import { render, screen, within } from '@testing-library/react'
import App from '../App'

describe('App shell', () => {
  it('renders the hero content and primary navigation', () => {
    render(<App />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Barbara Fonseca' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Estética, Movimento, Estratégia.')
    ).toBeInTheDocument()

    const primaryNav = screen.getByRole('navigation', { name: 'Primária' })

    expect(within(primaryNav).getByRole('link', { name: 'Sobre' })).toHaveAttribute(
      'href',
      '#sobre'
    )
    expect(within(primaryNav).getByRole('link', { name: 'Serviços' })).toHaveAttribute(
      'href',
      '#servicos'
    )
    expect(
      screen.getByRole('button', { name: /veja meu trabalho/i })
    ).toBeInTheDocument()
  })
})
