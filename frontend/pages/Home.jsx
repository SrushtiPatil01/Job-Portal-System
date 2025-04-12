import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Home = () => {
  const navigate = useNavigate();  // Create the navigate function

  const userRole = localStorage.getItem("userRole"); 

  const handleExploreJobs = () => {
    navigate('/jobs');  
  };
  
  const handleAdminView = () => {
    navigate('/admin-dashboard');  
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Main Welcome Section */}
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#283593' }}>
        Welcome to the Job Portal
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4, fontSize: '1.2rem', color: '#444' }}>
        Discover your perfect job with top companies!
      </Typography>

      {/* Conditional Rendering for Admin */}
      {userRole === "admin" && (
        <>
          <Typography variant="h4" gutterBottom align="center" sx={{ color: '#0288d1', marginBottom: '40px' }}>
            Admin Dashboard
          </Typography>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h5" sx={{ mb: 3, color: '#0288d1' }}>
              Admin Actions
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
        </>
      )}

      {/* Conditional Rendering for Employee */}
      {userRole === "employee" && (
        <>
          <Typography variant="h4" gutterBottom align="center" sx={{ color: '#0288d1', marginBottom: '40px' }}>
            Featured Job Categories
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', backgroundColor: '#e3f2fd', borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#0288d1' }}>
                    Software Development
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Find the latest software development jobs with top tech companies.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth 
                    sx={{ borderRadius: 2 }}
                    onClick={handleExploreJobs}  // Trigger navigation to /jobs page
                  >
                    Explore Jobs
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', backgroundColor: '#f1f8e9', borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                    Marketing & Sales
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Discover marketing and sales opportunities across various industries.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="success" 
                    fullWidth 
                    sx={{ borderRadius: 2 }}
                    onClick={handleExploreJobs}  // Trigger navigation to /jobs page
                  >
                    Explore Jobs
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', backgroundColor: '#ffecb3', borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                    Human Resources
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Connect with top companies looking for HR professionals.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="warning" 
                    fullWidth 
                    sx={{ borderRadius: 2 }}
                    onClick={handleExploreJobs}  // Trigger navigation to /jobs page
                  >
                    Explore Jobs
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Space Between Sections */}
          <Box sx={{ mb: 10 }} />

          {/* Why Choose Our Job Portal */}
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#0288d1' }}>
            Why Choose Our Job Portal?
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4, fontSize: '1.1rem', color: '#444' }}>
            Our platform connects top employers with the best talent, offering easy navigation and personalized job recommendations.
          </Typography>

          {/* Cards for "Why Choose Our Job Portal" */}
          <Grid container spacing={4} justifyContent="center" sx={{ mb: 10 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', backgroundColor: '#fce4ec', borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#d81b60' }}>
                    Easy to Use
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Our platform is user-friendly and intuitive. Start applying or posting jobs in just a few clicks!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', backgroundColor: '#e8f5e9', borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#388e3c' }}>
                    Diverse Job Listings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We offer a wide variety of jobs across all industries and skill levels. Find the right match for you.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', backgroundColor: '#fff3e0', borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#f57c00' }}>
                    Trusted by Companies
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Leading companies trust our platform to find top talent for their teams.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Call to Action */}
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h5" sx={{ mb: 3, color: '#0288d1' }}>
              Ready to find your next job?
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              onClick={handleExploreJobs}  // Trigger navigation to /jobs page
              sx={{ borderRadius: 2 }}
            >
              Start Searching Jobs
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;
