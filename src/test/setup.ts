import '@testing-library/jest-dom'

class MockIntersectionObserver {
  observe = () => undefined
  unobserve = () => undefined
  disconnect = () => undefined
  takeRecords = () => []
  root = null
  rootMargin = ''
  thresholds = []
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
})

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
})
