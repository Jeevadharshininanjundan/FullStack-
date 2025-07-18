/*import { useState } from 'react';
import axios from '../axios';

export default function AddProblem() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    input: '',
    output: '',
    difficulty: 'Easy',
    tags: [],
    acceptance: 0,
    testCases: [{ input: '', output: '' }]
  });

  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormData({ ...formData, tags: value.split(',').map(t => t.trim()) });
    } else if (index !== null && field) {
      const newTestCases = [...formData.testCases];
      newTestCases[index][field] = value;
      setFormData({ ...formData, testCases: newTestCases });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addTestCase = () => {
    setFormData({ ...formData, testCases: [...formData.testCases, { input: '', output: '' }] });
  };

  const removeTestCase = (index) => {
    const newTestCases = [...formData.testCases];
    newTestCases.splice(index, 1);
    setFormData({ ...formData, testCases: newTestCases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/problems', formData);
      alert('Problem added!');
    } catch (error) {
      console.error(error);
      alert('Failed to add problem');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e] text-purple-300 px-6 py-10'>
    <div className="bg-[#1f1f2e] text-white p-6 rounded-lg max-w-2xl mx-auto mt-8 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-purple-300">Add New Problem</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input className="bg-[#2a2a3b] px-4 py-2 rounded" type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea className="bg-[#2a2a3b] px-4 py-2 rounded" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input className="bg-[#2a2a3b] px-4 py-2 rounded" type="text" name="input" placeholder="Sample Input" value={formData.input} onChange={handleChange} />
        <input className="bg-[#2a2a3b] px-4 py-2 rounded" type="text" name="output" placeholder="Sample Output" value={formData.output} onChange={handleChange} />
        <select className="bg-[#2a2a3b] px-4 py-2 rounded text-purple-300" name="difficulty" value={formData.difficulty} onChange={handleChange}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <input className="bg-[#2a2a3b] px-4 py-2 rounded" type="text" name="tags" placeholder="Comma-separated tags" onChange={handleChange} />
        
        <h3 className="text-purple-400 font-medium">Test Cases</h3>
        {formData.testCases.map((tc, index) => (
          <div key={index} className="bg-[#2a2a3b] p-3 rounded space-y-2">
            <input className="bg-[#1a202c] px-2 py-1 rounded w-full" type="text" placeholder="Input" value={tc.input} onChange={(e) => handleChange(e, index, 'input')} />
            <input className="bg-[#1a202c] px-2 py-1 rounded w-full" type="text" placeholder="Output" value={tc.output} onChange={(e) => handleChange(e, index, 'output')} />
            <button type="button" onClick={() => removeTestCase(index)} className="text-red-400 text-xs underline">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addTestCase} className="text-sm text-blue-400 underline">+ Add Test Case</button>

        <button type="submit" className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded text-white mt-4">
          Submit Problem
        </button>
      </form>
    </div>
    </div>
  );
}
*/

