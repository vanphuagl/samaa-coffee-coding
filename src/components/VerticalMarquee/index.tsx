import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './marquee.module.scss'

interface VerticalMarqueeProps {
  items: string[]
  speed?: number
  cloneCount?: number
}

const VerticalMarquee: React.FC<VerticalMarqueeProps> = ({ items, speed = 100, cloneCount = 23 }) => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const marqueeElement = marqueeRef.current
    if (!marqueeElement) return

    const firstContent = marqueeElement.querySelector('[data-marquee-items]') as HTMLElement
    if (!firstContent) return

    const initAnimation = () => {
      // cleanup previous timeline
      if (timelineRef.current) {
        timelineRef.current.kill()
      }

      // remove all clones, keep only the first element
      const clones = marqueeElement.querySelectorAll('[data-marquee-items]:not(:first-child)')
      clones.forEach((clone) => clone.remove())

      // create clones for seamless infinite scroll
      Array.from({ length: cloneCount }, () => {
        marqueeElement.appendChild(firstContent.cloneNode(true))
      })

      // start vertical loop animation
      const elements = Array.from(marqueeElement.children) as HTMLElement[]
      timelineRef.current = createVerticalLoop(elements, speed)
    }

    const createVerticalLoop = (elements: HTMLElement[], scrollSpeed: number): gsap.core.Timeline => {
      const first = elements[0]!
      const second = elements[1]!
      const last = elements[elements.length - 1]!

      // calculate animation boundaries
      const firstBounds = first.getBoundingClientRect()
      const lastBounds = last.getBoundingClientRect()
      const secondBounds = second.getBoundingClientRect()

      const top = firstBounds.top - firstBounds.height - Math.abs(secondBounds.top - firstBounds.bottom)
      const bottom = lastBounds.top
      const distance = bottom - top
      const duration = Math.abs(distance / scrollSpeed)

      // create infinite loop timeline
      const timeline = gsap.timeline({ repeat: -1 })
      const incrementOperator = scrollSpeed < 0 ? '-=' : '+='
      const decrementOperator = scrollSpeed < 0 ? '+=' : '-='

      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect()
        let ratio = Math.abs((bottom - bounds.top) / distance)

        if (scrollSpeed < 0) {
          ratio = 1 - ratio
        }

        // main animation: move element from current position
        timeline.to(
          element,
          {
            y: incrementOperator + distance * ratio,
            duration: duration * ratio,
            ease: 'none'
          },
          0
        )

        // loop animation: reset position and continue seamlessly
        timeline.fromTo(
          element,
          { y: decrementOperator + distance },
          {
            y: incrementOperator + (1 - ratio) * distance,
            ease: 'none',
            duration: (1 - ratio) * duration,
            immediateRender: false
          },
          duration * ratio
        )
      })

      return timeline
    }

    // delay initialization to ensure DOM is fully ready
    const initTimer = setTimeout(initAnimation, 150)

    return () => {
      clearTimeout(initTimer)
      timelineRef.current?.kill()
    }
  }, [speed, cloneCount])

  return (
    <div className={styles.container}>
      <div className={styles.marquee} ref={marqueeRef}>
        <div data-marquee-items>
          {items.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VerticalMarquee
