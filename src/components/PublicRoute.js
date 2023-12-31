import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({children, ...rest}){
    const {currentUser} = useAuth();

    return !currentUser ? <Outlet /> : <Navigate to="/" />;
}