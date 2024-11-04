import { useState } from "react";
import TwoFactorSetup from "../components/TwoFactorSetup";
import { motion } from "framer-motion";
import VerifyModal from "../components/VerifyModal";
import useBackToRoot from "../hooks/useBackToRoot";
import { FaArrowCircleLeft } from "react-icons/fa";

const Setup2FAuth = () => {
  const [showModal, setShowModal] = useState(false);

  const backToLogin = useBackToRoot("/login");

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div className=" flex w-screen min-h-[100vh] overflow-x-hidden">
      {/* <motion.div
        className="hidden md:flex flex-1 max-h-full  items-center justify-center bg-orange-500 rounded-e-2xl m-2 ml-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <img src="./auth2.png" className="w-1/2 object-cover m-4" alt="Login" />
      </motion.div> */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <div className="shadow-2xl rounded-md border-2 border-slate-50 bg-gradient-to-b from-blue-300/30 via-white to-gray-100 bg-opacity-70 m-2 py-5 ">
          <div className=" mx-4 z-100">
            <button onClick={backToLogin}>
              <FaArrowCircleLeft />
            </button>
          </div>
          <TwoFactorSetup setShowModal={setShowModal} />
        </div>
      </motion.div>
      {showModal && <VerifyModal handleClose={handleClose} />}
    </div>
  );
};

export default Setup2FAuth;
