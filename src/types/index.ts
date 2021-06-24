import type { Dispatch, SetStateAction } from 'react'

export interface LayoutType extends HeaderType {
  title?: string
}

export type HeaderType = {
  bg?: string
  setShowSidebar?: Dispatch<SetStateAction<boolean>>
}
