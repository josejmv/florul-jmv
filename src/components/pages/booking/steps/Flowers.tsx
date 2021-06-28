// main tools
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// next components
import Image from 'next/image'

// bootstrap components
import { Row, Col, Card, Button } from 'react-bootstrap'

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

export const Flowers: FC<StepType> = ({ data, setKey, dispatch }) => {
  const [flowers, setFlowers] = useState<FlowerType[]>([])
  const [invalid, setInvalid] = useState(false)
  const { showToast } = useContext(GlobalUtils)

  const handleNextStep = () => {
    if (data.flowers.length > 0) setKey((prev) => prev + 10)
    else setInvalid(true)
  }

  const handlePrevStep = () => setKey((prev) => prev - 10)

  const findItem = (item: FlowerType): number =>
    data.flowers.filter((flower: FlowerType) => item.id === flower.id).length

  const handleClick = (flower: FlowerType, idx: number) => {
    if (findItem(flower) === 0) {
      dispatch({
        type: 'handleAddItems',
        payload: { name: 'flowers', value: flower, idx },
      })

      invalid && setInvalid(false)
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

      invalid && setInvalid(false)
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
              <Image
                src='/assets/imgs/light.svg'
                height={200}
                width={170}
                alt='light'
              />
              <h5 className='mt-3'>Light</h5>
              <p>4 - 5 flower head</p>
            </Col>
            <Col className='text-center my-5' xs={12} sm={6} md={2}>
              <Image
                src='/assets/imgs/scattered.svg'
                height={200}
                width={170}
                alt='scattered'
              />
              <h5 className='mt-3'>Scattered</h5>
              <p>6 - 12 flower head</p>
            </Col>
            <Col className='text-center my-5' xs={12} sm={6} md={2}>
              <Image
                src='/assets/imgs/full.svg'
                height={200}
                width={170}
                alt='full'
              />
              <h5 className='mt-3'>Full</h5>
              <p>13 - 40 flower head</p>
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          {invalid && (
            <p className={styles.invalid}>Choose at least one type of flower</p>
          )}
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
    </>
  )
}
