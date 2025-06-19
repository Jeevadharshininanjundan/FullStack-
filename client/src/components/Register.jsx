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
        <div>
            <h2>Register</h2>
            <form onSubmit={HandleSubmit}>
                <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} />
                <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;