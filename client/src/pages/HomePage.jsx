import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { logoutUser } from "../services/api.auth";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useSession();
  const handleLogout = async () => {
    try {
      const { data } = await logoutUser();
      logout(data);
      return navigate("/login");
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };
  return (
    <div className="mx-auto flex justify-center items-center flex-col min-h-screen text-slate-900">
      <div className="bg-slate-200 p-4 rounded-lg flex flex-col w-[320px]">
        <h1>Welcome {user.user.username} </h1>
        <button
          className="bg-red-500 px-2  rounded-sm ml-auto w-fit"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
