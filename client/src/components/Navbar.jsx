import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#0a0a0f] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold text-purple-400">⚡CodeJudge</div>
      <ul className="flex space-x-6  font-medium">
        <li><Link to="/" className=" text-purple-300 hover:text-purple-600">Home</Link></li>
        <li><Link to="/problems" className=" text-purple-300 hover:text-purple-600">Problems</Link></li>
        <li><Link to="/submissions" className=" text-purple-300 hover:text-purple-600">Submissions</Link></li>
      </ul>
      <div className="flex items-center gap-4">
        <select className="bg-[#1f1f2e] text-white p-1 rounded text-sm">
          <option>Dark</option>
          <option>Light</option>
          <option>Cyber</option>
        </select>
        <div className="bg-purple-700 px-3 py-1 rounded-full text-sm">HelloJeeva</div>
      </div>
    </nav>
  );
}

export default Navbar;
