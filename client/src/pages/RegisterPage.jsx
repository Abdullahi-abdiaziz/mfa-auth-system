import RegisterForm from "../components/RegisterForm";
import { motion } from "framer-motion";
import TextHeader from "../components/TextHeader";
import { GiArchiveRegister } from "react-icons/gi";

const RegisterPage = () => {
  return (
    <div className="max-w-[350px] sm:max-w-[500px] min-h-[90vh]  flex items-center justify-center mx-auto ">
      {/* <motion.div
        className="hidden md:flex flex-1 max-h-full  items-center justify-center bg-orange-500 rounded-e-2xl m-2 ml-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <img src="./login.png" className="w-1/2 object-cover m-4" alt="Login" />
      </motion.div> */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <div className="shadow-2xl w-full rounded-md border-2 border-slate-50 bg-gradient-to-b from-blue-300/30 via-white to-gray-100 bg-opacity-70 m-2 py-5">
          <TextHeader
            title={"Create a New Account"}
            icon={GiArchiveRegister}
            variant={"black"}
          />

          <RegisterForm />
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
