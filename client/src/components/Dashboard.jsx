import React, { useState, useEffect } from 'react';
import axios from '../axios';

function Dashboard( ){
    const [user, setUser] = useState(null);

    useEffect( ()=>{
        axios.get('/profile')
        .then(res => setUser(res.data.user))
        .catch(() => alert("Please login first"));
    },[]);

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <> 
                 <p>Name: {user.firstname}  {user.lastname}</p>
                 <p>Email: {user.email}</p>
                </>
            ):(
                <p>Loading...</p>
            )}
        </div>
    );
}
export default Dashboard;