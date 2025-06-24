import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login= ()=> {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', form);
            alert('Login successful');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response.data.message || 'Login failed');
        }
    };

    return (
        <div className='min-h-screen bg-[#1a1a1a] text-white flex justify-center items-center '>
            <div className='bg-black p-8  rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-3xl font-semibold mb-6 text-center text-white'>Login</h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange}
                className='w-full p-3 bg-[#1a1a1a] rounded-md focus: outline-none focus:ring-2 focus:ring-white' />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} 
                className='w-full p-3 bg-[#1a1a1a] rounded-md focus:outline-none focus:ring-2 focus:ring-white'/>
                <button type="submit"
                className='w-full py-2 hover:bg-[#1a1a1a] rounded-md transition'>Login</button>
            </form>
            </div>
        </div>
    );
}
export default Login;