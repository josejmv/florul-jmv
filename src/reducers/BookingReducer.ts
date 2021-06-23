// actions
import * as ACTION from 'actions/BookingActions'

// types
import { BookingStateType, BookingActionType } from 'types/reducers'

export const INITIAL_DATA = {
  price: 0,
  date: null,
  title: '',
  message: '',
  size: '',
  soak: '',
  imperfectPetals: false,
  imperfectHeads: false,
  flowers: [],
  addons: [],
}

export function BookingManagement(
  state: BookingStateType,
  action: BookingActionType
): BookingStateType {
  switch (action.type) {
    case 'handleChange':
      return ACTION.handleChange(state, action.payload)
    case 'handleFlowers':
      return ACTION.handleFlowers(state, action.payload)
    case 'handleAddons':
      return ACTION.handleAddons(state, action.payload)
    default:
      return { ...state }
  }
}
