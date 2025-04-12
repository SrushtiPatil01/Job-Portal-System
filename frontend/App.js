import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';  // Your Redux store import
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import JobListings from './pages/JobListings';
import Contact from './pages/Contact';
import CompanyShowcase from './pages/CompanyShowcase';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AddJob from './pages/AddJob';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><JobListings /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/companies" element={<ProtectedRoute><CompanyShowcase /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/add-job" element={<ProtectedRoute><AddJob /></ProtectedRoute>} />
        <Route path="/employee-dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
      </Routes>
    </Provider>
  );
}

export default App;
