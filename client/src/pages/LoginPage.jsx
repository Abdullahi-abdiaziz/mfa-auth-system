import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";
import { useSession } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import TextHeader from "../components/TextHeader";
import { IoMdLogIn } from "react-icons/io";

const LoginPage = () => {
  const { login } = useSession();
  const navigate = useNavigate();

  // Handle login success
  const handleLoginSuccess = (user) => {
    login(user);

    if (user.user.isMfaActive) {
      if (user.user.isVerified) {
        return navigate("/");
      } else {
        return navigate("/setup-2fa");
      }
    }
  };
  return (
    <div className="max-w-[350px] sm:max-w-[500px]  min-h-[90vh]   flex items-center justify-end mx-auto">
      <motion.div
        className="flex-1 flex flex-col justify-center items-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <div className="shadow-2xl w-full rounded-md border-2 border-slate-50 bg-gradient-to-b from-blue-300/30 via-white to-gray-100 bg-opacity-70 m-2 py-5">
          <TextHeader
            title={"Login to your Account"}
            subtitle={
              "Welcome back, Please enter your credentials to access your account"
            }
            icon={IoMdLogIn}
            variant={"blue-500"}
          />

          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </motion.div>

      {/* Image Section */}
      {/* \ */}
    </div>
  );
};

export default LoginPage;
