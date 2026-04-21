# Portfolio Scroll Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add robust, medium-intensity scroll-driven animations to the portfolio using Motion for React, while preserving the refined visual style and existing page structure.

**Architecture:** Integrate Motion directly into the existing section components, using a small shared motion helper module for repeated transitions and reduced-motion behavior. Use viewport-triggered reveals for most sections and limited scroll-linked transforms for the hero and about image, keeping transforms subtle and desktop-first.

**Tech Stack:** React, Vite, TypeScript, Tailwind CSS, Motion for React, Vitest, React Testing Library, Yarn

---

## File Map

### Dependencies and shared motion configuration
- Modify: `package.json` — add `motion`
- Modify: `yarn.lock` — lock the new dependency
- Create: `src/lib/motion.ts` — shared variants, transitions, and reduced-motion-safe helpers

### Section components
- Modify: `src/components/sections/HeroSection.tsx` — add staged hero entrance and light scroll-linked motion
- Modify: `src/components/sections/ServicesSection.tsx` — add heading reveal and staggered card entrance
- Modify: `src/components/sections/AboutSection.tsx` — add coordinated text/image reveal and image parallax
- Modify: `src/components/sections/SpecialtiesSection.tsx` — add section reveal and staggered specialty cards
- Modify: `src/components/sections/CtaSection.tsx` — add CTA section reveal and stronger button presence
- Modify: `src/components/layout/SiteFooter.tsx` — add restrained footer reveal and link hover polish
- Modify: `src/components/ui/ServiceCard.tsx` — add hover motion wrapper
- Modify: `src/components/ui/SpecialtyCard.tsx` — add image hover motion wrapper
- Modify: `src/components/ui/PrimaryButton.tsx` — support optional motion-friendly class composition without changing semantics

### Tests
- Modify: `src/test/app-shell.test.tsx` — keep the hero shell test stable with motion wrappers
- Modify: `src/test/sections-content.test.tsx` — ensure section content still renders after animation integration
- Modify: `src/test/navigation.test.tsx` — ensure anchors/CTA remain intact after motion changes
- Create: `src/test/reduced-motion.test.tsx` — verify reduced-motion fallback removes stronger motion behavior from key animated sections

## Task 1: Install Motion and add shared animation primitives

**Files:**
- Modify: `package.json`
- Modify: `yarn.lock`
- Create: `src/lib/motion.ts`
- Create: `src/test/reduced-motion.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/test/reduced-motion.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
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
  })

  it('renders the page when reduced motion is enabled', () => {
    window.matchMedia = createMatchMedia(true)

    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Barbara Fonseca' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Especialização' })
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
yarn test:run src/test/reduced-motion.test.tsx
```

Expected: FAIL because `src/test/reduced-motion.test.tsx` does not exist yet or because there is no shared motion/reduced-motion integration in place.

- [ ] **Step 3: Write minimal implementation**

Update `package.json` to add Motion:

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
    "motion": "^11.11.17",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/dom": "^10.4.1",
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

Install dependencies:

```bash
yarn install
```

Create `src/lib/motion.ts`:

```ts
import { Transition, Variants } from 'motion/react'

export const baseEase = [0.22, 1, 0.36, 1] as const

export const sectionRevealTransition: Transition = {
  duration: 0.65,
  ease: baseEase
}

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 32
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: sectionRevealTransition
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
}

export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: baseEase
    }
  }
}

export function viewportAmount(reducedMotion: boolean) {
  return reducedMotion ? { once: true, amount: 0 } : { once: true, amount: 0.25 }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
yarn test:run src/test/reduced-motion.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock src/lib/motion.ts src/test/reduced-motion.test.tsx
git commit -m "feat: add motion foundation for scroll animations"
```

## Task 2: Animate the hero with subtle scroll-linked motion

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/test/app-shell.test.tsx`
- Test: `src/test/app-shell.test.tsx`

- [ ] **Step 1: Write the failing test**

Replace `src/test/app-shell.test.tsx` with:

```tsx
import { render, screen, within } from '@testing-library/react'
import App from '../App'

