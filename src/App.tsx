import { useEffect, useState } from 'react'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import { LanguageProvider } from './context/LanguageContext'
import SplashScreen from './components/common/SplashScreen'
import heroBackground from './assets/images/bg-section-one.avif'
import logoImage from './assets/images/logo.jpg'

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true)

  useEffect(() => {
    const preload = (src: string) => {
      const image = new Image()
      image.src = src
    }

    preload(heroBackground)
    preload(logoImage)

    const splashTimer = window.setTimeout(() => {
      setIsSplashVisible(false)
    }, 2000)

    return () => window.clearTimeout(splashTimer)
  }, [])

  return (
    <LanguageProvider>
      <>
        {isSplashVisible && <SplashScreen isVisible={isSplashVisible} />}
        {!isSplashVisible && (
          <MainLayout>
            <Home />
          </MainLayout>
        )}
      </>
    </LanguageProvider>
  )
}

export default App
