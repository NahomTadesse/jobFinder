"use client";
import { useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Search, AccountCircle, Work, Home, Info, ContactMail, Login, Logout } from '@mui/icons-material';

export default function Header() {
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'black', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Link href="/" passHref>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Work sx={{ color: '#3f51b5', mr: 1 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                JobFinder
              </Typography>
            </Box>
          </Link>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Link href="/" passHref>
              <Button startIcon={<Home />}>Home</Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button startIcon={<Info />}>Dashboard</Button>
            </Link>
            <Link href="/about" passHref>
              <Button startIcon={<Info />}>About</Button>
            </Link>
            <Link href="/contact" passHref>
              <Button startIcon={<ContactMail />}>Contact</Button>
            </Link>
          </Box>

          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ bgcolor: '#3f51b5' }}>U</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link href="/dashboard" passHref>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountCircle sx={{ mr: 1 }} /> Dashboard
                    </Box>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => { setAuth(false); handleClose(); }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Logout sx={{ mr: 1 }} /> Logout
                  </Box>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link href="/login" passHref>
              <Button startIcon={<Login />} variant="contained" color="primary">
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}