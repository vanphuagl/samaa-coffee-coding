import { useState, useEffect } from 'react'

const useIsMobile = (breakpoint: number = 1023): boolean => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkScreen = () => {
      setIsMobile(window.innerWidth <= breakpoint)
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [breakpoint])

  return isMobile
}

export default useIsMobile
