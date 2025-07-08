import React, {useEffect, useState} from 'react';
import axios from '../axios';
import moment from 'moment';
import  { Link} from 'react-router-dom';

function Submissions() {
    const [submissions,setSubmissions] = useState([]);

    useEffect(() => {
        axios.get('/submissions')
        .then(res => setSubmissions(res.data))
        .catch(err => console.error(err))
    },[]);

    return(
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e] text-white px-6 py-10">
          <h2 className="text-3xl text-purple-400 font-semibold mb-6 border-b border-purple-700 pb-2">My Submissions</h2>
        
          <div className="overflow-x-auto">
            <table className="min-w-full border border-purple-700 shadow-md">
                <thead className="bg-[#1a1a2e] text-purple-300">
                    <tr>
                        <th className="px-4 py-3 border border-purple-700 text-left">Time</th>
                         <th className="px-4 py-3 w-2/5 border border-purple-700 text-left">Problem</th>
                         <th className="px-4 py-3 w-1/5 border border-purple-700 text-left">Status</th>
                         <th className="px-4 py-3 border border-purple-700 text-left">Runtime</th>
                         <th className="px-4 py-3 border border-purple-700 text-left">Language</th>
            
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((s,idx) => (
                        <tr key={idx} className="hover:bg-[#252233] transition">
                            <td className="px-4 py-2 border border-purple-800">{moment(s.timestamp).fromNow()}</td>
                            <td className="px-4 py-2 border border-purple-800 text-blue-400 hover:underline">
                                <Link to={`/problems/${s.problemId}`}>{s.problemTitle}</Link>
                            </td>
                            <td className={`px-4 py-2 border border-purple-800 font-semibold ${
                                s.verdict === 'Accepted' ? 'text-green-400' : 'text-red-400'
                            }`}> 
                               {s.verdict}
                            </td>
                            <td className = "px-4 py-2 border border-purple-800">{s.runtime}</td>
                            <td className = "px-4 py-2 border border-purple-800 capitalize">{s.language}</td>
                        </tr>

                    ))}
                </tbody>
            </table>

          </div>
        
        </div>
    )
}
export default Submissions;