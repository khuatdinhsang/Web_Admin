import { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination, Button } from '@mui/material';
import { product } from '../services/product';
import { ListProduct } from '../types/user';
import { toast } from 'react-toastify';
import CreateQuantityModal from '../components/dialog/CreateQuantityModal';
const WarehouseManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listProduct, setListProducts] = useState<ListProduct[]>([])
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ListProduct | null>(null);
  const handleChangePage = (event: any, newPage: number) => {
    console.log("s", event)
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    const getListProducts = async () => {
      try {
        const res = await product.getList();
        setListProducts(res.data)
      } catch (error) {
        toast.error("Lỗi lấy danh sách sản phẩm!!!")
      }
    }
    getListProducts()
  }, [])

  const handleAddQuantity =(product:any)=>{
    setOpen(true)
    setEditingProduct(product)
  }
  const handleSubmit = async (quantity: number) => {
    if (editingProduct) {
      try {
        const res = await product.updateProductQuantity(Number(editingProduct.id), quantity);
  
        if (res && res.data) {
          const updatedList = listProduct.map((prod) =>
            prod.id === editingProduct.id ? { ...prod, quantity } : prod
          );
          setListProducts(updatedList);
          toast.success('Cập nhật số lượng sản phẩm thành công!');
        }
      } catch (error) {
        toast.error('Lỗi cập nhật số lượng sản phẩm!');
      }
      setOpen(false);
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
              <TableCell>Tên Sản Phẩm</TableCell>
              <TableCell>Số Lượng Có Sẵn</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProduct.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell><Button onClick={() => handleAddQuantity(product)}>Thêm số lượng</Button>
                </TableCell>
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
      <CreateQuantityModal
        open={open}
        onClose={() => setOpen(false)}
        editingProduct={editingProduct}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default WarehouseManagement;
