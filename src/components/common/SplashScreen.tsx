import { motion } from 'framer-motion'
import logoImage from '../../assets/images/logo.jpg'

type SplashScreenProps = {
  isVisible: boolean
}

function SplashScreen({ isVisible }: SplashScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="splash-screen"
      aria-hidden={!isVisible}
    >
      <motion.div
        initial={{ opacity: 0.65, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="splash-logo-wrap"
      >
        <img src={logoImage} alt="Nazirov Holding logo" className="splash-logo-image" />
      </motion.div>
    </motion.div>
  )
}

export default SplashScreen
