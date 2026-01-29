import { useEffect, useCallback } from 'react'
import { useLottie } from 'lottie-react'
import loadingAnimation from 'src/assets/animation/loading.json'
import styles from './loading.module.scss'

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const handleAnimationComplete = useCallback(() => {
    sessionStorage.setItem('isLoading', 'true')
    onComplete()
  }, [onComplete])

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

  return <div className={styles.container}>{View}</div>
}

export default LoadingScreen
