import { useEffect, useState } from 'react';
import axios from '../axios'; // use your configured axios instance

const ContestLeaderboard = ({ contestId }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`/contests/${contestId}/leaderboard`);
        setLeaderboard(res.data);
      } catch (err) {
        console.error('Error loading leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, [contestId]);

  return (
    <div className="mt-8 bg-[#140c1c] text-white border border-[#3f0d68] p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4 text-purple-400">🏆 Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="text-purple-300 border-b border-purple-600">
              <th className="p-2">Rank</th>
              <th className="p-2">User</th>
              <th className="p-2">Solved</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, i) => (
              <tr key={i} className="border-b border-[#333]">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{entry.username || entry.name}</td>
                <td className="p-2">{entry.totalSolved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContestLeaderboard;
