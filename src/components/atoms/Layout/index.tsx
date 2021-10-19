// main tools
import { useRouter } from 'next/router'

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
}) => {
  const { asPath } = useRouter()
  const permalink = `${process.env.NEXT_PUBLIC_BASE_URL}${asPath}`

  return (
    <>
      <Head>
        <title>Florül {title && `| ${title}`}</title>
        <meta charSet='utf-8' />
        <meta name='keywords' content='Next.js,React.js,Vercel,florul' />
        <meta name='description' content='florul commerce' />
        <meta name='author' content='JoseJMV' />
        <meta name='copyright' content='JoseJMV' />
        <link rel='canonical' href={permalink} />
        <meta property='og:url' content={permalink} />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content={`Florül ${title ? `| ${title}` : ''}`}
        />
        <meta property='og:description' content='florul' />
        {/* <meta property='og:image' content={metaData.ogImage?.url} /> */}
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
}
