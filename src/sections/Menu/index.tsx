import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useIsMobile } from 'src/hooks'
import { Header } from 'src/components'
import styles from './menu.module.scss'

/* ---------------------------------- image --------------------------------- */
import img1Step1 from 'src/assets/images/menu/step1-1.webp'
import img2Step1 from 'src/assets/images/menu/step1-2.webp'
import img3Step1 from 'src/assets/images/menu/step1-3.webp'
import img1Step2 from 'src/assets/images/menu/step2-1.webp'
import img2Step2 from 'src/assets/images/menu/step2-2.webp'
import img3Step2 from 'src/assets/images/menu/step2-3.webp'
import img1Step3 from 'src/assets/images/menu/step3-1.webp'
import img2Step3 from 'src/assets/images/menu/step3-2.webp'
import img3Step3 from 'src/assets/images/menu/step3-3.webp'

const IMAGE_STEPS = [
  {
    key: 'step1',
    images: [img1Step1, img2Step1, img3Step1]
  },
  {
    key: 'step2',
    images: [img1Step2, img2Step2, img3Step2]
  },
  {
    key: 'step3',
    images: [img1Step3, img2Step3, img3Step3]
  }
]

// configuration constants
const SCROLL_SPEED = 100 // adjust speed here
const ANIMATION_DELAY = 100 // milliseconds before animation starts
const CLONE_COUNT = 23 // number of clones for seamless loop

const Menu: React.FC = () => {
  const isMobile = useIsMobile()
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
      {!isMobile && <Header logo={false} sidebar={true} />}

      <div className={styles.imgList}>
        {IMAGE_STEPS.map(({ key, images }) => (
          <div key={key} className={styles[key]}>
            {images.map((img, index) => (
              <div key={index}>
                <picture>
                  <source media='(max-width: 1024px)' srcSet={img} />
                  <img src={img} alt='SAMAA_' />
                </picture>
              </div>
            ))}
          </div>
        ))}
      </div>

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
