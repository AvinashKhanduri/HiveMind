import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaUniversity, FaMapMarkerAlt, FaUsers, FaPlus, FaTrash } from 'react-icons/fa';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const modalStyle = (isMobile) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: isMobile ? '90%' : '70%',
  maxWidth: 800,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '12px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  p: 3,
  background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
  color: 'white',
  '&::-webkit-scrollbar': { width: '6px' },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '3px',
  },
});

export default function CustomizeTeam({ open, setOpen, teamInfo, setTeamInfo }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isHiring, setIsHiring] = React.useState(teamInfo.openRoles?.length > 0);
  const [newRole, setNewRole] = React.useState({
    name: '',
    skills: '',
    description: ''
  });

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRole = () => {
  const { name, skills, description } = newRole;
  if (name.trim() && skills.trim() && description.trim()) {
    setTeamInfo(prev => ({
      ...prev,
      openRoles: [...(prev.openRoles || []), newRole]
    }));
    setNewRole({ name: '', skills: '', description: '' });
  }
};

  const handleRemoveRole = (index) => {
    setTeamInfo(prev => ({
      ...prev,
      openRoles: prev.openRoles.filter((_, i) => i !== index)
    }));
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="customize-team-modal">
      <Box sx={modalStyle(isMobile)}>
        <Typography variant="h4" component="h2" sx={{ 
          mb: 3,
          background: 'linear-gradient(to right, #ec4899, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          fontSize: isMobile ? '1.5rem' : '2rem'
        }}>
          Customize Your Team
        </Typography>

        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxHeight: 'calc(90vh - 180px)',
          overflowY: 'auto',
          pr: 1,
          pt:3
        }}>
          {/* Basic Information Section */}
          <TextField
            fullWidth
            label="Team Name"
            name="name"
            value={teamInfo.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#cbd5e1' } }}
            InputProps={{
              startAdornment: <FaUsers style={{ marginRight: 10, color: '#60a5fa' }} />,
              style: { color: 'white'  }
            }}
          />

          <TextField
            fullWidth
            label="University"
            name="university"
            value={teamInfo.university}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#cbd5e1' } }}
            InputProps={{
              startAdornment: <FaUniversity style={{ marginRight: 10, color: '#a78bfa' }} />,
              style: { color: 'white' }
            }}
          />

          <TextField
            fullWidth
            label="Department"
            name="department"
            value={teamInfo.department}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#cbd5e1' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          <TextField
            select
            fullWidth
            label="Location Mode"
            name="locationMode"
            value={teamInfo.locationMode}
            onChange={handleChange}
            SelectProps={{ native: true }}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#cbd5e1' } }}
            InputProps={{
              startAdornment: <FaMapMarkerAlt style={{ marginRight: 10, color: '#2dd4bf' }} />,
              style: { color: 'white' }
            }}
          >
            <option value="remote">🌍 Remote</option>
            <option value="on-campus">🏢 On-campus</option>
          </TextField>

          <TextField
            fullWidth
            label="Contact Email"
            name="contactEmail"
            value={teamInfo.contactEmail}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#cbd5e1' } }}
            InputProps={{ style: { color: 'white' } }}
          />

          {/* Hiring Toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={isHiring}
                onChange={(e) => setIsHiring(e.target.checked)}
                color="secondary"
              />
            }
            label="Currently Hiring"
            sx={{ mb: 2, color: '#cbd5e1' }}
          />

          {/* Conditional Hiring Fields */}
          {isHiring && (
            <>
              <Typography variant="h6" sx={{ mb: 2, color: '#a5b4fc' }}>
                Open Roles
              </Typography>

              {teamInfo.openRoles?.map((role, index) => (
                <Box key={index} sx={{ 
                  bgcolor: 'rgba(79, 70, 229, 0.2)', 
                  p: 2, 
                  mb: 2, 
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <Typography fontWeight="bold" sx={{ color: 'white' }}>{role}</Typography>
                    <Typography variant="body2" sx={{ color: '#c7d2fe' }}>
                      Skills: {role.skills}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#c7d2fe' }}>
                      {role.description}
                    </Typography>
                  </div>
                  <Button 
                    onClick={() => handleRemoveRole(index)}
                    size="small"
                    color="error"
                    startIcon={<FaTrash />}
                    sx={{ minWidth: 'auto' }}
                  >
                    {isMobile ? '' : 'Remove'}
                  </Button>
                </Box>
              ))}

              

              <Typography variant="subtitle2" sx={{ mb: 1, color: '#a5b4fc' }}>
                Add New Role
              </Typography>
              <TextField
                fullWidth
                size="small"
                label="Role Name"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                sx={{ mb: 1 }}
                InputLabelProps={{ style: { color: '#cbd5e1' } }}
                InputProps={{ style: { color: 'white' } }}
              />
              <TextField
                fullWidth
                size="small"
                label="Required Skills"
                value={newRole.skills}
                onChange={(e) => setNewRole({...newRole, skills: e.target.value})}
                sx={{ mb: 1 }}
                InputLabelProps={{ style: { color: '#cbd5e1' } }}
                InputProps={{ style: { color: 'white' } }}
              />
              <TextField
                fullWidth
                size="small"
                label="Description"
                multiline
                rows={2}
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                sx={{ mb: 1 }}
                InputLabelProps={{ style: { color: '#cbd5e1' } }}
                InputProps={{ style: { color: 'white' } }}
              />
              <Button
                variant="outlined"
                onClick={handleAddRole}
                startIcon={<FaPlus />}
                sx={{ mt: 1 }}
              >
                Add Role
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 3,
          pt: 2,
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Button 
            onClick={handleClose}
            variant="outlined"
            sx={{ mr: 2, color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #ec4899, #8b5cf6)',
              '&:hover': {
                background: 'linear-gradient(to right, #db2777, #7c3aed)'
              }
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}