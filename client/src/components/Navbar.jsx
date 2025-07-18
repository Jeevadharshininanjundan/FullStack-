
import axios from '../axios.js';
import { Link , useNavigate} from 'react-router-dom';
import {useUser} from'../context/AuthContext';
import Dashboard from './Dashboard.jsx';

function Navbar() {
  // const userName = user ? `${user.firstname} ${user.lastname}` : '';
   const {user,setUser} = useUser();
  const navigate = useNavigate();

   const goToDashBoard = () => {
    navigate('/dashboard');
  };
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
       // optional: refresh to reset App state
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

 

    return (
    <nav className="bg-[#0a0a0f] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold text-purple-400">⚡CodeJudge</div>
      <ul className="flex space-x-6  font-medium">
        <li><Link to="/" className=" text-purple-300 hover:text-purple-600">Home</Link></li>
        <li><Link to="/problems" className=" text-purple-300 hover:text-purple-600">Problems</Link></li>
        <li><Link to="/submissions" className=" text-purple-300 hover:text-purple-600">Submissions</Link></li>
        <li><Link to="/contests" className="text-purple-300 hover:text-purple-600">Contests</Link></li>
        {user?.role === 'admin' && (
      <li>
        <Link to="/admin" className="text-purple-300 hover:text-purple-500">Admin Panel</Link>
        </li>
    )}
      </ul>
      <div className="flex items-center gap-4">
        
        {user && (
        <>
          <button
              onClick={goToDashBoard}
              className="bg-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-800 transition"
            >
              Hello, {user.firstname}
            </button>
          <button onClick={handleLogout} className="bg-red-600 px-2 py-1 rounded-full">Logout</button>
        </>
      ) }
       
      </div>
    </nav>
  );
};

export default Navbar;
