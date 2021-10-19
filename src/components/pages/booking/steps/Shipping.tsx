// main tools
import { useState, useEffect } from 'react'
import axios from 'axios'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// prime components
import { RadioButton } from 'primereact/radiobutton'

// styles
import styles from 'styles/pages/booking/shipping.module.scss'

// types
import type { FC } from 'react'
import type {
  StepType,
  ShippingType,
  AddonType,
  FlowerType,
} from 'types/pages/booking'

export const Shipping: FC<StepType> = ({ data, setKey, dispatch }) => {
  const [validate, setValidate] = useState(false)
  const [shippings, setShippings] = useState<ShippingType[]>([])

  const getPrice = (): number => {
    let price = data.size.attributes.price || 0
    price += data.volume.attributes.price || 0
    price += data.soak.attributes.price || 0
    price += data.shipping.attributes.price || 0
    data.addons.map((addon: AddonType) => {
      price += addon.attributes.price || 0
    })
    data.flowers.map((flower: FlowerType) => {
      price += flower.attributes.highPrice || 0
    })

    return price
  }

  const handlePrevStep = () => setKey((prev) => prev - 5)
  const handleNextStep = () => {
    if (data.shipping.id !== '') {
      dispatch({
        type: 'handleChange',
        payload: { name: 'price', value: getPrice() },
      })
      setKey((prev) => prev + 5)
    } else setValidate(true)
  }

  const handleChange = (option: ShippingType) => {
    validate && setValidate(false)
    dispatch({
      type: 'handleChange',
      payload: { name: 'shipping', value: option },
    })
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/shippings`
      )
      setShippings(data)
    })()
  }, [])

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
            {shippings.map((item: ShippingType, idx: number) => (
              <div key={idx} className={styles.radio}>
                <RadioButton
                  inputId={`shipping ${idx}`}
                  name='shipping'
                  checked={data.shipping.id === item.id}
                  value={item}
                  onChange={() => handleChange(item)}
                />
                <label htmlFor='shipping 1'>
                  <b>
                    {item.attributes.title}: ${item.attributes.price}
                  </b>
                </label>
                <span>
                  {item.attributes.description !== '' &&
                    `-- ${item.attributes.description}`}
                </span>
              </div>
            ))}
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
