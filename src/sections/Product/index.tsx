import { useRef, useEffect } from 'react'
import { Header } from 'src/components'
import styles from './product.module.scss'

/* ---------------------------------- image --------------------------------- */
import product1Img from 'src/assets/images/product/product-1.webp'
import product2Img from 'src/assets/images/product/product-2.webp'
import product3Img from 'src/assets/images/product/product-3.webp'

const products = [
  { id: 1, image: product1Img, name: 'Wide Mouth Bottle 20oz' },
  { id: 2, image: product2Img, name: 'Sport Bottle 24oz' },
  { id: 3, image: product3Img, name: 'Travel Mug 16oz' },
  { id: 4, image: product1Img, name: 'Water Bottle 32oz' },
  { id: 5, image: product2Img, name: 'Coffee Cup 12oz' },
  { id: 6, image: product3Img, name: 'Insulated Bottle 25oz' },
  { id: 7, image: product1Img, name: 'Wide Mouth Bottle 20oz' },
  { id: 8, image: product2Img, name: 'Tumbler 20oz' },
  { id: 9, image: product3Img, name: 'Sports Flask 18oz' },
  { id: 10, image: product1Img, name: 'Hydro Bottle 30oz' },
  { id: 11, image: product2Img, name: 'Thermal Mug 14oz' },
  { id: 12, image: product3Img, name: 'Classic Bottle 22oz' }
]

const Product: React.FC = () => {
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
      const gap = parseFloat(computedStyle.gap) || 40

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
      const pixelsPerSecond = singleSetWidth / 35

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
      <Header logo={true} sidebar={false} />

      <div className={styles.carousel}>
        <div className={styles.carouselContainer}>
          <div className={styles.carouselWrapper} ref={containerRef}>
            {duplicatedProducts.map((product, index) => (
              <div key={`${product.id}-${index}`} className={styles.carouselSlide} data-hover='disabled'>
                <picture>
                  <img src={product.image} alt={product.name} />
                </picture>
                <h2 className='fs'>{product.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <a className='u-hovertxt' href='https://store.samaa.world' target='_blank' rel='noopener noreferrer'>
          Available Here
        </a>
      </div>
    </section>
  )
}

export default Product
