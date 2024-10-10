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
    Checkbox,
    FormControlLabel,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    onAddProduct: (product: any) => void;
    onEditProduct: (product: any) => void;
    editingProduct?: any | null;
}

const CreateBlogModal: React.FC<ProductModalProps> = ({ open, onClose, onAddProduct, editingProduct, onEditProduct }) => {
    const [product, setProduct] = useState<any>({
        title: '',
        content: '',
        imageUrl: [],
        isPublished: true,
    });

    useEffect(() => {
        if (editingProduct) {
            setProduct(editingProduct);
        } else {
            setProduct({ title: '', content: '', imageUrl: [], isPublished: true });
        }
    }, [editingProduct]);

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => {
            setImageFiles((prev) => [...prev, file]);
            return URL.createObjectURL(file);
        });
        setImagePreviews((prev) => [...prev, ...newFiles]); // Hiển thị preview ảnh
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setProduct((prev: any) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageUpload = async (file: File) => {
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

    const handleRemoveOldImage = (index: number) => {
        setProduct((prev: any) => ({
            ...prev,
            imageUrl: prev.imageUrl.filter((_: string, i: number) => i !== index),
        }));
    };

    const handleRemoveNewImage = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const imageUrls = await Promise.all(imageFiles.map((file) => handleImageUpload(file)));

        const finalProduct = {
            ...product,
            imageUrl: [...product.imageUrl, ...imageUrls.filter((url) => url)],
        };

        console.log("Final Product:", finalProduct);
        if (editingProduct) {
            onEditProduct(finalProduct);
        } else {
            onAddProduct(finalProduct);
        }
        setProduct({ title: '', content: '', imageUrl: [], isPublished: true });
        setImageFiles([]);
        setImagePreviews([]);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{editingProduct ? 'Cập nhật sản phẩm' : 'Tạo mới sản phẩm'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Vui lòng điền thông tin sản phẩm bên dưới và kéo thả ảnh vào vùng bên dưới.
                </DialogContentText>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Tiêu Đề"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={product.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="content"
                        label="Nội Dung"
                        type="text"
                        fullWidth
                        multiline
                        variant="outlined"
                        value={product.content}
                        onChange={handleChange}
                        rows={4}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={product.isPublished}
                                onChange={handleChange}
                                name="isPublished"
                            />
                        }
                        label="Đã Xuất Bản"
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

                    {/* Hiển thị ảnh mới */}
                    {imagePreviews.length > 0 && (
                        <Box mt={2} textAlign="center">
                            {imagePreviews.map((preview, index) => (
                                <Box key={index} position="relative" display="inline-block" m={1}>
                                    <img src={preview} alt={`Preview ${index}`} width="50%" height="50%" />
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveNewImage(index)}
                                        sx={{ position: 'absolute', top: 0, right: 0 }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {/* Hiển thị ảnh cũ */}
                    {product.imageUrl.length > 0 && (
                        <Box mt={2} textAlign="center">
                            {product.imageUrl.map((url: string, index: number) => (
                                <Box key={index} position="relative" display="inline-block" m={1}>
                                    <img src={url} alt={`Image ${index}`} width="50%" height="50%" />
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveOldImage(index)}
                                        sx={{ position: 'absolute', top: 0, right: 0 }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            ))}
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

export default CreateBlogModal;
