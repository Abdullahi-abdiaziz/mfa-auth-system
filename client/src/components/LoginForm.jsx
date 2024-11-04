import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../types/schema";
import { loginUser } from "../services/api.auth";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

// eslint-disable-next-line react/prop-types
const LoginForm = ({ onSuccess }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (showPassword) {
      const timer = setTimeout(() => {
        setShowPassword(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPassword]);

  const onSubmit = async (userData) => {
    try {
      const { data } = await loginUser(userData);

      if (data) {
        onSuccess(data);
      }

      setErrorMessage(data.message);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 justify-center items-start mx-auto text-black p-10 text-base"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <label>Email</label>
        <input
          type="email"
          placeholder="Your email"
          autoComplete="false"
          id="email"
          {...register("email")}
          className="w-full  block rounded-lg bg-slate-50 p-2 border-2 border-gray-200"
        />

        {errors.email && (
          <p className="text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="relative w-full">
        <label>Password</label>
        <input
          autoComplete="false"
          placeholder="••••••••••"
          type={showPassword ? "text" : "password"}
          id="password"
          {...register("password")}
          className="w-full block rounded-lg bg-slate-50 p-2 border-2 border-gray-200"
        />
        <div
          className="absolute top-9 right-5 cursor-pointer p-1 rounded-md hover:bg-slate-200"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </div>
        {errors.password && (
          <p className="text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {errorMessage && (
        <motion.p
          className="text-red-500 mt-2 bg-red-100 p-2 text-center rounded font-bold mx-auto w-full"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 0.2 }}
        >
          {errorMessage}
        </motion.p>
      )}
      {/* Display Success Message */}

      <button
        type="submit"
        className="w-full p-2 mt-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loading /> : "Login"}
      </button>

      <p className=" text-center text-sm mx-auto">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="ml-1 text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
