import './App.css';
import { lazy, Suspense } from 'react';
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

function App() {
  return (
    <div className="App bg-white dark:bg-gray-700 font-cairo">
      <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
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
    </div>
  );
}

export default App;
