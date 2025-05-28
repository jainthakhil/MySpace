import React, { createContext, useContext, useState } from 'react'
import { useFirebase } from './Firebase';

const User = createContext(null);
export const useUser = () => useContext(User);

export const UserProvider = (props) => {
  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');


  return <User.Provider value={{ userName, setUserName,userMail,setUserMail  }}>
    {props.children}

  </User.Provider>
}