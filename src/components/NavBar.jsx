import React, { useState } from 'react';
import assets from "../assets/assets";
import { NavLink } from 'react-router-dom';
const NavBar = () => {
    const [sideBar, setSideBar] = useState(false);
    return (
        <div className='fixed top-0  w-full flex items-center justify-center gap-50 sm:gap-70 px-4 py-2 bg-transparent shadow-none'>
            <img src={assets.logo} alt="Logo" className="h-10 sm:h-13" />
              <div className='hidden md:flex justify-start w-83 rounded-full bg-amber-500 items-center text-amber-50 '>
                <NavLink to="/" className='px-4 py-2 hover:bg-amber-200 hover:text-amber-700 rounded-full'>Home</NavLink>
                <NavLink to="/recipes" className='px-4 py-2 hover:bg-amber-200 hover:text-amber-700 rounded-full'>Recipes</NavLink>
                <NavLink to="/favourite" className='px-4 py-2 hover:bg-amber-200 hover:text-amber-700 rounded-full'>Favourite</NavLink>
                <NavLink to="/about" className='px-4 py-2 hover:bg-amber-200 hover:text-amber-700 rounded-full'>About</NavLink>
              </div>
            <div className='hidden md:flex items-center'>
                <NavLink to="/login" className='px-4 py-2 bg-amber-500 rounded-full hover:bg-amber-700 text-amber-50 hover:text-amber-200'>Login</NavLink>
            </div>
    
            <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
                onClick={() => setSideBar(!sideBar)}
                aria-label="Toggle menu"
            >
                <span className={`block w-6 h-0.5 bg-black mb-1 transition-all duration-300 ${sideBar ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black mb-1 transition-all duration-300 ${sideBar ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${sideBar ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
            {/* Mobile Menu */}
            {sideBar && (
                <div className="absolute top-16 right-0 w-[70%] bg-amber-300 flex flex-col items-center py-4 shadow-lg md:hidden animate-fade-in z-50">
                    <NavLink to="/" className='px-4 py-2 hover:bg-amber-400 rounded-full w-full text-center' onClick={() => setSideBar(false)}>Home</NavLink>
                    <NavLink to="/recipes" className='px-4 py-2 hover:bg-amber-400 rounded-full w-full text-center' onClick={() => setSideBar(false)}>Recipes</NavLink>
                    <NavLink to="/favourite" className='px-4 py-2 hover:bg-amber-400 rounded-full w-full text-center' onClick={() => setSideBar(false)}>Favourite</NavLink>
                    <NavLink to="/about" className='px-4 py-2 hover:bg-amber-400 rounded-full w-full text-center' onClick={() => setSideBar(false)}>About</NavLink>
                    <NavLink to="/login" className='px-4 py-2 bg-amber-300 rounded-full hover:bg-amber-400 w-full text-center mt-2' onClick={() => setSideBar(false)}>Login</NavLink>
                </div>
            )}
        </div>
    );
}

export default NavBar;
