import React, { useState, useEffect } from 'react'
import AccountDropdown from './AccountDropdown'
import LogoutBtn from './LogoutBtn';



const Header = () => {
  const storedUser = JSON.parse(localStorage.getItem('myspace-user'));
  const username = storedUser?.displayName || "username";

  const [dateTime, setDateTime] = useState({
    day: '',
    date: '',
    time: '',
    month: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime({
        day: now.toLocaleDateString('en-US', { weekday: 'short' }),
        date: now.getDate(),
        month: now.toLocaleDateString('en-US', { month: 'short' }),
        time: now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const updateDateTime = () => {
  //     const now = new Date();

  //     const day = now.toLocaleDateString('en-US', { weekday: 'long' });       // Monday
  //     const date = now.toLocaleDateString('en-US', { day: 'numeric' });       // 21
  //     const month = now.toLocaleDateString('en-US', { month: 'long' });       // April
  //     const time = now.toLocaleTimeString();                                  // 10:45:23 AM

  //     setDateTime({ day, date, time, month });
  //   };

  //   updateDateTime();
  //   const interval = setInterval(updateDateTime, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="w-full flex p-2">

     <div className=' bg-white dark:bg-gray-800 w-full flex items-center justify-between mb-5 border-1 rounded-md border-gray-600 mx-auto' >
      <div className="flex px-6">
        <h1 className='text-sm'>Welcome back, <span className='text-lg font-bold'>{username}</span> </h1>
      </div>
      <div className='flex items-center'>
        <div className="date text-[12px]">
        <p className='text-lg'>{dateTime.time}</p>
          <p className='inline'>{dateTime.day}, </p>
          <p className='inline'> {dateTime.date} {dateTime.month} </p>
         

        </div>
        <AccountDropdown />
        {/* <LogoutBtn/> */}

      </div>

    </div>

    </div>
   
  )
}

export default Header