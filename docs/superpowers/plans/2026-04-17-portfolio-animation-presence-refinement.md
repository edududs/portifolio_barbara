# Portfolio Animation Presence Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase the visibility and perceived presence of the existing portfolio animations while preserving the premium editorial feel and current architecture.

**Architecture:** Keep the current Motion-based implementation and refine it in place by tuning shared motion primitives first, then increasing the strength of section-level animations where the user most feels the experience: hero, section reveals, cards, and CTA. Preserve reduced-motion behavior, avoid adding new animation systems, and validate with the existing test suite plus a production build.

**Tech Stack:** React, Vite, TypeScript, Tailwind CSS, Motion for React, Vitest, React Testing Library, Yarn

---

## File Map

### Shared motion tuning
- Modify: `src/lib/motion.ts` — increase default amplitudes, durations, and stagger timing while keeping the same helper surface

### Section-level animation tuning
- Modify: `src/components/sections/HeroSection.tsx` — strengthen staged entrance, parallax, and arrow motion
- Modify: `src/components/sections/ServicesSection.tsx` — make reveal timing and card entrance more noticeable
- Modify: `src/components/sections/AboutSection.tsx` — increase text/image contrast in entrance and strengthen image parallax
- Modify: `src/components/sections/SpecialtiesSection.tsx` — increase stagger and reveal amplitude for specialty cards
- Modify: `src/components/sections/CtaSection.tsx` — make CTA block and button feel more present
- Modify: `src/components/layout/SiteFooter.tsx` — keep subtle, only minor polish if needed

### Reusable UI elements
- Modify: `src/components/ui/ServiceCard.tsx` — slightly stronger hover lift
- Modify: `src/components/ui/SpecialtyCard.tsx` — slightly stronger image hover response
- Modify: `src/components/ui/PrimaryButton.tsx` — only if needed to support stronger hover feel without semantic changes

### Tests
- Modify only if a regression or stronger expectation is needed: `src/test/app-shell.test.tsx`, `src/test/sections-content.test.tsx`, `src/test/navigation.test.tsx`, `src/test/reduced-motion.test.tsx`

## Task 1: Tune shared motion primitives and hero presence

**Files:**
- Modify: `src/lib/motion.ts`
- Modify: `src/components/sections/HeroSection.tsx`
- Test: `src/test/app-shell.test.tsx`

- [ ] **Step 1: Write the failing test**

Add a stronger expectation to `src/test/app-shell.test.tsx` so the hero CTA contract remains stable while the motion tuning changes happen. Replace the file with:

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

Expected: If the current hero still satisfies this contract, note that the test is already green and continue — this task is a refinement task, so the real red/green cycle will come from the implementation diff plus full regression verification. Do not invent a failing behavior just to force a red test.

- [ ] **Step 3: Write minimal implementation**

Update `src/lib/motion.ts` to increase the shared presence without changing the helper API:

```ts
import { Transition, Variants } from 'motion/react'

export const baseEase = [0.22, 1, 0.36, 1] as const

export const sectionRevealTransition: Transition = {
  duration: 0.78,
  ease: baseEase
}

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 48
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
      staggerChildren: 0.18,
      delayChildren: 0.12
    }
  }
}

export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 42,
    scale: 0.985
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: baseEase
    }
  }
}

export function viewportAmount(reducedMotion: boolean) {
  return reducedMotion ? { once: true, amount: 0 } : { once: true, amount: 0.2 }
}
```

Update `src/components/sections/HeroSection.tsx` to make the hero more present without changing its structure:

