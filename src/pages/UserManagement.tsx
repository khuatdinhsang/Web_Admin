import { useEffect, useState } from "react";
import { user } from "../services/user";
import { toast } from "react-toastify";
import { Box, Button, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import UserModal from "../components/dialog/UserModal";

const UserManagement = () => {
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listUsers, setListUsers] = useState<any[]>([])
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const handleChangePage = (event: any, newPage: number) => {
    console.log("s", event)
    setPage(newPage);
  };
  useEffect(() => {
    const getListUsers = async () => {
      try {
        const res = await user.getList();
        console.log("d",res)
        setListUsers(res.data)
      } catch (error) {
        toast.error("Lỗi lấy danh sách sản phẩm!!!")
      }
    }
    getListUsers()
  }, [])
  console.log("27",listUsers)
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChangeActiveUser = async(id:number)=>{
    const userItem= listUsers.find(user => user.id===id)
    console.log("user",user)
    try {
        const res= await user.activeUser(id,!userItem.isActive);
        if(res.statusCode === 200)
        setListUsers((prev) => prev.map((user) => (user.id === id? {...user, isActive:!user.isActive } : user)));
      } catch (error) {
        toast.error("Đã có lỗi xảy ra!!!")
      }
  }
  const handleEdit =(user:number) => {
    console.log("anc",user)
    setEditingUser(user);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };
  const handleEditUser = async (updatedUser: any) => {
    console.log('Sản phẩm được cập nhật:', updatedUser);
    try {
      const res = await user.update(updatedUser.id as number, updatedUser);
      setListUsers((prev) => prev.map((prod) => (prod.id === updatedUser.id ? res.data : prod)));
      toast.success("Cập nhật thông tin người dùng thành công!");
    } catch (error) {
      toast.error("Lỗi cập nhật sản phẩm!!!");
    }
  };
  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Danh Sách Người Dùng
      </Typography>
    </Box>
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Hình Ảnh</TableCell>
            <TableCell>SĐT</TableCell>
            <TableCell >Địa chỉ</TableCell>
            <TableCell >Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
            <TableRow key={user.id} onClick={()=> handleEdit(user)}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>
                {user.avatar ?
                <img src={user.avatar} alt={user.fullname} style={{ width: '100px', height: '100px' }} />
             :
             <img src="https://png.pngtree.com/png-vector/20190623/ourlarge/pngtree-accountavataruser--flat-color-icon--vector-icon-banner-templ-png-image_1491720.jpg" alt={user.fullname} style={{ width: '100px', height: '100px' }} />
             }
             
                </TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell><Switch
                    checked={user.isActive}
                    onChange={()=> handleChangeActiveUser(user.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10, 20, 50]}
      component="div"
      count={listUsers.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    <UserModal
        open={open}
        onClose={handleClose}
        onEditUser={handleEditUser}
        editingUser={editingUser}
      />
      
  </Box>
    )
}

export default UserManagement