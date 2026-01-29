import { useState } from 'react'
import { useIsMobile } from 'src/hooks'
import { LoadingScreen } from 'src/components'
import { DesktopLayout, MobileLayout } from 'src/layouts'

const App: React.FC = () => {
  const isMobile = useIsMobile()
  const [showLoading, setShowLoading] = useState(() => {
    const hasShownLoading = sessionStorage.getItem('isLoading')
    return hasShownLoading !== 'true'
  })

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!showLoading && <main>{isMobile ? <MobileLayout /> : <DesktopLayout />}</main>}
    </>
  )
}

export default App
