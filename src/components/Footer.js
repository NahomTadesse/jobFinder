"use client";
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#2d3748', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              JobFinder
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Find your dream job with our platform. We connect talented professionals with top companies worldwide.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <MuiLink href="#" color="inherit">
                <Facebook />
              </MuiLink>
              <MuiLink href="#" color="inherit">
                <Twitter />
              </MuiLink>
              <MuiLink href="#" color="inherit">
                <LinkedIn />
              </MuiLink>
              <MuiLink href="#" color="inherit">
                <Instagram />
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              For Job Seekers
            </Typography>
            <Link href="/" passHref>
              <MuiLink color="inherit" display="block" sx={{ mb: 1 }}>Browse Jobs</MuiLink>
            </Link>
            <Link href="/" passHref>
              <MuiLink color="inherit" display="block" sx={{ mb: 1 }}>Popular Jobs</MuiLink>
            </Link>
            <Link href="/" passHref>
              <MuiLink color="inherit" display="block" sx={{ mb: 1 }}>Recent Jobs</MuiLink>
            </Link>
            <Link href="/dashboard" passHref>
              <MuiLink color="inherit" display="block" sx={{ mb: 1 }}>Dashboard</MuiLink>
            </Link>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Company
            </Typography>
            <Link href="/about" passHref>
              <MuiLink color="inherit" display="block" sx={{ mb: 1 }}>About Us</MuiLink>
            </Link>
            <Link href="/contact" passHref>
              <MuiLink color="inherit" display="block" sx={{ mb: 1 }}>Contact Us</MuiLink>
            </Link>
            <MuiLink href="#" color="inherit" display="block" sx={{ mb: 1 }}>Privacy Policy</MuiLink>
            <MuiLink href="#" color="inherit" display="block" sx={{ mb: 1 }}>Terms of Service</MuiLink>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Subscribe to Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Get updates on new jobs and career tips.
            </Typography>
            <Box component="form" sx={{ display: 'flex' }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  padding: '10px',
                  border: 'none',
                  borderRadius: '4px 0 0 4px',
                  flexGrow: 1,
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#3f51b5',
                  color: 'white',
                  border: 'none',
                  padding: '0 15px',
                  borderRadius: '0 4px 4px 0',
                  cursor: 'pointer',
                }}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 3 }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} JobFinder. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}