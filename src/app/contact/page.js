"use client";
import { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Typography, TextField, Button, Grid, Alert } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Email, Phone, LocationOn } from '@mui/icons-material';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    
    setSubmitted(true);
    setError('');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <Head>
        <title>JobFinder - Contact Us</title>
        <meta name="description" content="Contact JobFinder" />
      </Head>

     
      
      <Box sx={{ backgroundColor: '#f0f4f8', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            We'd love to hear from you
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              Get in Touch
            </Typography>
            
            {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for your message! We'll get back to you soon.
              </Alert>
            )}
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
                sx={{ mb: 3 }}
              />
              
              <Button type="submit" variant="contained" size="large">
                Send Message
              </Button>
            </form>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              Contact Information
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body1">
                  contact@jobfinder.com
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="body1">
                  +251-123-456-789
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <LocationOn sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
                <Typography variant="body1">
                  123 Job Street<br />
                  4 kilo<br />
                  Addis Ababa
                </Typography>
              </Box>
            </Box>
            
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Office Hours
              </Typography>
              <Typography variant="body1" paragraph>
                Monday - Friday: 9:00 AM - 6:00 PM
              </Typography>
              <Typography variant="body1">
                Saturday - Sunday: Closed
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

    
    </div>
  );
}