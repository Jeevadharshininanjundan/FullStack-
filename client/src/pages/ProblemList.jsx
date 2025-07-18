import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProblemList() {
  const [problems, setproblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [allTags, setAllTags] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const problemsRes = await axios.get('http://localhost:5000/problems');
        setproblems(problemsRes.data);

        const tagSet = new Set();
        problemsRes.data.forEach(p => {
          if (Array.isArray(p.tags)) {
            p.tags.forEach(tag => tagSet.add(tag.toLowerCase().trim()));
          }
              
        });
        setAllTags(Array.from(tagSet));

        const statusRes = await axios.get('http://localhost:5000/submissions/status', {
          withCredentials: true,
        });
        setStatusMap(statusRes.data);
        console.log("Status Map:", statusRes.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  const getStatusIcon = (verdict) => {
    console.log("Verdict:", verdict);
  if (verdict === 'Accepted') return <span className="text-green-500 text-sm ">✔</span>;
  if (verdict === 'Wrong Answer') return <span className="text-red-500 text-sm ">✖</span>;
  return <span className="text-gray-500 text-lg">○</span>; // Not attempted
};
const getDifficultyColor = (difficulty) => {
   switch (difficulty.toLowerCase()) {
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


  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === 'all' || p.difficulty.toLowerCase() === difficultyFilter;
    const tagList = Array.isArray(p.tags) ? p.tags.map(t => t.toLowerCase().trim()) : [];
    const matchesTag = tagFilter === 'all' || tagList.includes(tagFilter.toLowerCase());

    
    return matchesSearch && matchesDifficulty && matchesTag;

  });
console.log("Rendering statusMap:", statusMap);
filteredProblems.forEach(p => {
  console.log(`Problem ${p._id} Status:`, statusMap[p._id]);
});

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e] text-purple-300 px-6 py-10">
      <h2 className="text-center text-3xl font-semibold mb-6">Problem Set</h2>

     
    <div className=" flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <input
          type="text"
          placeholder="Search by title..."
          className="px-4 py-2 w-full md:w-1/3 rounded-full bg-[#1f1f2e] text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-4 w-full md:w-auto">
        <select
          className="px-4 py-2 rounded-full bg-[#1f1f2e] text-purple-300"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          className="px-4 py-2 rounded-full bg-[#1f1f2e] text-purple-300"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        >
          <option value="all">All Tags</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
     </div>
     
      <div className="grid grid-cols-[5fr_2fr_1fr_1fr] gap-6 text-left text-lg font-bold border-b border-gray-600 pb-2">
        <div>Title</div>
        <div>Tags</div>
        <div>Difficulty</div>
        <div >Acceptance</div>
      </div>

      
  

      <ul className="space-y-2 mt-3 w-full">
        {filteredProblems.map((p) => {
          const status = statusMap[String(p._id)]; // Access the status using the string representation of the ID
    console.log("Problem ID:", p._id, "Status:", status); 
         return (
          <li
            key={p._id}
            className="w-full grid grid-cols-[5fr_2fr_1fr_1fr] items-center gap-6 bg-[#1f1f2e] hover:bg-[#3b2c4d] p-2 rounded-md shadow-sm transition
            overflow-hidden"
          >
            <div className="flex items-center gap-2 text-lg font-medium  ">
             {getStatusIcon(status?.verdict)
}

              <Link to={`/problems/${p._id}`} className="hover:underline truncate max-w-[100%]">{p.title}</Link>
            </div>
            
            <div className="w-full overflow-hidden">
  <div className="flex flex-wrap gap-2">
    {p.tags?.slice(0, 2).map((tag, index) => (
      <span
        key={index}
        className="bg-[#2a4365] text-[#7f9cf5] text-xs px-2 py-0.5 rounded-full truncate max-w-[100px] overflow-hidden text-ellipsis"
        title={tag}
      >
        {tag}
      </span>
    ))}

    {p.tags?.length > 2 && (
      <span className="bg-[#2a4365] text-[#7f9cf5] text-xs px-2 py-0.5 rounded-full">
        +{p.tags.length - 2}
      </span>
    )}
  </div>
</div>
            <div className='flex justify-start'>
            <div className={`inline-block text-sm px-2 py-0.5 rounded-full ${getDifficultyColor(p.difficulty)}`}>{p.difficulty}</div>
            </div>
            <span className="text-sm-right-10 ">{p.acceptance}%</span>
          </li>
         );
})}
      </ul>
      </div>
    
  );
}

export default ProblemList;



