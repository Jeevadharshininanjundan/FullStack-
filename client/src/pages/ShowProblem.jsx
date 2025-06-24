import React,{ useEffect, useState  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ShowProblem() {
    const {id} = useParams();
    const [problem , setProblem] = useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:5000/problems/${id}`)
        .then(res => setProblem(res.data))
        .catch(err => alert('Error loading problem'));
    },[id]);

    if (!problem) return <p>Loading...</p>;

    return (
        <div className='min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-4'>
           <div className='bg-black  p-8 rounded-lg shadow-lg w-full max-w-2xl'>
            <h2 className='text-2xl font bold mb-4 border-b border-gray-300 pb-2'>{problem.title}</h2>
            <p className='text-lg mb-4'>
                <span className='font-semibold'>Description:</span> {problem.description}</p>
           <p className='text-lg mb-4'>
                <span className='font-semibold'>Sample Input:</span> {problem.input}</p>
           <p className='text-lg mb-4'>
                <span className='font-semibold'>Sample Output:</span> {problem.output}</p>
           
           <div className='mb-4'>
            <h3 className='text-xl font-semibold mb-2 border-b border-gray-300 pb-2'>TestCases:</h3>
            {problem.testCases && problem.testCases.length > 0 ? (
                <ul className=' space-y-2'>
                    {problem.testCases.map((testCase, index) => (
                        <li key={index} className='bg-[#1a1a1a] p-2 rounded-md shadow-md'>
                            <p><span className='font-semibold'>Input:</span> {testCase.input}</p>
                            <p><span className='font-semibold'>Output:</span> {testCase.output}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-white mt-2'>No test cases available.</p>
            )}
           </div>
        </div> 
      </div>
    );

}

export default ShowProblem;