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
import ErrorCard from './components/ErrorMessage.jsx';
import { useFirebase } from './context/Firebase.jsx';
import AccAlreadyExistPopup from './components/AccountAlreadyExistPopup.jsx';

function App() {
  const popupContext = usePopUpContext();
  const firebase = useFirebase()
  const uploadedUrl = firebase.uploadedUrl;
  const showSuccess = popupContext.showSuccessCard;

  useEffect(() => {
    let uploadTimer;

    if (uploadedUrl) {
      uploadTimer = setTimeout(() => {
        firebase.setUploadedUrl('');
      }, 4000);
    }

    return () => clearTimeout(uploadTimer);
  }, [uploadedUrl]);

  useEffect(() => {
    let successLoginTimer;

    if (showSuccess) {
      successLoginTimer = setTimeout(() => {
        popupContext.setShowSuccessCard(false);
      }, 2000);
    }

    return () => {
      clearTimeout(successLoginTimer);
    };
  }, [showSuccess]); // 👈 Watch this, not uploadedUrl

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


      {/* for success login */}
      {popupContext.showSuccessCard && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
          <SuccessCard
            message="User LoggedIn Successfully"
          />
        </div>
      )}

      {/* for failed Login  */}
      {popupContext.showErrorCard && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
          <ErrorCard />
        </div>
      )}

      {/* account already popup  */}
      {popupContext.accountAlreadyExist && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
          <AccAlreadyExistPopup />
        </div>
      )}


      {/* for uloading animation  */}
      {popupContext.showUploadingCard && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
          <UploadingPopup />
        </div>
      )}

      {/* for succedd upload  */}
      {firebase.uploadedUrl && !popupContext.showUploadingCard && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
          <SuccessCard
            message="file uploaded successfully"
          />
        </div>
      )

      }

      {/* for already exist  */}
      {(popupContext.alreadyExist && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition duration-300 ease-in-out">
          <AlreadyExistPopup />
        </div>
      ))}



    </div>
  );
}

export default App;
