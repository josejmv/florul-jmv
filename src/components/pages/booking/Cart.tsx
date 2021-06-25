// bootstrap components
import { Row, Col } from 'react-bootstrap'

// types
import type { FC } from 'react'
import { BookingStateType } from 'types/reducers'

export const Cart: FC<BookingStateType> = (props) => (
  <Row>
    {console.log(props)}
    {props.title && (
      <Col xs={12}>
        <h3>{props.title}'s Box</h3>
      </Col>
    )}
    {props.date && (
      <>
        <Col xs={5}>
          <b>date:</b>
        </Col>
        <Col xs={7}>
          {props.date.getDate()}/{props.date.getMonth()}/
          {props.date.getFullYear()}
        </Col>
      </>
    )}
    {props.size && (
      <>
        <Col xs={5}>
          <b>Bath size:</b>
        </Col>
        <Col xs={7}>{props.size}</Col>
      </>
    )}
    {props.soak && (
      <>
        <Col xs={5}>
          <b>Bath soak:</b>
        </Col>
        <Col xs={7}>{props.soak}</Col>
      </>
    )}
  </Row>
)
