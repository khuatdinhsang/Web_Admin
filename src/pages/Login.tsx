import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setAccessToken } from '../utils/auth';
import { auth } from '../services/auth';

export default function SignIn() {
    const theme = createTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const res = await auth.login({
                email,
                password
            });
            setAccessToken(res.data.accessToken);
            toast.success('Đăng nhập thành công');
            navigate('/');
        } catch (error) {
            toast.error("Đã có lỗi xảy ra")
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: theme.spacing(8),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{ margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form
                    noValidate
                    style={{
                        width: '100%',
                        marginTop: theme.spacing(1)
                    }}
                    onSubmit={handleLogin}
                >
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type='submit' fullWidth variant='contained' color='primary' sx={{ margin: theme.spacing(3, 0, 2) }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid size={4}>
                            <Link
                                to='/forgot-password'
                                style={{
                                    textDecoration: 'none',
                                    color: theme.palette.primary.main
                                }}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}