import { useRef, useEffect } from 'react'
import { Header } from 'src/components'
import { useIsMobile } from 'src/hooks'
import styles from './product.module.scss'

/* ---------------------------------- image --------------------------------- */
import product1Img from 'src/assets/images/product/beans_newhorizon.webp'
import product2Img from 'src/assets/images/product/beans_singleorigin.webp'
import product3Img from 'src/assets/images/product/20oz_front.webp'
import product4Img from 'src/assets/images/product/kidsbottle_front.webp'
import product5Img from 'src/assets/images/product/tumblr_front.webp'
import product6Img from 'src/assets/images/product/cup.webp'
import product7Img from 'src/assets/images/product/cap_front.webp'
import product8Img from 'src/assets/images/product/bandana.webp'
import product9Img from 'src/assets/images/product/book.webp'

const products = [
  {
    id: 1,
    image: product1Img,
    name: 'Coffee Beans\nOriginal Blend',
    href: 'https://store.samaa.world/items/134461225'
  },
  {
    id: 2,
    image: product2Img,
    name: 'Coffee Beans\nSingle Origin',
    href: 'https://store.samaa.world/items/134461258'
  },
  { id: 3, image: product3Img, name: '20oz Wide Mouth Bottle', href: 'https://store.samaa.world/items/127695141' },
  { id: 4, image: product4Img, name: '12oz Kids Bottle', href: 'https://store.samaa.world/items/127695186' },
  { id: 5, image: product5Img, name: '12oz Tumbler', href: 'https://store.samaa.world/items/127695109' },
  { id: 6, image: product6Img, name: 'One Kiln Cup', href: 'https://store.samaa.world/items/134461290' },
  { id: 7, image: product7Img, name: 'Logo Cap', href: 'https://store.samaa.world/items/134461325' },
  { id: 8, image: product8Img, name: 'Bandana', href: 'https://store.samaa.world/items/134461410' },
  { id: 9, image: product9Img, name: 'Brand Book', href: 'https://store.samaa.world/items/134461445' }
]

const SCROLL_SPEED = 35 // seconds to complete one full cycle (lower = faster)

const Product: React.FC = () => {
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const positionRef = useRef(0)
  const lastTimeRef = useRef(0)
  const configRef = useRef({
    itemWidth: 0,
    gap: 0,
    itemWithGap: 0,
    singleSetWidth: 0,
    startPosition: 0,
    pixelsPerSecond: 0
  })

  // duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products]

  useEffect(() => {
    const initCarousel = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const firstItem = container.children[0] as HTMLElement
      if (!firstItem) return

      const computedStyle = window.getComputedStyle(container)
      // const gap = parseFloat(computedStyle.gap) || 40
      const gapValue = parseFloat(computedStyle.gap)
      const gap = isNaN(gapValue) ? 40 : gapValue

      const itemWidth = firstItem.offsetWidth
      const itemWithGap = itemWidth + gap
      const singleSetWidth = itemWithGap * products.length
      const viewportWidth = window.innerWidth

      // calculate center offset for middle item
      const middleIndex = Math.floor(products.length / 2)
      const offsetToMiddle = middleIndex * itemWithGap
      const centerOffset = viewportWidth / 2 - itemWidth / 2
      const startPosition = centerOffset - offsetToMiddle

      // calculate speed: pixels per second (not per frame)
      const pixelsPerSecond = singleSetWidth / SCROLL_SPEED

      configRef.current = {
        itemWidth,
        gap,
        itemWithGap,
        singleSetWidth,
        startPosition,
        pixelsPerSecond
      }

      positionRef.current = startPosition
      lastTimeRef.current = performance.now()

      // console.log('config:', configRef.current)
    }

    // ===== carousel animate =====
    const animate = (currentTime: number) => {
      if (!containerRef.current) return
      const config = configRef.current

      // calculate delta time in seconds
      const deltaTime = (currentTime - lastTimeRef.current) / 1000
      lastTimeRef.current = currentTime
      // move position based on time elapsed (frame-rate independent)
      positionRef.current -= config.pixelsPerSecond * deltaTime
      // reset when we've scrolled one full set
      if (positionRef.current <= config.startPosition - config.singleSetWidth) {
        positionRef.current += config.singleSetWidth
      }

      // apply transform with translate3d, use toFixed for sub-pixel precision
      containerRef.current.style.transform = `translate3d(${positionRef.current.toFixed(2)}px, 0, 0)`
      animationRef.current = requestAnimationFrame(animate)
    }

    // ===== wait for all images to finish loading before init the carousel =====
    if (containerRef.current) {
      const container = containerRef.current
      const images = container.querySelectorAll('img')

      Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve()
          return new Promise((resolve) => {
            img.onload = resolve
            img.onerror = resolve
          })
        })
      ).then(() => {
        initCarousel()
        animationRef.current = requestAnimationFrame(animate)
      })
    }

    // ===== handle resize =====
    let resizeTimeout: any
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        initCarousel()
        animationRef.current = requestAnimationFrame(animate)
      }, 150)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <section className={styles.container}>
      {!isMobile && <Header logo={true} sidebar={false} />}

      <div className={styles.carousel}>
        <div className={styles.carouselContainer}>
          <div className={styles.carouselWrapper} ref={containerRef}>
            {duplicatedProducts.map((product, index) => (
              <a
                href={product.href}
                key={`${product.id}-${index}`}
                className={styles.carouselSlide}
                data-hover='disabled'
                target='_blank'
                rel='noopener noreferrer'
              >
                <picture>
                  <img src={product.image} alt={product.name} />
                </picture>
                <h2 className='fs'>{product.name}</h2>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <a className='fs u-hovertxt' href='https://store.samaa.world' target='_blank' rel='noopener noreferrer'>
          Available Here
        </a>
      </div>
    </section>
  )
}

export default Product
