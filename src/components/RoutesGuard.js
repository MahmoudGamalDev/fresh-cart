import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from '../UserContext';

export function RoutesGuard({ children }) {
  let { setUser } = useContext(userContext);
  if (!localStorage.getItem("userToken")) {
    setUser(null);
    return <Navigate to={"/"}></Navigate>;
  } else {
    return children;
  }
}
