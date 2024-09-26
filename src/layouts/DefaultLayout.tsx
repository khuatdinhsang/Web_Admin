import { ReactNode } from 'react';
import Sidebar from '../components/common/Sidebar';
import { Box, Toolbar } from '@mui/material';
import { drawerWidth } from '../utils/constants';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Box sx={{ px: 3 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default DefaultLayout;
