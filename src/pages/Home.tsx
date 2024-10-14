import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { product } from "../services/product";
import { toast } from "react-toastify";
const Home = () => {
    const navigate = useNavigate();
    const handleNavigate = (path: string) => {
        navigate(path)
    }
    const [data, setData]= useState({
        total:0,
        completed:0,
        pending:0,
        todayRevenue:0
    })
    useEffect(() => {
        const getListProducts = async () => {
          try {
            const res = await product.statistical();
            setData(res.data)
          } catch (error) {
            toast.error("Lỗi lấy thống kê!!!")
          }
        }
        getListProducts()
      }, [])
    return (
        <div>
            <Typography variant="h5" >
                Tổng quan
            </Typography>
            <Box>
                <Box sx={{ flexGrow: 1, mt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={3}  >
                            <Card sx={{ backgroundColor: '#4CAF50', color: 'white' }} >
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h6">{data.total}</Typography>
                                        <Typography variant="h6">Tổng đơn hàng</Typography>
                                    </Box>
                                    <ShoppingCartIcon fontSize="large" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={3} >
                            <Card sx={{ backgroundColor: '#2196F3', color: 'white' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h6">{data.completed}</Typography>
                                        <Typography variant="h6">Đơn hàng đang hoàn thành</Typography>
                                    </Box>
                                    <PeopleIcon fontSize="large" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={3}  >
                            <Card sx={{ backgroundColor: '#FF9800', color: 'white' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h6">{data.pending}</Typography>
                                        <Typography variant="h6">Đơn hàng đang được xử lí</Typography>
                                    </Box>
                                    <MonetizationOnIcon fontSize="large" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid sx={{ cursor: 'pointer' }} item xs={12} sm={6} md={3} >
                            <Card sx={{ backgroundColor: '#9C27B0', color: 'white' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="h6">{data.total}</Typography>
                                        <Typography variant="h6">Tổng doanh thu</Typography>
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