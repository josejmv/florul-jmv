// main tools
import { useReducer, useState } from 'react'

// bootstrap components
import { ProgressBar } from 'react-bootstrap'

// prime components
import { Sidebar } from 'primereact/sidebar'

// components
import { Layout } from '@atoms/index'
import * as STEPS from 'components/pages/booking/steps'
import { Cart } from 'components/pages/booking/Cart'

// reducers
import { INITIAL_DATA, BookingManagement } from 'reducers/BookingReducer'

// styles
import styles from 'styles/pages/booking/main.module.scss'

// types
import type { FC } from 'react'

const Booking: FC = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [key, setKey] = useState(10)
  const [data, dispatch] = useReducer(BookingManagement, INITIAL_DATA)

  const steps = {
    10: <STEPS.Reason data={data} dispatch={dispatch} setKey={setKey} />,
    20: <STEPS.DateOfEvent data={data} dispatch={dispatch} setKey={setKey} />,
    30: <STEPS.Size data={data} dispatch={dispatch} setKey={setKey} />,
    40: <STEPS.Volume data={data} dispatch={dispatch} setKey={setKey} />,
    50: <STEPS.Soak data={data} dispatch={dispatch} setKey={setKey} />,
    60: <STEPS.Flowers data={data} dispatch={dispatch} setKey={setKey} />,
    70: <STEPS.Addons data={data} dispatch={dispatch} setKey={setKey} />,
    80: <STEPS.Resume data={data} dispatch={dispatch} setKey={setKey} />,
    85: <STEPS.Shipping data={data} dispatch={dispatch} setKey={setKey} />,
    90: <STEPS.Payment data={data} dispatch={dispatch} setKey={setKey} />,
  }

  return (
    <Layout bg='white' title='booking' setShowSidebar={setShowSidebar}>
      <Sidebar
        visible={showSidebar}
        onHide={() => setShowSidebar(false)}
        position='right'
      >
        <Cart {...data} />
      </Sidebar>
      <ProgressBar className={styles.progressBar} now={key} variant='dark' />

      {steps[key as keyof typeof steps]}
    </Layout>
  )
}

export default Booking
