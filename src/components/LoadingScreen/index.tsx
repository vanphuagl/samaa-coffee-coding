import { useEffect, useCallback, useRef } from 'react'
import { useLottie } from 'lottie-react'
import gsap from 'gsap'
import { useAppContext } from 'src/context/AppContext'
import loadingAnimation from 'src/assets/animation/loading.json'
import styles from './loading.module.scss'

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const { setIsAppComplete } = useAppContext()

  const handleAnimationComplete = useCallback(() => {
    sessionStorage.setItem('isLoading', 'true')

    if (!containerRef.current) return
    const tl = gsap.timeline()

    tl.to(logoRef.current, {
      delay: 1,
      opacity: 0,
      duration: 0.15,
      ease: 'power2.out'
    }).to(containerRef.current, {
      delay: 1,
      opacity: 0,
      duration: 0.15,
      ease: 'power2.out',
      onComplete: () => {
        setIsAppComplete(true)
        onComplete()
      }
    })
  }, [onComplete, setIsAppComplete])

  const options = {
    animationData: loadingAnimation,
    loop: false,
    autoplay: false,
    onComplete: handleAnimationComplete
  }

  const { View, play } = useLottie(options)

  useEffect(() => {
    play()
  }, [play])

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={logoRef} className={styles.logo}>
        {View}
      </div>
    </div>
  )
}

export default LoadingScreen
