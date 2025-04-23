import React, { createContext, useContext, useState } from 'react'
import { useFirebase } from './Firebase';

const User = createContext(null);
export const useUser = () => useContext(User);

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);


  return <User.Provider value={{ user, setUser }}>
    {props.children}

  </User.Provider>
}