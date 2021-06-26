// actions
import * as ACTION from 'actions/BookingActions'

// types
import { BookingStateType, BookingActionType } from 'types/reducers'

export const INITIAL_DATA: BookingStateType = {
  price: 0,
  date: null,
  message: '',
  imperfectPetals: false,
  imperfectHeads: false,
  flowers: [],
  addons: [],
  reason: {
    type: '',
    id: '',
    attributes: {
      title: '',
    },
  },
  size: {
    type: '',
    id: '',
    attributes: {
      title: '',
      description: '',
      image: '',
      price: 0,
    },
  },
  volume: {
    type: '',
    id: '',
    attributes: {
      image: '',
      title: '',
    },
  },
  soak: {
    type: '',
    id: '',
    attributes: {
      color: '',
      hex: '',
      scent: '',
    },
  },
}

export function BookingManagement(
  state: BookingStateType,
  action: BookingActionType
): BookingStateType {
  switch (action.type) {
    case 'handleChange':
      return ACTION.handleChange(state, action.payload)
    case 'handleAddItems':
      return ACTION.handleAddItems(state, action.payload)
    default:
      return { ...state }
  }
}
