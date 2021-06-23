// main tools
import { useState } from 'react'

// prime components
import { Sidebar } from 'primereact/sidebar'
import { Toast } from 'primereact/toast'

// context
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'styles/globals.scss'

// types
import type { FC } from 'react'
import type { AppProps } from 'next/app'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showToast, setShowToast] = useState<Toast>(undefined)
  const context = { setShowSidebar, showToast }

  const handleShowSidebar = () => setShowSidebar(false)
  const handleSetToast = (el: Toast) => setShowToast(el)

  return (
    <>
      <Sidebar
        visible={showSidebar}
        onHide={handleShowSidebar}
        position='right'
      />
      <Toast ref={handleSetToast} position='bottom-left' />

      <GlobalUtils.Provider value={context}>
        <Component {...pageProps} />
      </GlobalUtils.Provider>
    </>
  )
}

export default MyApp
