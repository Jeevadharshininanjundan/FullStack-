import React, {useState} from 'react';
import axios from  '../axios';
import { useNavigate } from 'react-router-dom'

function Register() {
    const [form, setForm] = useState({firstname: '', lastname: '', email: '', password: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form,[e.target.name]: e.target.value});
    }

    const HandleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/register', form);
            alert('Registered successfully');
            navigate('/login');
        }
        catch(err){
            alert(err.response.data.message || 'Registration failed');
        }
    };

    return (
        <div className='min-h-screen bg-[#1a1a1a] text-white flex justify-center items-center'>
           <div className='bg-black p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-3xl text-semibold mb-6 text-center text-white '> Register</h2>
            <form  className='space-y-4'onSubmit={HandleSubmit}>
                <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} 
                className='w-full bg-[#1a1a1a] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white'/>
                <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange}
                 className='w-full bg-[#1a1a1a] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white' />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} 
                 className='w-full bg-[#1a1a1a] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white'/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} 
                 className='w-full bg-[#1a1a1a] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white'/>
                <button className='w-full py-2 hover:bg-[#1a1a1a] rounded-md transition ' type="submit">Register</button>
            </form>
        </div>
        </div>
    )
}

export default Register;