describe('App shell', () => {
  it('renders the hero content and primary navigation with a linked CTA', () => {
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
    expect(screen.getByRole('link', { name: /veja meu trabalho/i })).toHaveAttribute(
      'href',
      '#cases'
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
yarn test:run src/test/app-shell.test.tsx
```

Expected: FAIL because the hero CTA is not currently exposed as a link with the accessible name `veja meu trabalho`.

- [ ] **Step 3: Write minimal implementation**

Update `src/components/sections/HeroSection.tsx`:

```tsx
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import heroBackground from '../../assets/hero-bg.jpg'
import arrowDown from '../../assets/arrow-down.svg'
import { heroContent } from '../../data/siteContent'
import { SiteHeader } from '../layout/SiteHeader'
import { PrimaryButton } from '../ui/PrimaryButton'
import { baseEase } from '../../lib/motion'

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.35],
    shouldReduceMotion ? [0, 0] : [0, 42]
  )

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 0.35],
    shouldReduceMotion ? [0, 0] : [0, 24]
  )

  return (
    <section id="topo" className="relative overflow-hidden text-white">
      <motion.div
        className="absolute inset-0 bg-cover bg-center shadow-hero"
        style={{ backgroundImage: `url(${heroBackground})`, y: backgroundY }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <SiteHeader />

      <motion.div
        className="relative mx-auto flex min-h-[743px] max-w-shell flex-col items-center justify-center px-6 text-center md:px-10 xl:px-16"
        style={{ y: heroY }}
      >
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: baseEase }}
          className="font-heading text-[56px] font-bold leading-none tracking-display text-white md:text-[72px] xl:text-[96px]"
        >
          {heroContent.title}
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: baseEase }}
          className="mt-6 font-heading text-[24px] font-normal text-white/90 md:text-[28px] xl:text-[36px]"
        >
          {heroContent.subtitle}
        </motion.p>

        <motion.a
          href="#cases"
          className="mt-16 inline-flex"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: baseEase }}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        >
          <PrimaryButton className="w-[225px]">{heroContent.cta}</PrimaryButton>
        </motion.a>

        <motion.img
          src={arrowDown}
          alt=""
          aria-hidden="true"
          className="mt-24 h-8 w-8 md:mt-32 xl:mt-40"
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
yarn test:run src/test/app-shell.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/test/app-shell.test.tsx
git commit -m "feat: animate portfolio hero"
```

## Task 3: Add section reveals and card hover motion

**Files:**
- Modify: `src/components/sections/ServicesSection.tsx`
- Modify: `src/components/sections/AboutSection.tsx`
- Modify: `src/components/sections/SpecialtiesSection.tsx`
- Modify: `src/components/ui/ServiceCard.tsx`
- Modify: `src/components/ui/SpecialtyCard.tsx`
- Modify: `src/test/sections-content.test.tsx`
- Test: `src/test/sections-content.test.tsx`

- [ ] **Step 1: Write the failing test**

Replace `src/test/sections-content.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Main content sections', () => {
  it('renders services, about, specialties, CTA, and footer content after motion integration', () => {
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
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
yarn test:run src/test/sections-content.test.tsx
```

Expected: FAIL after you introduce animated wrappers or section-level motion until the updated components fully preserve the previous semantics.

- [ ] **Step 3: Write minimal implementation**

Update `src/components/ui/ServiceCard.tsx`:

```tsx
import { motion, useReducedMotion } from 'motion/react'

type ServiceCardProps = {
  title: string
  body: string
}

export function ServiceCard({ title, body }: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      className="min-h-[292px] border border-black/10 bg-lime px-10 py-10 text-white"
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -6,
              scale: 1.01
            }
      }
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="font-heading text-2xl font-bold leading-8">{title}</h3>
      <p className="mt-10 max-w-[288px] font-body text-base leading-[1.625] text-white">
        {body}
      </p>
    </motion.article>
  )
}
```

Update `src/components/sections/ServicesSection.tsx`:

```tsx
import { motion, useReducedMotion } from 'motion/react'
import { serviceCards } from '../../data/siteContent'
import { cardReveal, sectionReveal, staggerContainer, viewportAmount } from '../../lib/motion'
import { Section } from '../layout/Section'
import { ServiceCard } from '../ui/ServiceCard'

