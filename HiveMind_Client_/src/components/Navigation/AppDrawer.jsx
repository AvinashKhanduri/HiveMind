import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Stack, Avatar, Button } from '@mui/material';
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
import { Outlet } from 'react-router-dom'
import {Link, NavLink} from 'react-router-dom'

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);


export default function AppDrawer() {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    

    const handleProfileIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const icons = {
        "Home": <HomeFilledIcon />,
        "Events": <EmojiEventsIcon />,
        "Search": <SearchIcon />,
        "Teams": <GroupsIcon />,
        "MyTeam": <HandshakeIcon />,
        "Club": <StadiumIcon />,
        "MyProfile":<PersonOutlineIcon/>
    }

const drawerRoutes = {
  Home: '/',
  Events: '/events',
  'Event Details': '/event-details',
  Teams: '/teams-page',
  Login: '/auth',
  MyTeam: '/my-team'
};

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" elevation={10} color='none' className=' bg-transparent backdrop-blur-2xl' open={open}

            >

                <Toolbar



                >

                    <IconButton
                        color="inherit"

                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon
                            className="font-bold bg-gray-800 rounded-md"
                            sx={{
                                color: "white",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                
                            }}
                        />

                    </IconButton>
                    <Typography variant="h6" noWrap component="div" className=' text-white ' fontFamily={"IBM Plex Mono"} fontWeight={"bold"} sx={{ flexGrow: 1 }} >
                        {/* Current screen name will come here */}
                        {/* Home */}
                    </Typography>

                    <Stack direction={"row"} gap={2}>
                        <Avatar sx={{ bgcolor: "red" }} onClick={handleProfileIconClick}>A</Avatar>

                        <ProfileDropDown anchorEl={anchorEl} handleClose={handleClose} />

                        {/* <Button variant='outlined' sx={{
                            color:'red',
                            borderColor:"red "
                        }} startIcon={<LoginIcon/>}>Sign in</Button> */}

                    </Stack>



                </Toolbar>
            </AppBar>
            <Drawer
                elevation={0}
                color='none'

                variant="permanent" open={open}

                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    },
                }} >
                <DrawerHeader >
                    
                    <div className='  flex items-center justify-center w-full '>
                            <h1 fontFamily={"IBM Plex Mono"} className=' text-2xl text-white font-bold  '>HiveMind</h1>
                    </div>
                    
                    <IconButton sx={{

                        '&:hover': {
                            backgroundColor: 'rgba(34, 28, 28, 0.1)',
                        }
                    }} onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ fontSize: "3rem", color: "white" }} />}
                    </IconButton>
                </DrawerHeader>
               {
                open && <hr className=' text-white w-full' />
               }
                <List>
                    {['Home', 'Events', 'Teams', 'MyTeam', 'Club', 'Search','MyProfile'].map((text, index) => (
                        <ListItem component={NavLink} to={drawerRoutes[text]} key={text} className=' hover:text-[#466b83] ' disablePadding sx={{
                            display: 'block',
                            "&:hover": {
                                
                                backgroundColor:"#444f78",
                                borderRadius:"10px"
                            }
                        }}
                        >
                            <ListItemButton

                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,

                                        borderRadius: "7px",
                                        margin: "10px",
                                        color: "white",

                                    },
                                    open
                                        ? {
                                            justifyContent: 'initial',

                                        }
                                        : {
                                            justifyContent: 'center',
                                            borderRadius: "10px"
                                        },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: 'center',
                                            color: "#1100ff",
                                            backgroundColor: "rgb(17, 24, 39)",
                                            padding: "10px",
                                            borderRadius: "10%",


                                        },
                                        open
                                            ? {
                                                mr: 3,
                                            }
                                            : {
                                                mr: 'auto',
                                            },
                                    ]}
                                >
                                    {
                                        icons[text]
                                    }
                                </ListItemIcon>
                                <ListItemText
                                    fontFamily={"IBM Plex Mono"}
                                    primary={text}
                                    sx={[
                                        open
                                            ? {
                                                opacity: 1,
                                            }
                                            : {
                                                opacity: 0,
                                            },
                                        {
                                            fontFamily: "IBM Plex Mono"
                                        }
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
               

                {/* signin or signout buttons */}
                <List>
                      <ListItem key={"Signout"} component={NavLink} to={"/auth"} className=' hover:text-[#466b83] ' disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >

                            {
                                !open&& (
                                    <>
                                    
                                    <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: 'center',
                                            color: "#1100ff",
                                            backgroundColor: "rgb(17, 24, 39)",
                                            padding: "10px",
                                            borderRadius: "10%",


                                        },
                                        open
                                            ? {
                                                mr: 3,
                                            }
                                            : {
                                                mr: 'auto',
                                            },
                                    ]}
                                >
                                    <LoginIcon/>
                                </ListItemIcon>
                                    </>
                                )
                            }
                            {
                                open && (
                                    <>
                                        <Button variant='outlined'
                                            sx={{
                                                 backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                color: "white",
                                                borderRadius: "20px",
                                                marginLeft: "1rem"
                                            }} startIcon={<LoginIcon />}>Sign in</Button>
                                    </>
                                )
                            }
                        </ListItemButton>
                    </ListItem>
              </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {/* All content will come here */}
                <Outlet/>
            </Box>

            
        </Box>


    );
}