/*import React, { useState, useEffect } from 'react';
import axios from '../axios';

function AdminPanel() {
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', input: '', output: '', tags: '', difficulty: '' });
  const [editingId, setEditingId] = useState(null); // <-- Track which problem is being edited
 

  
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

    try {
    if (editingId) {
      // UPDATE
      await axios.put(`/problems/update/${editingId}`, formattedProblem, { withCredentials: true });
    } else {
      // CREATE
      await axios.post('/problems/add', formattedProblem, { withCredentials: true });
    }

    setForm({ title: '', description: '', input: '', output: '', tags: '', difficulty: '' });
    setEditingId(null); // reset editing
    fetchProblems(); // Refresh list
  } catch (err) {
    console.error("❌ Error adding/updating problem:", err.response?.data || err.message);
  }
};

   

  const handleDelete = async (id) => {
    try {
    await axios.delete(`/problems/delete/${id}`, { withCredentials: true });
    fetchProblems(); // Refresh
    }
    catch (error) {
    console.error("❌ Error deleting problem:", error.response?.data || error.message);
  }
  };

  const handleEdit = (problem) => {
  setForm({
    title: problem.title,
    description: problem.description,
    input: problem.input,
    output: problem.output,
    tags: problem.tags.join(', '),
    difficulty: problem.difficulty,
  });
  setEditingId(problem._id);
};


  return (

    <div className="min-h-screen bg-[#0a0a0f] text-white px-6 py-10">
      <h2 className="text-3xl font-bold text-purple-400 mb-8">⚙️ Admin Panel</h2>

      <div className="grid md:grid-cols-2 gap-8">
       
        <form onSubmit={handleAddProblem} className="bg-[#1f1f2e] p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-purple-300">{editingId ? 'Update Problem' : 'Add New Problem'}</h3>
          {['title', 'description', 'input', 'output', 'tags'].map(field => (
            <input
              key={field}
              className="mb-3 p-3 w-full bg-[#2a2a2a] text-white border border-[#333] rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          ))}
          <select
            className="mb-4 p-3 w-full bg-[#2a2a2a] text-white border border-[#333] rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <button type="submit" className="bg-purple-700 hover:bg-purple-800 transition w-full py-2 rounded-lg shadow">
            {editingId ? 'Update' : 'Add'} Problem
          </button>
        </form>

        
        <div className="bg-[#1f1f2e] p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">📋 All Problems</h3>
          <ul className="space-y-4 max-h-[600px] overflow-auto pr-2">
            {problems.map((problem) => (
              <li key={problem._id} className="bg-[#2d2d2d] p-5 rounded-lg shadow-md hover:bg-[#363648] transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-200">{problem.title}</h4>
                    <p className="text-sm text-gray-400 mb-1 capitalize">Difficulty: {problem.difficulty}</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(problem.tags) && problem.tags.map((tag, i)=> (
  <span key={i} className="bg-purple-800 text-white text-xs px-2 py-1 rounded-full">{tag}</span>
))}

                    </div>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button onClick={() => handleEdit(problem)} className="bg-yellow-300 hover:bg-yellow-700 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(problem._id)} className="bg-red-300 hover:bg-red-700 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
   

export default AdminPanel; */

