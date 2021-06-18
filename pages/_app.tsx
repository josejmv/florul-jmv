// styles
import 'styles/globals.scss'

// types
import type { FC } from 'react'
import type { AppProps } from 'next/app'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default MyApp
