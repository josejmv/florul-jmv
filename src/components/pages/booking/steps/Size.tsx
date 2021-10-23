// main tools
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'

// prime components
import { RadioButton } from 'primereact/radiobutton'

// Next components
import Image from 'next/image'

// context
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import styles from 'styles/pages/booking/main.module.scss'

// types
import type { FC } from 'react'
import type { StepType, SizeType } from 'types/pages/booking'

export const Size: FC<StepType> = ({ data, setKey, dispatch }) => {
  const [sizes, setSizes] = useState<SizeType[]>([])
  const [invalid, setInvalid] = useState(false)
  const { showToast } = useContext(GlobalUtils)

  const handleNextStep = () => {
    if (data.size.attributes.title !== '') setKey((prev) => prev + 10)
    else setInvalid(true)
  }

  const handlePrevStep = () => setKey((prev) => prev - 10)

  const handleChange = (size: SizeType) => {
    dispatch({
      type: 'handleChange',
      payload: { name: 'size', value: size },
    })

    invalid && setInvalid(false)
    showToast.show({
      severity: 'success',
      summary: 'Size of bath',
      detail: size.attributes.title,
      life: 4000,
    })
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sizes`
      )
      setSizes(data)
    })()
  }, [])

  return (
    <>
      <h2 className={styles.title}>How big is your bathtub?</h2>
      {invalid && <p className={styles.invalid}>Please choose an option</p>}

      <Row>
        {sizes.map((item: SizeType, idx: number) => (
          <Col key={idx} xs={12} sm={6} md={4} className={styles.item}>
            <Image
              className={styles.item_image}
              src={item.relationships.image.attributes.src}
              width={item.relationships.image.attributes.width}
              height={item.relationships.image.attributes.height}
              alt={item.relationships.image.attributes.alt}
              quality={10}
            />
            <h3>{item.attributes.title}</h3>
            <p>{item.attributes.description}</p>
            <RadioButton
              name='size'
              className={styles.radio}
              checked={data.size.attributes.title === item.attributes.title}
              value={item}
              onChange={() => handleChange(item)}
            />
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
