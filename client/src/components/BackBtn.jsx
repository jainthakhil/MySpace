import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackBtn = () => {
    const naviate = useNavigate();
    const handleBack = () => {
      naviate(-1);
    }
    
  return (
    <div className='h-full flex items-center justify-center absolute left-8'>
    <button className=' group p-2 rounded transition-colors cursor-pointer ' onClick={handleBack}>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    height={20}
    viewBox="0 0 1024 1024"
    className="fill-black dark:fill-white group-hover:fill-blue-500 transition-colors duration-200"
  >
    <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z" />
  </svg>

    </button>

    </div>
  )
}

export default BackBtn