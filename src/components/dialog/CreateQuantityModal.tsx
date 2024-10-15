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

interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    editingProduct: any | null;
    onSubmit: (value:number) => void;
}

const CreateQuantityModal: React.FC<ProductModalProps> = ({ open,onSubmit, onClose,  editingProduct }) => {
    const [quantity, setQuantity]= useState(0)
    const handleSubmit = async () => {
        onClose();
        onSubmit(quantity)
        setQuantity(0)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10); 
        if (!isNaN(newValue)) {
            setQuantity(newValue); 
        }
    };
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>  'Thêm mới số lượng sản phẩm' </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Tên Sản Phẩm"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editingProduct?.name}
                        disabled={true}
                    />
                    <TextField
                        margin="dense"
                        name="quantity"
                        label="Số Lượng"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={ quantity||editingProduct?.quantity}
                        onChange={handleChange}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{
                    onClose()
                    setQuantity(0)
                }} color="primary">
                    Hủy
                </Button>
                <Button onClick={handleSubmit} color="primary">
                     Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateQuantityModal;
