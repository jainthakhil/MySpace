import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarLink = (props) => {
  return (
    <NavLink
    to={props.url}
    className={({ isActive }) =>
        `flex items-center justify-start w-full px-4 py-2 my-2 font-thin transition-colors duration-200 ${isActive
            ? 'text-darkBack border-r-4 border-darkBack bg-gradient-to-r from-white to-myWhite dark:from-sidebar dark:to-myWhite'
            : 'text-gray-500 dark:text-gray-200 hover:text-blue-500 duration-200 text-gray-800 dark:text-gray-100'
        }`
    }
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="transition-colors duration-300"
    >
        <path d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" />
    </svg>
    <span className="mx-4 text-md font-normal">{props.linkName}</span>
    <span className="flex-grow text-right"></span>
</NavLink>
  )
}

export default SidebarLink