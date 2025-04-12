import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Pagination, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(6); // Items per page

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:3000/job/test-jobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            page,
            limit
          }
        });
        
        if (response.data && response.data.jobs) {
          setJobs(response.data.jobs);
          
          // For a real backend pagination implementation, the backend should return total count
          // For now, calculate based on current data
          const totalJobs = response.data.totalJobs || response.data.jobs.length;
          setTotalPages(Math.max(1, Math.ceil(totalJobs / limit)));
        } else {
          setJobs([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsData();
  }, [page, limit]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2', mb: 4 }}>
        Job Listings
      </Typography>

      {jobs.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No job listings found
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={4} justifyContent="center">
            {jobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={job._id || index}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  boxShadow: 3, 
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 5
                  }
                }}>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                      {job.jobTitle}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#555' }}>
                      {job.companyName}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
                      {job.description?.length > 150 
                        ? `${job.description.substring(0, 150)}...` 
                        : job.description}
                    </Typography>

                    <Typography variant="subtitle1" sx={{ mt: 'auto', fontWeight: 'bold' }}>
                      Salary: ${job.salary}
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2, borderRadius: 2 }}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 'medium'
                }
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default JobListings;