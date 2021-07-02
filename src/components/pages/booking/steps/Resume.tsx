// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'

// styles
import styles from 'styles/pages/booking/resume.module.scss'

// types
import type { FC } from 'react'
import type { StepType, FlowerType, AddonType } from 'types/pages/booking'

export const Resume: FC<StepType> = ({ data, setKey }) => {
  const SIZE_STEP = 30
  const VOLUME_STEP = 40
  const SOAK_STEP = 50
  const FLOWER_STEP = 60
  const ADDONS_STEP = 70

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

  const handlePrevStep = () => setKey((prev) => prev - 10)
  const handleNextStep = () => setKey((prev) => prev + 5)

  return (
    <>
      <h1 className={styles.title}>Bath Box Overview</h1>

      <Row>
        <Col xs={12} className={styles.col}>
          <Button
            onClick={() => setKey(SIZE_STEP)}
            variant='transparent'
            className={styles.edit}
          >
            Edit
          </Button>
          <span>
            <b>Bath Size</b> x {data.size.attributes.title} - $
            {data.size.attributes.price}
          </span>
        </Col>
        <Col xs={12} className={styles.col}>
          <Button
            onClick={() => setKey(VOLUME_STEP)}
            variant='transparent'
            className={styles.edit}
          >
            Edit
          </Button>
          <span>
            <b>Bath Volume</b> x {data.volume.attributes.title} - $
            {data.volume.attributes.price}
          </span>
        </Col>
        <Col xs={12} className={styles.col}>
          <Button
            onClick={() => setKey(SOAK_STEP)}
            variant='transparent'
            className={styles.edit}
          >
            Edit
          </Button>
          <span>
            <b>Bath Soak</b> x {data.soak.attributes.color} - $
            {data.soak.attributes.price}
          </span>
        </Col>
        <Col xs={12} className={styles.col}>
          <Button
            onClick={() => setKey(FLOWER_STEP)}
            variant='transparent'
            className={styles.edit}
          >
            Edit
          </Button>
          <span>
            <b>Flowers</b>
          </span>
          <ul>
            {data.flowers.map((flower: FlowerType, idx: number) => (
              <li className={styles.list_item} key={idx}>
                x {flower.attributes.name} - ${flower.attributes.highPrice}
              </li>
            ))}
          </ul>
        </Col>
        <Col xs={12} className={styles.col}>
          <Button
            onClick={() => setKey(ADDONS_STEP)}
            variant='transparent'
            className={styles.edit}
          >
            Edit
          </Button>
          <span>
            <b>Addons</b>
          </span>
          <ul>
            {data.addons.map((addon: AddonType, idx: number) => (
              <li className={styles.list_item} key={idx}>
                x {addon.relationships.taxonomy.attributes.name} - $
                {addon.attributes.price}
              </li>
            ))}
          </ul>
        </Col>
        {data.shipping.id !== '' && (
          <Col xs={12} className={styles.col}>
            <span>
              <b>Shipping ${data.shipping.attributes.price}</b>
            </span>
          </Col>
        )}
        <Col xs={12} className={styles.col}>
          <span>
            <b>Total: ${getPrice()}</b>
          </span>
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
            onClick={handleNextStep}
            variant='primary'
            size='lg'
          >
            Check out
          </Button>
        </Col>
      </Row>
    </>
  )
}
