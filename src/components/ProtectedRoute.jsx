import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { token, isAuthenticated } = useSelector((state) => state.auth);
    if (!isAuthenticated || !token) {
        return <Navigate to="/" replace />;
    }

    return children;
};



export default ProtectedRoute;
