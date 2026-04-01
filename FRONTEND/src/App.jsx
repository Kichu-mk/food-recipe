
import React from 'react';
import NavBar from './components/NavBar';
import Router from './lib/Router';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/login';
  return (
    <>
      {!hideNavBar && (
        <div className="w-full flex justify-center">
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
