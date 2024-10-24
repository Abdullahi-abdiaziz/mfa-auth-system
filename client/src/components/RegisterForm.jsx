import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../types/schema";
import { registerUser } from "../services/api.auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "./Loading";

const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      if (response.data.success) {
        reset();
        setSuccessMessage(response.data.message);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-10 text-black">
      <div className="mb-4">
        <label>Email</label>
        <input
          type="email"
          placeholder="Your email"
          autoComplete="false"
          id="email"
          {...register("email")}
          className="w-[300px] md:w-[320px] lg:w-[400px]  block  rounded-lg bg-slate-50 p-2 border-2 border-gray-200"
        />
        {errors.email && (
          <p className="text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label>Username</label>
        <input
          type="username"
          placeholder="Your username"
          autoComplete="false"
          id="username"
          {...register("username")}
          className="w-[300px] md:w-[320px] lg:w-[400px]  block  rounded-lg bg-slate-50 p-2 border-2 border-gray-200"
        />
        {errors.username && (
          <p className="text-red-500 mt-1">{errors.username.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label>Password</label>
        <input
          type="password"
          placeholder="*********"
          autoComplete="false"
          id="password"
          {...register("password")}
          className="w-[300px] md:w-[320px] lg:w-[400px] block  rounded-lg bg-slate-50 p-2 border-2 border-gray-200"
        />
        {errors.password && (
          <p className="text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>
      {/* <div className="mb-4">
            <label>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className="w-[300px] md:w-[320px] lg:w-[400px] block rounded-sm bg-slate-100 p-2 border border-gray-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div> */}

      {errorMessage && (
        <motion.p
          className="text-red-500 mt-2 bg-red-100 p-2 text-center rounded font-bold"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 0.2 }}
        >
          {errorMessage}
        </motion.p>
      )}
      {successMessage && (
        <motion.p
          className="text-green-500 mt-2 p-2 bg-green-100 rounded text-center font-bold"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 0.2 }}
        >
          {successMessage}
        </motion.p>
      )}
      <button
        type="submit"
        className="w-full p-2 rounded-sm bg-blue-500 text-white mt-4 cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loading /> : "Sign Up"}
      </button>
      <p className="mt-3 text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="ml-2 text-blue-500 cursor-pointer hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
