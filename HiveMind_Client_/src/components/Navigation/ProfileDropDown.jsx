import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { Stack, Typography, Box } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { LoginRounded } from '@mui/icons-material';

export default function ProfileDropDown({ anchorEl, handleClose, user }) {
  const open = Boolean(anchorEl);

  return (
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          background: 'linear-gradient(315deg, hsla(237, 80%, 10%, 1) 0%, hsla(227, 70%, 54%, 1) 100%)',
          color: 'white',
          width: '16rem',
          border: '1px solid transparent',
          borderRadius: '10px',
          transition: 'box-shadow 0.3s ease, border 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            border: '1px solid #ffffff33',
            boxShadow: '0 0 10px #ffffff33',
          },
        },
        '& .MuiMenuItem-root': {
          '&:hover': {
            backgroundColor: '#374151',
          },
        },
      }}
      MenuListProps={{
        'aria-labelledby': 'profile-button',
      }}
    >
      {/* User Info Header */}
      <Box p={2} pb={1}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Avatar src={user?.avatarUrl} alt={user?.name} />
          <Box>
            <Typography fontSize="0.95rem" fontWeight="bold" color="white">
              {user?.name || 'Guest User'}
            </Typography>
            <Typography fontSize="0.75rem" color="#ccc">
              {user?.email || 'guest@example.com'}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ my: 1, borderColor: '#ffffff22' }} />

      <MenuItem onClick={handleClose}>
        <Stack direction="row" gap={2} alignItems="center">
          <AccountBoxIcon sx={{ color: "#ffffff" }} />
          <p>My Profile</p>
        </Stack>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Stack direction="row" gap={2} alignItems="center">
          <LoginRounded sx={{ color: "#ffffff" }} />
          <p>Logout</p>
        </Stack>
      </MenuItem>
    </Menu>
  );
}
