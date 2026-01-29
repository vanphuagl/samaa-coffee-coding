import React, { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'

interface MobileScrollProps {
  children: ReactNode
  autoStartDelay?: number
  speed?: number
  sensitivity?: number
  momentumMultiplier?: number
  decayRate?: number
  smoothing?: number
  className?: string
}

const MobileInfiniteScroll: React.FC<MobileScrollProps> = ({
  children,
  autoStartDelay = 4000,
  speed = 0.5,
  sensitivity = 1.1,
  momentumMultiplier = 0.03,
  decayRate = 0.007,
  smoothing = 0.5,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // State refs
  const isPausedRef = useRef(true)
  const isTouchingRef = useRef(false)
  const currentPositionRef = useRef(0)
  const targetPositionRef = useRef(0)
  const velocityRef = useRef(0)
  const touchVelocityRef = useRef(0)
  const speedRef = useRef(speed)
  const decayProgressRef = useRef(0)

  // Touch state refs
  const startYRef = useRef(0)
  const lastYRef = useRef(0)
  const lastTimeRef = useRef(0)
  const lastVelocityTimeRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current

    if (!container || !wrapper) return

    // Touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      isTouchingRef.current = true
      startYRef.current = e.touches[0]!.clientY
      lastYRef.current = startYRef.current
      lastTimeRef.current = performance.now()
      velocityRef.current = 0
      touchVelocityRef.current = 0
      decayProgressRef.current = 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]!.clientY
      const now = performance.now()
      const deltaY = lastYRef.current - currentY

      if (Math.abs(deltaY) > 2) {
        targetPositionRef.current += deltaY * sensitivity

        const timeDelta = now - (lastTimeRef.current || now)
        touchVelocityRef.current =
          touchVelocityRef.current * 0.85 + (timeDelta > 0 ? deltaY / (timeDelta / 1000) : 0) * 0.15
        lastVelocityTimeRef.current = now
      } else {
        touchVelocityRef.current *= 0.8
      }

      lastYRef.current = currentY
      lastTimeRef.current = now
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false

      if (performance.now() - lastVelocityTimeRef.current > 120) {
        velocityRef.current = 0
      } else {
        velocityRef.current = touchVelocityRef.current * momentumMultiplier
      }

      decayProgressRef.current = 0
      touchVelocityRef.current = 0
    }

    // Add touch listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    // Initialize scroll position
    const initializeScroll = () => {
      const firstSlide = wrapper.querySelector('.first-pass section, .first-pass > *:first-child')
      if (!firstSlide) return

      let attempts = 0
      const checkHeight = () => {
        const height = (firstSlide as HTMLElement).offsetHeight
        if (height > 0 || attempts > 60) {
          currentPositionRef.current = height
          targetPositionRef.current = height - 30
        } else {
          attempts++
          requestAnimationFrame(checkHeight)
        }
      }
      requestAnimationFrame(checkHeight)
    }

    initializeScroll()

    // Auto-start after delay
    const autoStartTimeout = setTimeout(() => {
      isPausedRef.current = false
    }, autoStartDelay)

    // Animation loop with GSAP ticker
    const animate = () => {
      if (!wrapper) return

      let movement = 0

      if (isTouchingRef.current) {
        decayProgressRef.current = 0
        speedRef.current = speed
      } else {
        // Apply momentum with decay
        if (velocityRef.current !== 0) {
          decayProgressRef.current = Math.min(decayProgressRef.current + decayRate, 1)
          const easeOut = Math.sin((decayProgressRef.current * Math.PI) / 2)
          movement = velocityRef.current * Math.pow(1 - easeOut, 2.5) + (isPausedRef.current ? 0 : speed * easeOut)

          if (decayProgressRef.current >= 1) {
            velocityRef.current = 0
          }
        } else if (!isPausedRef.current) {
          movement = speed
        }

        targetPositionRef.current += movement
      }

      // Smooth lerp
      const delta = targetPositionRef.current - currentPositionRef.current
      if (smoothing > 0) {
        currentPositionRef.current += delta * smoothing
      } else {
        currentPositionRef.current = targetPositionRef.current
      }

      // Infinite loop logic
      const halfHeight = wrapper.offsetHeight / 2
      if (currentPositionRef.current >= halfHeight) {
        currentPositionRef.current -= halfHeight
        targetPositionRef.current -= halfHeight
      } else if (currentPositionRef.current < 0) {
        currentPositionRef.current += halfHeight
        targetPositionRef.current += halfHeight
      }

      // Apply transform
      wrapper.style.transform = `translate3d(0, -${currentPositionRef.current}px, 0)`
    }

    gsap.ticker.add(animate)

    // Cleanup
    return () => {
      gsap.ticker.remove(animate)
      clearTimeout(autoStartTimeout)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [autoStartDelay, speed, sensitivity, momentumMultiplier, decayRate, smoothing])

  // Expose pause/resume methods
  useEffect(() => {
    ;(window as any).pauseScroll = () => {
      isPausedRef.current = true
    }
    ;(window as any).resumeScroll = () => {
      isPausedRef.current = false
    }

    return () => {
      delete (window as any).pauseScroll
      delete (window as any).resumeScroll
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <div ref={wrapperRef}>{children}</div>
    </div>
  )
}

export default MobileInfiniteScroll
