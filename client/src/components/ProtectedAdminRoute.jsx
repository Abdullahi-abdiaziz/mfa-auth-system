import { Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";

const ProtectedAdminRoute = () => {
  const isAdmin = true;
  return <div>{isAdmin ? <Outlet /> : <HomePage />}</div>;
};

export default ProtectedAdminRoute;
