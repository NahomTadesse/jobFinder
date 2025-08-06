"use client";
import { useState, Fragment } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { ExpandMore, Add } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for jobs and applicants with Ethiopian names and ETB
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechEthiopia",
    location: "Addis Ababa, Ethiopia",
    type: "Full-time",
    salary: "90,000 ETB - 120,000 ETB",
    posted: "2 days ago",
    description: "We are looking for a skilled Frontend Developer to join our team.",
    skills: ["React", "JavaScript", "CSS", "HTML"],
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataEthiopia",
    location: "Bahir Dar, Ethiopia",
    type: "Full-time",
    salary: "110,000 ETB - 140,000 ETB",
    posted: "3 days ago",
    description: "Develop and maintain server infrastructure and APIs.",
    skills: ["Node.js", "Python", "AWS", "SQL"],
  },
];

const mockApplicants = {
  1: [
    { id: 1, name: "Abebe Kebede", email: "abebe.kebede@example.com", phone: "+251 911 234 567", appliedDate: "2025-08-04", status: "Pending" },
    { id: 2, name: "Zewditu Alemu", email: "zewditu.alemu@example.com", phone: "+251 912 345 678", appliedDate: "2025-08-05", status: "Pending" },
  ],
  2: [
    { id: 3, name: "Tadesse Mekonnen", email: "tadesse.mekonnen@example.com", phone: "+251 913 456 789", appliedDate: "2025-08-06", status: "Pending" },
  ],
};