```tsx
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import heroBackground from '../../assets/hero-bg.jpg'
import arrowDown from '../../assets/arrow-down.svg'
import { heroContent } from '../../data/siteContent'
import { baseEase } from '../../lib/motion'
import { SiteHeader } from '../layout/SiteHeader'
import { PrimaryButton } from '../ui/PrimaryButton'

export function HeroSection() {
  const shouldReduceMotion = !!useReducedMotion()
  const { scrollYProgress } = useScroll()

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.35],
    shouldReduceMotion ? [0, 0] : [0, 62]
  )

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 0.35],
    shouldReduceMotion ? [0, 0] : [0, 38]
  )

  return (
    <section id="topo" className="relative overflow-hidden text-white">
      <motion.div
        className="absolute inset-0 min-h-[743px] bg-cover bg-center shadow-hero"
        style={{ backgroundImage: `url(${heroBackground})`, y: backgroundY, scale: shouldReduceMotion ? 1 : 1.03 }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <SiteHeader />

      <motion.div
        className="relative mx-auto flex min-h-[743px] max-w-shell flex-col items-center justify-center px-6 text-center md:px-10 xl:px-16"
        style={{ y: heroY }}
      >
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 46, scale: 0.985 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, ease: baseEase }}
          className="font-heading text-[56px] font-bold leading-none tracking-display text-white md:text-[72px] xl:text-[96px]"
        >
          {heroContent.title}
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.82, delay: 0.14, ease: baseEase }}
          className="mt-6 font-heading text-[24px] font-normal text-white/90 md:text-[28px] xl:text-[36px]"
        >
          {heroContent.subtitle}
        </motion.p>

        <motion.a
          href="#cases"
          className="mt-16 inline-flex"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.78, delay: 0.28, ease: baseEase }}
          whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.015 }}
        >
          <PrimaryButton className="w-[225px]">{heroContent.cta}</PrimaryButton>
        </motion.a>

        <motion.img
          src={arrowDown}
          alt=""
          aria-hidden="true"
          className="mt-24 h-8 w-8 md:mt-32 xl:mt-40"
          animate={shouldReduceMotion ? undefined : { y: [0, 12, 0], opacity: [0.7, 1, 0.7] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
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
git add src/lib/motion.ts src/components/sections/HeroSection.tsx src/test/app-shell.test.tsx
git commit -m "feat: increase hero animation presence"
```

## Task 2: Increase reveal rhythm in services, about, and specialties

**Files:**
- Modify: `src/components/sections/ServicesSection.tsx`
- Modify: `src/components/sections/AboutSection.tsx`
- Modify: `src/components/sections/SpecialtiesSection.tsx`
- Modify: `src/components/ui/ServiceCard.tsx`
- Modify: `src/components/ui/SpecialtyCard.tsx`
- Test: `src/test/sections-content.test.tsx`

- [ ] **Step 1: Write the failing test**

Keep the same semantic coverage but refresh the test file to serve as the regression guard while you tune motion. Replace `src/test/sections-content.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Main content sections', () => {
  it('renders services, about, specialties, CTA, and footer content after motion refinements', () => {
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

Expected: If still green, treat it as a regression guard and continue — this task is about visual tuning, so the correctness check is that the semantic contract remains green after implementation.

- [ ] **Step 3: Write minimal implementation**

Update `src/components/ui/ServiceCard.tsx`:

```tsx
import { motion, useReducedMotion } from 'motion/react'

type ServiceCardProps = {
  title: string
  body: string
}

export function ServiceCard({ title, body }: ServiceCardProps) {
  const shouldReduceMotion = !!useReducedMotion()

  return (
    <motion.article
      className="min-h-[292px] border border-black/10 bg-lime px-10 py-10 text-white"
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -10,
              scale: 1.02
            }
      }
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
  const shouldReduceMotion = !!useReducedMotion()
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
  const shouldReduceMotion = !!useReducedMotion()
  const { scrollYProgress } = useScroll()
  const imageY = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    shouldReduceMotion ? [0, 0] : [0, -34]
  )
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="sobre" className="bg-white py-20 xl:py-28">
      <div className="grid items-center gap-10 xl:grid-cols-[1fr_555px] xl:gap-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -42, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.84, ease: baseEase }}
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
          initial={shouldReduceMotion ? false : { opacity: 0, x: 42, y: 18, scale: 0.985 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: baseEase, delay: 0.08 }}
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
  const shouldReduceMotion = !!useReducedMotion()

  return (
    <article className="max-w-[285px]">
      <div className="h-[380px] overflow-hidden bg-paper">
        <motion.img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
  const shouldReduceMotion = !!useReducedMotion()
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
git commit -m "feat: strengthen section animation presence"
```

## Task 3: Increase CTA and interaction strength without losing restraint

**Files:**
- Modify: `src/components/sections/CtaSection.tsx`
- Modify: `src/components/ui/PrimaryButton.tsx`
- Modify: `src/components/layout/SiteFooter.tsx`
- Test: `src/test/reduced-motion.test.tsx`
- Test: `src/test/navigation.test.tsx`

- [ ] **Step 1: Write the failing test**

Refresh `src/test/reduced-motion.test.tsx` to keep the CTA contract explicit during refinement. Replace it with:

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
yarn test:run src/test/reduced-motion.test.tsx src/test/navigation.test.tsx
```

Expected: If already green, use it as the regression guard while you strengthen the interactions.

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
  const shouldReduceMotion = !!useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="contato" className="bg-white py-24 text-center xl:py-28">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 44, scale: 0.985 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={viewport}
        transition={{ duration: 0.82, ease: baseEase }}
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
          whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.025 }}
          transition={{ duration: 0.28, ease: baseEase }}
        >
          <span>{ctaContent.action}</span>
          <img src={arrowRight} alt="" aria-hidden="true" className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </Section>
  )
}
```

Update `src/components/layout/SiteFooter.tsx` only lightly:

```tsx
import { motion, useReducedMotion } from 'motion/react'
import { navItems } from '../../data/siteContent'
import { baseEase, viewportAmount } from '../../lib/motion'

