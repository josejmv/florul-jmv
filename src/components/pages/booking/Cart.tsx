// main components
import { Fragment } from 'react'

// bootstrap components
import { Row, Col } from 'react-bootstrap'

// types
import type { FC } from 'react'
import type { BookingStateType } from 'types/reducers'
import type { FlowerType, AddonType } from 'types/pages/booking'

export const Cart: FC<BookingStateType> = (props) => {
  const getPrice = (): number => {
    let price = props.size.attributes.price || 0
    price += props.volume.attributes.price || 0
    price += props.soak.attributes.price || 0
    props.addons.map((addon: AddonType) => {
      price += addon.attributes.price || 0
    })
    props.flowers.map((flower: FlowerType) => {
      price += flower.attributes.highPrice || 0
    })

    return price
  }

  return (
    <Row>
      {props.reason.attributes.title && (
        <Col xs={12}>
          <h3>{props.reason.attributes.title}&apos;s Box</h3>
        </Col>
      )}
      {props.date && (
        <>
          <Col xs={6}>
            <b>date:</b>
          </Col>
          <Col xs={6}>
            {props.date.getDate()}/{props.date.getMonth()}/
            {props.date.getFullYear()}
          </Col>
        </>
      )}
      {props.size.attributes.title && (
        <>
          <Col className='mt-3' xs={12}>
            <b>Bath size:</b>
          </Col>
          <Col xs={6}>{props.size.attributes.title}</Col>
          <Col xs={6}>{props.size.attributes.price}$</Col>
        </>
      )}
      {props.volume.attributes.title && (
        <>
          <Col className='mt-3' xs={12}>
            <b>Flower volume:</b>
          </Col>
          <Col xs={6}>{props.volume.attributes.title}</Col>
          <Col xs={6}>{props.volume.attributes.price}$</Col>
        </>
      )}
      {props.soak.attributes.color && (
        <>
          <Col className='mt-3' xs={12}>
            <b>Bath soak:</b>
          </Col>
          <Col xs={6}>{props.soak.attributes.color}</Col>
          <Col xs={6}>{props.soak.attributes.price}$</Col>
        </>
      )}
      {props.flowers.length > 0 && (
        <>
          <Col className='mt-3' xs={12}>
            <b>Flowers:</b>
          </Col>
          {props.flowers.map((flower: FlowerType, idx) => (
            <Fragment key={idx}>
              <Col xs={6}>{flower.attributes.name}</Col>
              <Col xs={6}>{flower.attributes.highPrice}$</Col>
            </Fragment>
          ))}
        </>
      )}
      {props.addons.length > 0 && (
        <>
          <Col className='mt-3' xs={12}>
            <b>Addons:</b>
          </Col>
          {props.addons.map((addon: AddonType, idx) => (
            <Fragment key={idx}>
              <Col xs={6}>{addon.relationships.taxonomy.attributes.name}</Col>
              <Col xs={6}>{addon.attributes.price}$</Col>
            </Fragment>
          ))}
        </>
      )}
      {props.reason.attributes.title && (
        <>
          <Col className='mt-5' xs={6}>
            <b>Price: </b>
          </Col>
          <Col className='mt-5' xs={6}>
            <p>{getPrice()}$</p>
          </Col>
        </>
      )}
    </Row>
  )
}
