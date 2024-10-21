import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoute = () => {
  const isLogin = true;
  return <div>{isLogin ? <Outlet /> : <Navigate to={"/login"} />}</div>;
};

export default ProtectedUserRoute;
