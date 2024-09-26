import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const handleNavigate = (path: string) => {
        navigate(path)
    }
    return (
        <div>
            <Typography variant="h5" >
                Tổng quan
            </Typography>
            <Box>
                <Box sx={{ flexGrow: 1, mt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={3} onClick={() => handleNavigate('/orders-management')} >
                            <Card sx={{ backgroundColor: '#4CAF50', color: 'white' }} >
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h6">12</Typography>
                                        <Typography variant="h6">Đơn Đặt Hàng</Typography>
                                    </Box>
                                    <ShoppingCartIcon fontSize="large" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={3} onClick={() => handleNavigate('/users-management')}>
                            <Card sx={{ backgroundColor: '#2196F3', color: 'white' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h6">12</Typography>
                                        <Typography variant="h6">Khách hàng</Typography>
                                    </Box>
                                    <PeopleIcon fontSize="large" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={3} onClick={() => handleNavigate('/')} >
                            <Card sx={{ backgroundColor: '#FF9800', color: 'white' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h6">12</Typography>
                                        <Typography variant="h6">Doanh thu</Typography>
                                    </Box>
                                    <MonetizationOnIcon fontSize="large" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={3} onClick={() => handleNavigate('/products-management')}>
                            <Card sx={{ backgroundColor: '#9C27B0', color: 'white' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h6">12</Typography>
                                        <Typography variant="h6">Sản phẩm</Typography>
                                    </Box>
                                    <InventoryIcon fontSize="large" />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}

export default Home