/*import React, { useEffect, useState } from "react";
import axios from "../axios"; // Adjust path if needed
import { Link } from "react-router-dom";

function AdminPanel() {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await axios.get("/problems");
      setProblems(res.data);
      const tagsSet = new Set();
      res.data.forEach((p) => p.tags.forEach((tag) => tagsSet.add(tag)));
      setAllTags([...tagsSet]);
    } catch (err) {
      console.error("Failed to fetch problems", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    try {
      await axios.delete(`/problems/${id}`);
      fetchProblems(); // Refresh list
    } catch (err) {
      console.error("Failed to delete problem", err);
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const titleMatch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const difficultyMatch = difficultyFilter === "all" || problem.difficulty.toLowerCase() === difficultyFilter;
    const tagMatch = tagFilter === "all" || problem.tags.includes(tagFilter);
    return titleMatch && difficultyMatch && tagMatch;
  });

  return (
    <div className="text-white p-6 min-h-screen bg-[#1e1e2f]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
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

        <select
          className="px-4 py-2 rounded bg-[#2a2a3b] text-purple-300"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        >
          <option value="all">All Tags</option>
          {allTags.map((tag, idx) => (
            <option key={idx} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          className="px-4 py-2 w-full md:w-1/3 rounded bg-[#2a2a3b] text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6">
        {filteredProblems.map((problem) => (
          <div
            key={problem._id}
            className="bg-[#2a2a3b] rounded-xl p-5 shadow-md hover:shadow-purple-400 transition duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <h2 className="text-xl font-semibold text-purple-300 mb-1">{problem.title}</h2>
                <p className="text-sm text-gray-300 mb-2">Difficulty: <span className="capitalize">{problem.difficulty}</span></p>

                
                <div className="flex flex-wrap gap-2">
                  {problem.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="text-xs bg-purple-800 px-2 py-1 rounded-full text-white">
                      {tag}
                    </span>
                  ))}
                  {problem.tags.length > 2 && (
                    <span className="text-xs bg-gray-600 px-2 py-1 rounded-full text-white">
                      +{problem.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>

             
              <div className="flex gap-3 mt-3 md:mt-0">
                <Link
                  to={`/admin/edit/${problem._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(problem._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
*/
/*import React, { useEffect, useState } from 'react';
import axios from '../axios'; // adjust if path differs

function AdminPanel() {
  const [problems, setProblems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    input: '',
    output: '',
    difficulty: 'Easy',
    tags: [],
    acceptance: 0,
    testCases: [{ input: '', output: '' }],
  });

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    const res = await axios.get('/problems');
    setProblems(res.data);
  };

  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormData({ ...formData, tags: value.split(',').map(t => t.trim()) });
    } else if (index !== null && field) {
      const newTestCases = [...formData.testCases];
      newTestCases[index][field] = value;
      setFormData({ ...formData, testCases: newTestCases });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addTestCase = () => {
    setFormData({ ...formData, testCases: [...formData.testCases, { input: '', output: '' }] });
  };

  const removeTestCase = (index) => {
    const updatedCases = [...formData.testCases];
    updatedCases.splice(index, 1);
    setFormData({ ...formData, testCases: updatedCases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/problems/update/${editingId}`, formData);
        alert('Problem updated!');
      } else {
        await axios.post('/problems', formData);
        alert('Problem added!');
      }
      setFormData({
        title: '',
        description: '',
        input: '',
        output: '',
        difficulty: 'Easy',
        tags: [],
        acceptance: 0,
        testCases: [{ input: '', output: '' }],
      });
      setEditingId(null);
      fetchProblems();
    } catch (err) {
      console.error(err);
      alert('Failed to submit');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/problems/delete/${id}`, { withCredentials: true });
      fetchProblems();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (problem) => {
    setFormData({
      title: problem.title,
      description: problem.description,
      input: problem.input,
      output: problem.output,
      difficulty: problem.difficulty,
      tags: problem.tags,
      acceptance: problem.acceptance,
      testCases: problem.testCases || [{ input: '', output: '' }],
    });
    setEditingId(problem._id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Problem' : 'Add New Problem'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-6 rounded-lg shadow">
        <input className="w-full p-2 border rounded" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <textarea className="w-full p-2 border rounded" name="input" placeholder="Input Description" value={formData.input} onChange={handleChange} />
        <textarea className="w-full p-2 border rounded" name="output" placeholder="Output Description" value={formData.output} onChange={handleChange} />
        <input className="w-full p-2 border rounded" name="tags" placeholder="Tags (comma separated)" value={formData.tags.join(', ')} onChange={handleChange} />
        <select className="w-full p-2 border rounded" name="difficulty" value={formData.difficulty} onChange={handleChange}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <div>
          <h3 className="font-semibold mb-2">Test Cases</h3>
          {formData.testCases.map((tc, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input className="flex-1 p-2 border rounded" placeholder="Input" value={tc.input} onChange={(e) => handleChange(e, i, 'input')} />
              <input className="flex-1 p-2 border rounded" placeholder="Output" value={tc.output} onChange={(e) => handleChange(e, i, 'output')} />
              {formData.testCases.length > 1 && (
                <button type="button" className="text-red-500" onClick={() => removeTestCase(i)}>✖</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addTestCase} className="text-blue-600">+ Add Test Case</button>
        </div>

        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
          {editingId ? 'Update Problem' : 'Add Problem'}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">All Problems</h2>
      <div className="space-y-4">
        {problems.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow-sm bg-white">
            <h3 className="text-lg font-bold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.description.slice(0, 100)}...</p>
            <div className="text-sm text-gray-500">Difficulty: {p.difficulty}</div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {p.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-gray-200 rounded text-xs">{tag}</span>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel; */
import React, { useEffect, useState } from 'react';
import axios from '../axios';

