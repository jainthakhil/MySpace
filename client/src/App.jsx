import './App.css';
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DynamicFolderPage from './pages/DynamicFolderPage.jsx';

// Lazy imports
const SignUpPage = lazy(() => import('./pages/SignupPage.jsx'));
const SignInPage = lazy(() => import('./pages/SigninPage.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const DocumentsPage = lazy(() => import('./pages/DocumentsPage.jsx'));
const MediaPage = lazy(() => import('./pages/MediaPage.jsx'));
const MyUploadPage = lazy(() => import('./pages/MyUploadPage.jsx'));
const CommonTestPage = lazy(() => import('./pages/CommonTestPage.jsx'))
const AccountPage = lazy(() => import('./pages/AccountPage.jsx'))
// const SignInPage = lazy(() => import('./TestCom.jsx'));
import Loader from './components/Loader.jsx';
import { usePopUpContext } from './context/PopUpContext.jsx';
import AlreadyExistPopup from './components/FileExistedPopup.jsx';
import UploadingPopup from './components/UploadingPopup';
import SuccessCard from './components/SucessMessage.jsx';
import { useFirebase } from './context/Firebase.jsx';

function App() {
  const popupContext = usePopUpContext();
  const firebase = useFirebase()
  const uploadedUrl = firebase.uploadedUrl;

  useEffect(() => {
    let timer;
    if (uploadedUrl) {
      timer = setTimeout(() => {
        firebase.setUploadedUrl('');
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [uploadedUrl ]);

  return (
    <div className="App min-h-screen  bg-white dark:bg-darkBack font-cairo">
      <Suspense fallback={<div className=" w-full min-h-screen flex items-center justify-center text-white text-center"><Loader /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/myuploads" element={<MyUploadPage />} />
          <Route path="/folder/:folderId" element={<DynamicFolderPage />} />
          <Route path="/my-account" element={<AccountPage />} />

          <Route path="*" element={<CommonTestPage />} />
        </Routes>
      </Suspense>

      {(popupContext.alreadyExist && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
          <AlreadyExistPopup />
        </div>
      ))}

      {popupContext.showSuccessCard && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
          <UploadingPopup />
        </div>
      )}

       {firebase.uploadedUrl && !popupContext.showSuccessCard && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
                        <SuccessCard />
                    </div>
                )

                }


    </div>
  );
}

export default App;
