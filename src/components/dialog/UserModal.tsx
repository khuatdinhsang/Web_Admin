import { useState, useCallback, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Box,
    Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface UserModalProps {
    open: boolean;
    onClose: () => void;
    onEditUser: (user: any) => void;
    editingUser?: any | null;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, onEditUser, editingUser }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
        fullname: '',
        phone: '',
        address: '',
    });

    // Cập nhật userData mỗi khi editingUser thay đổi
    useEffect(() => {
        if (open && editingUser) {
            setUserData({
                email: editingUser.email || '',
                fullname: editingUser.fullname || '',
                phone: editingUser.phone || '',
                address: editingUser.address || '',
            });
            setImagePreview(editingUser.avatar || null);
            setImageFile(null); // Reset file ảnh khi mở modal
            setIsEditing(false); // Đặt lại chế độ chỉnh sửa
        }
    }, [open, editingUser]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            const file = acceptedFiles[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async () => {
        if (!imageFile) return '';
        const apiKey = '8fa2413a74f1c55a37809a8af17e20fc';
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                return data.data.url;
            } else {
                console.error('Lỗi upload ảnh:', data);
                return '';
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            return '';
        }
    };

    const handleSubmit = async () => {
        let imageUrl = editingUser?.avatar || '';

        if (imageFile) {
            imageUrl = await handleImageUpload();
        }
        onEditUser({
            id: editingUser.id,
            ...userData,
            avatar: imageUrl,
        });
        setUserData({
            email: '',
            fullname: '',
            phone: '',
            address: '',
        });
        setImageFile(null);
        setImagePreview(null);
        setIsEditing(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Thông tin người dùng</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Vui lòng điền đầy đủ thông tin bên dưới và kéo thả ảnh vào vùng bên dưới.
                </DialogContentText>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Địa chỉ email"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={userData.email}
                        onChange={handleChange}
                        InputProps={{
                            readOnly: !isEditing,
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="fullname"
                        label="Tên người dùng"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={userData.fullname}
                        onChange={handleChange}
                        InputProps={{
                            readOnly: !isEditing,
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Số điện thoại"
                        type="text"
                        fullWidth
                        multiline
                        variant="outlined"
                        value={userData.phone}
                        onChange={handleChange}
                        rows={4}
                        InputProps={{
                            readOnly: !isEditing,
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Địa chỉ"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={userData.address}
                        onChange={handleChange}
                        InputProps={{
                            readOnly: !isEditing,
                        }}
                    />
                    <Box
                        {...getRootProps()}
                        sx={{
                            border: '2px dashed #ccc',
                            borderRadius: '8px',
                            padding: '16px',
                            textAlign: 'center',
                            mt: 2,
                            cursor: 'pointer',
                        }}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <Typography>Kéo thả file ảnh vào đây ...</Typography>
                        ) : (
                            <Typography>Kéo thả ảnh hoặc nhấn vào đây để chọn ảnh</Typography>
                        )}
                    </Box>
                    {(imagePreview || (editingUser && editingUser?.avatar)) && (
                        <Box mt={2} textAlign="center">
                            <img
                                src={imagePreview || editingUser?.avatar}
                                alt="Preview"
                                width="50%"
                                height="50%"
                            />
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsEditing(true)} color="primary">
                    Chỉnh sửa
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={!isEditing}>
                    Lưu
                </Button>
                <Button onClick={onClose} color="primary">
                    Thoát
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserModal;
