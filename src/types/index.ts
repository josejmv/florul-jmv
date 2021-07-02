import type { Dispatch, SetStateAction } from 'react'

export type HeaderType = {
  bg?: string
  setShowSidebar?: Dispatch<SetStateAction<boolean>>
  mobileSidebar?: boolean
}

export interface LayoutType extends HeaderType {
  title?: string
  fluid?: boolean
}
