// next components
import Image from 'next/image'
import Link from 'next/link'

// bootstrap components
import { Navbar, Button } from 'react-bootstrap'
import { List } from 'react-bootstrap-icons'

// types
import type { FC } from 'react'
import type { HeaderType } from 'types'

export const Header: FC<HeaderType> = ({ bg, setShowSidebar }) => {
  const handleClick = () => setShowSidebar && setShowSidebar(true)

  return (
    <Navbar bg={bg} className='justify-content-between px-4'>
      <Link passHref href='/'>
        <Navbar.Brand>
          <Image src='/favicon.png' width={50} height={50} alt='florül logo' />
        </Navbar.Brand>
      </Link>
      {setShowSidebar && (
        <Button onClick={handleClick} variant='transparent'>
          <List size={50} />
        </Button>
      )}
    </Navbar>
  )
}
