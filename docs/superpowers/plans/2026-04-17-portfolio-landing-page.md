# Portfólio Barbara Fonseca Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Figma portfolio as a React + Vite + TypeScript + Tailwind landing page with exact desktop fidelity and sensible tablet/mobile adaptations.

**Architecture:** Use a single-page React app with section components, centralized content data, local image assets downloaded from Figma, and a tiny shared UI layer for buttons/cards. Keep layout logic inside section components, use Tailwind tokens for exact desktop styling, and verify behavior with Vitest + React Testing Library before every production change.

**Tech Stack:** React, Vite, TypeScript, Tailwind CSS, Vitest, React Testing Library, jsdom

---

## File Map

### Root tooling
- Create: `package.json` — app scripts and dependencies
- Create: `tsconfig.json` — TypeScript configuration for app and tests
- Create: `vite.config.ts` — Vite + React plugin + Vitest config
- Create: `tailwind.config.js` — Tailwind theme extension for colors/fonts/sizes
- Create: `postcss.config.js` — Tailwind/PostCSS integration
- Create: `index.html` — Vite entry HTML with `lang="pt-BR"`

### App source
- Create: `src/main.tsx` — React entrypoint
- Create: `src/App.tsx` — page composition
- Create: `src/index.css` — font imports, tokens, base styles, Tailwind layers
- Create: `src/data/siteContent.ts` — navigation labels and section copy
- Create: `src/components/layout/Section.tsx` — shared width wrapper
- Create: `src/components/layout/SiteHeader.tsx` — desktop header + mobile nav
- Create: `src/components/layout/SiteFooter.tsx` — footer section
- Create: `src/components/ui/PrimaryButton.tsx` — CTA button component
- Create: `src/components/ui/ServiceCard.tsx` — services card component
- Create: `src/components/ui/SpecialtyCard.tsx` — specialties card component
- Create: `src/components/sections/HeroSection.tsx` — hero section
- Create: `src/components/sections/ServicesSection.tsx` — services section
- Create: `src/components/sections/AboutSection.tsx` — about section
- Create: `src/components/sections/SpecialtiesSection.tsx` — specialties section
- Create: `src/components/sections/CtaSection.tsx` — final CTA section

### Assets
- Create: `src/assets/hero-bg.jpg`
- Create: `src/assets/arrow-down.svg`
- Create: `src/assets/about-portrait.jpg`
- Create: `src/assets/specialty-fashion.jpg`
- Create: `src/assets/specialty-institutional.jpg`
- Create: `src/assets/arrow-right.svg`

### Tests
- Create: `src/test/setup.ts` — jest-dom setup
- Create: `src/test/app-shell.test.tsx` — app shell / hero tests
- Create: `src/test/sections-content.test.tsx` — services/about/specialties/footer content tests
- Create: `src/test/navigation.test.tsx` — anchor links and CTA targets

## Bootstrap Prerequisite (run once before Task 1)

These are setup-only files and dependency installs; do them before the first failing UI test.

```bash
cd /home/eduardo/Projects/workspace/projects/portifolio_babs
```

Create `package.json`:

```json
{
  "name": "portifolio_babs",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.10",
    "vitest": "^2.1.4"
  }
}
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src", "vite.config.ts", "tailwind.config.js"]
}
```

Create `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts'
  }
})
```

Create `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        lime: '#9CBD05',
        paper: '#F5F5F5',
        softWhite: '#FFFCFC',
        footerMuted: 'rgba(255,255,255,0.6)',
        footerBody: 'rgba(255,255,255,0.7)',
        footerFine: 'rgba(255,255,255,0.4)'
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        accent: ['Inter', 'sans-serif']
      },
      maxWidth: {
        shell: '1247px',
        content: '1175px'
      },
      letterSpacing: {
        display: '-0.025em'
      },
      boxShadow: {
        hero: 'inset 0 0 0 9999px rgba(0,0,0,0.22)'
      }
    }
  },
  plugins: []
}
```