export function ServicesSection() {
  const shouldReduceMotion = useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="servicos" className="bg-white py-24 xl:py-28">
      <motion.h2
        variants={sectionReveal}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={viewport}
        className="text-center font-heading text-4xl font-bold text-ink md:text-5xl"
      >
        Como ajudo sua marca
      </motion.h2>

      <motion.div
        className="mt-14 grid gap-8 xl:grid-cols-3 xl:gap-8"
        variants={staggerContainer}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={viewport}
      >
        {serviceCards.map((card) => (
          <motion.div key={card.title} variants={shouldReduceMotion ? undefined : cardReveal}>
            <ServiceCard title={card.title} body={card.body} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
```

Update `src/components/sections/AboutSection.tsx`:

```tsx
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import portrait from '../../assets/about-portrait.jpg'
import { aboutContent } from '../../data/siteContent'
import { baseEase, viewportAmount } from '../../lib/motion'
import { Section } from '../layout/Section'

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const imageY = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    shouldReduceMotion ? [0, 0] : [0, -22]
  )
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="sobre" className="bg-white py-20 xl:py-28">
      <div className="grid items-center gap-10 xl:grid-cols-[1fr_555px] xl:gap-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -28 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: baseEase }}
        >
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
        </motion.div>

        <motion.div
          className="overflow-hidden bg-paper"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.75, ease: baseEase, delay: 0.06 }}
          style={{ y: imageY }}
        >
          <img
            src={portrait}
            alt="Barbara Fonseca"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </motion.div>
      </div>
    </Section>
  )
}
```

Update `src/components/ui/SpecialtyCard.tsx`:

```tsx
import { motion, useReducedMotion } from 'motion/react'

type SpecialtyCardProps = {
  title: string
  body: string
  imageSrc: string
}

export function SpecialtyCard({ title, body, imageSrc }: SpecialtyCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <article className="max-w-[285px]">
      <div className="h-[380px] overflow-hidden bg-paper">
        <motion.img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.035 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <h3 className="mt-4 font-heading text-[32px] font-bold leading-none text-ink">
        {title}
      </h3>
      <p className="mt-4 font-body text-base leading-[1.625] text-ink">{body}</p>
    </article>
  )
}
```

Update `src/components/sections/SpecialtiesSection.tsx`:

```tsx
import { motion, useReducedMotion } from 'motion/react'
import fashionImage from '../../assets/specialty-fashion.jpg'
import institutionalImage from '../../assets/specialty-institutional.jpg'
import { specialties } from '../../data/siteContent'
import { cardReveal, sectionReveal, staggerContainer, viewportAmount } from '../../lib/motion'
import { Section } from '../layout/Section'
import { SpecialtyCard } from '../ui/SpecialtyCard'

const specialtyImages = {
  fashion: fashionImage,
  institutional: institutionalImage
} as const

