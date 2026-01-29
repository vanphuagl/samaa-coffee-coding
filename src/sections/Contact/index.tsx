import bgContactDesktop from 'src/assets/images/contact/bg.webp'
import styles from './contact.module.scss'

const Contact: React.FC = () => {
  return (
    <section
      className={styles.container}
      style={
        {
          '--bg-desktop': `url(${bgContactDesktop})`
        } as React.CSSProperties
      }
    >
      <div className={styles.center}>
        <a className='fs u-hovertxt' href='mailto:hello@samaa.world'>
          hello@samaa.world
        </a>
      </div>
      <div className={styles.bottom}>
        <p className='fs'>©︎ SAMAA_</p>
      </div>
    </section>
  )
}

export default Contact
