import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const ProtectedUserRoute = () => {
  const { isLogin, loading } = useSession();

  if (loading) {
    return (
      <div className="flex items-center justify-center text-center h-full w-full bg-gray-100">
        <div className="flex items-center justify-center text-sm text-gray-600">
          Loading...
        </div>
      </div>
    );
  }

  return <div>{isLogin ? <Outlet /> : <Navigate to={"/login"} />}</div>;
};

export default ProtectedUserRoute;
