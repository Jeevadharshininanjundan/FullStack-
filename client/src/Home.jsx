import {Link} from 'react-router-dom';
import React from 'react';
import'./index.css';

function Home() {
   

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-3xl space-y-6">
        <span className="inline-block px-4 py-1 bg-purple-800 text-purple-300 text-xs rounded-full uppercase tracking-wide font-semibold">
          🚀 New Era of Coding
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-purple-400">
          Master Your<br />Coding Journey
        </h1>

        <p className="text-gray-300 text-lg md:text-xl">
          Transform your programming skills with our revolutionary online judge platform.<br />
          Practice algorithms, compete with peers, and unlock your potential.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md font-medium text-white">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 bg-purple-700 hover:bg-purple-600 rounded-md font-medium text-white">
              Register
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
    
}
export default Home;