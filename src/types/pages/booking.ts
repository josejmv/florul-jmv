// types
import { Dispatch } from 'react'
import { BookingActionPayload } from 'types/reducers'

export type StepType = {
  dispatch: Dispatch<{ type: string; payload: BookingActionPayload }>
}

export type ReasonType = { type: string; attributes: { title: string } }

export type SizeType = {
  type: string
  id: string
  attributes: {
    title: string
    description: string
    image: string
  }
  relationships: {
    image: {
      type: string
      id: string
      attributes: {
        src: string
        alt: string
        width: number
        height: number
      }
    }
  }
}

export type SoakType = {
  type: string
  attributes: {
    color: string
    scent: string
    hex: string
  }
}
