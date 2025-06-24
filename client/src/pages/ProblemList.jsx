import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProblemList() {
    const [problems, setproblems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/problems')
        .then(res => {
            console.log("res.data = ",res.data);
            setproblems(res.data)
    })
        .catch(err => console.error(err));
    }, []);

    return(
        <div className='min-h-screen bg-[#1a1a1a] text-white p-8    '>
            <h2 className='text-center text-3xl font-semibold text-white mb-6'>All Problems</h2>
            <ul className='space-y-3 mt-6'>
              {problems.map(p =>(
                <li key={p._id}
                className= 'bg-[#1a1a1a] hover:bg-black p-1.5 transition rounded-lg shadow-md'>
                    <Link className=' 'to={  `/problems/${p._id}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
        </div>
    )
    
}

export default ProblemList;