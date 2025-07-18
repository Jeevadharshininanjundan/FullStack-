import React, {useEffect, useState} from 'react';
import axios from '../axios';
import moment from 'moment';
import AIReviewModal from '../components/AIReview.jsx';
import  { Link} from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext.jsx';
function Submissions() {
    const [submissions,setSubmissions] = useState([]);
    const [selectedCode, setSelectedCode] = useState('');
const {triggerRefresh} = useDashboard();
  const [showReview, setShowReview] = useState(false);

    useEffect(() => {
        axios.get('/submissions',{withCredentials : true})
        .then(res => {
          setSubmissions(res.data);
          triggerRefresh(); // Trigger refresh after fetching submissions
        })
        .catch(err => console.error(err))
    },[]);
    
    const handleReviewClick = (code) => {
    setSelectedCode(code);
    setShowReview(true);
  };


    return(    
        <div className='min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e] '>                                   
        <div className="max-w-7xl mx-auto overflow-x-auto rounded-lg shadow-lg px-6 py-18  ">
  <table className="min-w-full text-sm text-left text-white bg-[#12121b]">
    <thead className="bg-[#1f1f2e] text-purple-300 text-lg ">
      <tr>
        <th className="px-5 py-3">Time</th>
        <th className="px-5 py-3 w-2/5">Problem</th>
        <th className="px-5 py-3 w-1/5">Status</th>
        <th className="px-5 py-3">Runtime</th>
        <th className="px-5 py-3">Language</th>
      </tr>
    </thead>
    <tbody>
      {submissions.map((s, idx) => (
        <tr key={idx} className="hover:bg-[#1e1e2e] border-t border-[#29293d] transition">
          <td className="px-5 py-3">{moment(s.timestamp).fromNow()}</td>
          <td className="px-5 py-3 text-blue-400 hover:underline">
            <Link to={`/problems/${s.problemId._id}`}>{s.problemId.title}</Link>
          </td>
          <td className={`px-5 py-3 font-medium ${
            s.verdict === 'Accepted' ? 'text-green-400' : 'text-red-400'
          }`}>
            {s.verdict}
          </td>
          <td className="px-5 py-3">{s.runtime}</td>
          <td className="px-5 py-3 capitalize">{s.language}</td>
           <td className="px-5 py-3">
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                    onClick={() => handleReviewClick(s.code)}
                  >
                    AI Review
                  </button>
                </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
{showReview && (
      <AIReviewModal
        code={selectedCode}
        onClose={() => setShowReview(false)}
      />
    )}
  </div>
       
    )
}
export default Submissions;