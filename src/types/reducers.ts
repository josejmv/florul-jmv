import {
  ReasonType,
  SizeType,
  VolumeType,
  SoakType,
  FlowerType,
  AddonType,
  ShippingType,
} from 'types/pages/booking'

export type BookingStateType = {
  price: number
  date: Date
  message: string
  reason: ReasonType
  size: SizeType
  volume: VolumeType
  soak: SoakType
  imperfectPetals: boolean
  imperfectHeads: boolean
  shipping: ShippingType
  flowers: FlowerType[]
  addons: AddonType[]
}

export type BookingActionType = {
  type: string
  payload: BookingActionPayload
}

export type BookingActionPayload = {
  name: string
  value:
    | ReasonType
    | SoakType
    | number
    | Date
    | string
    | boolean
    | FlowerType
    | AddonType
    | string[]
    | FlowerType[]
    | AddonType[]
    | SizeType
    | VolumeType
    | ShippingType
  idx?: number
}
