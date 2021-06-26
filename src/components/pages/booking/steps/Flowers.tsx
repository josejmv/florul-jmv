// main tools
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// bootstrap components
import { Row, Col, Card } from 'react-bootstrap'

// prime components
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox'
import { Tooltip } from 'primereact/tooltip'

// contexts
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import styles from 'styles/pages/booking/flowers.module.scss'

// types
import type { FC } from 'react'
import type { StepType, FlowerType } from 'types/pages/booking'

export const Flowers: FC<StepType> = ({ data, dispatch }) => {
  const [flowers, setFlowers] = useState<FlowerType[]>([])
  const { showToast } = useContext(GlobalUtils)

  const findItem = (item: FlowerType): number =>
    data.flowers.filter((flower: FlowerType) => item.id === flower.id).length

  const handleClick = (flower: FlowerType, idx: number) => {
    if (findItem(flower) === 0) {
      dispatch({
        type: 'handleAddItems',
        payload: { name: 'flowers', value: flower, idx },
      })

      showToast.show({
        severity: 'success',
        summary: 'Flower added',
        detail: flower.attributes.name,
        life: 4000,
      })
    } else {
      const remove = data.flowers.filter(
        (item: FlowerType) => item.id !== flower.id
      )

      dispatch({
        type: 'handleChange',
        payload: { name: 'flowers', value: remove },
      })

      showToast.show({
        severity: 'warn',
        summary: 'Flower removed',
        detail: flower.attributes.name,
        life: 4000,
      })
    }
  }

  const handleCheck = (ev: CheckboxChangeParams) =>
    dispatch({
      type: 'handleChange',
      payload: { name: ev.target.name, value: ev.checked },
    })

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/flowers`
      )
      setFlowers(data)
    })()
  }, [])

  return (
    <>
      <h2 className={styles.title}>Choose your flowers:</h2>
      <p>Add the flowers of your choice.</p>
      <Row>
        <Col xs={12} className='my-4'>
          <div className={styles.checkbox}>
            <Checkbox
              inputId='petals'
              name='imperfectPetals'
              onChange={handleCheck}
              checked={data.imperfectPetals}
            />
            <label htmlFor='petals'>
              I am okay with some imperfect petals{' '}
              <span
                className={`${styles.tooltip} tolltip-petals`}
                data-pr-position='top'
              >
                i
              </span>
              <Tooltip target='.tolltip-petals'>
                <span>imperfect petals</span>
              </Tooltip>
            </label>
          </div>
          <div className={styles.checkbox}>
            <Checkbox
              inputId='heads'
              name='imperfectHeads'
              onChange={handleCheck}
              checked={data.imperfectHeads}
            />
            <label htmlFor='heads'>
              I am okay with some imperfect flower heads{' '}
              <span
                className={`${styles.tooltip} tolltip-heads`}
                data-pr-position='bottom'
              >
                i
              </span>
              <Tooltip target='.tolltip-heads'>
                <span>imperfect heads</span>
              </Tooltip>
            </label>
          </div>
        </Col>
        <Col xs={12}>
          <h2>Tips on flower volume</h2>
          <Row>
            <Col className='text-center my-5' xs={12} sm={6} md={2}>
              <img
                src='/assets/imgs/light.svg'
                className='mb-3'
                height={200}
                width={170}
              />
              <h5>Light</h5>
              <p>4 - 5 flower head</p>
            </Col>
            <Col className='text-center my-5' xs={12} sm={6} md={2}>
              <img
                src='/assets/imgs/scattered.svg'
                className='mb-3'
                height={200}
                width={170}
              />
              <h5>Scattered</h5>
              <p>6 - 12 flower head</p>
            </Col>
            <Col className='text-center my-5' xs={12} sm={6} md={2}>
              <img
                src='/assets/imgs/full.svg'
                className='mb-3'
                height={200}
                width={170}
              />
              <h5>Full</h5>
              <p>13 - 40 flower head</p>
            </Col>
          </Row>
        </Col>
        {flowers.map((item: FlowerType, idx: number) => (
          <Col key={idx} xs={6} sm={4} lg={3} className={styles.container}>
            <Card
              onClick={() => handleClick(item, idx)}
              className={styles.card}
            >
              <Card.Img
                className={styles.card_img}
                src={item.relationships.images[0].attributes.src}
                height={item.relationships.images[0].attributes.height}
                width={item.relationships.images[0].attributes.width}
                alt={item.type}
              />
              <Card.ImgOverlay className={styles.card_content}>
                <Card.Title>{item.attributes.name}</Card.Title>
                {findItem(item) > 0 && (
                  <i className={`pi pi-check-circle ${styles.card_checked}`} />
                )}
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
