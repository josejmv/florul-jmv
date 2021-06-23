// main tools
import { useReducer, useState, useEffect } from 'react'

// bootstrap components
import { ProgressBar, Button, Row, Col } from 'react-bootstrap'

// components
import { Layout } from '@atoms/index'
import * as STEPS from 'components/pages/booking/steps'

// reducers
import { INITIAL_DATA, BookingManagement } from 'reducers/BookingReducer'

import styles from 'styles/pages/booking/main.module.scss'

// types
import type { FC } from 'react'

const Booking: FC = () => {
  const [key, setKey] = useState(10)
  const [data, dispatch] = useReducer(BookingManagement, INITIAL_DATA)

  const steps = {
    10: <STEPS.Reason dispatch={dispatch} />,
    20: <STEPS.DateOfEvent dispatch={dispatch} />,
  }

  const handleNextStep = () => setKey(key < 20 ? key + 10 : key)
  const handlePrevStep = () => setKey(key > 10 ? key - 10 : key)

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Layout bg='white' title='booking'>
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
