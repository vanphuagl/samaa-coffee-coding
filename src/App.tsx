import { useState } from 'react'
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

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

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
