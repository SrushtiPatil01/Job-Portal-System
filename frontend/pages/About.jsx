//src/pages/About.jsx
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';  // Import Button here
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const About = () => {
  const navigate = useNavigate();  // Create the navigate function
  const userRole = localStorage.getItem("userRole"); 

  const handleAdminView = () => {
    navigate('/admin-dashboard'); 
  };

  const handleEmployeeView = () => {
    navigate('/jobs');  
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      {/* Section Title */}
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
        About Us
      </Typography>
      
      {/* Description Text */}
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, fontSize: '1.1rem', color: '#555' }}>
        We are dedicated to connecting job seekers with top companies through a seamless and user-friendly platform.
        Our mission is to make the job search process simpler, faster, and more efficient for both job seekers and employers.
      </Typography>

      {/* Section Divider */}
      <Box sx={{ borderBottom: '2px solid #1976d2', width: '100px', margin: '0 auto 40px auto' }} />

      {/* Mission Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '1.1rem', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
          At Job Portal, our mission is to empower job seekers and employers by offering a streamlined platform that simplifies the hiring process.
          We aim to provide access to opportunities and foster long-term relationships between employers and talented professionals.
        </Typography>
      </Box>

      {/* Conditional Rendering for Admin */}
      {userRole === "admin" && (
        <>
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
              Admin Features
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '1.1rem', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
              As an administrator, you can manage job listings, review applications, and monitor platform performance to ensure smooth operations. Your role is vital in keeping the platform running smoothly and connecting the right talent with the right opportunities.
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  Want to manage the platform?
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleAdminView}
                  sx={{ borderRadius: 2 }}
                >
                  Go to Admin Dashboard
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}

      {/* Conditional Rendering for Employee */}
      {userRole === "employee" && (
        <>
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
              Employee Features
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '1.1rem', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
              As an employee, you have access to a wide variety of job listings, career resources, and the opportunity to connect with top employers. Our platform is designed to help you find the best job opportunities that match your skills and interests.
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  Ready to start your job search?
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleEmployeeView}
                  sx={{ borderRadius: 2 }}
                >
                  Start Searching Jobs
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default About;
