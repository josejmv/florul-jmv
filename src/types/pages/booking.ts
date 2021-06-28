// types
import { Dispatch, SetStateAction } from 'react'
import { BookingActionPayload, BookingStateType } from 'types/reducers'

export type StepType = {
  dispatch: Dispatch<{ type: string; payload: BookingActionPayload }>
  setKey?: Dispatch<SetStateAction<number>>
  data: BookingStateType
}

export type ReasonType = {
  type: string
  id: string
  attributes: { title: string }
}

export type SizeType = {
  type: string
  id: string
  attributes: {
    title: string
    description: string
    price: number
    image: string
  }
  relationships?: {
    image: ImageType
  }
}

export type VolumeType = {
  type: string
  id: string
  attributes: {
    title: string
    price: number
    image: string
  }
  relationships?: {
    image: ImageType
  }
}

export type SoakType = {
  type: string
  id: string
  attributes: {
    color: string
    scent: string
    hex: string
    price: number
  }
}

export type FlowerType = {
  type: string
  id: string
  attributes: {
    name: string
    scientictName: string
    description: string
    images: string[]
    origin: string
    commonlyFound: boolean
    highPrice: number
    lowPrice: number
    popularity: number
  }
  relationships?: {
    images: ImageType[]
  }
}

export type AddonType = {
  type: string
  id: string
  attributes: {
    taxonomy: string
    company: string
    unitDescription: string
    image: string
    description: string
    price: number
    weight: number
    volume: number
    shelfLife: number
    premiumScale: number
    dimension: number[]
    sourceGPS: number[]
  }
  relationships?: {
    taxonomy: TaxonomyType
    company: CompanyType
    image: ImageType
  }
}

export type TaxonomyType = {
  type: string
  id: string
  attributes: {
    category: string
    name: string
    images: string[]
  }
  relationships: {
    images: ImageType[]
  }
}

export type CompanyType = {
  type: string
  id: string
  attributes: {
    owner: string
    name: string
    locale: string
    adress: string
    phone: string
    website: string
  }
}

export type ImageType = {
  type: string
  id: string
  attributes: {
    src: string
    alt: string
    width: number
    height: number
  }
}
