// main tools
import { useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// prime components
import { RadioButton } from 'primereact/radiobutton'

// styles
import styles from 'styles/pages/booking/shipping.module.scss'

// types
import type { FC } from 'react'
import type { StepType } from 'types/pages/booking'

export const Shipping: FC<StepType> = ({ data, setKey, dispatch }) => {
  const [validate, setValidate] = useState(false)

  const handlePrevStep = () => setKey((prev) => prev - 5)
  const handleNextStep = () => {
    if (data.shipping !== 0) setKey((prev) => prev + 5)
    else setValidate(true)
  }

  const handleChange = (days: number) => {
    validate && setValidate(false)
    dispatch({
      type: 'handleChange',
      payload: { name: 'shipping', value: days },
    })
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={7}>
          <h1 className={styles.title}>Shipping Details</h1>
          <h4>
            Event date: {data.date.getDate()}/{data.date.getMonth()}/
            {data.date.getFullYear()}
          </h4>
          {validate && (
            <p className={styles.invalid}>Please choose an option</p>
          )}

          <div className={styles.options}>
            <div className={styles.radio}>
              <RadioButton
                inputId='shipping 1'
                name='shipping'
                checked={data.shipping === 3}
                value={3}
                onChange={() => handleChange(3)}
              />
              <label htmlFor='shipping 1'>
                <b>3 day shipping: $7</b>
              </label>
            </div>
            <div className={styles.radio}>
              <RadioButton
                inputId='shipping 1'
                name='shipping'
                checked={data.shipping === 2}
                value={2}
                onChange={() => handleChange(2)}
              />
              <label htmlFor='shipping 1'>
                <b>2 day shipping: $15</b>
              </label>
              <span>-- most popular option</span>
            </div>
            <div className={styles.radio}>
              <RadioButton
                inputId='shipping 1'
                name='shipping'
                checked={data.shipping === 1}
                value={1}
                onChange={() => handleChange(1)}
              />
              <label htmlFor='shipping 1'>
                <b>Overnight: $24.95</b>
              </label>
              <span>-- recommended for the freshest flowers</span>
            </div>
          </div>

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
        </Col>
      </Row>
    </Container>
  )
}
