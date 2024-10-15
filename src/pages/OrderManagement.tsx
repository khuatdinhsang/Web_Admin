import { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination, Select, MenuItem } from '@mui/material';
import { product } from '../services/product';
import { ListProduct } from '../types/user';
import { toast } from 'react-toastify';
import { order } from '../services/order';
import { OrderStatus } from '../constants';

const OrderManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listProduct, setListProducts] = useState<any[]>([]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const res = await order.getList();
        setListProducts(res.data);
      } catch (error) {
        toast.error("Lỗi lấy danh sách sản phẩm!!!");
      }
    };
    getListProducts();
  }, []);

  const handleStatusChange = async (productId: number, newStatus: string) => {
    try {
      await order.update(productId, { status: newStatus });
      setListProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, status: newStatus } : product
        )
      );
      toast.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại!");
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quản lí kho hàng
        </Typography>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sản Phẩm</TableCell>
              <TableCell>Địa Chỉ</TableCell>
              <TableCell>Trạng Thái</TableCell>
              <TableCell>Hình Thức</TableCell>
              <TableCell>Tổng Tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProduct.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.orderDetails.map((item: any) => item.product.name).join(", ")}</TableCell>
                <TableCell>{product.address}</TableCell>
                <TableCell>
                  <Select
                    value={product.status}
                    onChange={(e) => handleStatusChange(product.id, e.target.value)}
                  >
                    <MenuItem value={OrderStatus.PENDING}>Đang Xử Lý</MenuItem>
                    <MenuItem value={OrderStatus.CANCELED}>Huỷ Bỏ</MenuItem>
                    <MenuItem value={OrderStatus.COMPLETED}>Hoàn Thành</MenuItem>
                    <MenuItem value={OrderStatus.CONFIRMED}>Xác Nhận</MenuItem>
                    <MenuItem value={OrderStatus.SHIPPING}>Đang Ship</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        count={listProduct.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default OrderManagement;
