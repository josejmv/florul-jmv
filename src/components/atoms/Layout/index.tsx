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
  fluid = false,
  setShowSidebar,
  mobileSidebar,
  children,
}) => (
  <>
    <Head>
      <title>Florül {title && `| ${title}`}</title>
    </Head>

    <Header
      bg={bg}
      mobileSidebar={mobileSidebar}
      setShowSidebar={setShowSidebar}
    />
    <Container fluid={fluid} as='main' className='py-5'>
      {children}
    </Container>
  </>
)