Create `postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

Create `index.html`:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Barbara Fonseca</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom'
```

Install dependencies and create the directory skeleton:

```bash
npm install
mkdir -p src/assets src/components/layout src/components/sections src/components/ui src/data src/test
```

---

### Task 1: Build the shell, tokens, and exact hero section

**Files:**
- Create: `src/test/app-shell.test.tsx`
- Create: `src/data/siteContent.ts`
- Create: `src/components/layout/Section.tsx`
- Create: `src/components/layout/SiteHeader.tsx`
- Create: `src/components/ui/PrimaryButton.tsx`
- Create: `src/components/sections/HeroSection.tsx`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `src/assets/hero-bg.jpg`
- Create: `src/assets/arrow-down.svg`

- [ ] **Step 1: Write the failing test**

Create `src/test/app-shell.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
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
    expect(
      screen.getByRole('link', { name: 'Sobre' })
    ).toHaveAttribute('href', '#sobre')
    expect(
      screen.getByRole('link', { name: 'Serviços' })
    ).toHaveAttribute('href', '#servicos')
    expect(
      screen.getByRole('button', { name: /veja meu trabalho/i })
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:run -- src/test/app-shell.test.tsx
```

Expected: FAIL with an import error for `../App` or with missing hero text/landmarks.

- [ ] **Step 3: Write minimal implementation**

Download the hero assets:

```bash
curl -L "https://www.figma.com/api/mcp/asset/17be3512-15e7-4e2c-a4a3-9c08a03250fc" -o src/assets/hero-bg.jpg
curl -L "https://www.figma.com/api/mcp/asset/7df2da88-fc86-47d9-9ac4-13a6a18b76dc" -o src/assets/arrow-down.svg
```

Create `src/data/siteContent.ts`:

```ts
export const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Cases', href: '#cases' },
  { label: 'Contato', href: '#contato' }
] as const

export const heroContent = {
  brand: 'Barbara Fonseca',
  title: 'Barbara Fonseca',
  subtitle: 'Estética, Movimento, Estratégia.',
  cta: 'veja meu trabalho'
} as const
```

Create `src/components/layout/Section.tsx`:

```tsx
import { ReactNode } from 'react'

type SectionProps = {
  id?: string
  className?: string
  children: ReactNode
}

export function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto w-full max-w-content px-6 md:px-10 xl:px-16">
        {children}
      </div>
    </section>
  )
}
```

Create `src/components/ui/PrimaryButton.tsx`:

```tsx
import { ButtonHTMLAttributes } from 'react'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function PrimaryButton({ className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`inline-flex h-14 items-center justify-center bg-lime px-10 font-body text-base font-semibold tracking-[0.025em] text-softWhite transition hover:brightness-95 ${className}`}
      {...props}
    />
  )
}
```

Create `src/components/layout/SiteHeader.tsx`:

```tsx
import { navItems } from '../../data/siteContent'

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-20 w-full max-w-shell items-center justify-between px-6 md:px-10 xl:px-16">
        <a
          href="#topo"
          className="font-heading text-xl font-bold tracking-[-0.025em] text-[#FFF4F4]"
        >
          Barbara Fonseca
        </a>

        <nav aria-label="Primária" className="hidden gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body text-sm font-medium tracking-[0.025em] text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

Create `src/components/sections/HeroSection.tsx`:

```tsx
import heroBackground from '../../assets/hero-bg.jpg'
import arrowDown from '../../assets/arrow-down.svg'
import { heroContent } from '../../data/siteContent'
import { SiteHeader } from '../layout/SiteHeader'
import { PrimaryButton } from '../ui/PrimaryButton'

