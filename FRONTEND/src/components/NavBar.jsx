import React, { useState } from "react";
import assets from "../assets/assets";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
const NavBar = () => {
  const [sideBar, setSideBar] = useState(false);
  let token = localStorage.getItem("token") || null;
  let user = JSON.parse(localStorage.getItem("user")) || null;
  const [isLogin, setIsLogin] = useState(token ? false : true);

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
      window.location.reload();
    } else {
      setIsLogin(true);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur shadow-sm rounded-b-4xl"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.4 }}
          className="shrink-0 flex items-center">
            <img src={assets.logo} alt="Logo" className="h-10 sm:h-12" />
          </motion.div>
          {/* Desktop Menu */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.6 }}
            className="hidden md:flex flex-1 items-center justify-center gap-2 rounded-full bg-transparent text-amber-600 py-2 px-4 ">
            <NavLink
              to="/"
              className="px-4 py-2 hover:bg-amber-200 hover:text-amber-700 rounded-full"
            >
              Home
            </NavLink>
            <NavLink
              to="/recipes"
              className="px-4 py-2 hover:bg-amber-200 hover:text-amber-700 rounded-full"
            >
              Recipes
            </NavLink>
            {token && (
              <NavLink
                to="/favourite"
                className="px-4 py-2 hover:bg-amber-200 hover:text-amber-700 rounded-full"
              >
                Favourite
              </NavLink>
            )}
            <NavLink
              to="/about"
              className="px-4 py-2 hover:bg-amber-200 hover:text-amber-700 rounded-full"
            >
              About
            </NavLink>
          </motion.div>

          <div className="flex md:hidden">
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.6 }}
              onClick={() => setSideBar(!sideBar)}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-700 hover:bg-amber-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={sideBar}
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {sideBar ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {sideBar && (
        <div className="md:hidden bg-white/95 shadow-lg border-t border-amber-100">
          <div className="flex flex-col items-center py-4 gap-2">
            <NavLink
              to="/"
              className="w-full px-4 py-2 text-center hover:bg-amber-100 rounded"
              onClick={() => setSideBar(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/recipes"
              className="w-full px-4 py-2 text-center hover:bg-amber-100 rounded"
              onClick={() => setSideBar(false)}
            >
              Recipes
            </NavLink>
            {token && (
              <NavLink
                to="/favourite"
                className="w-full px-4 py-2 text-center hover:bg-amber-100 rounded"
                onClick={() => setSideBar(false)}
              >
                Favourite
              </NavLink>
            )}
            <NavLink
              to="/about"
              className="w-full px-4 py-2 text-center hover:bg-amber-100 rounded"
              onClick={() => setSideBar(false)}
            >
              About
            </NavLink>
          </div>
        </div>
      )}

      <div className="hidden md:flex items-center justify-end absolute right-4 top-0 h-16">
        {token && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.6 }}
            className="relative group px-4 py-2 text-amber-700 font-semibold">
            <button className="group flex items-center justify-center border rounded-lg px-2 py-1 font-medium text-gray-700 hover:text-amber-700 focus:outline-none">
              <img src={assets.userimg} alt="User" className="group-hover:bg-amber-500 w-6 h-6 rounded-full inline-block mr-2" />
              {user.name}
            </button>
            <div className="absolute right-0 mt-1 w-40 bg-amber-200 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
              <ul className="text-sm text-gray-700 ">
                <li className="px-4 py-2 hover:bg-amber-500 hover:rounded-lg hover:text-amber-50 cursor-pointer">
                  <NavLink to="/my-recipes">My Recipe</NavLink>
                </li>
                <li className="px-4 py-2 hover:bg-amber-500 hover:rounded-lg hover:text-amber-50 cursor-pointer">
                  <NavLink to="/recipes/new">Add Recipe</NavLink>
                </li>
                <li
                  onClick={checkLogin}
                  className="px-4 py-2 hover:bg-amber-500 hover:rounded-lg hover:text-amber-50 text-red-500 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </motion.div>
        )}
        {!token && (
          <NavLink
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.6 }}
            to="/login"
            className="px-4 py-2 bg-amber-500 rounded-full hover:bg-[#f6836b] text-amber-50 hover:text-yellow-50"
            onClick={checkLogin}
          >
            {isLogin ? "Login" : "Logout"}
        </NavLink>)}
      </div>

      
      {sideBar && (
        <div className="absolute top-16 right-0 w-[70%] bg-amber-500 flex flex-col items-center py-4 shadow-lg md:hidden animate-fade-in z-50">
          {token && (
          <><div className="relative group px-4 py-2 text-amber-700 font-semibold">
              <button className="group flex items-center justify-center border rounded-lg px-2 py-1 font-medium text-gray-700 hover:text-amber-700 focus:outline-none">
                <img src={assets.userimg} alt="User" className="group-hover:bg-amber-500 w-6 h-6 rounded-full inline-block mr-2" />
                {user.name}
              </button>
            </div><NavLink
              to="/my-recipes"
              className="px-4 py-2 hover:bg-amber-500 rounded-full w-full text-center"
              onClick={() => setSideBar(false)}
            >
                My Recipe
            </NavLink>
            <NavLink
            to="/recipes/new"
            className="px-4 py-2 hover:bg-amber-500 rounded-full w-full text-center"
            onClick={() => setSideBar(false)}
          >
            Add Recipe
          </NavLink></>
        )}
          <NavLink
            to="/"
            className="px-4 py-2 hover:bg-amber-500 rounded-full w-full text-center"
            onClick={() => setSideBar(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes"
            className="px-4 py-2 hover:bg-amber-500 rounded-full w-full text-center"
            onClick={() => setSideBar(false)}
          >
            Recipes
          </NavLink>
          <NavLink
            to="/favourite"
            className="px-4 py-2 hover:bg-amber-500 rounded-full w-full text-center"
            onClick={() => setSideBar(false)}
          >
            Favourite
          </NavLink>
          <NavLink
            to="/about"
            className="px-4 py-2 hover:bg-amber-500 rounded-full w-full text-center"
            onClick={() => setSideBar(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className="px-4 py-2 bg-amber-500 rounded-full w-full text-center mt-2"
            onClick={checkLogin}
          >
            {isLogin ? "Login" : "Logout"}
          </NavLink>
        </div>
      )}
    </motion.nav>
  );
};

export default NavBar;
