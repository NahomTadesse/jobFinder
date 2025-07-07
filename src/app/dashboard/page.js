"use client";
import { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Tabs, Tab, Card, CardContent, Chip } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Work, CheckCircle, Pending, Cancel } from '@mui/icons-material';

// Mock data
const appliedJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    status: 'applied',
    appliedDate: '2023-05-15',
    statusDate: '2023-05-16'
  },
  {
    id: 2,
    title: 'UX Designer',
    company: 'DesignHub',
    status: 'review',
    appliedDate: '2023-05-10',
    statusDate: '2023-05-12'
  },
  {
    id: 3,
    title: 'Backend Engineer',
    company: 'DataSystems',
    status: 'interview',
    appliedDate: '2023-05-05',
    statusDate: '2023-05-08'
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'InnovateCo',
    status: 'rejected',
    appliedDate: '2023-04-28',
    statusDate: '2023-05-02'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    status: 'offer',
    appliedDate: '2023-04-20',
    statusDate: '2023-04-25'
  },
];

export default function Dashboard() {
  const [tabValue, setTabValue] = useState('applied');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied':
        return <Pending color="info" sx={{ mr: 1 }} />;
      case 'review':
        return <Pending color="warning" sx={{ mr: 1 }} />;
      case 'interview':
        return <CheckCircle color="primary" sx={{ mr: 1 }} />;
      case 'offer':
        return <CheckCircle color="success" sx={{ mr: 1 }} />;
      case 'rejected':
        return <Cancel color="error" sx={{ mr: 1 }} />;
      default:
        return <Pending color="info" sx={{ mr: 1 }} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'applied':
        return 'Application Submitted';
      case 'review':
        return 'Under Review';
      case 'interview':
        return 'Interview Scheduled';
      case 'offer':
        return 'Offer Received';
      case 'rejected':
        return 'Application Rejected';
      default:
        return 'Applied';
    }
  };

  const filteredJobs = appliedJobs.filter(job => 
    tabValue === 'all' || job.status === tabValue
  );

  return (
    <div>
      <Head>
        <title>JobFinder - Dashboard</title>
        <meta name="description" content="Your job application dashboard" />
      </Head>

      
      
      <Box sx={{ backgroundColor: '#f0f4f8', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            My Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Track your job applications and status
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 4 }}
        >
          <Tab label="All Applications" value="all" />
          <Tab label="Applied" value="applied" />
          <Tab label="Under Review" value="review" />
          <Tab label="Interview" value="interview" />
          <Tab label="Offer" value="offer" />
          <Tab label="Rejected" value="rejected" />
        </Tabs>

        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <Card key={job.id} sx={{ mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      {job.company}
                    </Typography>
                  </Box>
                  <Box>
                    <Chip
                      label={getStatusText(job.status)}
                      icon={getStatusIcon(job.status)}
                      variant="outlined"
                      sx={{ 
                        borderColor: 
                          job.status === 'offer' ? 'success.main' : 
                          job.status === 'rejected' ? 'error.main' : 
                          job.status === 'interview' ? 'primary.main' : 
                          job.status === 'review' ? 'warning.main' : 'info.main',
                        color: 
                          job.status === 'offer' ? 'success.main' : 
                          job.status === 'rejected' ? 'error.main' : 
                          job.status === 'interview' ? 'primary.main' : 
                          job.status === 'review' ? 'warning.main' : 'info.main'
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Box sx={{ mr: 4 }}>
                    <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                      Applied Date
                    </Typography>
                    <Typography variant="body2">
                      {new Date(job.appliedDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                      Status Date
                    </Typography>
                    <Typography variant="body2">
                      {new Date(job.statusDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Work sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No {tabValue === 'all' ? '' : tabValue} applications found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {tabValue === 'all' ? 
                "You haven't applied to any jobs yet." : 
                `You don't have any ${tabValue} applications.`}
            </Typography>
          </Box>
        )}
      </Container>

   
    </div>
  );
}