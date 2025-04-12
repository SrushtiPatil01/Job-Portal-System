import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const JobCard = ({ job }) => (
  <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        {job.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {job.description}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Skills:</strong> {job.skills.join(', ')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Salary:</strong> {job.salary}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {job.lastUpdated}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'center' }}>
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{ width: '100%' }}
        href={job.applyLink}
        target="_blank"
      >
        Apply
      </Button>
    </CardActions>
  </Card>
);

export default JobCard;
