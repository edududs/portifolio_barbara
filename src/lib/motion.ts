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