export default function Admin() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [action, setAction] = useState("");

  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleJobClick = (job) => setSelectedJob(selectedJob?.id === job.id ? null : job);
  const handleApplicantClick = (applicant) => {
    setSelectedApplicant(applicant);
    setAction("manage"); // Set action to "manage" for applicant actions
    setOpenDialog(true);
  };

  const handleActionChange = (event) => setAction(event.target.value);
  const handleInterviewDateChange = (event) => setInterviewDate(event.target.value);
  const handleSubmitAction = () => {
    if (action === "schedule" && interviewDate) console.log(`Scheduled interview for ${selectedApplicant.name} on ${interviewDate}`);
    else if (action === "accept") console.log(`Accepted application for ${selectedApplicant.name}`);
    else if (action === "reject") console.log(`Rejected application for ${selectedApplicant.name}`);
    else if (action === "post") console.log("Posted new job");
    setOpenDialog(false);
    setInterviewDate("");
    setAction("");
    setSelectedApplicant(null); // Reset selected applicant
  };

  const handlePostJob = () => {
    setSelectedApplicant(null);
    setAction("post"); // Set action to "post" for job posting
    setOpenDialog(true);
  };

  const [tabValue, setTabValue] = useState("jobs");

  return (
    <div>
      <Head>
        <title>JobFinder - Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for job management" />
      </Head>

     
      <Box sx={{ backgroundColor: "#f0f4f8", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="lg">
        

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ mb: 6, backgroundColor: "white", borderRadius: 1, boxShadow: 1 }}
          >
            <Tab label="Jobs" value="jobs" sx={{ textTransform: "none", fontWeight: "bold" }} />
            <Tab label="Analytics" value="analytics" sx={{ textTransform: "none", fontWeight: "bold" }} />
            <Tab label="Post Job" value="post" sx={{ textTransform: "none", fontWeight: "bold" }} />
          </Tabs>

          {tabValue === "jobs" && (
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={handlePostJob}>
                  Post New Job
                </Button>
              </Box>
              <Table sx={{ backgroundColor: "white" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1e3a8a", color: "white" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Company</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Location</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Salary</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockJobs.map((job) => (
                    <Fragment key={job.id}>
                      <TableRow
                        onClick={() => handleJobClick(job)}
                        sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#e0e7f0" } }}
                      >
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell>
                          <IconButton>
                            <ExpandMore />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={5} sx={{ p: 0 }}>
                          <AnimatePresence>
                            {selectedJob?.id === job.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: "hidden" }}
                              >
                                <Box sx={{ p: 3, backgroundColor: "#f9fafb" }}>
                                  <Typography variant="h6" sx={{ mb: 3 }}>Applicants</Typography>
                                  <Table size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Applied Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {mockApplicants[job.id]?.map((applicant) => (
                                        <TableRow
                                          key={applicant.id}
                                          onClick={() => handleApplicantClick(applicant)}
                                          sx={{ "&:hover": { backgroundColor: "#e0e7f0" } }}
                                        >
                                          <TableCell>{applicant.name}</TableCell>
                                          <TableCell>{applicant.email}</TableCell>
                                          <TableCell>{applicant.phone}</TableCell>
                                          <TableCell>{applicant.appliedDate}</TableCell>
                                          <TableCell>{applicant.status}</TableCell>
                                          <TableCell>Manage</TableCell>
                                        </TableRow>
                                      )) || <TableRow><TableCell colSpan={6}>No applicants yet</TableCell></TableRow>}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}

          {tabValue === "analytics" && (
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: "white" }}>
              <Typography variant="h5" sx={{ mb: 4, color: "#1e3a8a" }}>Analytics Dashboard</Typography>
              <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
                <Box sx={{ p: 3, backgroundColor: "#e0e7f0", borderRadius: 1, textAlign: "center" }}>
                  <Typography variant="h6">Total Jobs Posted</Typography>
                  <Typography variant="h4" sx={{ color: "#1e3a8a", fontWeight: "bold" }}>{mockJobs.length}</Typography>
                </Box>
                <Box sx={{ p: 3, backgroundColor: "#e0e7f0", borderRadius: 1, textAlign: "center" }}>
                  <Typography variant="h6">Total Applicants</Typography>
                  <Typography variant="h4" sx={{ color: "#1e3a8a", fontWeight: "bold" }}>
                    {Object.values(mockApplicants).reduce((sum, applicants) => sum + applicants.length, 0)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}

          {tabValue === "post" && (
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: "white" }}>
              <Typography variant="h5" sx={{ mb: 4, color: "#1e3a8a" }}>Post New Job</Typography>
              <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Job Title"
                      fullWidth
                      required
                      sx={{ "& .MuiInputBase-root": { height: 40 }, "& .MuiInputBase-input": { py: 0.5 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Company"
                      fullWidth
                      required
                      sx={{ "& .MuiInputBase-root": { height: 40 }, "& .MuiInputBase-input": { py: 0.5 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Location"
                      fullWidth
                      required
                      sx={{ "& .MuiInputBase-root": { height: 40 }, "& .MuiInputBase-input": { py: 0.5 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Salary (ETB)"
                      fullWidth
                      required
                      sx={{ "& .MuiInputBase-root": { height: 40 }, "& .MuiInputBase-input": { py: 0.5 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      rows={2}
                      required
                      sx={{ "& .MuiInputBase-root": { height: 80 }, "& .MuiInputBase-input": { py: 1 } }}
                    />
                  </Grid>
                </Grid>
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, width: 200, alignSelf: "flex-end" }}>
                  Submit Job
                </Button>
              </Box>
            </Paper>
          )}

          <Dialog open={openDialog} onClose={() => {
            setOpenDialog(false);
            setInterviewDate("");
            setAction("");
            setSelectedApplicant(null); // Reset applicant when closing
          }} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ backgroundColor: "#1e3a8a", color: "white" }}>
              {action === "post" ? "Post Job" : selectedApplicant ? `Manage Applicant: ${selectedApplicant.name}` : "Manage"}
            </DialogTitle>
            <DialogContent>
              {action === "post" ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Job Title"
                        fullWidth
                        required
                        sx={{ "& .MuiInputBase-root": { height: 40 }, "& .MuiInputBase-input": { py: 0.5 } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Company"
                        fullWidth
                        required
                        sx={{ "& .MuiInputBase-root": { height: 40 }, "& .MuiInputBase-input": { py: 0.5 } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Location"
                        fullWidth
                        required
                        sx={{ "& .MuiInputBase-root": { height: 40 }, "& .MuiInputBase-input": { py: 0.5 } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Salary (ETB)"
                        fullWidth
                        required
                        sx={{ "& .MuiInputBase-root": { height: 40 }, "& .MuiInputBase-input": { py: 0.5 } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={2}
                        required
                        sx={{ "& .MuiInputBase-root": { height: 80 }, "& .MuiInputBase-input": { py: 1 } }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <>
                  <TextField
                    select
                    label="Action"
                    value={action}
                    onChange={handleActionChange}
                    fullWidth
                    sx={{ "& .MuiInputBase-root": { height: 40  }, "& .MuiInputBase-input": { py: 0.5 }, mb: 2 ,mt:3 }}
                  >
                    <MenuItem value="schedule">Schedule Interview</MenuItem>
                    <MenuItem value="accept">Accept</MenuItem>
                    <MenuItem value="reject">Reject</MenuItem>
                  </TextField>
                  {action === "schedule" && (
                    <TextField
                      label="Interview Date"
                      type="datetime-local"
                      value={interviewDate}
                      onChange={handleInterviewDateChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{ "& .MuiInputBase-root": { height: 40 }, "& .MuiInputBase-input": { py: 0.5 } }}
                    />
                  )}
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#f0f4f8" }}>
              <Button onClick={() => {
                setOpenDialog(false);
                setInterviewDate("");
                setAction("");
                setSelectedApplicant(null);
              }} sx={{ color: "#1e3a8a" }}>Cancel</Button>
              <Button
                onClick={handleSubmitAction}
                disabled={action === "schedule" && !interviewDate}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>

    </div>
  );
}