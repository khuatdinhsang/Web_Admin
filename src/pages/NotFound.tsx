import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#fff'
            }}
        >
            <Typography variant='h1' sx={{ fontWeight: 'bold', mb: 2 }}>
                404 Not Found
            </Typography>

            <Typography variant='body1' sx={{ mb: 4 }}>
                Your visited page not found. You may go home page.
            </Typography>

            <Button
                variant='contained'
                sx={{ backgroundColor: 'red', color: '#fff', padding: '10px 20px', fontWeight: 'bold' }}
                onClick={handleGoHome}
            >
                Back to home page
            </Button>
        </Box>
    );
};

export default NotFound;