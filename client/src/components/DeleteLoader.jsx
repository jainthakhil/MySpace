import React from 'react'
import DeleteAnimation from '../assets/deleteAnimation.gif'

const DeleteLoader = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
    <div className='w-[150px] h-[150px]'>
    <img src={DeleteAnimation} alt="" />

    </div>

    </div>
    
  )
}

export default DeleteLoader