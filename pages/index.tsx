// next components
import Link from 'next/link'

// components
import { Layout } from 'components/atoms'

// bootstrap components
import { Button } from 'react-bootstrap'

// styles
import styles from 'styles/home.module.scss'

// types
import type { FC } from 'react'

const Home: FC = () => (
  <Layout>
    <div className={styles.container}>
      <h1>Welcome to Florül</h1>
      <Link passHref href='/booking'>
        <Button as='a' variant='secondary'>
          Prepare your box
        </Button>
      </Link>
    </div>
  </Layout>
)

export default Home
