import React from 'react'
import AccountDropdown from './AccountDropdown'

const Header = () => {
  return (
    <div className=' bg-white dark:bg-gray-800 w-full flex items-center justify-end' >
        <AccountDropdown/>
    </div>
  )
}

export default Header