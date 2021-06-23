export type BookingStateType = {
  price: number
  date: Date
  title: string
  message: string
  size: string
  soak: string
  imperfectPetals: boolean
  imperfectHeads: boolean
  flowers: string[]
  addons: string[]
}

export type BookingActionType = {
  type: string
  payload: BookingActionPayload
}

export type BookingActionPayload = {
  name: string
  value: number | Date | string | boolean | string[]
}
