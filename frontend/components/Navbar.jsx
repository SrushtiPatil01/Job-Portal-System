import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole"); // Consistent key

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token"); // Also remove the token
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/home')}>
          Job Portal
        </Typography>

        {isLoggedIn && (
          <>
            <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
            <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>

            {userRole === 'admin' ? (
              <>
                {/* Updated paths to match App.js routes */}
                <Button color="inherit" onClick={() => navigate('/admin-dashboard')}>Dashboard</Button>
                <Button color="inherit" onClick={() => navigate('/add-job')}>Add Job</Button>
                <Button color="inherit" onClick={() => navigate('/companies')}>Companies</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/jobs')}>Jobs</Button>
                <Button color="inherit" onClick={() => navigate('/companies')}>Companies</Button>
                <Button color="inherit" onClick={() => navigate('/employee-dashboard')}>Dashboard</Button>
              </>
            )}

            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
        {!isLoggedIn && (
          <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;