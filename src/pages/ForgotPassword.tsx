import { Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/auth';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const handleGetCode = async () => {
        try {
            const res = await auth.getCode(email)
            if (res.data) {
                toast.success("Vào email để lấy lại mật khẩu!")
                navigate('/reset-password', { state: { email } })
            }
        } catch (error) {
            toast.error("Email không chính xác!!!")
        }
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                backgroundColor: '#f0f0f0',
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    backgroundColor: '#ffffff',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                    Nhập địa chỉ email của bạn
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                    sx={{
                        width: '400px',
                        marginBottom: '20px',
                    }}
                />
                <Box display="flex" justifyContent="space-between" sx={{ width: '400px', marginTop: '20px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate('/login');
                        }}
                        sx={{ width: "180px" }}
                    >
                        Quay về Login
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        disabled={email.length === 0}
                        onClick={handleGetCode}
                        sx={{ width: "180px" }}
                    >
                        Lấy code
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ForgotPassword;
