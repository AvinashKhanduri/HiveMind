import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RegisterModal({ open, setOpen, posterUrl, formLink }) {
    const handleClose = () => setOpen(false);
    const handleRegister = () => {
        window.open(formLink, '_blank');
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(4px)',
                    },
                },
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: { xs: '50%', md: '2.5%' },
                        left: '50%',
                        transform: { xs: 'translate(-50%, -50%)', md: 'translate(-50%, 0)' },
                        width: { xs: '90vw', sm: '85vw', md: '55vw' },
                        height: { xs: 'auto', md: '95vh' },
                        
                        color: '#fff',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 3,
                        overflowY: 'auto',
                    }}
                    
                >
                    <Box
                        component="img"
                        src={posterUrl}
                        alt="Event Poster"
                        sx={{
                            width: '100%',
                            maxHeight: { xs: '60vh', md: '80vh' },
                            objectFit: 'contain',
                            borderRadius: '1rem',
                            mb: 3,
                        }}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            width: { xs: '100%', sm: '70%' },
                        }}
                    >
                        <Button
                            onClick={handleRegister}
                            sx={{
                                fontWeight: 'bold',
                                color: '#00ffff',
                                border: '2px solid #00ffff',
                                borderRadius: '8px',
                                px: 3,
                                py: 1,
                                backgroundColor: 'transparent',
                                width: '100%',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#00ffff22',
                                    boxShadow: '0 0 10px #00ffff',
                                },
                            }}
                        >
                            ✅ Register Now
                        </Button>

                        <Button
                            onClick={handleClose}
                            sx={{
                                fontWeight: 'bold',
                                color: '#ff4c4c',
                                border: '2px solid #ff4c4c',
                                borderRadius: '8px',
                                px: 3,
                                py: 1,
                                backgroundColor: 'transparent',
                                width: '100%',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#ff4c4c22',
                                    boxShadow: '0 0 10px #ff4c4c',
                                },
                            }}
                        >
                            ❌ Cancel
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}