export function HeroSection() {
  return (
    <section
      id="topo"
      className="relative min-h-[743px] bg-cover bg-center text-white shadow-hero"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <SiteHeader />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto flex min-h-[743px] max-w-shell flex-col items-center justify-center px-6 text-center md:px-10 xl:px-16">
        <h1 className="font-heading text-[56px] font-bold leading-none tracking-display text-white md:text-[72px] xl:text-[96px]">
          {heroContent.title}
        </h1>
        <p className="mt-6 font-heading text-[24px] font-normal text-white/90 md:text-[28px] xl:text-[36px]">
          {heroContent.subtitle}
        </p>
        <PrimaryButton className="mt-16 w-[225px]">{heroContent.cta}</PrimaryButton>
        <img
          src={arrowDown}
          alt=""
          aria-hidden="true"
          className="mt-40 h-8 w-8"
        />
      </div>
    </section>
  )
}
```

Create `src/App.tsx`:

```tsx
import { HeroSection } from './components/sections/HeroSection'

export default function App() {
  return (
    <>
      <HeroSection />
      <main />
    </>
  )
}
```

Create `src/main.tsx`:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

Create `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Inter:wght@400&family=Syne:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color: #0a0a0a;
  background-color: #ffffff;
  font-family: 'DM Sans', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: #ffffff;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  border: 0;
  cursor: pointer;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm run test:run -- src/test/app-shell.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json tsconfig.json vite.config.ts tailwind.config.js postcss.config.js index.html src/main.tsx src/App.tsx src/index.css src/data/siteContent.ts src/components/layout/Section.tsx src/components/layout/SiteHeader.tsx src/components/ui/PrimaryButton.tsx src/components/sections/HeroSection.tsx src/assets/hero-bg.jpg src/assets/arrow-down.svg src/test/setup.ts src/test/app-shell.test.tsx
git commit -m "feat: add portfolio hero shell"
```

### Task 2: Build services and about sections

**Files:**
- Modify: `src/data/siteContent.ts`
- Modify: `src/App.tsx`
- Create: `src/components/ui/ServiceCard.tsx`
- Create: `src/components/sections/ServicesSection.tsx`
- Create: `src/components/sections/AboutSection.tsx`
- Create: `src/assets/about-portrait.jpg`
- Create: `src/test/sections-content.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/test/sections-content.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:run -- src/test/sections-content.test.tsx
```

Expected: FAIL because the services/about headings and copy do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Download the about portrait:

```bash
curl -L "https://www.figma.com/api/mcp/asset/44a3ba78-e641-4807-a7bf-fd4c1ce10016" -o src/assets/about-portrait.jpg
```

Update `src/data/siteContent.ts`:

```ts
export const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Cases', href: '#cases' },
  { label: 'Contato', href: '#contato' }
] as const

export const heroContent = {
  brand: 'Barbara Fonseca',
  title: 'Barbara Fonseca',
  subtitle: 'Estética, Movimento, Estratégia.',
  cta: 'veja meu trabalho'
} as const

export const serviceCards = [
  {
    title: 'Curadoria Visual',
    body: 'Cada detalhe conta. Transformo conceitos abstratos em narrativas visuais coesas que capturam a essência da sua marca e criam conexão emocional com seu público.'
  },
  {
    title: 'Pensamento Estratégico',
    body: 'Beleza que performa. Uno estética refinada a estratégia de negócio, garantindo que cada escolha visual trabalhe a favor dos seus objetivos comerciais.'
  },
  {
    title: 'Execução Técnica',
    body: 'Da ideia à implementação. Domínio completo das ferramentas e plataformas necessárias para dar vida a projetos complexos com excelência técnica e criativa.'
  }
] as const

