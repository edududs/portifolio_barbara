import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { viewportAmount } from '../lib/motion'
import App from '../App'

const matchMediaMock = vi.fn()

function createMatchMedia(matches: boolean) {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
}

describe('Reduced motion support', () => {
  beforeEach(() => {
    matchMediaMock.mockReset()
    window.matchMedia = createMatchMedia(true)
  })

  it('renders the page when reduced motion is enabled', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Barbara Fonseca' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Especialização' })
    ).toBeInTheDocument()
  })

  it('returns viewport-safe values for reduced and full motion modes', () => {
    expect(viewportAmount(true)).toEqual({ once: true, amount: 0 })
    expect(viewportAmount(false)).toEqual({ once: true, amount: 0.2 })
  })

  it('keeps the final contact action available under reduced motion', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Pronto para elevar sua marca?' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Iniciar Conversa' })).toHaveAttribute(
      'href',
      'https://wa.me/5561985341091?text=Ol%C3%A1%20Barbara!%20Vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F'
    )
  })
})
