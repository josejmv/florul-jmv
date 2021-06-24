// next components
import Head from 'next/head'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { Header } from '@molecules/index'

// types
import { FC } from 'react'
import type { LayoutType } from 'types'

export const Layout: FC<LayoutType> = ({
  title,
  bg,
  setShowSidebar,
  children,
}) => (
  <>
    <Head>
      <title>Florül {title && `| ${title}`}</title>
    </Head>

    <Header bg={bg} setShowSidebar={setShowSidebar} />
    <Container as='main' className='py-5'>
      {children}
    </Container>
  </>
)
