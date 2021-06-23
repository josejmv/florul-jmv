// main types
import type { Dispatch, SetStateAction } from 'react'

// prime types
import type { Toast } from 'primereact/toast'

export type AppUtilsType = {
  setShowSidebar: Dispatch<SetStateAction<boolean>> | null
  showToast: Toast | null
}