export function SiteFooter() {
  const shouldReduceMotion = !!useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <motion.footer
      className="bg-black pb-16 pt-20 text-white"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.58, ease: baseEase }}
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
                    whileHover={shouldReduceMotion ? undefined : { x: 3 }}
                    transition={{ duration: 0.22 }}
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
              whileHover={shouldReduceMotion ? undefined : { x: -3 }}
              transition={{ duration: 0.22 }}
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
git commit -m "feat: strengthen cta animation presence"
```

## Task 4: Final verification and desktop sensibility pass

**Files:**
- Modify as needed after review: `src/lib/motion.ts`, `src/components/sections/HeroSection.tsx`, `src/components/sections/ServicesSection.tsx`, `src/components/sections/AboutSection.tsx`, `src/components/sections/SpecialtiesSection.tsx`, `src/components/sections/CtaSection.tsx`, `src/components/layout/SiteFooter.tsx`, `src/components/ui/ServiceCard.tsx`, `src/components/ui/SpecialtyCard.tsx`
- Test: `src/test/app-shell.test.tsx`, `src/test/sections-content.test.tsx`, `src/test/navigation.test.tsx`, `src/test/reduced-motion.test.tsx`

- [ ] **Step 1: Write the failing test**

If a final tuning pass changes semantics or uncovers a regression, add the smallest missing assertion to the nearest existing test file before changing code. Example:

```tsx
expect(screen.getByRole('heading', { level: 2, name: 'Pronto para elevar sua marca?' })).toBeInTheDocument()
```

Use an existing test file unless a truly new regression category appears.

- [ ] **Step 2: Run test to verify it fails**

Run the smallest affected test file first. Example:

```bash
yarn test:run src/test/reduced-motion.test.tsx
```

Expected: FAIL with the exact regression you observed.

- [ ] **Step 3: Write minimal implementation**

Run the app locally:

```bash
yarn dev
```

Tune only the values that increase presence while keeping the premium feel. Use this checklist:

```text
Desktop refinement checklist:
- Hero title entrance feels bolder and more cinematic without becoming flashy
- Subtitle and CTA separation is clearer
- Background and foreground parallax are more noticeable but still elegant
- Services cards feel more alive on entry and hover
- About section has stronger visual contrast between text and image motion
- Specialties section stagger is clearly noticeable now
- CTA feels more persuasive and more present
- Footer still feels quiet and restrained
- Reduced motion still strips out the stronger transforms
```

Keep changes local to the tuned values. Do not add new animation types.

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
git add src/lib/motion.ts src/components/sections/HeroSection.tsx src/components/sections/ServicesSection.tsx src/components/sections/AboutSection.tsx src/components/sections/SpecialtiesSection.tsx src/components/sections/CtaSection.tsx src/components/layout/SiteFooter.tsx src/components/ui/ServiceCard.tsx src/components/ui/SpecialtyCard.tsx src/components/ui/PrimaryButton.tsx src/test/app-shell.test.tsx src/test/sections-content.test.tsx src/test/navigation.test.tsx src/test/reduced-motion.test.tsx
git commit -m "feat: increase portfolio animation presence"
```

## Spec Coverage Check
- Keep the same animation language: preserved by refining values in place across all tasks.
- Increase presence, not noise: implemented via stronger amplitudes/timing in hero, sections, and CTA.
- Keep footer restrained: explicitly preserved in Task 3.
- Preserve reduced motion: covered in Tasks 1 and 3.
- Avoid changing architecture/library: preserved by keeping Motion and the same helper surface.

## Self-Review
- No placeholders or TODO-style steps remain.
- File paths and component names match the current worktree.
- The plan is focused on one subsystem: animation intensity refinement.
- Every refinement requirement from the spec maps to at least one task.
