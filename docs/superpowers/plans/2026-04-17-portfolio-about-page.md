# Portfolio About Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated `/sobre` page based on the updated Figma file, remove the old About section from the landing page, and wire navigation so the site reflects the new information architecture.

**Architecture:** Introduce lightweight client-side routing with React Router, split the current single-page app into a landing route and a dedicated about route, and build the new about page from focused sections that reuse the existing site header/footer and motion language. Keep the landing page intact except for removing the old About section and updating the “Sobre” navigation destination.

**Tech Stack:** React, Vite, TypeScript, Tailwind CSS, Motion for React, React Router, Vitest, React Testing Library, Yarn

---

## File Map

### Routing and app composition
- Modify: `package.json` — add React Router dependency
- Modify: `yarn.lock` — lock the router dependency
- Modify: `src/main.tsx` — wrap the app with `BrowserRouter`
- Create: `src/AppRoutes.tsx` — route definitions for `/` and `/sobre`
- Create: `src/pages/HomePage.tsx` — current landing composition without the old About section
- Create: `src/pages/AboutPage.tsx` — new dedicated about page composition

### Shared layout and navigation
- Modify: `src/components/layout/SiteHeader.tsx` — support page-aware link targets and route navigation
- Modify: `src/components/layout/SiteFooter.tsx` — ensure “Sobre” points to `/sobre` and other links stay coherent
- Modify: `src/data/siteContent.ts` — split landing navigation data from shared about-page content

### Landing page cleanup
- Remove from use: `src/components/sections/AboutSection.tsx` from the landing route composition (file can remain if it is no longer imported, unless safely removable)

### About page sections
- Create: `src/components/about/AboutHeroSection.tsx`
- Create: `src/components/about/AboutEditorialSection.tsx`
- Create: `src/components/about/AboutApproachSection.tsx`
- Create: `src/components/about/AboutPrinciplesSection.tsx`
- Create: `src/components/about/AboutPrincipleCard.tsx`

### About page data and assets
- Modify: `src/data/siteContent.ts` — add about-page content structures
- Create: `src/assets/about-page-editorial.jpg` — download the editorial portrait/image from Figma

### Tests
- Modify: `src/test/navigation.test.tsx` — cover route navigation for `/sobre`
- Modify: `src/test/sections-content.test.tsx` — stop expecting the old About section on the landing route
- Create: `src/test/about-page.test.tsx` — verify new about page content

## Task 1: Add routing and split the landing page from the new about page

**Files:**
- Modify: `package.json`
- Modify: `yarn.lock`
- Modify: `src/main.tsx`
- Create: `src/AppRoutes.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/AboutPage.tsx`
- Modify: `src/test/navigation.test.tsx`

- [ ] **Step 1: Write the failing test**

Replace `src/test/navigation.test.tsx` with:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
yarn test:run src/test/navigation.test.tsx
```

Expected: FAIL because `AppRoutes` does not exist yet and the current navigation still uses in-page anchors.

- [ ] **Step 3: Write minimal implementation**

Update `package.json` dependencies to include React Router:

```json
{
  "dependencies": {
    "motion": "^11.11.17",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router": "^7.6.2"
  }
}
```

Install dependencies:

```bash
yarn install
```

Create `src/pages/HomePage.tsx`:

```tsx
import { SiteFooter } from '../components/layout/SiteFooter'
import { CtaSection } from '../components/sections/CtaSection'
import { HeroSection } from '../components/sections/HeroSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { SpecialtiesSection } from '../components/sections/SpecialtiesSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main>
        <ServicesSection />
        <SpecialtiesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
```

Create `src/pages/AboutPage.tsx`:

```tsx
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <section className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        <h1 className="font-heading text-5xl font-bold text-ink">
          A Curadora por Trás da Estratégia
        </h1>
      </section>
    </main>
  )
}
```

Create `src/AppRoutes.tsx`:

```tsx
import { Route, Routes } from 'react-router'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sobre" element={<AboutPage />} />
    </Routes>
  )
}
```

Update `src/main.tsx`:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import AppRoutes from './AppRoutes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
yarn test:run src/test/navigation.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock src/main.tsx src/AppRoutes.tsx src/pages/HomePage.tsx src/pages/AboutPage.tsx src/test/navigation.test.tsx
git commit -m "feat: add routing for portfolio pages"
```

## Task 2: Update navigation and content data for the new About information architecture

**Files:**
- Modify: `src/components/layout/SiteHeader.tsx`
- Modify: `src/components/layout/SiteFooter.tsx`
- Modify: `src/data/siteContent.ts`
- Modify: `src/test/sections-content.test.tsx`
- Modify: `src/test/navigation.test.tsx`