export const aboutContent = {
  title: 'A Curadora por Trás da Estratégia',
  paragraphs: [
    'Sou Barbara Fonseca, especialista em transformar marcas através da interseção entre estética refinada e estratégia comercial inteligente.',
    'Com anos de experiência em curadoria visual e marketing digital, desenvolvi uma abordagem única que combina sensibilidade artística com métricas de performance. Acredito que beleza e resultados não são excludentes — são complementares.',
    'Meu trabalho vai além do superficial. Cada projeto é uma oportunidade de criar narrativas visuais que não apenas encantam, mas convertem. É sobre entender profundamente sua marca, seu público e seus objetivos para criar experiências que deixam marca.'
  ]
} as const
```

Create `src/components/ui/ServiceCard.tsx`:

```tsx
type ServiceCardProps = {
  title: string
  body: string
}

export function ServiceCard({ title, body }: ServiceCardProps) {
  return (
    <article className="min-h-[292px] border border-black/10 bg-lime px-10 py-10 text-white">
      <h3 className="font-heading text-2xl font-bold leading-8">{title}</h3>
      <p className="mt-10 max-w-[288px] font-body text-base leading-[1.625] text-white">
        {body}
      </p>
    </article>
  )
}
```

Create `src/components/sections/ServicesSection.tsx`:

```tsx
import { serviceCards } from '../../data/siteContent'
import { Section } from '../layout/Section'
import { ServiceCard } from '../ui/ServiceCard'

export function ServicesSection() {
  return (
    <Section id="servicos" className="bg-white py-24 xl:py-28">
      <h2 className="text-center font-heading text-4xl font-bold text-ink md:text-5xl">
        Como ajudo sua marca
      </h2>

      <div className="mt-14 grid gap-8 xl:grid-cols-3 xl:gap-8">
        {serviceCards.map((card) => (
          <ServiceCard key={card.title} title={card.title} body={card.body} />
        ))}
      </div>
    </Section>
  )
}
```

Create `src/components/sections/AboutSection.tsx`:

```tsx
import portrait from '../../assets/about-portrait.jpg'
import { aboutContent } from '../../data/siteContent'
import { Section } from '../layout/Section'

