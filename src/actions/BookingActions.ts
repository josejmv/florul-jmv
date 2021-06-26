// types
import { BookingStateType, BookingActionPayload } from 'types/reducers'
import { FlowerType, AddonType } from 'types/pages/booking'

export const handleChange = (
  state: BookingStateType,
  payload: BookingActionPayload
) => ({ ...state, [payload.name]: payload.value })

export const handleAddItems = (
  state: BookingStateType,
  payload: BookingActionPayload
) => ({
  ...state,
  [payload.name]: [
    ...state[payload.name].filter(
      (item: FlowerType | AddonType) => item !== payload.value
    ),
    payload.value,
  ],
})
