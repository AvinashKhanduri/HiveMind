import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Stack } from '@mui/material';
import { LoginRounded } from '@mui/icons-material';

export default function ProfileDropDown({ anchorEl, handleClose }) {
    const open = Boolean(anchorEl);

    return (
        <div>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root': {
                         background: 'linear-gradient(315deg, hsla(237, 80%, 10%, 1) 0%, hsla(227, 70%, 54%, 1) 100%)',
                        color: 'white',
                        width:'10rem',
                        border: '1px solid transparent',
                        transition: 'box-shadow 0.3s ease, border 0.3s ease',
                        '&:hover': {
                            border: '1px solid #ffffff33', // semi-transparent white border
                            boxShadow: '0 0 10px #ffffff33', // soft white glow
                        },
                    },
                    '& .MuiMenuItem-root': {
                        '&:hover': {
                            backgroundColor: '#374151',
                        },
                    },



                }}


                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Stack direction={"row"} gap={2} >
                        <AccountBoxIcon sx={{color:"#ffffff"}}  />
                        <p>My Profile</p>
                    </Stack>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Stack direction={"row"} gap={2} >
                        <LoginRounded sx={{color:"#ffffff"}}/>
                        <p>Logout</p>
                    </Stack>
                </MenuItem>
                
            </Menu>
        </div>
    );
}