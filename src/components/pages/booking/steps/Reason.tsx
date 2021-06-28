// main tools
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// bootstrap components
import { Row, Col, Card, Button } from 'react-bootstrap'

// contexts
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import styles from 'styles/pages/booking/reason.module.scss'

// types
import type { FC } from 'react'
import type { StepType, ReasonType } from 'types/pages/booking'

export const Reason: FC<StepType> = ({ data, setKey, dispatch }) => {
  const [reasons, setReasons] = useState([])
  const [invalid, setInvalid] = useState(false)
  const { showToast } = useContext(GlobalUtils)

  const handleNextStep = () => {
    if (data.reason.attributes.title !== '') setKey((prev) => prev + 10)
    else setInvalid(true)
  }

  const handleClick = (reason: ReasonType) => {
    dispatch({
      type: 'handleChange',
      payload: { name: 'reason', value: reason },
    })

    invalid && setInvalid(false)
    showToast.show({
      severity: 'success',
      summary: 'Reazon',
      detail: reason.attributes.title,
      life: 4000,
    })
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/box-reasons`
      )
      setReasons(data)
    })()
  }, [])

  return (
    <>
      <h1 className={styles.mainDescription}>
        We look forward to building a flawless at-home floral bath experience
        for you.
      </h1>
      <p>
        In order for us to do that, we need some details. Let’s get the
        logistics out of the way, so we can start diving into the fun stuff :)
      </p>
      <h2 className={styles.title}>What is this bath for?</h2>
      {invalid && <p className={styles.invalid}>Please, choose a reazon</p>}

      <Row>
        {reasons.map((reason: ReasonType, idx: number) => (
          <Col key={idx} xs={6} sm={4} lg={3} className={styles.container}>
            <Card onClick={() => handleClick(reason)} className={styles.card}>
              <Card.Img
                className={styles.card_img}
                src='http://placehold.it/100x100'
                alt={reason.type}
              />
              <Card.ImgOverlay className={styles.card_content}>
                <Card.Title>{reason.attributes.title}</Card.Title>
                {data.reason.attributes.title === reason.attributes.title && (
                  <i className={`pi pi-check-circle ${styles.card_checked}`} />
                )}
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className={styles.buttons}>
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
    </>
  )
}