function AdminPanel() {
  const [problems, setProblems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
const [difficultyFilter, setDifficultyFilter] = useState('all');
const [tagFilter, setTagFilter] = useState('all');
const [allTags, setAllTags] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    input: '',
    output: '',
    difficulty: 'Easy',
    tags: [],
    acceptance: 0,
    testCases: [{ input: '', output: '' }]
  });

  
  const fetchProblems = async () => {
    try {
      const problemsRes = await axios.get('http://localhost:5000/problems');
      setProblems(problemsRes.data);

      const tagSet = new Set();
      problemsRes.data.forEach(p => {
        if (Array.isArray(p.tags)) {
          p.tags.forEach(tag => tagSet.add(tag.toLowerCase().trim()));
        }
      });
      setAllTags(Array.from(tagSet));
    } catch (err) {
      console.error(err);
    }
  };
 useEffect(() => {
  fetchProblems();
}, []);




  const filteredProblems = problems.filter((p) => {
  const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesDifficulty =
    difficultyFilter === 'all' || p.difficulty.toLowerCase() === difficultyFilter;
  const tagList = Array.isArray(p.tags) ? p.tags.map(t => t.toLowerCase().trim()) : [];
  const matchesTag = tagFilter === 'all' || tagList.includes(tagFilter.toLowerCase());

  return matchesSearch && matchesDifficulty && matchesTag;
});


  

  const handleChange = (e, index = null, field = null) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormData({ ...formData, tags: value.split(',').map(t => t.trim()) });
    } else if (index !== null && field) {
      const newTestCases = [...formData.testCases];
      newTestCases[index][field] = value;
      setFormData({ ...formData, testCases: newTestCases });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addTestCase = () => {
    setFormData({ ...formData, testCases: [...formData.testCases, { input: '', output: '' }] });
  };

  const removeTestCase = (index) => {
    const updated = [...formData.testCases];
    updated.splice(index, 1);
    setFormData({ ...formData, testCases: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/problems/update/${editingId}`, formData);
        alert('Problem updated!');
        setEditingId(null);
      } else {
        await axios.post('/problems/add', formData);
        alert('Problem added!');
      }
      setFormData({
        title: '',
        description: '',
        input: '',
        output: '',
        difficulty: 'Easy',
        tags: [],
        acceptance: 0,
        testCases: [{ input: '', output: '' }]
      });
      fetchProblems();
    } catch (error) {
      console.error(error);
      alert('Failed to submit problem');
    }
  };

  const handleEdit = (problem) => {
    setFormData({
      title: problem.title,
      description: problem.description,
      input: problem.input,
      output: problem.output,
      difficulty: problem.difficulty,
      tags: problem.tags,
      acceptance: problem.acceptance,
      testCases: problem.testCases || [{ input: '', output: '' }]
    });
    setEditingId(problem._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/problems/delete/${id}`);
      fetchProblems();
    } catch (err) {
      console.error('Error deleting problem:', err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#0a0a0f] to-[#1c0f2e] text-white">
      <h1 className="text-xl font-semibold mb-4 text-purple-400">Admin Panel - Problem Manager</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#1f1f2e] p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl mb-4 text-purple-400">{editingId ? 'Edit Problem' : 'Add New Problem'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="bg-[#12121b] p-2 rounded text-white"
            required
          />
          <input
            type="text"
            name="difficulty"
            placeholder="Difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="bg-[#12121b] p-2 rounded text-white"
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={formData.tags.join(', ')}
            onChange={handleChange}
            className="bg-[#12121b] p-2 rounded text-white"
          />
          <input
            type="number"
            name="acceptance"
            placeholder="Acceptance %"
            value={formData.acceptance}
            onChange={handleChange}
            className="bg-[#12121b] p-2 rounded text-white"
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="bg-[#12121b] mt-4 p-2 rounded text-white w-full"
          rows={4}
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <textarea
            name="input"
            placeholder="Input"
            value={formData.input}
            onChange={handleChange}
            className="bg-[#12121b] p-2 rounded text-white"
          />
          <textarea
            name="output"
            placeholder="Output"
            value={formData.output}
            onChange={handleChange}
            className="bg-[#12121b] p-2 rounded text-white"
          />
        </div>

        {/* Test Cases */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
          {formData.testCases.map((tc, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Input"
                value={tc.input}
                onChange={(e) => handleChange(e, idx, 'input')}
                className="bg-[#12121b] p-2 rounded text-white w-1/2"
              />
              <input
                type="text"
                placeholder="Output"
                value={tc.output}
                onChange={(e) => handleChange(e, idx, 'output')}
                className="bg-[#12121b] p-2 rounded text-white w-1/2"
              />
              {formData.testCases.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTestCase(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTestCase}
            className="mt-2 px-4 py-1 bg-purple-700 hover:bg-purple-800 rounded text-white"
          >
            + Add Test Case
          </button>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
        >
          {editingId ? 'Update Problem' : 'Add Problem'}
        </button>
      </form>

      {/* Problems List */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-purple-400">All Problems</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProblems.map((problem) => (
            <div key={problem._id} className="bg-[#1f1f2e] p-4 rounded shadow">
              <h3 className="text-xl font-semibold text-purple-300">{problem.title}</h3>
              <p className="text-sm text-gray-300">Difficulty: {problem.difficulty}</p>
              <p className="text-sm text-gray-300">Tags: {problem.tags.join(', ')}</p>
              
              <div className="mt-3 flex gap-4">
                <button
                  onClick={() => handleEdit(problem)}
                  className="px-4 py-1 bg-yellow-300 hover:bg-yellow-600 text-black rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(problem._id)}
                  className="px-4 py-1 bg-red-500 hover:bg-red-700 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
