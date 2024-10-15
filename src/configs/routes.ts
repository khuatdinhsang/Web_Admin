import DefaultLayout from "../layouts/DefaultLayout";
import BlogManagement from "../pages/BlogManagement";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import OrderManagement from "../pages/OrderManagement";
import ProductManagement from "../pages/ProductManagement";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import StatisticalManagement from "../pages/StatisticalManagement";
import UserManagement from "../pages/UserManagement";
import WarehouseManagement from "../pages/WarehouseManagement";
import routes from "../utils/routes";

const publicRoutes = [
    {
        path: routes.login,
        component: Login,
        layout: null
    },
    {
        path: routes.forgotPassword,
        component: ForgotPassword,
        layout: null
    },
    {
        path: routes.resetPassword,
        component: ResetPassword,
        layout: null
    }

]
const privateRoutes = [
    {
        path: routes.home,
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: routes.information,
        component: Profile,
        layout: DefaultLayout,
    },

    {
        path: routes.userManagement,
        component: UserManagement,
        layout: DefaultLayout,
    },
    {
        path: routes.productsManagement,
        component: ProductManagement,
        layout: DefaultLayout,
    },
    {
        path: routes.warehouseManagement,
        component: WarehouseManagement,
        layout: DefaultLayout,
    },
    {
        path: routes.statisticalManagement,
        component: StatisticalManagement,
        layout: DefaultLayout,
    },
    {
        path: routes.blogsManagement,
        component: BlogManagement,
        layout: DefaultLayout,
    },
    {
        path: routes.ordersManagement,
        component: OrderManagement,
        layout: DefaultLayout,
    },
]
export { privateRoutes, publicRoutes }