import { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, HashNavigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

import { CustomCursor } from 'src/components'
import { Hero, Intro, Menu, Story, Product, Contact } from 'src/sections'
import styles from './desktop.module.scss'

interface SlideConfigsProps {
  id: string
  hash: string
  Component: React.ComponentType
  invertColor?: boolean
}

const slideConfigs: SlideConfigsProps[] = [
  { id: '1', hash: 'hero', Component: Hero },
  { id: '2', hash: 'intro', Component: Intro, invertColor: true },
  { id: '3', hash: 'menu', Component: Menu },
  { id: '4', hash: 'story', Component: Story },
  { id: '5', hash: 'product', Component: Product },
  { id: '6', hash: 'contact', Component: Contact, invertColor: true }
]

const DesktopLayout: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null)
  const [isLeftHalf, setIsLeftHalf] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // ===== detect hover on links =====
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], [data-hover="disabled"]')) {
        setIsHoveringLink(true)
      } else {
        setIsHoveringLink(false)
      }
    }
    document.addEventListener('mouseover', handleMouseOver)
    return () => document.removeEventListener('mouseover', handleMouseOver)
  }, [])

  // ===== handle next/prev swiper =====
  const handleNavigationSwiper = (e: React.MouseEvent) => {
    if (!swiperRef.current) return

    const target = e.target as HTMLElement
    if (target.closest('a')) {
      return
    }

    const isLeftHalf = e.clientX < window.innerWidth / 2

    if (isLeftHalf) {
      swiperRef.current.slidePrev()
    } else {
      swiperRef.current.slideNext()
    }
  }

  // ===== handle mouse move =====
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
    setIsLeftHalf(e.clientX < window.innerWidth / 2)
  }

  // ===== detect color cursor =====
  const shouldInvertColor = slideConfigs[currentSlideIndex]?.invertColor || false

  return (
    <div className={styles.container} onClick={handleNavigationSwiper} onMouseMove={handleMouseMove}>
      <CustomCursor
        isLeftHalf={isLeftHalf}
        position={cursorPos}
        isHidden={isHoveringLink}
        invertColor={shouldInvertColor}
      />
      <Swiper
        modules={[Keyboard, HashNavigation]}
        slidesPerView={1}
        speed={0}
        loop={true}
        allowTouchMove={false}
        keyboard={{
          enabled: true,
          onlyInViewport: true
        }}
        // hashNavigation={{
        //   watchState: true,
        //   replaceState: true
        // }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => {
          setCurrentSlideIndex(swiper.realIndex)
        }}
      >
        {slideConfigs.map(({ id, hash, Component }) => (
          <SwiperSlide key={id} data-hash={hash}>
            <Component />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default DesktopLayout
