import { useState } from "react";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";
import assets from "../assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingBar from "../components/LoadingBar";



export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    let endpoint = isLogin ? "login" : "signup";
    try {
      const res = await axios.post(`${API_URL}/${endpoint}`, {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      const userData = res.data.user;
      if (!userData.favorites) {
        userData.favorites = [];
      }
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userId", userData._id);
      toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (data) {
      setError(data.response?.data?.message || "An error occurred");
      toast.error("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0}}
    animate={{ opacity: 1 }}
    transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5, duration: 1}}
    className="flex max-sm:flex-col justify-center  items-center h-screen w-full bg-[url('/src/assets/loginbg.jpg')] bg-cover bg-center bg-no-repeat sm:gap-10">
      <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0}}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1, duration: 1}}
      className="max-sm:w-full h-2/5 max-sm:h-50 flex justify-center items-center">
        <img
          src={assets.signup}
          alt=""
          className="w-full h-full object-contain"
        />
      </motion.div>
      <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0}}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1, duration: 1}}
      className="h-1/2 bg-white shadow-2xl w-96 max-sm:w-90 p-8 rounded-lg flex flex-col justify-center items-center transition duration-500 hover:scale-105 ">
        <img src={assets.logo} alt="Logo" className="w-40" />
        <h2 className="text-2xl font-bold text-center mb-6 text-[#6c63ff]">
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
              className="w-full p-2 text-gray-800 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6c63ff] hover:scale-105 hover:border-[#6c63ff] transition"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Email"
            className="w-full p-2 text-gray-800 border border-gray-400 rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#6c63ff] hover:scale-105 hover:border-[#6c63ff] transition"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="Password"
            className="w-full p-2 text-gray-800 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c63ff] hover:scale-105 hover:border-[#6c63ff] transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6c63ff] text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300 hover:scale-105 hover:border-[#6c63ff]"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
        <LoadingBar loading={loading} text={isLogin ? "Logging in..." : "Creating account..."} />
        {error != "" && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
        <br></br>
        <p
          className="text-center mt-4 cursor-pointer text-sm text-gray-600 hover:text-[#6c63ff] transition"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </motion.div>
    </motion.div>
  );
}
