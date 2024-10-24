import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <div className=" flex w-screen h-screen">
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
          <LoginForm />
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="hidden md:flex flex-1 max-h-full  items-center justify-center bg-orange-400 rounded-s-2xl m-2 mr-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <img src="./login.png" className="w-1/2 object-cover m-4" alt="Login" />
      </motion.div>
    </div>
  );
};

export default LoginPage;
