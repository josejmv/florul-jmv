// main tools
import { useState } from 'react'

// prime components
import { Toast } from 'primereact/toast'

// context
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'styles/globals.scss'
import styles from 'styles/app.module.scss'

// types
import type { FC } from 'react'
import type { AppProps } from 'next/app'
import type { AppUtilsType } from 'types/context'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [showToast, setShowToast] = useState<Toast>(undefined)
  const context: AppUtilsType = { showToast }

  const handleSetToast = (el: Toast) => setShowToast(el)

  return (
    <>
      <Toast
        className={styles.toast}
        ref={handleSetToast}
        position='bottom-left'
      />

      <GlobalUtils.Provider value={context}>
        <Component {...pageProps} />
      </GlobalUtils.Provider>
    </>
  )
}

export default MyApp
