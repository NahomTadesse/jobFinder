"use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, TextField, Button, Divider, Alert } from '@mui/material';

import { Person, Email, Lock } from '@mui/icons-material';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // In a real app, you would register with your backend here
    console.log('Registration form submitted:', formData);
    
    // For demo purposes, we'll just redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div>
      <Head>
        <title>JobFinder - Register</title>
        <meta name="description" content="Register for JobFinder" />
      </Head>

     
      
      <Box sx={{ backgroundColor: '#f0f4f8', py: 8 }}>
        <Container maxWidth="sm">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            Create an Account
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            Join thousands of professionals finding their dream jobs
          </Typography>
          
          <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Person sx={{ color: 'action.active', mr: 1 }} />,
                }}
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />,
                }}
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />,
                }}
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />,
                }}
                sx={{ mb: 3 }}
              />
              
              <Button type="submit" variant="contained" fullWidth size="large">
                Register
              </Button>
            </form>
            
            <Divider sx={{ my: 3 }} />
         <Typography variant="body1" sx={{ textAlign: 'center' }}>
  Already have an account?{' '}
  <Button
    component={Link}
    href="/login"
    sx={{ 
      color: 'primary.main', 
      fontWeight: 'bold',
      textTransform: 'none',
      p: 0,
      minWidth: 'auto'
    }}
  >
    Login
  </Button>
</Typography>
          </Box>
        </Container>
      </Box>

      
    </div>
  );
}