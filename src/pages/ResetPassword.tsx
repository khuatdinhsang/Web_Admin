import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'; // Nhớ import useNavigate nếu bạn đang sử dụng react-router-dom
import { toast } from 'react-toastify';
import { auth } from '../services/auth';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};
    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            toast.warning("Mật khẩu không trùng nhau!!!")
            return
        }
        try {
            const data = {
                email,
                password: newPassword,
                token
            }
            const res = await auth.forgotPassword(data)
            if (res.data) {
                toast.success("Mật khẩu của bạn đã được đặt lại")
                setNewPassword("")
                setConfirmPassword("")
                setToken("")
                navigate('/login')
            }
        } catch (error) {
            toast.error("Email hoặc OTP không chính xác")
        }

    };
    const isSubmit = newPassword.length > 0 && confirmPassword.length > 0 && token.length > 0
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
                    Thay đổi mật khẩu
                </Typography>
                <TextField
                    label="Mật khẩu mới"
                    variant="outlined"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value.trim())}
                    sx={{
                        width: '400px',
                        marginBottom: '20px',
                    }}
                />
                <TextField
                    label="Nhập lại mật khẩu mới"
                    variant="outlined"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
                    sx={{
                        width: '400px',
                        marginBottom: '20px',
                    }}
                />
                <TextField
                    label="Mã"
                    variant="outlined"
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value.trim())}
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
                        onClick={handleSubmit}
                        disabled={!isSubmit}
                        sx={{ width: "180px" }}
                    >
                        Lưu lại
                    </Button>
                </Box>
            </Box>
        </Box >
    );
};

export default ResetPassword;
