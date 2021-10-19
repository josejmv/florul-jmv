// main tools
import { useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'

// styles
import styles from 'styles/pages/booking/payment.module.scss'

// types
import type { FC } from 'react'
import type { StepType } from 'types/pages/booking'

export const Payment: FC<StepType> = ({ data, setKey, dispatch }) => {
  const [method, setMethod] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [open, setOpen] = useState(false)

  const handlePaymentModal = () => {
    if (method !== '') setOpen(true)
    else setInvalid(true)
  }

  const handleClick = (method: string) => {
    setInvalid(false)
    setMethod(method)
  }

  const handleNextStep = () => setKey((prev) => prev + 10)
  const handlePrevStep = () => setKey((prev) => prev - 5)

  return (
    <>
      <Container>
        <Row className={styles.row}>
          <Col xs={12} className='text-center'>
            <h1 className={styles.title}>Payment</h1>
            <h4>
              <b>Total: ${data.price}</b>
            </h4>
          </Col>
        </Row>

        <Row className={`justify-content-center ${styles.row}`}>
          <Col xs={6}>
            <Row className={styles.row}>
              {invalid && (
                <Col>
                  <p className={styles.invalid}>
                    Please choose a payment method
                  </p>
                </Col>
              )}
              <Col xs={12}>
                <Button
                  block
                  variant='dark'
                  size='lg'
                  onClick={() => handleClick('paypal')}
                  className={styles.payments}
                >
                  Paypal
                  {method === 'paypal' && (
                    <i className={`pi pi-check-circle ${styles.checked}`} />
                  )}
                </Button>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col xs={12}>
                <h5>Billing Details</h5>
              </Col>
            </Row>
          </Col>
        </Row>

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
              onClick={handlePaymentModal}
              variant='primary'
              size='lg'
            >
              Check out
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal centered show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <h4>
            <b>{method}</b>
          </h4>
        </Modal.Header>
        <Modal.Body>
          <h6>Thanks for your payment</h6>
        </Modal.Body>
      </Modal>
    </>
  )
}
