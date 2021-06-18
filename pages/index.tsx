// styles
import styles from 'styles/Home.module.scss'

// types
import type { FC } from 'react'

const Home: FC = () => (
  <div className={styles.container}>
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Florul</h1>
    </main>
  </div>
)

export default Home