- [ ] **Step 1: Write the failing test**

Replace `src/test/sections-content.test.tsx` with:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
yarn test:run src/test/sections-content.test.tsx
```

Expected: FAIL because the current landing composition still includes the old About section or because the route-aware home page wiring is incomplete.

- [ ] **Step 3: Write minimal implementation**

Update `src/data/siteContent.ts` to make “Sobre” route-based and add about-page content:

```ts
export const navItems = [
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Cases', href: '/#cases' },
  { label: 'Contato', href: '/#contato' }
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

export const aboutPageHeroContent = {
  title: 'A Curadora por Trás da Estratégia',
  eyebrow: '7 anos transformando conteúdo em conexão'
} as const

export const aboutPageEditorialContent = [
  'Sou Barbara Fonseca, especialista em transformar marcas através da interseção entre estética refinada e estratégia comercial inteligente.',
  'Com 7 anos de experiência em curadoria visual e marketing digital, desenvolvi uma abordagem única que combina sensibilidade artística com métricas de performance. Acredito que beleza e resultados não são excludentes — são complementares.',
  'Meu trabalho vai além do superficial. Cada projeto é uma oportunidade de criar narrativas visuais que não apenas encantam, mas convertem. É sobre entender profundamente sua marca, seu público e seus objetivos para criar experiências que deixam marca.'
] as const

export const aboutApproachSections = [
  {
    title: 'Estratégia antes da execução',
    body: 'Antes de ligar a câmera, eu entendo seu negócio. Seu público. Seus objetivos. Cada peça de conteúdo nasce de um briefing estratégico que une SEO, narrativa de marca e objetivos comerciais.'
  },
  {
    title: 'Olhar editorial, resultado comercial',
    body: 'Minha formação em curadoria visual me permite criar conteúdo que compete com grandes marcas globais. Mas meu foco está nos números: engajamento, conversão, ROI. Beleza que performa.'
  },
  {
    title: 'Da captação à entrega final',
    body: 'Domínio técnico completo: conceitualização, direção de fotografia, captação, edição, pós-produção e copy estratégico. Você trabalha com uma profissional, não com uma equipe fragmentada.'
  }
] as const

export const aboutPrinciples = [
  {
    title: 'Intencionalidade',
    body: 'Humanização de marcas através de storytelling autêntico, direção visual e escolhas guiadas por propósito.'
  },
  {
    title: 'Excelência Estética',
    body: 'Refinamento visual para que cada peça comunique valor, posicionamento e desejo com clareza.'
  },
  {
    title: 'Resultados Mensuráveis',
    body: 'Conteúdo bonito não basta. Cada entrega precisa fortalecer percepção, engajamento e conversão.'
  }
] as const
```

Update `src/components/layout/SiteHeader.tsx`:

```tsx
import { useState } from 'react'
import { Link } from 'react-router'
import { navItems } from '../../data/siteContent'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-20 w-full max-w-shell items-center justify-between px-6 md:px-10 xl:px-16">
        <Link
          to="/"
          className="font-heading text-xl font-bold tracking-[-0.025em] text-[#FFF4F4]"
        >
          Barbara Fonseca
        </Link>

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
            <Link
              key={item.href}
              to={item.href}
              className="font-body text-sm font-medium tracking-[0.025em] text-white"
            >
              {item.label}
            </Link>
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
                <Link
                  to={item.href}
                  className="font-body text-sm font-medium tracking-[0.025em] text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
```

Update `src/components/layout/SiteFooter.tsx` similarly, replacing anchor usage with `Link` from `react-router` for internal navigation.

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
yarn test:run src/test/sections-content.test.tsx src/test/navigation.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/SiteHeader.tsx src/components/layout/SiteFooter.tsx src/data/siteContent.ts src/test/sections-content.test.tsx src/test/navigation.test.tsx
git commit -m "feat: update navigation for dedicated about page"
```

## Task 3: Build the main editorial content of the About page

**Files:**
- Create: `src/components/about/AboutHeroSection.tsx`
- Create: `src/components/about/AboutEditorialSection.tsx`
- Create: `src/components/about/AboutApproachSection.tsx`
- Create: `src/assets/about-page-editorial.jpg`
- Modify: `src/pages/AboutPage.tsx`
- Create: `src/test/about-page.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/test/about-page.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
yarn test:run src/test/about-page.test.tsx
```

Expected: FAIL because the about page currently only renders a placeholder heading.

- [ ] **Step 3: Write minimal implementation**

Download the about-page editorial asset:

```bash
curl -L "https://www.figma.com/api/mcp/asset/f1b897db-5fd4-4bb5-952d-7d7407366cfc" -o src/assets/about-page-editorial.jpg
```

Create `src/components/about/AboutHeroSection.tsx`:

```tsx
import { motion } from 'motion/react'
import { aboutPageHeroContent } from '../../data/siteContent'
import { baseEase } from '../../lib/motion'
import { SiteHeader } from '../layout/SiteHeader'

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-6 text-ink">
      <SiteHeader />

      <div className="mx-auto flex min-h-[703px] max-w-shell flex-col justify-center px-6 pt-24 md:px-10 xl:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: baseEase }}
          className="max-w-[916px] font-heading text-[64px] font-bold leading-[0.95] tracking-display text-ink md:text-[88px] xl:text-[96px]"
        >
          {aboutPageHeroContent.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: baseEase }}
          className="mt-8 max-w-[711px] font-heading text-[28px] font-normal leading-10 text-ink/90 md:text-[32px] xl:text-[36px]"
        >
          {aboutPageHeroContent.eyebrow}
        </motion.p>
      </div>
    </section>
  )
}
```

Create `src/components/about/AboutEditorialSection.tsx`:

```tsx
import { motion } from 'motion/react'
import editorialImage from '../../assets/about-page-editorial.jpg'
import { aboutPageEditorialContent } from '../../data/siteContent'
import { baseEase } from '../../lib/motion'

export function AboutEditorialSection() {
  return (
    <section className="bg-white py-16 xl:py-20">
      <div className="mx-auto grid max-w-shell gap-10 px-6 md:px-10 xl:grid-cols-[555px_523px] xl:items-start xl:gap-10 xl:px-16">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: baseEase }}
          className="space-y-10"
        >
          {aboutPageEditorialContent.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[519px] font-body text-lg leading-8 text-ink"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.06, ease: baseEase }}
          className="overflow-hidden"
        >
          <img
            src={editorialImage}
            alt="Barbara Fonseca em retrato editorial"
            className="h-full min-h-[560px] w-full object-cover xl:h-[685px]"
          />
        </motion.div>
      </div>
    </section>
  )
}
```

Create `src/components/about/AboutApproachSection.tsx`:

```tsx
import { motion } from 'motion/react'
import { aboutApproachSections } from '../../data/siteContent'
import { baseEase, cardReveal, staggerContainer } from '../../lib/motion'

export function AboutApproachSection() {
  return (
    <section className="bg-white py-20 xl:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: baseEase }}
          className="font-heading text-[56px] font-bold leading-[0.95] tracking-display text-ink md:text-[72px] xl:text-[96px]"
        >
          Minha Abordagem
        </motion.h2>

        <motion.div
          className="mt-16 space-y-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {aboutApproachSections.map((section) => (
            <motion.div key={section.title} variants={cardReveal} className="max-w-[771px]">
              <h3 className="font-heading text-[32px] font-bold leading-tight text-ink md:text-[36px] xl:text-[40px]">
                {section.title}
              </h3>
              <p className="mt-5 max-w-[658px] font-body text-lg leading-8 text-ink">
                {section.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

Update `src/pages/AboutPage.tsx`:

```tsx
import { SiteFooter } from '../components/layout/SiteFooter'
import { AboutApproachSection } from '../components/about/AboutApproachSection'
import { AboutEditorialSection } from '../components/about/AboutEditorialSection'
import { AboutHeroSection } from '../components/about/AboutHeroSection'

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <main>
        <AboutEditorialSection />
        <AboutApproachSection />
      </main>
      <SiteFooter />
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
yarn test:run src/test/about-page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/AboutPage.tsx src/components/about/AboutHeroSection.tsx src/components/about/AboutEditorialSection.tsx src/components/about/AboutApproachSection.tsx src/assets/about-page-editorial.jpg src/test/about-page.test.tsx
git commit -m "feat: add about page editorial sections"
```

## Task 4: Build the “Meus Princípios” section and finish the about page composition

**Files:**
- Create: `src/components/about/AboutPrincipleCard.tsx`
- Create: `src/components/about/AboutPrinciplesSection.tsx`
- Modify: `src/pages/AboutPage.tsx`
- Modify: `src/test/about-page.test.tsx`

- [ ] **Step 1: Write the failing test**

Replace `src/test/about-page.test.tsx` with:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
yarn test:run src/test/about-page.test.tsx
```

Expected: FAIL because the principles section is not implemented yet.

- [ ] **Step 3: Write minimal implementation**

Create `src/components/about/AboutPrincipleCard.tsx`:

```tsx
type AboutPrincipleCardProps = {
  title: string
  body: string
}

export function AboutPrincipleCard({ title, body }: AboutPrincipleCardProps) {
  return (
    <article className="border border-black/10 px-8 py-8 text-left">
      <h3 className="font-heading text-[32px] font-bold leading-tight text-ink">
        {title}
      </h3>
      <p className="mt-6 max-w-[286px] font-body text-base leading-[1.625] text-ink">
        {body}
      </p>
    </article>
  )
}
```

Create `src/components/about/AboutPrinciplesSection.tsx`:

```tsx
import { motion } from 'motion/react'
import { aboutPrinciples } from '../../data/siteContent'
import { cardReveal, sectionReveal, staggerContainer } from '../../lib/motion'
import { AboutPrincipleCard } from './AboutPrincipleCard'

export function AboutPrinciplesSection() {
  return (
    <section className="bg-white py-20 xl:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        <motion.h2
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center font-heading text-4xl font-bold text-ink md:text-5xl"
        >
          Meus Princípios
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mx-auto mt-6 max-w-[435px] text-center font-body text-base leading-8 text-ink"
        >
          Vamos conversar sobre como transformar sua visão em posicionamento, conteúdo e presença visual memorável.
        </motion.p>

        <motion.div
          className="mt-16 grid gap-10 xl:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {aboutPrinciples.map((principle) => (
            <motion.div key={principle.title} variants={cardReveal}>
              <AboutPrincipleCard title={principle.title} body={principle.body} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

Update `src/pages/AboutPage.tsx`:

```tsx
import { SiteFooter } from '../components/layout/SiteFooter'
import { AboutApproachSection } from '../components/about/AboutApproachSection'
import { AboutEditorialSection } from '../components/about/AboutEditorialSection'
import { AboutHeroSection } from '../components/about/AboutHeroSection'
import { AboutPrinciplesSection } from '../components/about/AboutPrinciplesSection'

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <main>
        <AboutEditorialSection />
        <AboutApproachSection />
        <AboutPrinciplesSection />
      </main>
      <SiteFooter />
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
yarn test:run src/test/about-page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/about/AboutPrincipleCard.tsx src/components/about/AboutPrinciplesSection.tsx src/pages/AboutPage.tsx src/test/about-page.test.tsx
git commit -m "feat: add about page principles section"
```

## Task 5: Final verification and route integration pass

**Files:**
- Modify as needed after verification: `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`, `src/pages/HomePage.tsx`, `src/pages/AboutPage.tsx`, `src/AppRoutes.tsx`, `src/data/siteContent.ts`
- Test: `src/test/navigation.test.tsx`, `src/test/sections-content.test.tsx`, `src/test/about-page.test.tsx`, `src/test/app-shell.test.tsx`, `src/test/reduced-motion.test.tsx`

- [ ] **Step 1: Write the failing test**

If any route or navigation regression appears during verification, add the smallest missing assertion to the nearest existing test file before changing production code. Example:

```tsx
expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '/sobre')
```

Use existing files before creating new tests.

- [ ] **Step 2: Run test to verify it fails**

Run the smallest affected test file first. Example:

```bash
yarn test:run src/test/navigation.test.tsx
```

Expected: FAIL with the exact routing/navigation regression found.

- [ ] **Step 3: Write minimal implementation**

Run the app locally and verify both routes:

```bash
yarn dev
```

Use this checklist while making the smallest necessary adjustments:

```text
Route integration checklist:
- Landing route no longer includes the old About section
- /sobre renders the new hero and editorial structure
- Header “Sobre” points to /sobre from both pages
- Other primary links still behave coherently
- Footer remains visually consistent across routes
- Motion still feels aligned with the rest of the site
- The new about page feels like part of the same brand system
```

Keep fixes local to route wiring, navigation targets, and composition.

- [ ] **Step 4: Run final verification commands**

Run:

```bash
yarn test:run
yarn build
```

Expected:
- all tests PASS
- production build succeeds

- [ ] **Step 5: Commit**

```bash
git add src package.json yarn.lock
git commit -m "feat: add dedicated about page"
```

## Spec Coverage Check
- Dedicated `/sobre` route: covered by Tasks 1 and 5.
- Removal of old landing About section: covered by Task 2 and final verification.
- New page structure based on Figma sections 4–8: covered by Tasks 3 and 4.
- Shared header/footer and visual consistency: covered by Tasks 2–5.
- Motion continuity: retained through reuse of existing motion patterns in new sections.

## Self-Review
- No placeholders or vague instructions remain.
- File paths match the current project structure.
- The plan is focused on one subsystem: dedicated about page implementation.
- Every requirement from the spec maps to at least one task.
