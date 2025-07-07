"use client";
import { useState } from 'react';
import { Box, TextField, InputAdornment, Button, Menu, MenuItem, Typography, Chip } from '@mui/material';
import { Search, FilterList, Close } from '@mui/icons-material';

export default function SearchFilter({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    type: 'all',
    location: 'all',
    experience: 'all'
  });

  const categories = ['All', 'Recent', 'Popular', 'Remote', 'Full-time', 'Part-time'];
  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
  const locations = ['All', 'Remote', 'Addis Ababa', 'Bahir dar', 'Mekelle', 'Gondor'];
  const experienceLevels = ['All', 'Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    onFilter(newFilters);
  };

  const removeFilter = (filterType) => {
    const newFilters = { ...selectedFilters, [filterType]: 'all' };
    setSelectedFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for jobs, companies, or keywords"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              backgroundColor: 'white',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => onSearch(searchTerm)}
          sx={{ borderRadius: '50px', px: 4 }}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={handleClick}
          sx={{ borderRadius: '50px' }}
        >
          Filters
        </Button>
        
        {Object.entries(selectedFilters).map(([key, value]) => {
          if (value !== 'all') {
            return (
              <Chip
                key={key}
                label={`${key}: ${value}`}
                onDelete={() => removeFilter(key)}
                deleteIcon={<Close />}
                sx={{ textTransform: 'capitalize' }}
              />
            );
          }
          return null;
        })}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '300px',
            padding: '20px',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Category
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleFilterChange('category', category.toLowerCase())}
                color={selectedFilters.category === category.toLowerCase() ? 'primary' : 'default'}
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Box>

          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Job Type
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {jobTypes.map((type) => (
              <Chip
                key={type}
                label={type}
                onClick={() => handleFilterChange('type', type.toLowerCase())}
                color={selectedFilters.type === type.toLowerCase() ? 'primary' : 'default'}
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Box>

          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Location
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {locations.map((location) => (
              <Chip
                key={location}
                label={location}
                onClick={() => handleFilterChange('location', location.toLowerCase())}
                color={selectedFilters.location === location.toLowerCase() ? 'primary' : 'default'}
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Box>

          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Experience Level
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {experienceLevels.map((level) => (
              <Chip
                key={level}
                label={level}
                onClick={() => handleFilterChange('experience', level.toLowerCase())}
                color={selectedFilters.experience === level.toLowerCase() ? 'primary' : 'default'}
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Box>
        </Box>
      </Menu>
    </Box>
  );
}