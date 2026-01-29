import { useEffect, useRef } from 'react'
import { Header } from 'src/components'
import gsap from 'gsap'
import styles from './menu.module.scss'

// configuration constants
const SCROLL_SPEED = 100 // adjust speed here
const ANIMATION_DELAY = 100 // milliseconds before animation starts
const CLONE_COUNT = 23 // number of clones for seamless loop

const Menu: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const marqueeElement = marqueeRef.current
    if (!marqueeElement) return

    const firstContent = marqueeElement.querySelector(`.${styles.marqueeContent}`) as HTMLElement
    if (!firstContent) return

    // ===== init animation  =====
    const initAnimation = () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }

      // remove all clones, keep only the first element
      const clones = marqueeElement.querySelectorAll(`.${styles.marqueeContent}:not(:first-child)`)
      clones.forEach((clone) => clone.remove())
      // create clones for seamless infinite scroll
      Array.from({ length: CLONE_COUNT }, () => {
        marqueeElement.appendChild(firstContent.cloneNode(true))
      })

      // start vertical loop animation
      const elements = Array.from(marqueeElement.children) as HTMLElement[]
      timelineRef.current = createVerticalLoop(elements, SCROLL_SPEED)
    }

    // ===== create infine vertical scrolling =====
    const createVerticalLoop = (elements: HTMLElement[], speed: number): gsap.core.Timeline => {
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
      const duration = Math.abs(distance / speed)

      // create infinite loop timeline
      const timeline = gsap.timeline({ repeat: -1 })
      const incrementOperator = speed < 0 ? '-=' : '+='
      const decrementOperator = speed < 0 ? '+=' : '-='

      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect()
        let ratio = Math.abs((bottom - bounds.top) / distance)

        if (speed < 0) {
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
    const initTimer = setTimeout(initAnimation, ANIMATION_DELAY)

    return () => {
      clearTimeout(initTimer)
      timelineRef.current?.kill()
    }
  }, [])

  return (
    <section className={styles.container}>
      <Header logo={false} sidebar={true} />

      <div className={styles.center}>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marquee} ref={marqueeRef}>
            <div className={styles.marqueeContent}>
              <p>COFFEE</p>
              <p>BAGEL</p>
              <p>NATURAL WINE</p>
              <p>AND MORE</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className='fs u-hovertxt' data-hover='disabled'>
          Menu List +
        </p>
      </div>
    </section>
  )
}

export default Menu
