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
import { ListProduct } from '../../types/user';
import { useDropzone } from 'react-dropzone';

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    onAddProduct: (product: ListProduct) => void;
    onEditProduct: (product: ListProduct) => void;
    editingProduct?: ListProduct | null;
}

const CreateProductModal: React.FC<ProductModalProps> = ({ open, onClose, onAddProduct, editingProduct, onEditProduct }) => {
    const [product, setProduct] = useState<ListProduct>({
        name: '',
        price: 0,
        image: '',
        description: '',
        quantity: 0,
    });
    useEffect(() => {
        if (editingProduct) {
            setProduct(editingProduct);
        } else {
            setProduct({ name: '', price: 0, image: '', description: '', quantity: 0 });
        }
    }, [editingProduct]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            const file = acceptedFiles[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // Hiển thị preview ảnh
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/*': []
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'quantity' ? parseInt(value) : value,
        }));
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
        let imageUrl = product.image;

        if (imageFile) {
            imageUrl = await handleImageUpload();
        }
        if (editingProduct) {
            onEditProduct({
                ...product,
                image: imageUrl || product.image,
            });
        } else {
            if (imageUrl) {
                onAddProduct({ ...product, image: imageUrl });
            } else {
                onAddProduct(product);
            }
        }
        setProduct({ name: '', price: 0, image: '', description: '', quantity: 0 });
        setImageFile(null);
        setImagePreview(null);
        onClose();
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> {editingProduct ? 'Cập nhật sản phẩm' : 'Tạo mới sản phẩm'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Vui lòng điền thông tin sản phẩm bên dưới và kéo thả ảnh vào vùng bên dưới.
                </DialogContentText>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Tên Sản Phẩm"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={product.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Giá (VNĐ)"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={product.price}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Mô Tả"
                        type="text"
                        fullWidth
                        multiline
                        variant="outlined"
                        value={product.description}
                        onChange={handleChange}
                        rows={4}
                    />
                    <TextField
                        margin="dense"
                        name="quantity"
                        label="Số Lượng"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={product.quantity}
                        onChange={handleChange}
                        disabled={editingProduct?true:false}
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
                    {(imagePreview || (editingProduct && editingProduct.image)) && (
                        <Box mt={2} textAlign="center">
                            <img
                                src={imagePreview || editingProduct?.image}
                                alt="Preview"
                                width="50%"
                                height="50%"
                            />
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {editingProduct ? 'Cập Nhật' : 'Thêm'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateProductModal;
