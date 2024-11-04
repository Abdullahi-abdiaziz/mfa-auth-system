//App.js
import { useEffect, useState } from "react";
import {
  FaBars,
  FaHome,
  FaInfo,
  FaServicestack,
  FaPhone,
} from "react-icons/fa"; // Import icons from react-icons
import { useSession } from "../contexts/SessionContext";
import { logoutUser } from "../services/api.auth";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  // Initialize the state for the mobile menu
  const { user, logout, isSessionExpired } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSessionExpired()) {
      alert("Session has expired. Please log in again.");
      logout();
    }
  }, [isSessionExpired, logout]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout(user);
      return navigate("/login");
    } catch (error) {
      console.error("Failed to logout user:", error);
    }
  };

  return (
    <header className="text-black border-none">
      <div className="bg-white/90 rounded-md mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Brand</div>
        <nav className="hidden md:flex space-x-10 ml-5 mr-5">
          <a href="/" className="flex items-center font-bold">
            Home
          </a>
          <a href="#" className="flex items-center font-bold">
            About
          </a>
          <a href="#" className="flex items-center font-bold">
            Services
          </a>
          <a href="#" className="flex items-center font-bold gap-2 ">
            Contact
          </a>
        </nav>

        <div className="flex items-center flex-row-reverse md:flex-row gap-3  space-x-5">
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="">
              <FaBars size={24} /> {/* Hamburger icon for mobile */}
            </button>
          </div>
          <button>
            {user ? (
              <UserButton
                showUserDetails={showUserDetails}
                setShowUserDetails={setShowUserDetails}
              />
            ) : (
              <LoginButton />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden  p-4 rounded-md space-y-2 mx-5 bg-slate-600/55">
          <a href="#" className="flex items-center  font-bold">
            <FaHome className="mr-2 mb-2" /> Home
          </a>
          <a href="#" className="flex items-center font-bold">
            <FaInfo className="mr-2 mb-2" /> About
          </a>
          <a href="#" className="flex items-center font-bold">
            <FaServicestack className="mr-2 mb-2" /> Services
          </a>
          <a href="#" className="flex items-center font-bold">
            <FaPhone className="mr-2 mb-2" /> Contact
          </a>
        </nav>
      )}

      {user && showUserDetails && (
        <motion.div
          className="fixed w-[300px] top-16 right-5 rounded-md p-3  bg-gray-200 text-black opacity-75 z-50"
          initial={{ scale: 0, y: -200 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className="p-4 flex flex-col gap-2">
            <div className="flex flex-col  gap-2">
              <div className="font-bold flex items-center gap-2">
                <RxAvatar size={20} />
                {user.user.username}
              </div>
              <div className="text-sm flex items-center gap-2">
                <MdEmail size={20} />
                {user.user.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-600 transition-all duration-300 px-3 py-1 rounded-md"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

// eslint-disable-next-line react/prop-types
const UserButton = ({ showUserDetails, setShowUserDetails }) => {
  return (
    <div className="flex items-center gap-2">
      <RxAvatar
        size={30}
        onClick={() => setShowUserDetails(!showUserDetails)}
      />
    </div>
  );
};

const LoginButton = () => {
  return (
    <div className="flex items-center gap-2">
      <button className="text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-3 py-1 rounded-md">
        <Link to={"/login"}>Login</Link>
      </button>
    </div>
  );
};

export default Header;
