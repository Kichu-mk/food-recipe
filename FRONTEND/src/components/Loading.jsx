import React from "react";
import assets from "../assets/assets";

const Loading = ({text}) => {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="w-12 h-12 border-4 border-orange-400 border-dashed rounded-full animate-spin"></div>
      <span className="ml-3 text-amber-700 font-semibold">{text || "Loading recipes..."}</span>
    </div>
  );
};

export function WelcomeLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="w-30 sm:w-50">
        <img src={assets.logo} alt="Logo" className="w-full h-full object-contain" />
      </div>
      <h1 className="text-2xl font-bold text-amber-700 animate-pulse">
        🍴 Welcome to Recipe World
      </h1>
      <div className="w-12 h-12 border-4 border-orange-400 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
