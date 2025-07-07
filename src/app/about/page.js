"use client";
import Head from 'next/head';
import { Box, Container, Typography, Grid, Avatar } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function About() {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
      bio: 'John has over 15 years of experience in the recruitment industry.',
      avatar: '/images/team1.jpg'
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      bio: 'Jane leads our technology team with expertise in AI and machine learning.',
      avatar: '/images/team2.jpg'
    },
    {
      name: 'Mike Johnson',
      role: 'Head of Product',
      bio: 'Mike ensures our platform meets the needs of both job seekers and employers.',
      avatar: '/images/team3.jpg'
    },
  ];

  return (
    <div>
      <Head>
        <title>JobFinder - About Us</title>
        <meta name="description" content="Learn about JobFinder" />
      </Head>

    
      
      <Box sx={{ backgroundColor: '#f0f4f8', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            About JobFinder
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            Connecting talent with opportunity
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At JobFinder, we believe that everyone deserves to find meaningful work that aligns with their skills and passions. 
            Our mission is to bridge the gap between talented professionals and companies looking to hire the best candidates.
          </Typography>
          <Typography variant="body1" paragraph>
            Founded in 2025, we have helped over 1000 people find their dream jobs and assisted thousands of companies in 
            building their dream teams.
          </Typography>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            How We are Different
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Smart Matching
              </Typography>
              <Typography variant="body1">
                Our advanced algorithms match candidates with jobs based on skills, experience, and cultural fit.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Transparent Process
              </Typography>
              <Typography variant="body1">
                No hidden fees or surprise charges. We believe in complete transparency for both job seekers and employers.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Career Support
              </Typography>
              <Typography variant="body1">
                We dont just help you find a job - we provide resources to help you grow your career long-term.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    alt={member.name}
                    src={member.avatar}
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body1">
                    {member.bio}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box> */}
      </Container>

     
    </div>
  );
}