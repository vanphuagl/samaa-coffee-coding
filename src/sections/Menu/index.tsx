import { useEffect, useRef } from 'react'
import { useIsMobile } from 'src/hooks'
import { Header, VerticalMarquee } from 'src/components'
import styles from './menu.module.scss'
import gsap from 'gsap'

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

const MARQUEE_ITEMS = ['COFFEE', 'BAGEL', 'NATURAL WINE', 'AND MORE']

const Menu: React.FC = () => {
  const isMobile = useIsMobile()
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const step1 = step1Ref.current
    const step2 = step2Ref.current
    const step3 = step3Ref.current

    if (!step1 || !step2 || !step3) return

    const timeline = gsap.timeline({ repeat: -1 })
    const timeDuration = 0
    gsap.set([step1, step2, step3], { autoAlpha: 0 })

    timeline
      .to(step1, { autoAlpha: 1, duration: timeDuration, delay: 0.5 })
      .to(step2, { autoAlpha: 1, duration: timeDuration, delay: 0.5 })
      .to(step3, { autoAlpha: 1, duration: timeDuration, delay: 0.5 })
      .to(step3, { autoAlpha: 0, duration: timeDuration, delay: 0.5 })
      .to(step2, { autoAlpha: 0, duration: timeDuration, delay: 0.5 })
      .to(step1, { autoAlpha: 0, duration: timeDuration, delay: 0.5 })

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <section className={styles.container}>
      {!isMobile && <Header logo={false} sidebar={true} />}

      <div className={styles.imgList}>
        {IMAGE_STEPS.map(({ key, images }, stepIndex) => (
          <div
            key={key}
            className={styles[key]}
            ref={stepIndex === 0 ? step1Ref : stepIndex === 1 ? step2Ref : step3Ref}
          >
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
        <VerticalMarquee items={MARQUEE_ITEMS} speed={100} cloneCount={23} />
      </div>

      {/* <div className={styles.bottom}>
        <p className='fs u-hovertxt' data-hover='disabled'>
          Menu List +
        </p>
      </div> */}
    </section>
  )
}

export default Menu
