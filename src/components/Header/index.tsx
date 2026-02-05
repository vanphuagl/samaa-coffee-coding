import { useEffect, useRef } from 'react'
import { useIsMobile } from 'src/hooks'
import styles from './header.module.scss'

interface HeaderProps {
  logo?: boolean
  sidebar?: boolean
  color?: string
}

const Header: React.FC<HeaderProps> = ({ logo = false, sidebar = true, color }) => {
  const isMobile = useIsMobile()
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMobile || !sidebar || !sidebarRef.current) return
    const introSections = document.querySelectorAll('[data-intro]')
    const pTags = sidebarRef.current.querySelectorAll('p')

    const checkIntersection = () => {
      pTags.forEach((pTag) => {
        const pRect = pTag.getBoundingClientRect()
        let isOverlapping = false

        introSections.forEach((intro) => {
          const introRect = intro.getBoundingClientRect()
          if (pRect.top < introRect.bottom && pRect.bottom > introRect.top) {
            isOverlapping = true
          }
        })
        pTag.classList.toggle('white-text', isOverlapping)
      })
    }

    // Check each frame for a smooth transition
    let animationFrameId: number
    const animate = () => {
      checkIntersection()
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile, sidebar])

  return (
    <div className={styles.container}>
      {logo && (
        <div className={`${styles.logo} pc-only`}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width={200}
            height='33.59'
            viewBox='0 0 200 33.59'
          >
            <defs>
              <clipPath id='clip-path-header-logo'>
                <rect
                  id='Rectangle_1'
                  data-name='Rectangle 1'
                  width={200}
                  height='33.59'
                  transform='translate(0 0)'
                  fill='#e03c31'
                />
              </clipPath>
            </defs>
            <g id='logo' transform='translate(0.251 -0.549)'>
              <g
                id='Group_1'
                data-name='Group 1'
                transform='translate(-0.251 0.549)'
                clipPath='url(#clip-path-header-logo)'
              >
                <path
                  id='Path_1'
                  data-name='Path 1'
                  d='M437.119,97.761h6.03a2.264,2.264,0,0,0,2.127-3.041l-3.034-8.306a2.264,2.264,0,0,0-4.257.009l-3,8.306a2.264,2.264,0,0,0,2.13,3.033'
                  transform='translate(-387.262 -75.789)'
                  fill='#e03c31'
                />
                <path
                  id='Path_2'
                  data-name='Path 2'
                  d='M395.252,239.727l-1.316,3.648a2.015,2.015,0,0,0,1.9,2.7h15.556a2.015,2.015,0,0,0,1.893-2.706l-1.333-3.649a2.264,2.264,0,0,0-2.127-1.487H397.382a2.264,2.264,0,0,0-2.13,1.5'
                  transform='translate(-350.709 -212.338)'
                  fill='#e03c31'
                />
                <path
                  id='Path_3'
                  data-name='Path 3'
                  d='M86.259,32.693a7.519,7.519,0,0,0-4.772-1.511,6.627,6.627,0,0,0-4.606,1.37A4.6,4.6,0,0,0,75.393,36.1a4.333,4.333,0,0,0,1.016,3.046,6.475,6.475,0,0,0,2.717,1.7q1.7.592,3.732,1.111a29.239,29.239,0,0,1,3.124.99,1.961,1.961,0,0,0,2.639-1.84V37.318a4.424,4.424,0,0,0-.109-.988,6.216,6.216,0,0,0-2.253-3.637'
                  transform='translate(-67.089 -27.918)'
                  fill='#e03c31'
                />
                <path
                  id='Path_4'
                  data-name='Path 4'
                  d='M59.563,167.924a6.4,6.4,0,0,0,2.645,1.984,9.092,9.092,0,0,0,3.5.662,8.5,8.5,0,0,0,4.866-1.228,4.463,4.463,0,0,0,1.8-3.969,4.725,4.725,0,0,0-.992-3.213,6.7,6.7,0,0,0-2.764-1.8,36.727,36.727,0,0,0-4.087-1.228,24.469,24.469,0,0,1-3.227-1.143,2.265,2.265,0,0,0-3.151,2.083v3.5a7.125,7.125,0,0,0,.877,3.549,6.627,6.627,0,0,0,.54.8'
                  transform='translate(-51.727 -140.708)'
                  fill='#e03c31'
                />
                <path
                  id='Path_5'
                  data-name='Path 5'
                  d='M792.748,140.413a2.264,2.264,0,0,0-4.359.858v14.156a2.264,2.264,0,0,0,2.264,2.264h5.8a2.264,2.264,0,0,0,2.1-3.123Z'
                  transform='translate(-702.158 -123.956)'
                  fill='#e03c31'
                />
                <path
                  id='Path_6'
                  data-name='Path 6'
                  d='M1298.166,97.761h6.03a2.264,2.264,0,0,0,2.127-3.041l-3.034-8.306a2.264,2.264,0,0,0-4.256.009l-3,8.306a2.264,2.264,0,0,0,2.13,3.033'
                  transform='translate(-1154.201 -75.789)'
                  fill='#e03c31'
                />
                <path
                  id='Path_7'
                  data-name='Path 7'
                  d='M1256.3,239.727l-1.316,3.648a2.015,2.015,0,0,0,1.9,2.7h15.556a2.015,2.015,0,0,0,1.893-2.706l-1.333-3.649a2.265,2.265,0,0,0-2.127-1.487h-12.439a2.265,2.265,0,0,0-2.13,1.5'
                  transform='translate(-1117.647 -212.338)'
                  fill='#e03c31'
                />
                <path
                  id='Path_8'
                  data-name='Path 8'
                  d='M1650.944,239.727l-1.316,3.648a2.015,2.015,0,0,0,1.9,2.7h15.556a2.015,2.015,0,0,0,1.893-2.706l-1.332-3.649a2.265,2.265,0,0,0-2.127-1.487h-12.439a2.265,2.265,0,0,0-2.13,1.5'
                  transform='translate(-1469.161 -212.338)'
                  fill='#e03c31'
                />
                <path
                  id='Path_9'
                  data-name='Path 9'
                  d='M951.767,140.413a2.264,2.264,0,0,1,4.359.858v14.156a2.264,2.264,0,0,1-2.264,2.264h-5.8a2.264,2.264,0,0,1-2.095-3.123Z'
                  transform='translate(-842.357 -123.956)'
                  fill='#e03c31'
                />
                <path
                  id='Path_10'
                  data-name='Path 10'
                  d='M843.668,0h-14.5a2.264,2.264,0,0,0-2.092,3.13l7.28,17.588a2.218,2.218,0,0,0,4.12,0L845.76,3.13A2.264,2.264,0,0,0,843.668,0'
                  transform='translate(-736.465 -0.144)'
                  fill='#e03c31'
                />
                <path
                  id='Path_11'
                  data-name='Path 11'
                  d='M1693.072,97.761h6.03a2.264,2.264,0,0,0,2.127-3.041l-3.034-8.306a2.264,2.264,0,0,0-4.256.009l-3,8.306a2.264,2.264,0,0,0,2.13,3.033'
                  transform='translate(-1505.946 -75.789)'
                  fill='#e03c31'
                />
              </g>
            </g>
          </svg>
        </div>
      )}
      {sidebar && (
        <div ref={sidebarRef} className={styles.sidebar} style={{ color: color }}>
          <p>さまあ</p>
          <p>美しい未来</p>
        </div>
      )}
    </div>
  )
}

export default Header
