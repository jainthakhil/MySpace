import React from 'react'
import SidebarComp from '../components/SidebarComp'

const CommonTestPage = () => {
  return (
    <div className='w-full flex'>
      <SidebarComp/>
      <div className="w-full min-h-screen flex text-white text-6xl items-center justify-center">
        <h3>Main Content</h3>
      </div>
    </div>
  )
}

export default CommonTestPage