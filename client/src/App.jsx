import React from 'react';
import Home from './Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProblemList from './pages/ProblemList';
import ShowProblem from './pages/ShowProblem';  
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';

function App() {
  

  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/problems" element={<ProblemList/>} />
         <Route path="/problems/:id" element={<ShowProblem />} />
      </Routes>
    </Router>
  )
}

export default App
