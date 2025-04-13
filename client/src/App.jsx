import './App.css';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy imports
const SignUpPage = lazy(() => import('./components/SignupPage.jsx'));
const SignInPage = lazy(() => import('./components/SigninPage.jsx'));
const Home = lazy(() => import('./components/Home.jsx'));
const DocumentsPage = lazy(() => import('./components/DocumentsPage.jsx'));
const MediaPage = lazy(() => import('./components/MediaPage.jsx'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="*" element={<SignInPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
