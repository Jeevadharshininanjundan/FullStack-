import React, { useEffect, useState } from 'react';
import axios from '../axios'; // make sure this has the baseURL set
import CalendarHeatmap from 'react-calendar-heatmap';
import { useUser } from '../context/AuthContext.jsx';
import 'react-calendar-heatmap/dist/styles.css';
import '../index.css'; // Ensure you have the styles for the heatmap
import { useDashboard } from '../context/DashboardContext.jsx';

function Dashboard() {
  const { refreshFlag} = useDashboard();
  const { user } = useUser();
  const [stats, setStats] = useState({
    totalProblems: 0,
    solvedCount: 0,
    streak: 0,
    heatmap: {}
  });

  useEffect(() => {
    const fetchStats = async () => {
      console.log('[1] Fetching dashboard stats...'); // Debug log
      try {
       
        const response = await axios.get('http://localhost:5000/dashboard-stats/stats');
         console.log('[2] Response received:', response.data); // Log the response
        setStats(response.data);
      } catch (error) {
        console.error('[3] Failed to fetch stats:', error); 
        console.error('Failed to fetch stats', error);
      }
    };

    fetchStats();
  }, [refreshFlag]); 

  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 9);

  const heatmapValues = Object.entries(stats.heatmap || {}).map(([date, count]) => ({
  date,
  count
}));


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e] text-purple-300 p-6">
      <h1 className="text-4xl font-bold mb-8 text-purple-400">
        Welcome, {user?.firstname || '...'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-[#1f1f2e] rounded-xl p-6 shadow-lg shadow-purple-600/40">
          <p className="text-lg text-purple-300 mb-2">Total Problems</p>
          <p className="text-4xl font-extrabold text-white">{stats.totalProblems || 0}</p>
        </div>
        <div className="bg-[#1f1f2e] rounded-xl p-6 shadow-lg shadow-purple-600/40">
          <p className="text-lg text-purple-300 mb-2">Solved Problems</p>
          <p className="text-4xl font-extrabold text-white">{stats.solvedCount || 0}</p>
        </div>
        <div className="bg-[#1f1f2e] rounded-xl p-6 shadow-lg shadow-purple-600/40">
          <p className="text-lg text-purple-300 mb-2">Streak</p>
          <p className="text-4xl font-extrabold text-white">{stats.streak || 0} 🔥</p>
        </div>
      </div>

      <div className="bg-[#1f1f2e] rounded-xl p-6 shadow-lg shadow-purple-600/40">
        <h2 className="text-xl font-bold text-purple-400 mb-4">Submission Activity</h2>
        <div className="heatmap-wrapper  flex justify-center items-center  ">
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={heatmapValues}
          showWeekdayLabels ={false}
          classForValue={(value) => {
            if (!value || value.count === 0) return 'color-empty';
            if (value.count < 2) return 'color-scale-1';
            if (value.count < 4) return 'color-scale-2';
            if (value.count < 6) return 'color-scale-3';
            return 'color-scale-4';
          }}
          tooltipDataAttrs={value =>
            value.date ? { 'data-tip': `${value.date}: ${value.count} submissions` } : {}
          }
          glutterSize={4}
        />
      </div>
    </div>
    </div>
  );
    
}

export default Dashboard;

