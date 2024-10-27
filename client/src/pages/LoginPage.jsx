import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";
import { useSession } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useSession();
  const navigate = useNavigate();

  // Handle login success
  const handleLoginSuccess = (user) => {
    login(user);

    if (user.isMfaActive) return navigate("/verify-2fa");

    return navigate("/setup-2fa");
  };
  return (
    <div className=" flex w-screen h-screen overflow-x-hidden">
      <motion.div
        className="flex-1 flex flex-col justify-center items-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <div className="shadow-2xl rounded-md border-2 border-slate-50 bg-white bg-opacity-70 m-2 py-5">
          <h2 className="text-center  mx-auto text-3xl font-extrabold my-6 uppercase text-black">
            Login Account
          </h2>
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </motion.div>

      {/* Image Section */}
      {/* \ */}
    </div>
  );
};

export default LoginPage;
