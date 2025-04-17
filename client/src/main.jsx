
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'
import { PopUpContextProvider } from './context/PopUpContext.jsx';
import { UploadContextProvider } from './context/UploadContext.jsx';

createRoot(document.getElementById('root')).render(


  <FirebaseProvider>
  <UploadContextProvider>
    <PopUpContextProvider>
      <Router>
        <App />
      </Router>
    </PopUpContextProvider>
    </UploadContextProvider>
  </FirebaseProvider>


)
