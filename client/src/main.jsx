
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'
import { PopUpContextProvider } from './context/PopUpContext.jsx';
import { UploadContextProvider } from './context/UploadContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(

<PopUpContextProvider>
  <FirebaseProvider>
  <UserProvider>
  <UploadContextProvider>
    
      <Router>
        <App />
      </Router>
    </UploadContextProvider>
    </UserProvider>
  </FirebaseProvider>
</PopUpContextProvider>

)
