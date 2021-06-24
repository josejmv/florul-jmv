// bootstrap components
import { Row, Col } from 'react-bootstrap'

// types
import type { FC } from 'react'
import { BookingStateType } from 'types/reducers'

export const Cart: FC<BookingStateType> = (props) => (
  <Row>
    {console.log('FROM SIDEBAR', props)}
    <Col xs={12}>
      <h3>{props.title}'s Box</h3>
    </Col>
    {props.date && (
      <>
        <Col xs={4}>
          <b>date:</b>
        </Col>
        <Col xs={8}>
          {props.date.getDate()}/{props.date.getMonth()}/
          {props.date.getFullYear()}
        </Col>
      </>
    )}
  </Row>
)
