import { render, screen, within } from '@testing-library/react'
import App from '../App'

describe('Navigation and section anchors', () => {
  it('connects all primary links to section ids and keeps the contact CTA actionable', () => {
    render(<App />)

    const primaryNav = screen.getByRole('navigation', { name: 'Primária' })

    expect(within(primaryNav).getByRole('link', { name: 'Sobre' })).toHaveAttribute(
      'href',
      '#sobre'
    )
    expect(within(primaryNav).getByRole('link', { name: 'Serviços' })).toHaveAttribute(
      'href',
      '#servicos'
    )
    expect(within(primaryNav).getByRole('link', { name: 'Cases' })).toHaveAttribute(
      'href',
      '#cases'
    )
    expect(within(primaryNav).getByRole('link', { name: 'Contato' })).toHaveAttribute(
      'href',
      '#contato'
    )

    expect(document.getElementById('sobre')).toBeInTheDocument()
    expect(document.getElementById('servicos')).toBeInTheDocument()
    expect(document.getElementById('cases')).toBeInTheDocument()
    expect(document.getElementById('contato')).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Iniciar Conversa' })).toHaveAttribute(
      'href',
      'mailto:barbara@example.com'
    )
  })
})