export function SpecialtiesSection() {
  const shouldReduceMotion = useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="cases" className="bg-white py-24 xl:py-28">
      <motion.h2
        variants={sectionReveal}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={viewport}
        className="text-center font-heading text-4xl font-bold text-ink md:text-5xl"
      >
        Especialização
      </motion.h2>

      <motion.div
        className="mt-16 grid gap-12 md:grid-cols-2 md:justify-items-center"
        variants={staggerContainer}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={viewport}
      >
        {specialties.map((specialty) => (
          <motion.div key={specialty.title} variants={shouldReduceMotion ? undefined : cardReveal}>
            <SpecialtyCard
              title={specialty.title}
              body={specialty.body}
              imageSrc={specialtyImages[specialty.image]}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
yarn test:run src/test/sections-content.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ServicesSection.tsx src/components/sections/AboutSection.tsx src/components/sections/SpecialtiesSection.tsx src/components/ui/ServiceCard.tsx src/components/ui/SpecialtyCard.tsx src/test/sections-content.test.tsx
git commit -m "feat: animate portfolio content sections"
```

## Task 4: Animate CTA, footer, and reduced-motion-safe interactions

**Files:**
- Modify: `src/components/sections/CtaSection.tsx`
- Modify: `src/components/layout/SiteFooter.tsx`
- Modify: `src/components/ui/PrimaryButton.tsx`
- Modify: `src/test/navigation.test.tsx`
- Modify: `src/test/reduced-motion.test.tsx`
- Test: `src/test/navigation.test.tsx`
- Test: `src/test/reduced-motion.test.tsx`

- [ ] **Step 1: Write the failing test**

Replace `src/test/reduced-motion.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'

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
    window.matchMedia = createMatchMedia(true)
  })

  it('renders key sections and actions when reduced motion is enabled', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Barbara Fonseca' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Pronto para elevar sua marca?' })
    ).toBeInTheDocument()
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
yarn test:run src/test/reduced-motion.test.tsx src/test/navigation.test.tsx
```

Expected: FAIL until the CTA/footer motion changes keep the same accessibility and link behavior under reduced motion.

- [ ] **Step 3: Write minimal implementation**

Update `src/components/ui/PrimaryButton.tsx`:

```tsx
import { ButtonHTMLAttributes } from 'react'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function PrimaryButton({ className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`inline-flex h-14 items-center justify-center bg-lime px-10 font-body text-base font-semibold tracking-[0.025em] text-softWhite transition duration-300 hover:brightness-95 ${className}`}
      {...props}
    />
  )
}
```

Update `src/components/sections/CtaSection.tsx`:

```tsx
import { motion, useReducedMotion } from 'motion/react'
import arrowRight from '../../assets/arrow-right.svg'
import { ctaContent } from '../../data/siteContent'
import { baseEase, viewportAmount } from '../../lib/motion'
import { Section } from '../layout/Section'

export function CtaSection() {
  const shouldReduceMotion = useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="contato" className="bg-white py-24 text-center xl:py-28">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.7, ease: baseEase }}
      >
        <h2 className="font-heading text-4xl font-bold text-ink md:text-5xl">
          {ctaContent.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[599px] font-body text-base leading-8 text-ink">
          {ctaContent.body}
        </p>
        <motion.a
          href="mailto:barbara@example.com"
          className="mx-auto mt-14 inline-flex h-[60px] items-center gap-4 bg-black px-10 font-accent text-sm tracking-[0.025em] text-white"
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
          transition={{ duration: 0.25, ease: baseEase }}
        >
          <span>{ctaContent.action}</span>
          <img src={arrowRight} alt="" aria-hidden="true" className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </Section>
  )
}
```

Update `src/components/layout/SiteFooter.tsx`:

```tsx
import { motion, useReducedMotion } from 'motion/react'
import { navItems } from '../../data/siteContent'
import { baseEase, viewportAmount } from '../../lib/motion'

export function SiteFooter() {
  const shouldReduceMotion = useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <motion.footer
      className="bg-black pb-16 pt-20 text-white"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease: baseEase }}
    >
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
                  <motion.a
                    href={item.href}
                    className="font-body text-sm text-footerMuted"
                    whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:justify-self-end md:text-right">
            <h3 className="font-body text-sm font-semibold tracking-[0.025em] text-white">
              Social
            </h3>
            <motion.a
              href="#contato"
              className="mt-4 inline-block font-body text-sm text-footerMuted"
              whileHover={shouldReduceMotion ? undefined : { x: -2 }}
              transition={{ duration: 0.2 }}
            >
              Instagram
            </motion.a>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center font-body text-xs text-footerFine">
          © 2026 Barbara Fonseca. Todos os direitos reservados.
        </div>
      </div>
    </motion.footer>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:

