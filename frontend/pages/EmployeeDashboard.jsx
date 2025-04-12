import React from 'react';
import { Container, Typography } from '@mui/material';

const EmployeeDashboard = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
        Employee Dashboard
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        Welcome to the Employee Dashboard! Here you can view job listings and apply for jobs.
      </Typography>
    </Container>
  );
};

export default EmployeeDashboard;
