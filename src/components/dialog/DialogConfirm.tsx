
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

interface DialogConfirmProps {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title: string;
    content?: string;
    icon?: any;
}

const DialogConfirm = ({
    title,
    content,
    open,
    handleClose,
    handleConfirm,
    icon,
}: DialogConfirmProps) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '16px',
                    width: '100%',
                    maxWidth: '430px',
                    padding: '32px',
                    overflowX: 'hidden',
                },
            }}
        >
            {icon && (
                <img
                    src={icon}
                    alt='confirm'
                    style={{
                        width: '60px',
                        height: '60px',
                        margin: '0 auto',
                    }}
                />
            )}
            <DialogTitle
                id='alert-dialog-title'
                sx={{
                    textAlign: 'center',
                    fontSize: '24px',
                    color: '#252B3D',
                    fontWeight: 700,
                }}
            >
                {title}
            </DialogTitle>
            {content && (
                <DialogContent>
                    <DialogContentText
                        id='alert-dialog-description'
                        sx={{
                            textAlign: 'center',
                            fontSize: '18px',
                            color: '#5F6B81',
                        }}
                    >
                        {content}
                    </DialogContentText>
                </DialogContent>
            )}
            <DialogActions
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                }}
            >
                <Button
                    sx={{
                        color: '#939AAF',
                        backgroundColor: '#E8EAEF',
                        fontSize: '16px',
                        width: '50%',
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: '#E8EAEF',
                            color: '#939AAF',
                        },
                    }}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    sx={{
                        color: '#ffffff',
                        backgroundColor: '#4169F6',
                        fontSize: '16px',
                        width: '50%',
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: '#4169F6',
                            color: '#ffffff',
                        },
                    }}
                    onClick={handleConfirm}
                    autoFocus
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfirm;
