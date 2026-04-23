
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Router from './lib/Router';
import { useLocation } from 'react-router-dom';
import { WelcomeLoader } from './components/Loading';
import { Toaster } from "react-hot-toast";

const App = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/login';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <WelcomeLoader />;
  }
  return (
    <>
      <Toaster position="top-right"  />
      {!hideNavBar && (
        <div className="w-full flex justify-center items-center">
          <NavBar />
        </div>
      )}
      <main className="w-full">
        <Router />
      </main>
    </>
  );
}

export default App;
