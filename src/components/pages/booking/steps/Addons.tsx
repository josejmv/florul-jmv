// main tools
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// bootstrap components
import { Row, Col, Card } from 'react-bootstrap'

// contexts
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import styles from 'styles/pages/booking/addons.module.scss'

// types
import type { FC } from 'react'
import type { StepType, AddonType } from 'types/pages/booking'

export const Addons: FC<StepType> = ({ data, dispatch }) => {
  const [addons, setAddons] = useState<AddonType[]>([])
  const { showToast } = useContext(GlobalUtils)

  const findItem = (item: AddonType): number =>
    data.addons.filter((addon: AddonType) => item.id === addon.id).length

  const handleClick = (addon: AddonType, idx: number) => {
    if (findItem(addon) === 0) {
      dispatch({
        type: 'handleAddItems',
        payload: { name: 'addons', value: addon, idx },
      })

      showToast.show({
        severity: 'success',
        summary: 'Addon added',
        detail: addon.relationships.taxonomy.attributes.category,
        life: 4000,
      })
    } else {
      const remove = data.addons.filter(
        (item: AddonType) => item.id !== addon.id
      )

      dispatch({
        type: 'handleChange',
        payload: { name: 'addons', value: remove },
      })

      showToast.show({
        severity: 'warn',
        summary: 'Addon removed',
        detail: addon.relationships.taxonomy.attributes.category,
        life: 4000,
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/addons`
      )

      setAddons(data)
    })()
  }, [])

  return (
    <>
      <h2 className={styles.title}>Add ons</h2>
      <p>
        Complete the bath with some add ons to create the perfect experience for
        your occasion.
      </p>
      <Row>
        {addons.map((item: AddonType, idx: number) => (
          <Col key={idx} xs={6} sm={4} lg={3} className={styles.container}>
            <Card
              onClick={() => handleClick(item, idx)}
              className={styles.card}
            >
              <Card.Img
                className={styles.card_img}
                src={item.relationships.image.attributes.src}
                height={item.relationships.image.attributes.height}
                width={item.relationships.image.attributes.width}
                alt={item.type}
              />
              <Card.ImgOverlay className={styles.card_content}>
                <Card.Title>
                  {item.relationships.taxonomy.attributes.category}
                </Card.Title>
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
