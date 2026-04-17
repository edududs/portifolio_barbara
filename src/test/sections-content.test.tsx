import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Main content sections', () => {
  it('renders services cards and about copy', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Como ajudo sua marca' })
    ).toBeInTheDocument()
    expect(screen.getByText('Curadoria Visual')).toBeInTheDocument()
    expect(screen.getByText('Pensamento Estratégico')).toBeInTheDocument()
    expect(screen.getByText('Execução Técnica')).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'A Curadora por Trás da Estratégia'
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Sou Barbara Fonseca, especialista em transformar marcas/i)
    ).toBeInTheDocument()
  })
})
