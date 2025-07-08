import React, { useState, useEffect } from 'react';
import axios from '../axios';

function AdminPanel() {
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', input: '', output: '', tags: '', difficulty: '' });

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    const res = await axios.get('/problems');
    setProblems(res.data);
  };

  const handleAddProblem = async (e) => {
    e.preventDefault();
    const formattedProblem = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
      testCases: [], // You can extend this to support test cases too
    };

    await axios.post('/problems/add', formattedProblem, { withCredentials: true });
    setForm({ title: '', description: '', input: '', output: '', tags: '', difficulty: '' });
    fetchProblems(); // Refresh list
  };

  const handleDelete = async (id) => {
    await axios.delete(`/problems/${id}`, { withCredentials: true });
    fetchProblems(); // Refresh
  };

  return (
    <div className="p-6 text-white bg-[#1a1a1a] min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>

      <form onSubmit={handleAddProblem} className="grid grid-cols-1 gap-4 mb-8 bg-black p-6 rounded">
        <input className="p-2 bg-[#2a2a2a] rounded" placeholder="Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className="p-2 bg-[#2a2a2a] rounded" placeholder="Description" name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="p-2 bg-[#2a2a2a] rounded" placeholder="Input Example" name="input" value={form.input} onChange={(e) => setForm({ ...form, input: e.target.value })} />
        <input className="p-2 bg-[#2a2a2a] rounded" placeholder="Output Example" name="output" value={form.output} onChange={(e) => setForm({ ...form, output: e.target.value })} />
        <input className="p-2 bg-[#2a2a2a] rounded" placeholder="Tags (comma separated)" name="tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        <select className="p-2 bg-[#2a2a2a] rounded" name="difficulty" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button type="submit" className="bg-indigo-600 py-2 px-4 rounded hover:bg-indigo-700">Add Problem</button>
      </form>

      <h3 className="text-2xl font-semibold mb-4">All Problems</h3>
      <ul className="space-y-4">
        {problems.map(problem => (
          <li key={problem._id} className="bg-[#2d2d2d] p-4 rounded flex justify-between items-center">
            <span>{problem.title} ({problem.difficulty})</span>
            <div className="flex gap-2">
              {/* Edit button (you can later implement inline or modal editing) */}
              <button className="bg-yellow-600 px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(problem._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