export function AboutSection() {
  return (
    <Section id="sobre" className="bg-white py-20 xl:py-28">
      <div className="grid items-center gap-10 xl:grid-cols-[1fr_555px] xl:gap-8">
        <div>
          <h2 className="max-w-[556px] font-heading text-4xl font-bold leading-tight text-ink md:text-5xl xl:text-[48px] xl:leading-[48px]">
            {aboutContent.title}
          </h2>

          <div className="mt-8 space-y-6">
            {aboutContent.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[556px] font-body text-base leading-8 text-ink"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="overflow-hidden bg-paper">
          <img
            src={portrait}
            alt="Barbara Fonseca"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </div>
      </div>
    </Section>
  )
}
```

Update `src/App.tsx`:

```tsx
import { AboutSection } from './components/sections/AboutSection'
import { HeroSection } from './components/sections/HeroSection'
import { ServicesSection } from './components/sections/ServicesSection'

export default function App() {
  return (
    <>
      <HeroSection />
      <main>
        <ServicesSection />
        <AboutSection />
      </main>
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm run test:run -- src/test/sections-content.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/data/siteContent.ts src/components/ui/ServiceCard.tsx src/components/sections/ServicesSection.tsx src/components/sections/AboutSection.tsx src/assets/about-portrait.jpg src/test/sections-content.test.tsx
git commit -m "feat: add services and about sections"
```

### Task 3: Build specialties, CTA, and footer

**Files:**
- Modify: `src/data/siteContent.ts`
- Modify: `src/App.tsx`
- Create: `src/components/ui/SpecialtyCard.tsx`
- Create: `src/components/sections/SpecialtiesSection.tsx`
- Create: `src/components/sections/CtaSection.tsx`
- Create: `src/components/layout/SiteFooter.tsx`
- Create: `src/assets/specialty-fashion.jpg`
- Create: `src/assets/specialty-institutional.jpg`
- Create: `src/assets/arrow-right.svg`
- Modify: `src/test/sections-content.test.tsx`

- [ ] **Step 1: Write the failing test**

Replace `src/test/sections-content.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Main content sections', () => {
  it('renders services, about, specialties, CTA, and footer content', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Como ajudo sua marca' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'A Curadora por Trás da Estratégia'
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Especialização' })
    ).toBeInTheDocument()
    expect(screen.getByText('Moda & Lifestyle')).toBeInTheDocument()
    expect(screen.getByText('Institucional')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Pronto para elevar sua marca?'
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Curadora Estratégica')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      '#contato'
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:run -- src/test/sections-content.test.tsx
```

Expected: FAIL because specialties, CTA, and footer are missing.

- [ ] **Step 3: Write minimal implementation**

Download the remaining assets:

```bash
curl -L "https://www.figma.com/api/mcp/asset/23995173-0683-450c-a63b-67fb72191366" -o src/assets/specialty-fashion.jpg
curl -L "https://www.figma.com/api/mcp/asset/214fa72d-14fe-4408-ab2c-55700deca726" -o src/assets/specialty-institutional.jpg
curl -L "https://www.figma.com/api/mcp/asset/f28ab95f-1408-4bd4-9591-9972f266fc6e" -o src/assets/arrow-right.svg
```

Update `src/data/siteContent.ts`:

```ts
export const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Cases', href: '#cases' },
  { label: 'Contato', href: '#contato' }
] as const

export const heroContent = {
  brand: 'Barbara Fonseca',
  title: 'Barbara Fonseca',
  subtitle: 'Estética, Movimento, Estratégia.',
  cta: 'veja meu trabalho'
} as const

export const serviceCards = [
  {
    title: 'Curadoria Visual',
    body: 'Cada detalhe conta. Transformo conceitos abstratos em narrativas visuais coesas que capturam a essência da sua marca e criam conexão emocional com seu público.'
  },
  {
    title: 'Pensamento Estratégico',
    body: 'Beleza que performa. Uno estética refinada a estratégia de negócio, garantindo que cada escolha visual trabalhe a favor dos seus objetivos comerciais.'
  },
  {
    title: 'Execução Técnica',
    body: 'Da ideia à implementação. Domínio completo das ferramentas e plataformas necessárias para dar vida a projetos complexos com excelência técnica e criativa.'
  }
] as const

export const aboutContent = {
  title: 'A Curadora por Trás da Estratégia',
  paragraphs: [
    'Sou Barbara Fonseca, especialista em transformar marcas através da interseção entre estética refinada e estratégia comercial inteligente.',
    'Com anos de experiência em curadoria visual e marketing digital, desenvolvi uma abordagem única que combina sensibilidade artística com métricas de performance. Acredito que beleza e resultados não são excludentes — são complementares.',
    'Meu trabalho vai além do superficial. Cada projeto é uma oportunidade de criar narrativas visuais que não apenas encantam, mas convertem. É sobre entender profundamente sua marca, seu público e seus objetivos para criar experiências que deixam marca.'
  ]
} as const

export const specialties = [
  {
    title: 'Moda & Lifestyle',
    body: 'Narrativas que transformam peças em desejo e lifestyle em experiência de marca.',
    image: 'fashion'
  },
  {
    title: 'Institucional',
    body: 'Humanização de marcas através de storytelling autêntico, direção visual e posicionamento claro.',
    image: 'institutional'
  }
] as const

export const ctaContent = {
  title: 'Pronto para elevar sua marca?',
  body: 'Vamos conversar sobre como transformar sua visão em uma presença visual memorável e estratégica.',
  action: 'Iniciar Conversa'
} as const
```

Create `src/components/ui/SpecialtyCard.tsx`:

```tsx
type SpecialtyCardProps = {
  title: string
  body: string
  imageSrc: string
}

export function SpecialtyCard({ title, body, imageSrc }: SpecialtyCardProps) {
  return (
    <article className="max-w-[285px]">
      <div className="h-[380px] overflow-hidden bg-paper">
        <img src={imageSrc} alt="" aria-hidden="true" className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-4 font-heading text-[32px] font-bold leading-none text-ink">
        {title}
      </h3>
      <p className="mt-4 font-body text-base leading-[1.625] text-ink">{body}</p>
    </article>
  )
}
```

Create `src/components/sections/SpecialtiesSection.tsx`:

```tsx
import fashionImage from '../../assets/specialty-fashion.jpg'
import institutionalImage from '../../assets/specialty-institutional.jpg'
import { specialties } from '../../data/siteContent'
import { Section } from '../layout/Section'
import { SpecialtyCard } from '../ui/SpecialtyCard'

const specialtyImages = {
  fashion: fashionImage,
  institutional: institutionalImage
}

export function SpecialtiesSection() {
  return (
    <Section id="cases" className="bg-white py-24 xl:py-28">
      <h2 className="text-center font-heading text-4xl font-bold text-ink md:text-5xl">
        Especialização
      </h2>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:justify-items-center">
        {specialties.map((specialty) => (
          <SpecialtyCard
            key={specialty.title}
            title={specialty.title}
            body={specialty.body}
            imageSrc={specialtyImages[specialty.image]}
          />
        ))}
      </div>
    </Section>
  )
}
```

Create `src/components/sections/CtaSection.tsx`:

```tsx
import arrowRight from '../../assets/arrow-right.svg'
import { ctaContent } from '../../data/siteContent'
import { Section } from '../layout/Section'

export function CtaSection() {
  return (
    <Section id="contato" className="bg-white py-24 text-center xl:py-28">
      <h2 className="font-heading text-4xl font-bold text-ink md:text-5xl">
        {ctaContent.title}
      </h2>
      <p className="mx-auto mt-4 max-w-[599px] font-body text-base leading-8 text-ink">
        {ctaContent.body}
      </p>
      <a
        href="mailto:barbara@example.com"
        className="mx-auto mt-14 inline-flex h-[60px] items-center gap-4 bg-black px-10 font-accent text-sm tracking-[0.025em] text-white"
      >
        <span>{ctaContent.action}</span>
        <img src={arrowRight} alt="" aria-hidden="true" className="h-4 w-4" />
      </a>
    </Section>
  )
}
```

Create `src/components/layout/SiteFooter.tsx`:

```tsx
import { navItems } from '../../data/siteContent'

export function SiteFooter() {
  return (
    <footer className="bg-black pb-16 pt-20 text-white">
      <div className="mx-auto max-w-content px-6 md:px-10 xl:px-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="max-w-[360px]">
            <h2 className="font-heading text-2xl font-bold">Curadora Estratégica</h2>
            <p className="mt-4 font-body text-sm leading-[1.625] text-footerBody">
              Transformo marcas em experiências visuais memoráveis através de estratégia, estética e execução impecável.
            </p>
          </div>

          <div className="md:justify-self-center">
            <h3 className="font-body text-sm font-semibold tracking-[0.025em] text-white">
              Navegação
            </h3>
            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="font-body text-sm text-footerMuted">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:justify-self-end md:text-right">
            <h3 className="font-body text-sm font-semibold tracking-[0.025em] text-white">
              Social
            </h3>
            <a href="#contato" className="mt-4 inline-block font-body text-sm text-footerMuted">
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center font-body text-xs text-footerFine">
          © 2026 Barbara Fonseca. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
```

Update `src/App.tsx`:

```tsx
import { SiteFooter } from './components/layout/SiteFooter'
import { AboutSection } from './components/sections/AboutSection'
import { CtaSection } from './components/sections/CtaSection'
import { HeroSection } from './components/sections/HeroSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { SpecialtiesSection } from './components/sections/SpecialtiesSection'

export default function App() {
  return (
    <>
      <HeroSection />
      <main>
        <ServicesSection />
        <AboutSection />
        <SpecialtiesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm run test:run -- src/test/sections-content.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/data/siteContent.ts src/components/ui/SpecialtyCard.tsx src/components/sections/SpecialtiesSection.tsx src/components/sections/CtaSection.tsx src/components/layout/SiteFooter.tsx src/assets/specialty-fashion.jpg src/assets/specialty-institutional.jpg src/assets/arrow-right.svg src/test/sections-content.test.tsx
git commit -m "feat: add specialties cta and footer"
```

### Task 4: Lock in anchor behavior and responsive adaptations

**Files:**
- Create: `src/test/navigation.test.tsx`
- Modify: `src/components/layout/SiteHeader.tsx`
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/components/sections/ServicesSection.tsx`
- Modify: `src/components/sections/SpecialtiesSection.tsx`
- Modify: `src/components/sections/CtaSection.tsx`
- Modify: `src/components/layout/SiteFooter.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Write the failing test**

Create `src/test/navigation.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Navigation and section anchors', () => {
  it('connects all primary links to section ids and keeps the contact CTA actionable', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '#sobre')
    expect(screen.getByRole('link', { name: 'Serviços' })).toHaveAttribute('href', '#servicos')
    expect(screen.getByRole('link', { name: 'Cases' })).toHaveAttribute('href', '#cases')
    expect(screen.getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '#contato')

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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:run -- src/test/navigation.test.tsx
```

Expected: FAIL if any section ids or CTA link targets are missing/inconsistent.

- [ ] **Step 3: Write minimal implementation**

Update `src/components/layout/SiteHeader.tsx`:

```tsx
import { useState } from 'react'
import { navItems } from '../../data/siteContent'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-20 w-full max-w-shell items-center justify-between px-6 md:px-10 xl:px-16">
        <a
          href="#topo"
          className="font-heading text-xl font-bold tracking-[-0.025em] text-[#FFF4F4]"
        >
          Barbara Fonseca
        </a>

        <button
          type="button"
          className="font-body text-sm font-semibold uppercase tracking-[0.08em] text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          Menu
        </button>

        <nav aria-label="Primária" className="hidden gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body text-sm font-medium tracking-[0.025em] text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="Primária mobile"
          className="mx-6 mt-3 rounded bg-black/80 p-4 backdrop-blur md:hidden"
        >
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-body text-sm font-medium tracking-[0.025em] text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
```

Update `src/components/sections/HeroSection.tsx` so the CTA scrolls to services:

```tsx
import heroBackground from '../../assets/hero-bg.jpg'
import arrowDown from '../../assets/arrow-down.svg'
import { heroContent } from '../../data/siteContent'
import { SiteHeader } from '../layout/SiteHeader'
import { PrimaryButton } from '../ui/PrimaryButton'

export function HeroSection() {
  return (
    <section
      id="topo"
      className="relative min-h-[743px] bg-cover bg-center text-white shadow-hero"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <SiteHeader />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto flex min-h-[743px] max-w-shell flex-col items-center justify-center px-6 text-center md:px-10 xl:px-16">
        <h1 className="font-heading text-[56px] font-bold leading-none tracking-display text-white md:text-[72px] xl:text-[96px]">
          {heroContent.title}
        </h1>
        <p className="mt-6 font-heading text-[24px] font-normal text-white/90 md:text-[28px] xl:text-[36px]">
          {heroContent.subtitle}
        </p>
        <a href="#cases" className="mt-16 inline-flex">
          <PrimaryButton className="w-[225px]">{heroContent.cta}</PrimaryButton>
        </a>
        <img
          src={arrowDown}
          alt=""
          aria-hidden="true"
          className="mt-24 h-8 w-8 md:mt-32 xl:mt-40"
        />
      </div>
    </section>
  )
}
```

Update `src/index.css` with desktop-fidelity helpers:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Inter:wght@400&family=Syne:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color: #0a0a0a;
  background-color: #ffffff;
  font-family: 'DM Sans', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: #ffffff;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  border: 0;
  cursor: pointer;
}

@media (min-width: 1280px) {
  html {
    background: #ffffff;
  }

  body {
    min-height: 100vh;
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:

```bash
npm run test:run -- src/test/navigation.test.tsx src/test/app-shell.test.tsx src/test/sections-content.test.tsx
```

Expected: PASS for all three files.

- [ ] **Step 5: Commit**

```bash
git add src/test/navigation.test.tsx src/components/layout/SiteHeader.tsx src/components/sections/HeroSection.tsx src/index.css
git commit -m "feat: add anchors and responsive navigation"
```

### Task 5: Run full verification and do the final desktop fidelity pass

**Files:**
- Modify as needed after visual diff: `src/index.css`, `src/components/sections/HeroSection.tsx`, `src/components/sections/ServicesSection.tsx`, `src/components/sections/AboutSection.tsx`, `src/components/sections/SpecialtiesSection.tsx`, `src/components/sections/CtaSection.tsx`, `src/components/layout/SiteFooter.tsx`
- Test: `src/test/app-shell.test.tsx`, `src/test/sections-content.test.tsx`, `src/test/navigation.test.tsx`

- [ ] **Step 1: Write the failing test**

If any exact-copy mismatch is discovered while comparing to Figma, capture it in the nearest existing test before changing production code. Example for a missing CTA label regression:

```tsx
expect(screen.getByRole('link', { name: 'Iniciar Conversa' })).toBeInTheDocument()
```

Put the new assertion in the smallest existing test file that covers the affected section.

- [ ] **Step 2: Run test to verify it fails**

Run the smallest affected test file first. Example:

```bash
npm run test:run -- src/test/sections-content.test.tsx
```

Expected: FAIL with the exact missing text/behavior you observed.

- [ ] **Step 3: Write minimal implementation**

Run the app locally and compare against the Figma file at desktop width first, then tablet/mobile:

```bash
npm run dev
```

Use this manual checklist while making the smallest possible edits:

```text
Desktop (must match Figma exactly):
- Hero height reads like the Figma frame
- Hero heading uses Syne with the same visual dominance
- Subtitle sits at the same visual distance below the title
- CTA width/height/color match the Figma button
- Services cards keep the same lime fill, spacing, and text rhythm
- About section matches the Figma two-column balance
- Specialty cards preserve image crop and caption spacing
- Footer background, muted text colors, and column spacing match the file

Tablet/mobile (implementation judgment allowed):
- No overlapping text
- Navigation remains usable
- Cards stack cleanly
- CTA stays prominent
- Footer columns collapse legibly
```

When you change code, keep edits local to the section being corrected.

- [ ] **Step 4: Run all verification commands**

Run:

```bash
npm run test:run
npm run build
```

Expected:
- `npm run test:run` → all tests PASS
- `npm run build` → Vite build succeeds with no TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add src package.json tsconfig.json vite.config.ts tailwind.config.js postcss.config.js index.html
git commit -m "feat: finish figma-accurate portfolio landing page"
```

## Spec Coverage Check
- Exact desktop fidelity: covered by Task 1 hero build, Tasks 2-3 content sections, and Task 5 desktop checklist.
- Tablet/mobile adaptations: covered by responsive classes in Tasks 2-4 and validation in Task 5.
- Single-page anchors: covered by Task 4.
- Tailwind styling: covered by bootstrap plus all section/component tasks.
- No unnecessary libraries: only React/Vite/TypeScript/Tailwind plus test tooling required for TDD are included.

## Self-Review
- No `TODO`, `TBD`, or “implement later” placeholders remain.
- File names and component names are consistent across tasks.
- Every feature in the spec maps to at least one task.
- The only extra libraries beyond the approved base stack are the test dependencies required to follow TDD: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom`.
