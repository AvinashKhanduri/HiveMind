import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import {
  Box, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List,
  CssBaseline, Typography, IconButton, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Stack, Avatar, Button, styled, useTheme, Tooltip
} from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import ProfileDropDown from './ProfileDropDown';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import StadiumIcon from '@mui/icons-material/Stadium';
import HandshakeIcon from '@mui/icons-material/Handshake';

import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { FaUserFriends } from "react-icons/fa";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: 'transform 0.3s ease-in-out',
  overflowX: 'hidden',
});

const closedMixin = () => ({
  width: `64px`,
  transition: 'transform 0.3s ease-in-out',
  overflowX: 'hidden',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? drawerWidth : 0,
  width: `calc(100% - ${open ? drawerWidth : 0}px)`,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open
    ? {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }
    : {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function AppDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerOpen = useCallback(() => setOpen(true), []);
  const handleDrawerClose = useCallback(() => setOpen(false), []);
  const handleProfileIconClick = useCallback((e) => setAnchorEl(e.currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const location = useLocation();



  const icons = useMemo(() => ({
    Home: <HomeFilledIcon />,
    Events: <EmojiEventsIcon />,
    Search: <SearchIcon />,
    Teams: <GroupsIcon />,
    MyTeam: <HandshakeIcon />,
    Club: <StadiumIcon />,
    MyProfile: <PersonOutlineIcon />,
    Connect: <FaUserFriends />
  }), []);

  const drawerRoutes = useMemo(() => ({
    Home: '/',
    Events: '/events',
    'Event Details': '/event-details',
    Teams: '/teams-page',
    Login: '/auth',
    MyTeam: '/my-team',
    Search: '/search-page',
    MyProfile: "/user-profile",
    Connect: "/users-page"
  }), []);

  const currentPageName = useMemo(() => {
    const path = location.pathname;
    const routeEntry = Object.entries(drawerRoutes).find(([, route]) => route === path);
    return routeEntry ? routeEntry[0] : '';
  }, [location.pathname, drawerRoutes]);

  const navItems = ['Home', 'Events', 'Teams', 'MyTeam', 'Club', 'Search', 'MyProfile', 'Connect'];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bg-transparent backdrop-blur-2xl" sx={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(20px)', // Or use 'blur(12px)' as per design
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }} elevation={10}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon className="font-bold bg-gray-800 rounded-md" sx={{ color: 'white', fontSize: '2rem' }} />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: 'white', fontFamily: 'IBM Plex Mono' }}>
            {/* Dynamic title */}
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                mt: 2,
                position: 'relative',
                display: 'inline-block',
                // fontFamily: 'IBM Plex Mono, monospace',
                fontWeight: 700,
                fontSize: '1.8rem',
                background: 'linear-gradient(to right, #e0e7ff, #a5b4fc, #6366f1)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(to right, #6366f1, #a5b4fc)',
                  borderRadius: '2px',
                  transform: 'scaleX(0.8)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s ease'
                },
                '&:hover': {
                  '&:after': {
                    transform: 'scaleX(1)'
                  }
                }
              }}
            >
              {currentPageName}
            </Typography>
          </Typography>
          <Stack direction="row" gap={2}>
            <Avatar sx={{ bgcolor: 'red' }} onClick={handleProfileIconClick}>A</Avatar>
            <ProfileDropDown
              anchorEl={anchorEl}
              handleClose={handleClose}
              user={{
                name: 'Avinash Khanduri',
                email: 'avinash@example.com',
                avatarUrl: 'https://avatars.githubusercontent.com/u/yourgithubid',
              }}
            />
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer open={open} variant="permanent" sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: 'rgba(0,0,0,0.2)',
        }
      }}>
        <DrawerHeader>
          <Typography fontFamily="IBM Plex Mono" variant="h6" color="white">HiveMind</Typography>
          <IconButton onClick={handleDrawerClose} sx={{ '&:hover': { backgroundColor: 'rgba(34, 28, 28, 0.1)' } }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ fontSize: '2rem', color: 'white' }} />}
          </IconButton>
        </DrawerHeader>
        {open && <Divider sx={{ borderColor: 'white' }} />}

        <List>
          {navItems.map((text) => {
            const listItemContent = (
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  borderRadius: '7px',
                  margin: '10px',
                  color: 'white',
                  justifyContent: open ? 'initial' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    color: '#1100ff',
                    backgroundColor: 'rgb(17, 24, 39)',
                    padding: '10px',
                    borderRadius: '10%',
                    mr: open ? 3 : 'auto',
                  }}
                >
                  {icons[text]}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={text}
                    sx={{
                      fontFamily: 'IBM Plex Mono',
                    }}
                  />
                )}
              </ListItemButton>
            );

            return (
              <ListItem
                key={text}
                component={NavLink}
                to={drawerRoutes[text]}
                disablePadding
                sx={{
                  display: 'block',
                  '&:hover': {
                    backgroundColor: '#444f78',
                    borderRadius: '10px',
                  },
                }}
              >
                {open ? (
                  listItemContent
                ) : (
                  <Tooltip
                    title={
                      <span style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.85rem',
                        color: '#e0f2fe'
                      }}>
                        {text}
                      </span>
                    }
                    placement="right"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: 'rgba(15, 23, 42, 0.95)', // slate-900 with opacity
                          backdropFilter: 'blur(4px)',
                          border: '1px solid rgba(59, 130, 246, 0.3)', // blue-500 border
                          borderRadius: '6px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          px: 2,
                          py: 1
                        }
                      },
                      arrow: {
                        sx: {
                          color: 'rgba(15, 23, 42, 0.95)',
                          '&:before': {
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                          }
                        }
                      }
                    }}
                    enterDelay={300}
                    leaveDelay={200}
                    enterTouchDelay={100}
                    TransitionProps={{
                      timeout: { enter: 300, exit: 150 },
                      style: {
                        transformOrigin: 'left center',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                      }
                    }}
                  >
                    {React.cloneElement(listItemContent, {
                      style: {
                        transition: 'all 0.2s ease',
                        ...listItemContent.props.style
                      },
                      onMouseEnter: (e) => {
                        // e.currentTarget.style.transform = 'translateX(4px)';
                        if (listItemContent.props.onMouseEnter) {
                          listItemContent.props.onMouseEnter(e);
                        }
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        if (listItemContent.props.onMouseLeave) {
                          listItemContent.props.onMouseLeave(e);
                        }
                      }
                    })}
                  </Tooltip>
                )}
              </ListItem>
            );
          })}
        </List>

        <List>
          <ListItem component={NavLink} to="/auth" disablePadding>
            <ListItemButton sx={{ justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              {!open && (
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    color: '#1100ff',
                    backgroundColor: 'rgb(17, 24, 39)',
                    padding: '10px',
                    borderRadius: '10%',
                  }}
                >
                  <LoginIcon />
                </ListItemIcon>
              )}
              {open && (
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    borderRadius: '20px',
                    marginLeft: '1rem',
                  }}
                  startIcon={<LoginIcon />}
                >
                  Sign in
                </Button>
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Outlet />
      </Box>
    </Box>
  );
}
