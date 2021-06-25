// main tools
import { useState, useContext } from 'react'

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

export const DateOfEvent: FC<StepType> = ({ dispatch }) => {
  const [date, setDate] = useState(new Date())
  const { showToast } = useContext(GlobalUtils)

  const handleChange = (ev: CalendarChangeParams) => {
    dispatch({
      type: 'handleChange',
      payload: { name: 'date', value: ev.value as Date },
    })
    setDate(ev.value as Date)

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
        <Col xs={3}>
          <p>
            <b>Estimated Shipment Date:</b>
          </p>
          {date && (
            <p>
              <b>
                {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
              </b>
            </p>
          )}
        </Col>
        <Col xs={6} className={styles.calendars}>
          <Calendar
            showIcon
            value={date}
            showOnFocus={false}
            onChange={handleChange}
            dateFormat='dd/mm/yy'
            minDate={new Date()}
            className={styles.calendars_input}
          />
          <Calendar
            inline
            value={date}
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
