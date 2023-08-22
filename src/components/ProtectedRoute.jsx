import { Navigate } from "react-router-dom";
import useAuthStatus from "./useAuthStatus";

const ProtectedRoute = ({ children }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) return <h1>Loading...</h1>;

  return loggedIn ? children : <Navigate to="/sign-up" />;
};

export default ProtectedRoute;