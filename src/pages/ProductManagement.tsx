import { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination, Button } from '@mui/material';
import { product } from '../services/product';
import { ListProduct } from '../types/user';
import CreateProductModal from '../components/dialog/CreateProducts';
import { toast } from 'react-toastify';
const ProductManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listProduct, setListProducts] = useState<ListProduct[]>([])
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ListProduct | null>(null);
  const handleChangePage = (event: any, newPage: number) => {
    console.log("s", event)
    setPage(newPage);
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
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const handleAddProduct = async (newProduct: ListProduct) => {
    try {
      const res = await product.addNew(newProduct);
      setListProducts(prev => [...prev, res.data])
      toast.success("Tạo sản phẩm mới thành công!")
    } catch (error) {
      toast.error("Lỗi thêm sản phẩm!!!")
    }
  };
  const handleEditProduct = async (updatedProduct: ListProduct) => {
    console.log('Sản phẩm được cập nhật:', updatedProduct);
    try {
      const res = await product.update(updatedProduct.id as number, updatedProduct);
      setListProducts((prev) => prev.map((prod) => (prod.id === updatedProduct.id ? res.data : prod)));
      toast.success("Cập nhật sản phẩm thành công!");
    } catch (error) {
      toast.error("Lỗi cập nhật sản phẩm!!!");
    }
  };
  const handleEditClick = (product: ListProduct) => {
    setEditingProduct(product);
    setOpen(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Danh Sách Sản Phẩm
        </Typography>
        <Button variant="contained" onClick={handleOpen}>Tạo sản phẩm </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên Sản Phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell >Số Lượng</TableCell>
              <TableCell >Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProduct.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price} VND</TableCell>
                <TableCell>
                  <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px' }} />
                </TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell><Button onClick={() => handleEditClick(product)}>Sửa</Button></TableCell>
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
      <CreateProductModal
        open={open}
        onClose={handleClose}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        editingProduct={editingProduct}
      />
    </Box>
  );
};

export default ProductManagement;
