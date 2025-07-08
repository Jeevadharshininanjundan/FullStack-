import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProblemList() {
    const [problems, setproblems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
    useEffect(() => {
        axios.get('http://localhost:5000/problems')
        .then(res => {
            console.log("res.data = ",res.data);
            setproblems(res.data)
    })
        .catch(err => console.error(err));
    }, []);

    const filteredProblems = problems.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === 'all' || p.difficulty.toLowerCase() === difficultyFilter;
    return matchesSearch && matchesDifficulty;
    });

    const getDifficultyStyle = (level) => {
    switch (level.toLowerCase()) {
      case 'easy':
        return 'bg-[#22543d] text-[#9ae6b4]';
      case 'medium':
        return 'bg-[#744210] text-[#fbd38d]';
      case 'hard':
        return 'bg-[#702459] text-[#fbb6ce]';
      default:
        return 'bg-gray-700 text-white';
    }
  };

    return(
       <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e] text-purple-300 px-6 py-10">
      <h2 className="text-center text-3xl font-semibold mb-6">Problem Set</h2>

      {/* Search and Filter */}
      <div className=" flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="px-4 py-2 w-full md:w-1/3 rounded bg-[#2a2a3b] text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded bg-[#2a2a3b] text-purple-300"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>


      <div className="grid grid-cols-[5fr_1fr_1fr_1fr] gap-4  text-left text-sm font-semibold border-b border-gray-600 pb-2">
        <div>Title</div>
        <div>Tags</div>
        <div>Difficulty</div>
        <div>Acceptance</div>
      </div>

      <ul className="space-y-3 mt-4">
        {filteredProblems.map((p) => (
          <li
            key={p._id}
            className="grid grid-cols-[5fr_1fr_1fr_1fr] items-center gap-4 bg-[#2d253d] hover:bg-[#3b2c4d] p-2 rounded-md shadow-sm transition"
          >
            <Link to={`/problems/${p._id}`} className="text-lg font-medium ">
              {p.title}
            </Link>

            <div className="flex flex-wrap gap-2">
              {p.tags?.map((tag, index) => (
                <span key={index} className="bg-[#2a4365] text-[#7f9cf5] text-xs px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-start">
            <span className={`inline-block text-sm px-2 py-0.5 rounded-full ${getDifficultyStyle(p.difficulty)}`}>
              {p.difficulty}
            </span>
            </div>
            <span className="text-sm text-gray-300">{p.acceptance}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemList;