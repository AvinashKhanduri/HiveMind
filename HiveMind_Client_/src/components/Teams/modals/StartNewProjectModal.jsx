import * as React from 'react';
import { 
  Box, Button, Typography, Modal, TextField, 
  Chip, Divider, IconButton, Stepper, Step, StepLabel,
  FormControl, InputLabel, Select, MenuItem, Slider
} from '@mui/material';
import {
  FaPlus, FaTrash, FaCalendarAlt, FaUsers, 
  FaTag, FaDollarSign, FaProjectDiagram
} from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

const StartNewProjectModal = ({ open, onClose }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [project, setProject] = React.useState({
    name: '',
    description: '',
    teamMembers: [],
    tags: [],
    budget: 5000,
    deadline: '',
    status: 'planning'
  });

  const availableMembers = [
    { id: 1, name: 'Sarah Chen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, name: 'Priya Patel', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setProject(prev => ({ ...prev, tags: [...prev.tags, e.target.value] }));
      e.target.value = '';
    }
  };

  const handleRemoveTag = (index) => {
    setProject(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
  };

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const steps = ['Basic Info', 'Team & Budget', 'Review'];

  return (
    <Modal open={open} onClose={onClose} sx={{ overflow: 'auto' }}>
      <Box sx={{
        minHeight: '100vh',
        p: { xs: 2, md: 4 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: 900,
          bgcolor: 'rgba(15, 23, 42, 0.8)',
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden'
        }}>
          {/* Header - Updated Gradient */}
          <Box sx={{
            p: 3,
            background: 'linear-gradient(to right, #0f172a, #1e293b)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #ec4899, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              <FaProjectDiagram style={{ marginRight: 10 }} />
              Start New Project
            </Typography>
            <IconButton onClick={onClose} sx={{ color: 'white' }}>
              ✕
            </IconButton>
          </Box>

          {/* Stepper - Updated Styling */}
          <Box sx={{ px: 3, pt: 2, backgroundColor: 'rgba(15, 23, 42, 0.6)' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel 
                    sx={{ 
                      '& .MuiStepLabel-label': { 
                        color: '#e2e8f0',
                        fontWeight: 500,
                        '&.Mui-active': {
                          color: '#93c5fd',
                          fontWeight: 600
                        },
                        '&.Mui-completed': {
                          color: '#a5b4fc'
                        }
                      },
                      '& .MuiStepIcon-root': {
                        color: '#334155',
                        '&.Mui-active': {
                          color: '#3b82f6'
                        },
                        '&.Mui-completed': {
                          color: '#8b5cf6'
                        }
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Rest of your modal content remains exactly the same */}
              {/* Content */}
          <Box sx={{ p: 3, maxHeight: '70vh', overflowY: 'auto' }}>
            {activeStep === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Project Name"
                  name="name"
                  value={project.name}
                    sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#93c5fd'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
                borderWidth: 2
              },
              mb: 2
            }}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: '#cbd5e1' } }}
                  InputProps={{ style: { color: 'white' } }}
                  
                />

                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                   sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#93c5fd'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
                borderWidth: 2
              },
              mb: 2
            }}
                  InputLabelProps={{ style: { color: '#cbd5e1' } }}
                  InputProps={{ style: { color: 'white' } }}
                />

                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#cbd5e1', mb: 1 }}>
                    <FaTag style={{ marginRight: 8 }} />
                    Tags
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Add tags (press Enter)"
                     sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#93c5fd'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
                borderWidth: 2
              },
              mb: 2
            }}
                    onKeyDown={handleAddTag}
                    InputLabelProps={{ style: { color: '#cbd5e1' } }}
                    InputProps={{ style: { color: 'white' } }}
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {project.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleRemoveTag(index)}
                        sx={{ bgcolor: 'rgba(99, 102, 241, 0.2)', color: 'white' }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#cbd5e1', mb: 2 }}>
                    <FaUsers style={{ marginRight: 8 }} />
                    Team Members
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel  sx={{ color: '#cbd5e1' }}>Add Team Members</InputLabel>
                    <Select
                      multiple
                      value={project.teamMembers}
                      onChange={(e) => setProject({...project, teamMembers: e.target.value})}
                      
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip 
                              key={value} 
                              label={availableMembers.find(m => m.id === value)?.name}
                              sx={{ bgcolor: 'rgba(99, 102, 241, 0.2)', color: 'white' }}
                            />
                          ))}
                        </Box>
                      )}
                       sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#93c5fd'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
                borderWidth: 2
              },
              mb: 2
            }}
                    >
                      {availableMembers.map((member) => (
                        <MenuItem key={member.id} value={member.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img 
                              src={member.avatar} 
                              alt={member.name} 
                              style={{ width: 30, height: 30, borderRadius: '50%' }}
                            />
                            {member.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#cbd5e1', mb: 2 }}>
                    <FaDollarSign style={{ marginRight: 8 }} />
                    Budget
                  </Typography>
                  <Slider
                    value={project.budget}
                    onChange={(_, value) => setProject({...project, budget: value})}
                    min={1000}
                    max={20000}
                    step={500}
                    valueLabelDisplay="auto"
                    sx={{ color: '#8b5cf6' }}
                  />
                  <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 1 }}>
                    ${project.budget.toLocaleString()}
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  label="Deadline"
                  type="date"
                  name="deadline"
                  value={project.deadline}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true, style: { color: '#cbd5e1' } }}
                  InputProps={{ style: { color: 'white' } }}
                  sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#93c5fd'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
                borderWidth: 2
              },
              mb: 2,
              mt:2
            }}
                />
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ color: 'white' }}>
                <Typography variant="h6" sx={{ mb: 3, color: '#a5b4fc' }}>
                  Review Project Details
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ color: '#cbd5e1' }}>Project Name</Typography>
                  <Typography>{project.name}</Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ color: '#cbd5e1' }}>Description</Typography>
                  <Typography>{project.description}</Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ color: '#cbd5e1' }}>Team Members</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {project.teamMembers.map(id => {
                      const member = availableMembers.find(m => m.id === id);
                      return (
                        <Chip
                          key={id}
                          label={member?.name}
                          avatar={<img src={member?.avatar} alt={member?.name} style={{ width: 24, height: 24 }} />}
                          sx={{ bgcolor: 'rgba(99, 102, 241, 0.2)', color: 'white' }}
                        />
                      );
                    })}
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ color: '#cbd5e1' }}>Budget</Typography>
                  <Typography>${project.budget.toLocaleString()}</Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ color: '#cbd5e1' }}>Deadline</Typography>
                  <Typography>{project.deadline || 'Not set'}</Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ color: '#cbd5e1' }}>Tags</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {project.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        sx={{ bgcolor: 'rgba(99, 102, 241, 0.2)', color: 'white' }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          {/* Footer Navigation */}
           <Box sx={{ 
            p: 3, 
            display: 'flex', 
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Button
              onClick={activeStep === 0 ? onClose : handleBack}
              sx={{ color: 'white' }}
            >
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            
            <Box>
              {activeStep < steps.length - 1 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    background: 'linear-gradient(to right, #ec4899, #8b5cf6)',
                    '&:hover': {
                      background: 'linear-gradient(to right, #db2777, #7c3aed)'
                    }
                  }}
                >
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log('Project created:', project);
                    onClose();
                  }}
                  sx={{
                    background: 'linear-gradient(to right, #10b981, #3b82f6)',
                    '&:hover': {
                      background: 'linear-gradient(to right, #059669, #2563eb)'
                    }
                  }}
                >
                  Create Project
                </Button>
              )}
            </Box>
          </Box>
          
        </Box>
      </Box>
    </Modal>
  );
};


export default StartNewProjectModal;


   