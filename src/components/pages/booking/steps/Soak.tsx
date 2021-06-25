// main tools
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// bootstrap components
import { Row, Col } from 'react-bootstrap'

// prime components
import { RadioButton, RadioButtonChangeParams } from 'primereact/radiobutton'

// context
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import styles from 'styles/pages/booking/soak.module.scss'

// types
import type { FC } from 'react'
import type { StepType, SoakType } from 'types/pages/booking'

export const Soak: FC<StepType> = ({ dispatch }) => {
  const [selected, setSelected] = useState('')
  const [soaks, setSoaks] = useState<SoakType[]>([])
  const { showToast } = useContext(GlobalUtils)

  const handleChange = (ev: RadioButtonChangeParams) => {
    dispatch({
      type: 'handleChange',
      payload: { name: 'soak', value: ev.value },
    })
    setSelected(ev.value)

    showToast.show({
      severity: 'success',
      summary: 'Bath soak',
      detail: ev.value,
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
              checked={selected === item.attributes.color}
              value={item.attributes.color}
              onChange={handleChange}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}
