import { Hero, Intro, Menu, Story, Product, Contact } from 'src/sections'
import { MobileInfiniteScroll } from 'src/components'
import styles from './mobile.module.scss'

const MobileLayout: React.FC = () => {
  return (
    <MobileInfiniteScroll
      className={styles.container}
      autoStartDelay={4000}
      speed={0.5}
      sensitivity={1.1}
      momentumMultiplier={0.03}
      decayRate={0.007}
      smoothing={0.5}
    >
      <div className={styles.firstpass}>
        <Hero />
        <Intro />
        <Menu />
        <Story />
        <Product />
        <Contact />
      </div>
      <div className={styles.secondpass}>
        <Hero />
        <Intro />
        <Menu />
        <Story />
        <Product />
        <Contact />
      </div>
    </MobileInfiniteScroll>
  )
}

export default MobileLayout
