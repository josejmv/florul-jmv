// main tools
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// bootstrap components
import { Row, Col } from 'react-bootstrap'

// prime components
import { RadioButton, RadioButtonChangeParams } from 'primereact/radiobutton'

// Next components
import Image from 'next/image'

// context
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import styles from 'styles/pages/booking/size.module.scss'

// types
import type { FC } from 'react'
import type { StepType, SizeType } from 'types/pages/booking'

export const Size: FC<StepType> = ({ dispatch }) => {
  const [selected, setSelected] = useState('')
  const [sizes, setSizes] = useState<SizeType[]>([])
  const { showToast } = useContext(GlobalUtils)

  const handleChange = (ev: RadioButtonChangeParams) => {
    dispatch({
      type: 'handleChange',
      payload: { name: 'size', value: ev.value },
    })
    setSelected(ev.value)

    showToast.show({
      severity: 'success',
      summary: 'Size of bath',
      detail: ev.value,
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
      <Row>
        {sizes.map((item: SizeType, idx: number) => (
          <Col key={idx} xs={12} sm={6} md={4} className={styles.item}>
            <Image
              className={styles.item_image}
              src={item.relationships.image.attributes.src}
              width={item.relationships.image.attributes.width}
              height={item.relationships.image.attributes.height}
            />
            <h3>{item.attributes.title}</h3>
            <p>{item.attributes.description}</p>
            <RadioButton
              name='size'
              className={styles.radio}
              checked={selected === item.attributes.title}
              value={item.attributes.title}
              onChange={handleChange}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}
