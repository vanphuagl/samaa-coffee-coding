import { Header } from 'src/components'
import { useIsMobile } from 'src/hooks'
import bgStoryDesktop from 'src/assets/images/story/slide04_bg.webp'
import bgStoryMobile from 'src/assets/images/story/slide04_bg_sp.webp'
import styles from './story.module.scss'

const Story: React.FC = () => {
  const isMobile = useIsMobile()

  return (
    <section
      className={styles.container}
      style={
        {
          '--bg-desktop': `url(${bgStoryDesktop})`,
          '--bg-mobile': `url(${bgStoryMobile})`
        } as React.CSSProperties
      }
    >
      {!isMobile && <Header logo={true} sidebar={false} />}
      <div className={styles.bottom}>
        <a
          className='fs u-hovertxt'
          href='https://store.samaa.world/items/134461445'
          target='_blank'
          rel='noopener noreferrer'
        >
          Read Our Story →
        </a>
      </div>
    </section>
  )
}

export default Story
