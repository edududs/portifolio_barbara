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
