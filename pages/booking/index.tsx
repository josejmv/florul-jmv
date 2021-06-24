// main tools
import { useReducer, useState } from 'react'

// bootstrap components
import { ProgressBar, Button, Row, Col } from 'react-bootstrap'

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
  const [showSidebar, setShowSidebar] = useState(false)
  const [key, setKey] = useState(10)
  const [data, dispatch] = useReducer(BookingManagement, INITIAL_DATA)

  const steps = {
    10: <STEPS.Reason dispatch={dispatch} />,
    20: <STEPS.DateOfEvent dispatch={dispatch} />,
  }

  const handleNextStep = () => setKey(key < 20 ? key + 10 : key)
  const handlePrevStep = () => setKey(key > 10 ? key - 10 : key)

  return (
    <Layout bg='white' title='booking' setShowSidebar={setShowSidebar}>
      <Sidebar
        visible={showSidebar}
        onHide={() => setShowSidebar(false)}
        position='right'
      >
        <Cart {...data} />
      </Sidebar>
      <ProgressBar className={styles.progressBar} now={key} variant='dark' />

      {steps[key as keyof typeof steps]}

      <Row className={styles.buttons}>
        <Col xs={6} md={3}>
          <Button
            block
            className={styles.button}
            onClick={handlePrevStep}
            variant='primary'
            size='lg'
          >
            Back
          </Button>
        </Col>
        <Col xs={6} md={3}>
          <Button
            block
            className={styles.button}
            onClick={handleNextStep}
            variant='primary'
            size='lg'
          >
            Continue
          </Button>
        </Col>
      </Row>
    </Layout>
  )
}

export default Booking
