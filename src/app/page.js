"use client";
import { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Tabs, Tab, Pagination } from '@mui/material';


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import SearchFilter from '@/components/SearchFilter';

// Mock data - in a real app, you'd fetch this from an API
const mockJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Addis Ababa,Ethiopia',
    type: 'Full-time',
    salary: '90,000ETB - 120,000ETB',
    posted: '2 days ago',
    description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing features for our web applications.',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    category: 'recent'
  },
  {
    id: 2,
    title: 'UX Designer',
    company: 'DesignHub',
    location: 'Remote',
    type: 'Contract',
    salary: '70ETB - 90ETB per hour',
    posted: '1 week ago',
    description: 'Join our design team to create beautiful and intuitive user experiences for our clients. You will work closely with product managers and developers.',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
    category: 'popular'
  },
  {
    id: 3,
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'Bahir dar,Ethiopia',
    type: 'Full-time',
    salary: '110,000ETB - 140,000ETB',
    posted: '3 days ago',
    description: 'We need a Backend Engineer to develop and maintain our server infrastructure and APIs. Experience with cloud services is a plus.',
    skills: ['Node.js', 'Python', 'AWS', 'SQL'],
    category: 'recent'
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'Addis Ababa,Ethiopia',
    type: 'Full-time',
    salary: '100,000ETB - 130,000ETB',
    posted: '2 weeks ago',
    description: 'Lead our product development team to deliver exceptional products to our customers. You will define product vision and roadmap.',
    skills: ['Product Strategy', 'Agile', 'Market Research', 'Leadership'],
    category: 'popular'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Remote',
    type: 'Full-time',
    salary: '120,000ETB - 150,000ETB',
    posted: '5 days ago',
    description: 'Join our infrastructure team to build and maintain our CI/CD pipelines and cloud infrastructure.',
    skills: ['Docker', 'Kubernetes', 'Terraform', 'AWS'],
    category: 'remote'
  },
  {
    id: 6,
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Mekelle,Ethiopia',
    type: 'Full-time',
    salary: '95,000ETB - 125,000ETB',
    posted: '1 day ago',
    description: 'Use your data analysis skills to derive insights from our large datasets and help drive business decisions.',
    skills: ['Python', 'Machine Learning', 'SQL', 'Pandas'],
    category: 'recent'
  },
];

export default function Home() {
  const [tabValue, setTabValue] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    location: 'all',
    experience: 'all'
  });
  const [page, setPage] = useState(1);
  const jobsPerPage = 5;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const filteredJobs = mockJobs.filter(job => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Tab filter
    const matchesTab = tabValue === 'all' || job.category === tabValue;
    
    // Additional filters
    const matchesType = filters.type === 'all' || job.type.toLowerCase() === filters.type;
    const matchesLocation = filters.location === 'all' || 
      (filters.location === 'remote' ? job.location.toLowerCase() === 'remote' : 
       job.location.toLowerCase().includes(filters.location));
    
    return matchesSearch && matchesTab && matchesType && matchesLocation;
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage
  );

  return (
    <div>
      <Head>
        <title>JobFinder - Find Your Dream Job</title>
        <meta name="description" content="Find your dream job with our platform" />
      </Head>

    
      
      <Box sx={{ backgroundColor: '#f0f4f8', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            Find Your Dream Job
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            Browse thousands of job listings and find the perfect fit for your skills
          </Typography>
          
          <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
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
          <Tab label="All Jobs" value="all" />
          <Tab label="Recent Jobs" value="recent" />
          <Tab label="Popular Jobs" value="popular" />
          <Tab label="Remote Jobs" value="remote" />
          <Tab label="Full-time" value="full-time" />
          <Tab label="Part-time" value="part-time" />
        </Tabs>

        {paginatedJobs.length > 0 ? (
          <>
            {paginatedJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
                shape="rounded"
              />
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              No jobs found matching your criteria
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        )}
      </Container>

      
    </div>
  );
}