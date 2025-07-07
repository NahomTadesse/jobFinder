"use client";
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  LocationOn, 
  Business, 
  Schedule, 
  AttachMoney,
  Close,
  UploadFile,
  Description
} from '@mui/icons-material';

export default function JobCard({ job }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [application, setApplication] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    cv: null
  });

  const handleDetailsOpen = () => setDetailsOpen(true);
  const handleDetailsClose = () => setDetailsOpen(false);
  const handleApplyOpen = () => setApplyOpen(true);
  const handleApplyClose = () => setApplyOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplication(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setApplication(prev => ({ ...prev, cv: e.target.files[0] }));
  };

  const handleSubmitApplication = () => {
    // Here you would typically send the application to your backend
    console.log('Submitting application:', { job, application });
    handleApplyClose();
    // Add success notification here
  };

  return (
    <>
      <Card sx={{ mb: 3, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {job.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                <Business sx={{ mr: 1, color: 'text.secondary', fontSize: '18px' }} />
                <Typography variant="body2" color="text.secondary">
                  {job.company}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: 'text.secondary', fontSize: '18px' }} />
                <Typography variant="body2" color="text.secondary">
                  {job.location}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Chip label={job.type} color="primary" size="small" sx={{ mb: 1 }} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {job.salary}
            </Typography>
            <Schedule sx={{ ml: 2, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {job.posted}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 2 }}>
            {job.description.substring(0, 150)}...
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {job.skills.map((skill, index) => (
              <Chip key={index} label={skill} size="small" variant="outlined" />
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="contained" size="small" onClick={handleApplyOpen}>
              Apply Now
            </Button>
            <Button variant="outlined" size="small" onClick={handleDetailsOpen}>
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Job Details Modal */}
      <Dialog
        open={detailsOpen}
        onClose={handleDetailsClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {job.title} at {job.company}
          <IconButton onClick={handleDetailsClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Job Description
            </Typography>
            <Typography variant="body1" paragraph>
              {job.description}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Location</Typography>
              <Typography variant="body1">{job.location}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Salary</Typography>
              <Typography variant="body1">{job.salary}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Job Type</Typography>
              <Typography variant="body1">{job.type}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Posted</Typography>
              <Typography variant="body1">{job.posted}</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Requirements
            </Typography>
            <ul>
              {job.requirements?.map((req, index) => (
                <li key={index}>
                  <Typography variant="body1">{req}</Typography>
                </li>
              ))}
            </ul>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {job.skills.map((skill, index) => (
                <Chip key={index} label={skill} color="primary" size="small" />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose}>Close</Button>
          <Button variant="contained" onClick={handleApplyOpen}>
            Apply Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Application Modal */}
      <Dialog
        open={applyOpen}
        onClose={handleApplyClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Apply for {job.title}
          <IconButton onClick={handleApplyClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">Position</Typography>
            <Typography variant="body1" gutterBottom>{job.title} at {job.company}</Typography>
          </Box>

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={application.name}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={application.email}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={application.phone}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Cover Letter"
            name="coverLetter"
            value={application.coverLetter}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              id="cv-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="cv-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<UploadFile />}
              >
                Upload CV
              </Button>
            </label>
            {application.cv && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {application.cv.name}
              </Typography>
            )}
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              PDF, DOC, or DOCX files (Max 5MB)
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApplyClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitApplication}
            disabled={!application.name || !application.email}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}