import './App.css'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignUpPage from './components/SignupPage.jsx'
import SignInPage from './components/SigninPage.jsx'
import { useFirebase } from './context/Firebase.jsx';
import Home from './components/Home.jsx';
// import UploadPage from './components/UploadPage.jsx';
import DocumentsPage from './components/DocumentsPage.jsx';
import MediaPage from './components/MediaPage.jsx';


function App() {
  const firebase = useFirebase();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    setIsUserLoggedIn(firebase.isUserLoggedIn || null);

  }, [firebase.isUserLoggedIn]);

  // useEffect(() => {
  //   // Redirect logic when login state changes
  //   if (isUserLoggedIn === null) return; // Don't navigate until the state is set

  //   if (isUserLoggedIn) {
  //     navigate('/home');
  //     console.log('User is logged in', isUserLoggedIn);
  //   } else {
  //     navigate('/signin');
  //     console.log('User is logged out');
  //   }
  // }, [isUserLoggedIn, navigate]);
  return (

    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<SignInPage />} />
        {/* <Route path="/upload" element={<UploadPage />} /> */}
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/media" element={<MediaPage />} />
      </Routes>
    </div>


  );

}

export default App;