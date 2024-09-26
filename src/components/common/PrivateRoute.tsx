import { Navigate } from 'react-router-dom';
import { getAccessTokenFromLS } from '../../utils/auth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const accessToken = getAccessTokenFromLS() as string;
    return (accessToken as string) ? <>{children}</> : <Navigate to='/login' />;
};

export default PrivateRoute;
