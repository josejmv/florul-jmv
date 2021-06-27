// main tools
import { useContext } from 'react'

// bootstrap components
import { Row, Col } from 'react-bootstrap'

// prime components
import { Calendar, CalendarChangeParams } from 'primereact/calendar'

// context
import { GlobalUtils } from 'context/GlobalUtils'

// styles
import styles from 'styles/pages/booking/DateOfEvent.module.scss'

// types
import type { FC } from 'react'
import type { StepType } from 'types/pages/booking'

export const DateOfEvent: FC<StepType> = ({ data, dispatch }) => {
  const { showToast } = useContext(GlobalUtils)

  const handleChange = (ev: CalendarChangeParams) => {
    dispatch({
      type: 'handleChange',
      payload: { name: 'date', value: ev.value as Date },
    })

    showToast.show({
      severity: 'success',
      summary: 'Date of event',
      detail: ev.value?.toString(),
      life: 4000,
    })
  }

  return (
    <>
      <h2 className={styles.title}>When would you take this bath?</h2>

      <Row>
        <Col md={12} lg={3}>
          <p>
            <b>Estimated Shipment Date:</b>
          </p>
          {data.date && (
            <p>
              <b>
                {data.date.getDate()}/{data.date.getMonth()}/
                {data.date.getFullYear()}
              </b>
            </p>
          )}
        </Col>
        <Col md={12} lg={6} className={styles.calendars}>
          <Calendar
            showIcon
            value={data.date}
            showOnFocus={false}
            onChange={handleChange}
            dateFormat='dd/mm/yy'
            minDate={new Date()}
            className={styles.calendars_input}
          />
          <Calendar
            inline
            value={data.date}
            onChange={handleChange}
            dateFormat='dd/mm/yy'
            minDate={new Date()}
            className={styles.calendars_inline}
          />
        </Col>
      </Row>
    </>
  )
}
