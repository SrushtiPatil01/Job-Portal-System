import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const AddJob = () => {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  const handleJobSubmit = () => {
    const jobData = { companyName, jobTitle, description, salary };
    
    api.post('/job/create', jobData)
      .then((response) => {
        if (response.data.message === 'Job created successfully.') {
          alert('Job added successfully!');
          navigate('/admin-dashboard');
        } else {
          alert('Error adding job');
        }
      })
      .catch((error) => {
        console.error("Error adding job:", error);
      });
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
        Add Job
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleJobSubmit}>
        Add Job
      </Button>
    </Container>
  );
};

export default AddJob;
