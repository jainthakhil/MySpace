import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase.jsx';
import { useNavigate } from 'react-router-dom';
const SignInPage = () => {
  const firebase = useFirebase();
  const [formData, setFormData] = useState({
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
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.signinUser(formData.email, formData.password);
  };

  console.log(firebase.isLoggedIn);
  

  return (
    <div className="min-h-screen w-full bg-gray-900 flex justify-evenly items-center text-white">
    <h1 className='text-5xl m-10 text-center'>SignIn <br/> <span className='block mx-auto text-center'>to</span>MySpace</h1>
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">SignIn</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">Don't have an account? </span>
          <a href="/signup" className="text-indigo-500 hover:text-indigo-400">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
