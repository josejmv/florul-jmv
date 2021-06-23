// main tools
import { useContext } from 'react'

// next components
import Image from 'next/image'
import Link from 'next/link'

// bootstrap components
import { Navbar, Button } from 'react-bootstrap'
import { List } from 'react-bootstrap-icons'

import { GlobalUtils } from 'context/GlobalUtils'

// types
import type { FC } from 'react'

export const Header: FC<{ bg?: string }> = ({ bg }) => {
  const { setShowSidebar } = useContext(GlobalUtils)

  const handleClick = () => setShowSidebar(true)

  return (
    <Navbar bg={bg} className='justify-content-between px-4'>
      <Link passHref href='/'>
        <Navbar.Brand>
          <Image src='/favicon.png' width={50} height={50} alt='florül logo' />
        </Navbar.Brand>
      </Link>
      <Button onClick={handleClick} variant='transparent'>
        <List size={50} />
      </Button>
    </Navbar>
  )
}
