import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';


function ContestList() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      const res = await axios.get('/contests');
      setContests(res.data);
    };
    fetchContests();
  }, []);

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e]">
  <h1 className="text-3xl font-bold text-purple-400 mb-6">🏁 Upcoming Contests</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {contests.map(contest => (
      <div
        key={contest._id}
        className="bg-[#1f1f2e] p-6 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300"
      >
        <h2 className="text-xl font-bold text-purple-300 mb-2">{contest.title}</h2>
        <p className="text-sm text-gray-300 mb-4">{contest.description}</p>

        <div className="mt-auto text-sm text-gray-400 border-t border-[#333] pt-3 flex justify-between">
          <div>
            <span className="text-purple-400 font-semibold">🕒 Starts:</span><br />
            {new Date(contest.startTime).toLocaleString()}
          </div>
          <div className="text-right">
            <span className="text-purple-400 font-semibold">⏳ Ends:</span><br />
            {new Date(contest.endTime).toLocaleString()}
          </div>
        </div>

        <Link
          to={`/contests/${contest._id}`}
          className="block mt-4 text-center bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-2 rounded-xl"
        >
          Enter Contest 🚀
        </Link>
      </div>
    ))}
  </div>
</div>

  );
}

export default ContestList;