import React from 'react'
import BackBtn from './BackBtn'

const SubHeader = (prop) => {
  return (
    <div className='w-full h-20 flex items-center justify-center relative p-4'>
        <BackBtn/>
        <h1 className='md:text-5xl text-lg font-dosis capitalize'> {prop.folderName}</h1>
        </div>
  )
}

export default SubHeader