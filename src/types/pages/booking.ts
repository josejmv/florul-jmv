// types
import { Dispatch } from 'react'
import { BookingActionPayload } from 'types/reducers'

export type StepType = {
  dispatch: Dispatch<{ type: string; payload: BookingActionPayload }>
}

export type ReasonType = { type: string; attributes: { title: string } }
