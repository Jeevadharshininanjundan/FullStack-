import React,{ useEffect, useState  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function ShowProblem() {
    const {id} = useParams();
    const [problem , setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    const[input,setInput] = useState('');
    const [ output,setOutput] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:5000/problems/${id}`)
        .then(res => setProblem(res.data))
        .catch(err => alert('Error loading problem'));
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const res = await axios.post('http://localhost:8000/run', {
                code,
                 language,
                testCases : problem.testCases
               
            });

            console.log("Response from server:", res.data);
            setSubmitted(true)
            if(res.data.allPassed) {
                setOutput("Code executed successfully and passed all test cases!");
            }else{
                const failed = res.data.results.find(r => !r.passed);
                setOutput(`Test case ${failed.testCase} failed.\nExpected:${failed.expected}\nGot:${failed.actual}`);
            }
        }catch(err){
            console.log("error from server:",err);
            setSubmitted(true);
            setOutput('Error running code');
            
        }
    };

    if (!problem) return <p>Loading...</p>;

    return (
        <div className='min-h-screen bg-[#1a1a1a] text-white px-6 py-10 flex gap-6 flex-col lg:flex-row'>
           <div className='bg-black  p-8 rounded-lg shadow-lg w-full lg:w-1/2'>
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

        <div className="w-full lg:w-1/2 bg-black p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='flex justify-between items-center'>
                    <label className='text-lg font-semibold'>Language</label>
                    <select
                       value={language}
                       onChange={(e) => setLanguage(e.target.value)}
                       className="p-2 rounded bg-[#1a1a1a] text-white" 
                       >
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                       </select>

                </div>
                <textarea
                    rows="12"
                    className="w-full p-3 bg-black text-white rounded-md"
                    placeholder='Write your code here... '
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    />

               
                  
                <button
                    type ="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Submit Code
                </button>

                {submitted ? (
                output ? (
                    <div className="mt-4 bg-black p-4 rounded text-green-400">
                        <h3 className="text-lg font-semibold mb-1">Output:</h3>
                        <pre>{output || 'No output received'}  </pre>
                    </div>
                ):(
                    <div className='mt-4 text-red-400'>No output</div>
                ) ): null}
            </form>


        </div>
      </div>
    );

}

export default ShowProblem;