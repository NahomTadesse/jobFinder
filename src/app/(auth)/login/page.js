"use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, TextField, Button, Divider, Alert } from '@mui/material';

import { Email, Lock } from '@mui/icons-material';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // In a real app, you would authenticate with your backend here
    console.log('Login form submitted:', formData);
    
    // For demo purposes, we'll just redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div>
      <Head>
        <title>JobFinder - Login</title>
        <meta name="description" content="Login to JobFinder" />
      </Head>

      
      
      <Box sx={{ backgroundColor: '#f0f4f8', py: 8 }}>
        <Container maxWidth="sm">
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            Welcome Back
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            Login to access your account
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
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Link href="/forgot-password" passHref>
                  <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                    Forgot password?
                  </Typography>
                </Link>
              </Box>
              
              <Button type="submit" variant="contained" fullWidth size="large">
                Login
              </Button>
            </form>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {"Don't "}have an account?{' '}
              <Link href="/register" passHref>
                <Typography component="span" sx={{ color: 'primary.main', fontWeight: 'bold', cursor: 'pointer' }}>
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>

     
    </div>
  );
}