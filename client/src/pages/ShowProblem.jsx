import React,{ useEffect, useState  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AIReviewModal from '../components/AIReview.jsx';




function ShowProblem() {
    const {id} = useParams();
    const [problem , setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    const[input,setInput] = useState('');
    const [ output,setOutput] = useState('');
    const [submitted, setSubmitted] = useState(false);
const [showReview,setShowReview] = useState(false);
    useEffect(()=>{
        axios.get(`http://localhost:5000/problems/${id}`)
        .then(res => setProblem(res.data))
        .catch(err => alert('Error loading problem'));
    },[id]);

    const handleRun = async (e) => {
        e.preventDefault();
         const finalInput = input.trim() !== '' ? input : (problem.input || '');
        try{
            const res = await axios.post('http://localhost:8000/run', {
                code,
                 language,
                input : finalInput,
                 mode: 'run'
            });

            setOutput(`Output:\n${res.data.output || 'No output returned.'}`);
        }catch(err){
            console.log("Run Error",err);
            
            setOutput('Error running code');
            
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(`http://localhost:5000/problems/submit/${id}`, {
                code,
                language,
                mode: 'submit'
                
            },
            {
                withCredentials : true
            }
        );
           const verdict = res.data.verdict;
           const resultMsg = verdict === 'Accepted'
           ? "Code submitted successfully and passed all the test Cases!"
           : `Submission failed. Verdict: ${verdict}`;
            
            setSubmitted(true);
            setOutput(resultMsg);
        } catch (err) {
            console.log(err);
            setSubmitted(true);
            setOutput('Error submitting code');
        }
    };

    if (!problem) return <p>Loading...</p>;

    return (
        <div className='min-h-screen  bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e] text-purple-300 px-6 py-10 flex gap-6 flex-col lg:flex-row'>
           <div className='bg-[#140c1c] border border-[#3f0d68]  p-8 rounded-lg shadow-lg w-full lg:w-1/2'>
            <h2 className='text-3xl font bold mb-4 border-b border-[#3f0d68] pb-2 text-purple-400'>{problem.title}</h2>
            <p className='text-lg mb-4'>
                <span className='font-semibold text-purple-400'>Description:</span> {problem.description}</p>
           <p className='text-lg mb-4'>
                <span className='font-semibold text-purple-400'>Sample Input:</span> {problem.input}</p>
           <p className='text-lg mb-4'>
                <span className='font-semibold text-purple-400'>Sample Output:</span> {problem.output}</p>

           <div className='mb-4'>
            <h3 className='text-xl font-semibold mb-2 border-b border-[#3f0d68] text-purple-400 pb-2'>TestCases:</h3>
            {problem.testCases && problem.testCases.length > 0 ? (
                <ul className=' space-y-2'>
                    {problem.testCases.map((testCase, index) => (
                        <li key={index} className='bg-[#0f0c29] p-2 border border-[#3f0d68] rounded-md shadow-md'>
                            <p><span className='font-semibold text-purple-400'>Input:</span> {testCase.input}</p>
                            <p><span className='font-semibold text-purple-400'>Output:</span> {testCase.output}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-gray-400 mt-2'>No test cases available.</p>
            )}
           </div>
        </div> 

        <div className="w-full lg:w-1/2 bg-[#140c1c] border border-[#3f0d68] p-8 rounded-lg shadow-lg">
            <form className="space-y-4">
                <div className='flex justify-between items-center'>
                    <label className='text-lg font-semibold text-purple-300'>Language</label>
                    <select
                       value={language}
                       onChange={(e) => setLanguage(e.target.value)}
                       className="p-2 rounded bg-[#0f0c1c] text-purple-300 border border-[#3f0d68]" 
                       >
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                       </select>

                </div>
                <textarea
                    rows="12"
                    className="w-full p-3 bg-[#0f0c1c] text-purple-200 rounded-md border border-[#3f0d68] focus:outline-none"
                    placeholder='Write your code here... '
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    />
                    <textarea
  rows="4"
  className="w-full p-3 bg-[#0f0c1c] text-purple-200 rounded-md border border-[#3f0d68] focus:outline-none"
  placeholder="Enter your custom input..."
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>

               
               <div className="flex gap-4">
                <button
                    type="button"
                    onClick={handleRun}
                    className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md shadow-md hover:shadow-blue-500 transition duration-300"
>
    Run Code
</button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-1/2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md shadow-md hover:shadow-purple-500 transition duration-300"
                >
                    Submit Code
                </button>

                <button
              type="button"
              onClick={() => setShowReview(true)}
              className="w-1/3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md shadow-md hover:shadow-green-500 transition duration-300"
            >
              AI Review
            </button>

               </div>

                {output && (
                    <div className={`mt-4 bg-[#0f0c29] p-4 rounded border ${submitted ? 'text-green-400 border-green-600' : 'text-yellow-400 border-yellow-600'}`}>
                        <h3 className="text-lg font-semibold mb-1">Output:</h3>
                        <pre className="text-purple-200 whitespace-pre-wrap">{output || 'No output received'}  </pre>
                    </div>
                )}
            </form>


        </div>
         {showReview && (
        <AIReviewModal
          code={code}
          onClose={() => setShowReview(false)}
        />
      )}
    
      </div>
    );

}

export default ShowProblem;