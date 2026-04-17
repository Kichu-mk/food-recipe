import { useState } from "react";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from "axios";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    let endpoint = isLogin ? "login" : "signup";
    try {
      const res = await axios.post(`http://localhost:5000/${endpoint}`, { name, email, password });
      
      localStorage.setItem("token", res.data.token);
      
      // Ensure user object has favorites array
      const userData = res.data.user;
      if (!userData.favorites) {
        userData.favorites = [];
      }
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Decode JWT to get user ID
      localStorage.setItem("userId", userData._id);
      
      window.location.href = "/";
    } catch (data) {
      setError(data.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex max-sm:flex-col justify-start h-screen w-full bg-linear-to-r">
      <DotLottieReact
        src="https://lottie.host/8fa0dec9-c835-4375-a716-626289cfc34e/uvmzYm0jBx.lottie"
        loop
        autoplay
        className="absolute top-1/2 max-sm:top-1/4 max-sm:left-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2  w-full"
      />
      <div className="absolute top-1/2 max-sm:top-3/5 max-sm:left-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-96 max-sm:w-90 p-8 transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="space-y-4" onSubmit={handleOnSubmit}>
          {!isLogin && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8b42] transition"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8b42] transition"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="Password"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8b42] transition"
          />

          <button
            type="submit"
            className="w-full bg-[#ff8b42] text-white py-2 rounded-lg hover:bg-amber-600 transition duration-300"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
        { (error!="") && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        <br></br>
        <p
          className="text-center mt-4 cursor-pointer text-sm text-gray-600 hover:text-[#ff8b42] transition"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
        
      </div>
    </div>
  );
}