```bash
yarn test:run src/test/reduced-motion.test.tsx src/test/navigation.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/CtaSection.tsx src/components/layout/SiteFooter.tsx src/components/ui/PrimaryButton.tsx src/test/reduced-motion.test.tsx src/test/navigation.test.tsx
git commit -m "feat: add motion to cta and footer"
```

## Task 5: Final verification and desktop tuning pass

**Files:**
- Modify as needed after review: `src/components/sections/HeroSection.tsx`, `src/components/sections/AboutSection.tsx`, `src/components/sections/ServicesSection.tsx`, `src/components/sections/SpecialtiesSection.tsx`, `src/components/sections/CtaSection.tsx`, `src/components/layout/SiteFooter.tsx`, `src/lib/motion.ts`
- Test: `src/test/app-shell.test.tsx`, `src/test/sections-content.test.tsx`, `src/test/navigation.test.tsx`, `src/test/reduced-motion.test.tsx`

- [ ] **Step 1: Write the failing test**

If any regression or final adjustment changes semantics, add the smallest missing assertion to the nearest existing test file before changing production code. Example:

```tsx
expect(screen.getByRole('heading', { level: 2, name: 'Pronto para elevar sua marca?' })).toBeInTheDocument()
```

Put the assertion in the section test that already owns that area.

- [ ] **Step 2: Run test to verify it fails**

Run the smallest affected test file first. Example:

```bash
yarn test:run src/test/sections-content.test.tsx
```

Expected: FAIL with the exact missing regression you observed.

- [ ] **Step 3: Write minimal implementation**

Run the app locally for manual tuning:

```bash
yarn dev
```

Then compare behavior against this checklist:

```text
Desktop tuning checklist:
- Hero content feels more dynamic but still editorial and clean
- Background parallax remains subtle
- Services cards reveal with rhythm but no sluggishness
- About image parallax is noticeable only on close inspection
- Specialties stagger feels intentional, not theatrical
- CTA has stronger presence without feeling flashy
- Footer remains mostly static and sober
- Hover animations feel refined, not playful
- Reduced motion removes the stronger transforms
```

Use only the smallest code changes necessary to tune durations, distances, easing, and delays.

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
git add package.json yarn.lock src/lib/motion.ts src/components/sections/HeroSection.tsx src/components/sections/ServicesSection.tsx src/components/sections/AboutSection.tsx src/components/sections/SpecialtiesSection.tsx src/components/sections/CtaSection.tsx src/components/layout/SiteFooter.tsx src/components/ui/ServiceCard.tsx src/components/ui/SpecialtyCard.tsx src/components/ui/PrimaryButton.tsx src/test/app-shell.test.tsx src/test/sections-content.test.tsx src/test/navigation.test.tsx src/test/reduced-motion.test.tsx
git commit -m "feat: add robust scroll animations to portfolio"
```

## Spec Coverage Check
- Robust solution: covered by Motion integration in Task 1.
- Medium-intensity motion: covered by hero, content sections, CTA, and footer tasks.
- Scroll-linked behavior: covered by hero and about image in Tasks 2 and 3.
- Hover polish: covered by service/specialty cards and CTA/footer links.
- Reduced motion: covered in Tasks 1 and 4 with dedicated test.
- Keep desktop refined: covered by Task 5 tuning checklist.

## Self-Review
- No placeholders, TODOs, or vague implementation steps remain.
- File paths and component names match the current codebase.
- The plan stays focused on one subsystem: portfolio motion.
- Every spec requirement maps cleanly to at least one task.
