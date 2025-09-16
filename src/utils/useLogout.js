import { useDispatch } from "react-redux";
import { logout } from "../features/auth/slices/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return handleLogOut;
};

export default useLogout;
