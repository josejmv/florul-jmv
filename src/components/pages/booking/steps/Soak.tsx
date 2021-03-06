// main tools
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'

// prime components
import { RadioButton } from 'primereact/radiobutton'

// context
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import styles from 'styles/pages/booking/main.module.scss'

// types
import type { FC } from 'react'
import type { StepType, SoakType } from 'types/pages/booking'

export const Soak: FC<StepType> = ({ data, setKey, dispatch }) => {
  const [soaks, setSoaks] = useState<SoakType[]>([])
  const [invalid, setInvalid] = useState(false)
  const { showToast } = useContext(GlobalUtils)

  const handleNextStep = () => {
    if (data.soak.attributes.color !== '') setKey((prev) => prev + 10)
    else setInvalid(true)
  }

  const handlePrevStep = () => setKey((prev) => prev - 10)

  const handleChange = (soak: SoakType) => {
    dispatch({ type: 'handleChange', payload: { name: 'soak', value: soak } })

    invalid && setInvalid(false)
    showToast.show({
      severity: 'success',
      summary: 'Bath soak',
      detail: soak.attributes.color,
      life: 4000,
    })
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/soaks`
      )
      setSoaks(data)
    })()
  }, [])

  return (
    <>
      <h2 className={styles.title}>Choose your bath soak:</h2>
      <p>
        The bath soak is the base of your bath. The color will be the beautiful
        contrast agaisnt your flowers. Please note that colors shown below may
        not look exactly like the photos. Colors may be different and are
        dependent on the color of your tub, lighting, how much water your use,
        etc.
      </p>
      {invalid && <p className={styles.invalid}>Please choose an option</p>}

      <Row>
        {soaks.map((item: SoakType, idx: number) => (
          <Col key={idx} xs={6} md={4} lg={2} className={styles.item}>
            <div
              className={styles.item_soak}
              style={{ background: item.attributes.hex }}
            />
            <h5>{item.attributes.color}</h5>
            <p>{item.attributes.scent}</p>
            <RadioButton
              name='soak'
              className={styles.radio}
              checked={data.soak.attributes.color === item.attributes.color}
              value={item.attributes.color}
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
