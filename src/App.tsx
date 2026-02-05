import { useEffect, useState } from 'react'
import { useIsMobile } from 'src/hooks'
import { LoadingScreen } from 'src/components'
import { AppProvider } from 'src/context/AppContext'
import { DesktopLayout, MobileLayout } from 'src/layouts'

const App: React.FC = () => {
  const isMobile = useIsMobile()
  const [showLoading, setShowLoading] = useState(() => {
    const hasShownLoading = sessionStorage.getItem('isLoading')
    return hasShownLoading !== 'true'
  })

  // ===== handle loading =====
  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  // ===== handle app-height =====
  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${document.documentElement.clientHeight}px`)
    }
    appHeight()
    window.addEventListener('resize', appHeight)
    return () => window.removeEventListener('resize', appHeight)
  }, [])

  return (
    <AppProvider>
      <>
        {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        <main>{isMobile ? <MobileLayout /> : <DesktopLayout />}</main>
      </>
    </AppProvider>
  )
}

export default App
