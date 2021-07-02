// main tools
import { useReducer, useState } from 'react'

// bootstrap components
import { Row, Col, ProgressBar } from 'react-bootstrap'

// prime components
import { Sidebar } from 'primereact/sidebar'

// components
import { Layout } from '@atoms/index'
import * as STEPS from 'components/pages/booking/steps'
import { Cart } from 'components/pages/booking/Cart'

// reducers
import { INITIAL_DATA, BookingManagement } from 'reducers/BookingReducer'

// styles
import styles from 'styles/pages/booking/main.module.scss'

// types
import type { FC } from 'react'

const Booking: FC = () => {
  const [key, setKey] = useState(10)
  const [showSidebar, setShowSidebar] = useState(false)
  const [data, dispatch] = useReducer(BookingManagement, INITIAL_DATA)

  const steps = {
    10: <STEPS.Reason data={data} dispatch={dispatch} setKey={setKey} />,
    20: <STEPS.DateOfEvent data={data} dispatch={dispatch} setKey={setKey} />,
    30: <STEPS.Size data={data} dispatch={dispatch} setKey={setKey} />,
    40: <STEPS.Volume data={data} dispatch={dispatch} setKey={setKey} />,
    50: <STEPS.Soak data={data} dispatch={dispatch} setKey={setKey} />,
    60: <STEPS.Flowers data={data} dispatch={dispatch} setKey={setKey} />,
    70: <STEPS.Addons data={data} dispatch={dispatch} setKey={setKey} />,
    80: <STEPS.Resume data={data} setKey={setKey} />,
    85: <STEPS.Shipping data={data} dispatch={dispatch} setKey={setKey} />,
    90: <STEPS.Payment data={data} dispatch={dispatch} setKey={setKey} />,
  }

  return (
    <Layout
      fluid
      mobileSidebar
      setShowSidebar={setShowSidebar}
      bg='white'
      title='booking'
    >
      <Row>
        <Col className='mx-auto' md={7} lg={8}>
          <ProgressBar
            className={styles.progressBar}
            now={key}
            variant='dark'
          />
          {steps[key as keyof typeof steps]}
        </Col>
        <Col className={styles.cart} md={3} lg={2}>
          <Cart {...data} />
        </Col>
      </Row>
      <Sidebar
        position='right'
        visible={showSidebar}
        onHide={() => setShowSidebar(false)}
      >
        <Cart {...data} />
      </Sidebar>
    </Layout>
  )
}

export default Booking
