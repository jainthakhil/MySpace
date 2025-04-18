import './App.css';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy imports
const SignUpPage = lazy(() => import('./pages/SignupPage.jsx'));
const SignInPage = lazy(() => import('./pages/SigninPage.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const DocumentsPage = lazy(() => import('./pages/DocumentsPage.jsx'));
const MediaPage = lazy(() => import('./pages/MediaPage.jsx'));
const MyUploadPage = lazy(() => import('./pages/MyUploadPage.jsx'));

function App() {
  return (
    <div className="App bg-gray-100 dark:bg-gray-700">
      <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/myuploads" element={<MyUploadPage />} />
          <Route path="*" element={<SignInPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
