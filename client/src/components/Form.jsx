/* eslint-disable react/prop-types */
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the Zod schema for validation
const schema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// Main Form Component
const Form = ({ children, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="flex flex-col gap-4 justify-center items-start mx-auto max-w-md shadow-md rounded border-2 bg-slate-200 text-black p-4 text-base"
      onSubmit={handleSubmit(onSubmit)}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { register, errors })
      )}
    </form>
  );
};

// Form Field Components
const Email = ({ register, errors }) => (
  <div>
    <label>Email</label>
    <input
      {...register("email")}
      className="w-[320px] block rounded-sm bg-slate-100 p-2 border border-gray-400"
    />
    {errors.email && (
      <p className="text-red-500 mt-1">{errors.email.message}</p>
    )}
  </div>
);

const Username = ({ register, errors }) => (
  <div>
    <label>Username</label>
    <input
      {...register("username")}
      className="w-[320px] block rounded-sm bg-slate-100 p-2 border border-gray-400"
    />
    {errors.username && (
      <p className="text-red-500 mt-1">{errors.username.message}</p>
    )}
  </div>
);

const Password = ({ register, errors }) => (
  <div>
    <label>Password</label>
    <input
      type="password"
      {...register("password")}
      className="w-[320px] block rounded-sm bg-slate-100 p-2 border border-gray-400"
    />
    {errors.password && (
      <p className="text-red-500 mt-1">{errors.password.message}</p>
    )}
  </div>
);

const ConfirmPassword = ({ register, errors }) => (
  <div>
    <label>Confirm Password</label>
    <input
      type="password"
      {...register("confirmPassword")}
      className="w-[320px] block rounded-sm bg-slate-100 p-2 border border-gray-400"
    />
    {errors.confirmPassword && (
      <p className="text-red-500 mt-1">{errors.confirmPassword.message}</p>
    )}
  </div>
);

// Attach field components to Form as properties
Form.Email = Email;
Form.Username = Username;
Form.Password = Password;
Form.ConfirmPassword = ConfirmPassword;

export default Form;
