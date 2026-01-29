import { useLottie } from 'lottie-react'
import { Header } from 'src/components'
import logoAnimation from 'src/assets/animation/logo.json'
import styles from './hero.module.scss'

const Hero: React.FC = () => {
  const option = {
    animationData: logoAnimation,
    loop: true,
    autoplay: true
  }
  const { View } = useLottie(option)

  return (
    <section className={styles.container}>
      <Header logo={false} sidebar={true} />
      <div className={styles.logo}>{View}</div>
      <div className={styles.bottom}>
        <div className={styles.icon}>
          <p>☕️</p>
          <p>🥯</p>
          <p>🍷</p>
          <p>♻️</p>
        </div>
        <div className={`${styles.address} fs`}>
          <p>Open daily 9am-10pm</p>
          <a
            className='u-hovertxt'
            href='https://maps.app.goo.gl/sfEYNpeuPDRX4Mhg9'
            target='_blank'
            rel='noopener noreferrer'
            onClick={(e) => e.stopPropagation()}
          >
            1-33-7 Kamiuma, Setagaya,
            <br /> Tokyo 1540011 Japan
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
