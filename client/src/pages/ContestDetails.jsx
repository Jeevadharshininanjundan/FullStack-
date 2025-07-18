import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { Link } from 'react-router-dom';
import ContestLeaderboard from '../components/ContestLeaderboard'; // adjust path if needed
import { useContext } from 'react';
import { useUser } from '../context/AuthContext.jsx'; // adjust path





function ContestDetails() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({});


const { user } = useUser();

  useEffect(() => {
    const fetchContest = async () => {
      const res = await axios.get(`/contests/${id}`);
      setContest(res.data);
    };
    fetchContest();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!contest) return;

      const now = new Date();
      const start = new Date(contest.startTime);
      const end = new Date(contest.endTime);

      if (now < start) {
        const seconds = Math.floor((start - now) / 1000);
        setHasStarted(false);
        setTimeLeft(`🚀 Starts in ${seconds} seconds`);
      } else if (now > end) {
        setHasStarted(false);
        setTimeLeft('❌ Contest Ended');
      } else {
        const seconds = Math.floor((end - now) / 1000);
        setHasStarted(true);
        setTimeLeft(`⏳ Ends in ${seconds} seconds`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  useEffect(() => {
  const fetchSubmissionStatus = async () => {
    try {
      const res = await axios.get(`/submissions/status/${contest._id}`, {
  withCredentials: true, // 🔑 this ensures the cookie is sent
});
      setSubmissionStatus(res.data); // { problemId: 'Accepted' | 'Wrong' }
    } catch (err) {
      console.error("Error fetching submission status", err);
    }
  };

  if (hasStarted && user?._id && contest) {
    fetchSubmissionStatus();
  }
}, [contest, user, hasStarted]);

  if (!contest) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e]">
      <div className="bg-[#1f1f2e] p-6 rounded-2xl shadow-lg shadow-purple-700/20">
        <h1 className="text-3xl font-bold text-purple-400 mb-2">🏆 {contest.title}</h1>
        <p className="text-gray-300 mb-4">{contest.description}</p>
        <p className="text-sm text-purple-300 mb-6">{timeLeft}</p>

        <h3 className="text-xl font-semibold text-purple-400 mb-3">🧩 Problems</h3>

{!hasStarted ? (
  <p className="text-yellow-400">⚠️ Problems will be visible once the contest starts.</p>
) : contest?.problems?.length > 0 ? (
  <ul className="list-disc pl-6 space-y-2">
    {contest.problems.map((p) => {
      const status = submissionStatus[p._id]; // 'Accepted' | 'Wrong' | undefined
      return (
        <li key={p._id} className="text-white">
          <Link to={`/contests/${contest._id}/problems/${p._id}`} className="text-purple-300 hover:underline">
            {p.title}
          </Link>
          {status === 'Accepted' && <span className="text-green-400 ml-2">✅</span>}
          {status === 'Wrong' && <span className="text-red-400 ml-2">❌</span>}
        </li>
      );
    })}
  </ul>
) : (
  <p className="text-gray-400">No problems assigned to this contest yet.</p>
)}

       <ContestLeaderboard contestId={id} />


      </div>
    </div>
  );
}

export default ContestDetails;


/* contest.problems.length > 0 ? (
          <ul className="space-y-4">
            {contest.problems.map((p) => (
              <li key={p._id} className="bg-[#2a2a3d] p-4 rounded-xl border border-purple-700 shadow-md">
                <Link
                  to={`/contests/${contest._id}/problems/${p._id}`}
                  className="text-lg font-bold text-purple-300 hover:text-white hover:underline"
                >
                  {p.title}
                </Link>
                <p className="text-sm text-gray-400">Difficulty: {p.difficulty}</p>
              </li>
            ))}
          </ul> */

/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

function ContestDetails() {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const fetchContest = async () => {
      const res = await axios.get(`/contests/${id}`);
      setContest(res.data);
    };
    fetchContest();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!contest) return;
      const now = new Date();
      const start = new Date(contest.startTime);
      const end = new Date(contest.endTime);

      if (now < start) {
        const seconds = Math.floor((start - now) / 1000);
        setTimeLeft(`Starts in ${seconds} seconds`);
      } else if (now > end) {
        setTimeLeft('Contest Ended');
      } else {
        const seconds = Math.floor((end - now) / 1000);
        setTimeLeft(`Ends in ${seconds} seconds`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  if (!contest) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">🏆 {contest.title}</h1>
      <p className="mb-4">{contest.description}</p>
      <p className="text-sm mb-6">{timeLeft}</p>
      <h3 className="text-lg font-semibold mb-2">🧩 Problems</h3>
      {contest.problems && contest.problems.length > 0 ? (
      <ul className="space-y-2">
        {contest.problems.map(p => (
          <li key={p._id} className="bg-gray-800 p-4 rounded shadow">
            <h4 className="font-bold">{p.title}</h4>
            <p className="text-sm text-gray-300">{p.difficulty}</p>
          </li>
        ))}
      </ul>
      ) : (
        <p className="text-gray-400">No problems assigned to this contest yet.</p>
      )}
    </div>
  );
}

export default ContestDetails;*/