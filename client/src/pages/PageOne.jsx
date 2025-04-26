import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';

const PageOne = () => {
  const firebase = useFirebase();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  

    useEffect(()=>{
      if(firebase.isLoggedIn){
        navigate('/')
      }
  
    },[firebase, navigate])

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const result = await firebase.signupUser(formData.email, formData.password, formData.username); 

    // firebase.writeUserData(formData)

    // firebase.putData(`users/${formData.username}`,{username:formData.username,email:formData.email, password:formData.password});
    console.log("signUp successfull" ,result);
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 flex justify-evenly items-center text-white">
    <h1 className='text-5xl m-10 text-center'>SignUp <br/> <span className='block mx-auto text-center'>on</span>MySpace</h1>

    <Sign

      
    </div>
  );
};

export default PageOne;
