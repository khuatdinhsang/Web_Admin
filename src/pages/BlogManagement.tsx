import { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination, Button, Switch } from '@mui/material';
import { product } from '../services/product';
import { ListProduct } from '../types/user';
import CreateProductModal from '../components/dialog/CreateProducts';
import { toast } from 'react-toastify';
import { blog } from '../services/blog';
import CreateBlogModal from '../components/dialog/CreateBlogModal';
import DialogConfirm from '../components/dialog/DialogConfirm';
const BlogManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listProduct, setListProducts] = useState<any[]>([])
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialog = (id: number) => {
    setDeleteProductId(id); // Lưu lại ID sản phẩm cần xóa
    setOpenDialog(true); // Mở dialog
  };;
  const handleChangePage = (event: any, newPage: number) => {
    console.log("s", event)
    setPage(newPage);
  };
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null); // Thêm state này để lưu ID sản phẩm cần xóa

  useEffect(() => {
    const getListProducts = async () => {
      try {
        const res = await blog.getList();
        setListProducts(res.data)
        console.log("d11111",res)
      } catch (error) {
        toast.error("Lỗi lấy danh sách bài viết!!!")
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
    console.log("anhthu",newProduct)
    try {
      const res = await blog.addNew(newProduct);
      setListProducts(prev => [...prev, res.data])
      toast.success("Tạo mới bài viết thành công!")
    } catch (error) {
      toast.error("Lỗi thêm bài viết!!!")
    }
  };
  const handleEditProduct = async (updatedProduct: ListProduct) => {
    console.log('Sản  được cập nhật:', updatedProduct);
    try {
      const res = await blog.update(updatedProduct.id as number, updatedProduct);
      console.log("anhthu",res.data)
      setListProducts((prev) => prev.map((prod) => (prod.id === updatedProduct.id ? res.data[0] : prod)));
      toast.success("Cập nhật bài viết thành công!");
    } catch (error) {
      toast.error("Lỗi cập nhật bài viết!!!");
    }
  };
  const handleEditClick = (product: ListProduct) => {
    setEditingProduct(product);
    setOpen(true);
  };
  const handleChangeActiveUser = async (id: number) => {
    try {
        const res = await blog.delete(id);
        if (res.statusCode === 200)
            setListProducts((prev) => prev.filter((post) => post.id !== id));
        toast.success("Xóa bài viết thành công!");
        handleCloseDialog()
    } catch (error) {
        toast.error("Đã có lỗi xảy ra!!!")
    }
}
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Danh Sách Bài Viết
        </Typography>
        <Button variant="contained" onClick={handleOpen}>Tạo bài viết </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tiêu Đề</TableCell>
              <TableCell>Nội Dung</TableCell>
              <TableCell>Hình Ảnh</TableCell>
              <TableCell >Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProduct.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.content}</TableCell>
                <TableCell>
     {product.imageUrl?.map((url:any, index:any) => (
        <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            style={{ width: '100px', height: '100px', marginRight: '8px' }}
        />
    ))}
</TableCell>
<TableCell><Button  onClick={()=>handleOpenDialog(product.id)}>Xóa</Button>
<Button onClick={() => handleEditClick(product)}>Sửa</Button> 
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
      <CreateBlogModal
        open={open}
        onClose={handleClose}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        editingProduct={editingProduct}
      />
      <DialogConfirm
                open={openDialog}
                title='Bạn có muốn xóa bài viết không?'
                handleClose={handleCloseDialog}
                handleConfirm={() => handleChangeActiveUser(deleteProductId as number)}
            />
    </Box>
  );
};

export default BlogManagement;
