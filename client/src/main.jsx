import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'

createRoot(document.getElementById('root')).render(
  

    <FirebaseProvider>
      <Router>
        <App />

      </Router>

    </FirebaseProvider>

  
)
