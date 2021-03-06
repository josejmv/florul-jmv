// main tools
import { createContext } from 'react'

// types
import type { AppUtilsType } from 'types/context'

export const GlobalUtils = createContext<AppUtilsType>({ showToast: null })
