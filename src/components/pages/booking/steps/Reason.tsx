// main tools
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// bootstrap components
import { Row, Col, Card } from 'react-bootstrap'

// contexts
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import styles from 'styles/pages/booking/reason.module.scss'

// types
import type { FC } from 'react'
import type { StepType, ReasonType } from 'types/pages/booking'

export const Reason: FC<StepType> = ({ dispatch }) => {
  const [reasons, setReasons] = useState([])
  const { showToast } = useContext(GlobalUtils)

  const handleClick = (title: string) => {
    dispatch({ type: 'handleChange', payload: { name: 'title', value: title } })

    showToast.show({
      severity: 'success',
      summary: 'Reazon',
      detail: title,
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

      <Row>
        {reasons.map(({ attributes, type }: ReasonType, idx: number) => (
          <Col key={idx} xs={6} sm={4} lg={3} className={styles.container}>
            <Card
              onClick={() => handleClick(attributes.title)}
              className={styles.card}
            >
              <Card.Img
                className={styles.card_img}
                src='http://placehold.it/100x100'
                alt={type}
              />
              <Card.ImgOverlay className={styles.card_content}>
                <Card.Title>{attributes.title}</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
