import {Link} from 'react-router-dom';
import React from 'react';
import'./index.css';

function Home() {
    return (
        <div className='min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center justify-center space-y-4'>
            <h2 className='text-3xl font-bold  text-red-500 mb-6'>Welcome to Online Judge</h2>
            <Link to ="/login">
            <button className='px-6 py-2 bg-indigo-500 text-white rounded  hover:text-indigo-600 transition duration-300'>Login</button>
            </Link>
            <Link  to ="/register">
            <button className='px-6 py-2 bg-indigo-500 text-white rounded  hover:text-indigo-600 transition duration-300'>Register</button>
            
            </Link>
            <Link  to ="/problems">
            <button className='px-6 py-2 bg-indigo-500 text-white rounded  hover:text-indigo-600 transition duration-300'>Problems</button>
            </Link>
        </div>
    );

    
}
export default Home;