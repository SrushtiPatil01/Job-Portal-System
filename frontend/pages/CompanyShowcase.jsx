import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:3000/job/test-jobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data && response.data.jobs) {
          // Extract unique companies from jobs
          const uniqueCompanies = [...new Set(response.data.jobs.map(job => job.companyName))];
          const companyData = uniqueCompanies.map(company => ({
            name: company,
            // Use inline SVG as placeholder instead of external URL
            image: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"%3E%3Crect fill="%23CCCCCC" width="150" height="150"/%3E%3Ctext fill="%23333333" font-family="Arial" font-size="16" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"%3E' + company + '%3C/text%3E%3C/svg%3E',
          }));
          setCompanies(companyData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8, mb: 5 }}> 
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2', mb: 4 }}>
        Company Showcase
      </Typography>
      
      {companies.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h6" color="textSecondary">
            No companies found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                boxShadow: 3, 
                borderRadius: 2, 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 5
                }
              }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={company.image}
                  alt={company.name}
                  sx={{ objectFit: 'contain', p: 2 }}
                />
                <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {company.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CompanyShowcase;