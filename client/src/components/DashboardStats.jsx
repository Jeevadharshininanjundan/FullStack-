import {
  FaCheckCircle,
  FaFire,
  FaListUl,
} from 'react-icons/fa';

const DashboardStats = ({ stats }) => {
  const statItems = [
    {
      title: 'Total Problems',
      value: stats.total,
      icon: <FaListUl />,
      color: 'bg-blue-500',
    },
    {
      title: 'Solved',
      value: stats.solved,
      icon: <FaCheckCircle />,
      color: 'bg-green-500',
    },
    {
      title: 'Current Streak',
      value: `${stats.streak} 🔥`,
      icon: <FaFire />,
      color: 'bg-red-500',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, idx) => (
        <div
          key={idx}
          className="bg-[#1c1c2e] p-5 rounded-xl shadow-md flex items-center gap-4 hover:scale-[1.02] transition-all"
        >
          <div className={`text-white p-3 rounded-full ${item.color}`}>
            {item.icon}
          </div>
          <div>
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-sm text-gray-400">{item.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
