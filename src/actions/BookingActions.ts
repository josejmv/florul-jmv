// types
import { BookingStateType, BookingActionPayload } from 'types/reducers'

export const handleChange = (
  state: BookingStateType,
  payload: BookingActionPayload
) => ({ ...state, [payload.name]: payload.value })

export const handleFlowers = (
  state: BookingStateType,
  payload: BookingActionPayload
) => {
  return state
}

export const handleAddons = (
  state: BookingStateType,
  payload: BookingActionPayload
) => {
  return state
}
