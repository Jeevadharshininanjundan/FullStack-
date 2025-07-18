import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

function ContestProblemPage() {
  const { contestId, problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [contest, setContest] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeStatus, setTimeStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contestRes, problemRes] = await Promise.all([
          axios.get(`/contests/${contestId}`),
          axios.get(`/problems/${problemId}`)
        ]);
        setContest(contestRes.data);
        setProblem(problemRes.data);
      } catch (err) {
        console.error('Error loading contest or problem', err);
      }
    };
    fetchData();
  }, [contestId, problemId]);

  useEffect(() => {
    if (!contest) return;
    const now = new Date();
    const start = new Date(contest.startTime);
    const end = new Date(contest.endTime);

    if (now < start) {
      setTimeStatus('upcoming');
    } else if (now > end) {
      setTimeStatus('ended');
    } else {
      setTimeStatus('running');
    }
  }, [contest]);

  const handleRun = async (e) => {
    e.preventDefault();
    const finalInput = input.trim() !== '' ? input : (problem.input || '');
    try {
      const res = await axios.post('http://localhost:8000/run', {
        code,
        language,
        input: finalInput,
        mode: 'run'
      });
      setOutput(`Output:\n${res.data.output || 'No output returned.'}`);
    } catch (err) {
      console.error(err);
      setOutput('Error running code');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/contests/${contestId}/submit/${problemId}`, {
        code,
        language,
        
      },{withCredentials : true});
      const verdict = res.data.verdict;
      setSubmitted(true);
      setOutput(verdict === 'Accepted' ? '✅ Accepted!' : `❌ ${verdict}`);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      setOutput('Error submitting code');
    }
  };

  if (!problem || !contest) return <p className="text-white p-4">Loading...</p>;
  if (timeStatus === 'upcoming') return <p className="text-yellow-400 p-4">🚫 Contest hasn’t started yet!</p>;
  if (timeStatus === 'ended') return <p className="text-red-400 p-4">❌ Contest has ended.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e] text-purple-300 px-6 py-10 flex gap-6 flex-col lg:flex-row">
      <div className="bg-[#140c1c] border border-[#3f0d68] p-8 rounded-lg shadow-lg w-full lg:w-1/2">
        <h2 className="text-3xl font-bold text-purple-400 mb-4">{problem.title}</h2>
        <p><strong>Description:</strong> {problem.description}</p>
        <p><strong>Sample Input:</strong> {problem.input}</p>
        <p><strong>Sample Output:</strong> {problem.output}</p>
        <div className='mt-4'>
          <h3 className='text-xl font-semibold text-purple-400'>Test Cases</h3>
          <ul className='space-y-2 mt-2'>
            {problem.testCases.map((tc, i) => (
              <li key={i} className='bg-[#0f0c29] p-2 border border-[#3f0d68] rounded-md'>
                <p><strong>Input:</strong> {tc.input}</p>
                <p><strong>Output:</strong> {tc.output}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-[#140c1c] border border-[#3f0d68] p-8 rounded-lg shadow-lg">
        <form className="space-y-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 rounded bg-[#0f0c1c] text-purple-300 border border-[#3f0d68]"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          <textarea
            rows="12"
            className="w-full p-3 bg-[#0f0c1c] text-purple-200 rounded-md border border-[#3f0d68]"
            placeholder="Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <textarea
            rows="4"
            className="w-full p-3 bg-[#0f0c1c] text-purple-200 rounded-md border border-[#3f0d68]"
            placeholder="Enter your custom input..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleRun}
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md shadow-md"
            >Run Code</button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-1/2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md shadow-md"
            >Submit Code</button>
          </div>

          {output && (
            <div className={`mt-4 bg-[#0f0c29] p-4 rounded border ${submitted ? 'text-green-400 border-green-600' : 'text-yellow-400 border-yellow-600'}`}>
              <h3 className="text-lg font-semibold mb-1">Output:</h3>
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContestProblemPage;

