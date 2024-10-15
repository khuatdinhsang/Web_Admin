import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import PaymentsIcon from '@mui/icons-material/Payments';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WarehouseIcon from '@mui/icons-material/Warehouse';
export const drawerWidth = 260;
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const menuItemList = [
    {
        label: 'Trang chủ',
        path: '/',
        icon: HomeIcon,
    },
    {
        label: 'Sản Phẩm',
        path: '/products-management',
        icon: CategoryIcon,
    },
    {
        label: 'Kho Hàng',
        path: '/warehouse-management',
        icon: WarehouseIcon,
    },
    {
        label: 'Thống kê',
        path: '/statistical-management',
        icon: AccountBalanceIcon,
    },
    {
        label: 'Bài Viết',
        path: '/blogs-management',
        icon: BookmarksIcon,
    },
    {
        label: 'Khách hàng',
        path: '/users-management',
        icon: GroupIcon,
    },
    {
        label: 'Đơn hàng',
        path: '/orders-management',
        icon: PaymentsIcon,
    },
    {
        label: 'Thông tin',
        path: '/information',
        icon: AccountCircleIcon
    }

]