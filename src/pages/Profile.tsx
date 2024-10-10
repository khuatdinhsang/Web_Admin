import { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, Typography, Avatar, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { user } from '../services/user';
import { auth } from '../services/auth';
import { PhotoCamera } from '@mui/icons-material';

const Profile = () => {

    const [profileData, setProfileData] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        avatar: ''
    })
    const [profileDataTemp, setProfileDataTemp] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        avatar: ''
    })
    const [managePassword, setManagePassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };
    const handleChangePassword = (e: any) => {
        const { name, value } = e.target;
        setManagePassword({ ...managePassword, [name]: value });
    };
    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await user.getProfile()
                setProfileData({
                    fullname: res.data.fullname,
                    address: res.data.address,
                    email: res.data.email,
                    avatar: res.data.avatar,
                    phone: res.data.phone,
                })
                setProfileDataTemp({
                    fullname: res.data.fullname,
                    address: res.data.address,
                    email: res.data.email,
                    avatar: res.data.avatar,
                    phone: res.data.phone,
                })
            } catch (error) {
                toast.error("Đã có lỗi xảy ra!!!")
            }
        }
        getProfile()
    }, [])
    const isChangePass = managePassword.confirmPassword.length > 0 && managePassword.newPassword.length > 0 || managePassword.oldPassword.length > 0
    const handleChangPass = async () => {
        if (managePassword.newPassword !== managePassword.confirmPassword) {
            toast.error("Mật khẩu mới không trùng nhau!!!")
        }
        try {
            const { confirmPassword, ...passwordData } = managePassword;
            const res = await auth.changePassword(passwordData)
            if (res.data) {
                toast.success("Thay đổi mật khẩu thành công!")
            }
        } catch (error) {
            toast.error("Mật khẩu hiện tại không đúng!!!")
        }
    }
    const resetProfile = () => {
        setProfileData({ ...profileDataTemp })
    }
    const handleSubmit = async () => {
        try {
            const { email, ...dataSubmit } = profileData
            console.log("d", dataSubmit)
            const res = await user.editProfile(dataSubmit)
            if (res.data) {
                toast.success("Thay đổi thông tin thành công");
            }
        } catch (error) {
            toast.error("Thay đổi thông tin thất bại");
        }
    }
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const imagePreviewUrl = URL.createObjectURL(file);
        setImagePreview(imagePreviewUrl);

        const apiKey = '8fa2413a74f1c55a37809a8af17e20fc';
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setProfileData({
                    ...profileData,
                    avatar: data.data.url,
                });
                toast.success("Cập nhật ảnh đại diện thành công!");
            } else {
                toast.error("Lỗi khi tải lên ảnh đại diện.");
            }
        } catch (error) {
            toast.error("Đã có lỗi xảy ra khi upload ảnh.");
        }
    };
    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Thông tin cá nhân</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, position: 'relative' }}>
                        <Avatar
                            src={typeof profileData.avatar === 'string' ? profileData.avatar : imagePreview || ''}
                            alt="Avatar"
                            sx={{ width: 100, height: 100, mr: 2, position: 'relative' }}
                        />
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                            sx={{
                                position: 'absolute',
                                bottom: "-10px",
                                left: '70px',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            }}
                        >
                            <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                            <PhotoCamera />
                        </IconButton>
                        <Typography variant="body1">{profileData.fullname}</Typography>
                    </Box>
                    <TextField
                        fullWidth
                        label="Họ và tên"
                        name="fullname"
                        type="text"
                        value={profileData.fullname}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                        disabled={true}
                    />
                    <TextField
                        fullWidth
                        label="Điện thoại"
                        name="phone"
                        type="text"
                        value={profileData.phone}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Địa chỉ"
                        name="address"
                        type="text"
                        value={profileData.address}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <Box display="flex" sx={{ marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: "180px", mr: 4 }}
                            onClick={resetProfile}
                        >
                            Hủy Bỏ
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSubmit}
                            sx={{ width: "180px" }}
                        >
                            Lưu lại
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Thay đổi mật khẩu</Typography>
                    <TextField
                        fullWidth
                        label="Mật khẩu hiện tại"
                        type="password"
                        name="oldPassword"
                        value={managePassword.oldPassword}
                        onChange={handleChangePassword}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu mới"
                        name="newPassword"
                        type="password"
                        value={managePassword.newPassword}
                        onChange={handleChangePassword}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Xác nhận mật khẩu mới"
                        name="confirmPassword"
                        type="password"
                        value={managePassword.confirmPassword}
                        onChange={handleChangePassword}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" disabled={!isChangePass} onClick={handleChangPass}>
                        Cập nhật mật khẩu
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
