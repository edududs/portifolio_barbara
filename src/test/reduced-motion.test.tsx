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
      'mailto:barbara@example.com'
    )
  })
})
