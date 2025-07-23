import * as React from 'react';
import { 
  Box, Typography, Paper, Chip, Avatar, Divider, 
  Button, LinearProgress, TextField, IconButton, 
  Tabs, Tab, Badge, List, ListItem, ListItemAvatar,
  ListItemText, Tooltip
} from '@mui/material';
import {
  FaGithub, FaCodeBranch, FaCalendarAlt, FaUserTie,
  FaEdit, FaSave, FaTimes, FaLink, FaChartLine,
  FaTasks, FaUsers, FaTag, FaClock,FaProjectDiagram 
} from 'react-icons/fa';

const ProjectDetailPage = ({ isTeamLeader = true, project = null }) => {
  // Default project data
  const defaultProject = {
    id: 'proj-001',
    name: 'University Collaboration Platform',
    description: 'A platform for students to collaborate on projects, find team members, and manage academic work together.',
    status: 'active',
    progress: 65,
    startDate: '2023-06-15',
    endDate: '2023-12-20',
    githubRepo: 'https://github.com/username/university-collab-platform',
    branches: [
      { name: 'main', lastCommit: '2 days ago', protected: true },
      { name: 'dev', lastCommit: '5 hours ago', protected: false },
      { name: 'feature/auth', lastCommit: '1 day ago', protected: false }
    ],
    versions: [
      { version: '1.0.0', releaseDate: '2023-08-10', changelog: 'Initial release' },
      { version: '1.1.0', releaseDate: '2023-09-15', changelog: 'Added team features' }
    ],
    teamMembers: [
      { id: 1, name: 'Sarah Chen', role: 'Frontend Lead', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 2, name: 'James Wilson', role: 'Backend Developer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: 3, name: 'Priya Patel', role: 'UI/UX Designer', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
    ],
    tags: ['education', 'collaboration', 'web-app'],
    milestones: [
      { name: 'Authentication', completed: true, date: '2023-07-10' },
      { name: 'User Profiles', completed: true, date: '2023-08-01' },
      { name: 'Project Management', completed: false, dueDate: '2023-10-15' }
    ]
  };

  const projectData = project || defaultProject;
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState({...projectData});
  const [activeTab, setActiveTab] = React.useState(0);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would update the project data from the API response
  };

  const handleCancel = () => {
    setEditData({...projectData});
    setIsEditing(false);
  };

  const renderEditableField = (label, value, fieldName, multiline = false) => (
    isEditing ? (
      <TextField
        fullWidth
        label={label}
        name={fieldName}
        value={editData[fieldName]}
        onChange={handleEditChange}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        variant="outlined"
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { color: '#e2e8f0' } }}
        InputProps={{ style: { color: '#f8fafc' } }}
      />
    ) : (
      <Typography variant="body1" sx={{ mb: 2, color: '#e2e8f0' }}>
        <strong style={{ color: '#f8fafc' }}>{label}:</strong> {value}
      </Typography>
    )
  );

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto', color: '#e2e8f0' }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        {isEditing ? (
          <TextField
            fullWidth
            label="Project Name"
            name="name"
            value={editData.name}
            onChange={handleEditChange}
            variant="outlined"
            sx={{ 
              fontSize: '2rem',
              '& .MuiInputBase-input': { fontSize: '2rem', color: '#f8fafc' },
              '& .MuiInputLabel-root': { color: '#e2e8f0' }
            }}
          />
        ) : (
          <Typography variant="h3" sx={{ 
            background: 'linear-gradient(to right, #ec4899, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            {projectData.name}
          </Typography>
        )}
        
        {isTeamLeader && (
          isEditing ? (
            <Box>
              <Button 
                onClick={handleSave} 
                variant="contained" 
                startIcon={<FaSave />}
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button 
                onClick={handleCancel} 
                variant="outlined" 
                startIcon={<FaTimes />}
                sx={{ color: '#f8fafc', borderColor: '#f8fafc' }}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)} 
              variant="contained" 
              startIcon={<FaEdit />}
            >
              Edit Project
            </Button>
          )
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Left Column */}
        <Box sx={{ flex: 2 }}>
          <Paper sx={{ p: 3, mb: 3, background: 'rgba(15, 23, 42, 0.7)' }}>
            <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#f8fafc' }}>
              <FaProjectDiagram style={{ marginRight: 10 }} />
              Project Details
            </Typography>
            
            {renderEditableField(
              'Description', 
              projectData.description, 
              'description', 
              true
            )}
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Typography variant="body1" sx={{ color: '#e2e8f0' }}>
                <FaCalendarAlt style={{ marginRight: 8, color: '#f8fafc' }} />
                <strong style={{ color: '#f8fafc' }}>Start:</strong> {projectData.startDate}
              </Typography>
              <Typography variant="body1" sx={{ color: '#e2e8f0' }}>
                <FaClock style={{ marginRight: 8, color: '#f8fafc' }} />
                <strong style={{ color: '#f8fafc' }}>End:</strong> {projectData.endDate}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#f8fafc' }}>
                <FaTag style={{ marginRight: 8, color: '#f8fafc' }} />
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {projectData.tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    sx={{ 
                      bgcolor: 'rgba(99, 102, 241, 0.2)', 
                      color: '#e2e8f0',
                      '& .MuiChip-label': { color: '#e2e8f0' }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#f8fafc' }}>
                <FaGithub style={{ marginRight: 10, color: '#f8fafc' }} />
                GitHub Repository
              </Typography>
              <Button 
                href={projectData.githubRepo} 
                target="_blank" 
                rel="noopener"
                variant="outlined"
                startIcon={<FaLink />}
                sx={{ 
                  mr: 2,
                  color: '#f8fafc',
                  borderColor: '#f8fafc',
                  '&:hover': {
                    borderColor: '#e2e8f0'
                  }
                }}
              >
                View on GitHub
              </Button>
            </Box>
          </Paper>

          {/* Team Members */}
          <Paper sx={{ p: 3, background: 'rgba(15, 23, 42, 0.7)' }}>
            <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#f8fafc' }}>
              <FaUsers style={{ marginRight: 10, color: '#f8fafc' }} />
              Team Members
            </Typography>
            <List>
              {projectData.teamMembers.map((member) => (
                <ListItem key={member.id} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar src={member.avatar} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={<span style={{ color: '#f8fafc' }}>{member.name}</span>} 
                    secondary={<span style={{ color: '#cbd5e1' }}>{member.role}</span>}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1 }}>
          {/* Tabs for different sections */}
          <Paper sx={{ background: 'rgba(15, 23, 42, 0.7)' }}>
            <Tabs 
              value={activeTab} 
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': { color: '#cbd5e1' },
                '& .Mui-selected': { color: '#818cf8' }
              }}
            >
              <Tab label="Branches" icon={<FaCodeBranch />} />
              <Tab label="Versions" icon={<FaChartLine />} />
              <Tab label="Milestones" icon={<FaTasks />} />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: '#f8fafc' }}>Git Branches</Typography>
                  {projectData.branches.map((branch, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'rgba(30, 41, 59, 0.5)', borderRadius: 1 }}>
                      <Typography sx={{ fontWeight: 'bold', color: '#f8fafc' }}>
                        {branch.name} {branch.protected && <Chip label="protected" size="small" sx={{ color: '#e2e8f0' }} />}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                        Last commit: {branch.lastCommit}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: '#f8fafc' }}>Version History</Typography>
                  {projectData.versions.map((version, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'rgba(30, 41, 59, 0.5)', borderRadius: 1 }}>
                      <Typography sx={{ fontWeight: 'bold', color: '#f8fafc' }}>v{version.version}</Typography>
                      <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                        Released: {version.releaseDate}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: '#e2e8f0' }}>
                        {version.changelog}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: '#f8fafc' }}>Project Milestones</Typography>
                  {projectData.milestones.map((milestone, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        bgcolor: 'rgba(30, 41, 59, 0.5)', 
                        borderRadius: 1,
                        borderLeft: milestone.completed ? '4px solid #10b981' : '4px solid #f59e0b'
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 'bold', color: '#f8fafc' }}>{milestone.name}</Typography>
                        <Chip 
                          label={milestone.completed ? 'Completed' : 'Pending'} 
                          size="small"
                          color={milestone.completed ? 'success' : 'warning'}
                          sx={{ color: '#f8fafc' }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 1 }}>
                        {milestone.completed ? `Completed on ${milestone.date}` : `Due by ${milestone.dueDate}`}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

ProjectDetailPage.defaultProps = {
  isTeamLeader: true,
  project: null
};

export default ProjectDetailPage;