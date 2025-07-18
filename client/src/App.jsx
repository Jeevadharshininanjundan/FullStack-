import React from 'react';
import Home from './Home';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProblemList from './pages/ProblemList';
import ShowProblem from './pages/ShowProblem';  
import AdminPanel from './pages/AdminPanel';
import AdminRoute from "./routes/AdminRoute.jsx";
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Submissions from './pages/Submissions.jsx';
import { useState,useEffect } from 'react';
import axios from 'axios';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext.jsx';
import ContestList from './pages/ContestList.jsx';
import ContestDetails from './pages/ContestDetails.jsx';
import ContestProblemPage from './pages/ContestProblemPage.jsx';

function App() {
  
return (
    <AuthProvider>
    <Router>
      <Navbar/>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login/>} />
         <Route path="/dashboard" element={
          <PrivateRoute>
          <Dashboard />
          </PrivateRoute> } />
         <Route path="/problems" element={
          <PrivateRoute >
          <ProblemList/>
          </PrivateRoute> 
        }  />
         <Route path="/problems/:id" element={
          
          <ShowProblem />
         
        } />
         <Route path="/admin" element={
          <AdminRoute >
          <AdminPanel />
          </AdminRoute>
          } />
        <Route path="/submissions" element={
          <PrivateRoute >
            <Submissions/>
            </PrivateRoute>
          } />
           <Route path="/contests" element={<ContestList />} />
       
        <Route path="/contests/:id" element={<ContestDetails />} />
        <Route path="/contests/:contestId/problems/:problemId" element={<ContestProblemPage />} />

      </Routes>
    </Router>
    <ToastContainer/>
    </AuthProvider>
  )
}

export default App
