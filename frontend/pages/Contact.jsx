import React from 'react';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Contact = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole"); 

  const handleAdminView = () => {
    navigate('/admin-dashboard');  
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      {/* Title Section */}
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4, color: '#555', fontSize: '1.1rem' }}>
        We would love to hear from you! Please fill out the form below, and we will get back to you as soon as possible.
      </Typography>

      {/* Conditional Content Based on Role */}
      {userRole === "admin" && (
        <>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
            Admin Inquiry Management
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4, color: '#555', fontSize: '1.1rem' }}>
            As an administrator, you can review and manage all incoming inquiries from users. 
            Here, you can ensure that all requests are addressed in a timely manner.
          </Typography>
          
          {/* Admin Inquiry Management Button */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAdminView}
              sx={{ borderRadius: 2 }}
            >
              View All Inquiries
            </Button>
          </Box>
        </>
      )}

      {userRole === "employee" && (
        <>
          {/* Employee Contact Form */}
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <Box sx={{ backgroundColor: '#f4f6f8', padding: 3, borderRadius: 2, boxShadow: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{ mb: 3 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ padding: '10px', fontWeight: 'bold', textTransform: 'none' }}
                >
                  Send Message
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      {/* Default Content for Unauthenticated Users */}
      {!userRole && (
        <Typography variant="body1" align="center" sx={{ mb: 4, color: '#555', fontSize: '1.1rem' }}>
          Please log in to access the contact form and other features.
        </Typography>
      )}
    </Container>
  );
};

export default Contact;
