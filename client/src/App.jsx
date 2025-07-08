import React from 'react';
import Home from './Home';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProblemList from './pages/ProblemList';
import ShowProblem from './pages/ShowProblem';  
import AdminPanel from './pages/AdminPanel';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Submissions from './pages/Submissions.jsx';
function App() {
  

  return (
    <Router>
      <Navbar />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/problems" element={<ProblemList/>} />
         <Route path="/problems/:id" element={<ShowProblem />} />
         <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/submissions" element={<Submissions/>} />
      </Routes>
    </Router>
  )
}

export default App
