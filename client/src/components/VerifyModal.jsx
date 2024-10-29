import { useState } from "react";
import { verify2Fa } from "../services/api.mfauth";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import TextHeader from "./TextHeader";

// eslint-disable-next-line react/prop-types
const VerifyModal = ({ handleClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const codeSchema = z
    .string()
    .length(6)
    .regex(/^\d{6}$/, {
      message: "Code must be exactly 6 digits",
    });

  const verifyCode = async () => {
    // const validation = codeSchema.safeParse(inputValue);

    // if (!validation.success) {
    //   setError(validation.error.errors[0].message);
    //   return;
    // }

    try {
      const token = inputValue;
      console.log("Token verified:", token);
      const { data } = await verify2Fa(token);
      console.log("Token verified:", data);
      navigate("/");
      handleClose(); // Close the modal on successful verification
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Verification failed");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const validation = codeSchema.safeParse(value);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
    } else {
      setError("");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex justify-center items-center">
      <div className="w-[420px] h-auto mx-2 sm:mx-auto rounded-xl bg-gradient-to-b from-blue-100/90 via-slate-100 to-white  border-2  p-2 sm:p-10 flex justify-center items-center flex-col">
        <div className="text-center mb-4 flex flex-col">
          <TextHeader
            title="Verify Your Token"
            subtitle={
              "Enter the 6-digit verification code sent to authenticator"
            }
            icon={MdVerifiedUser}
            variant={"green-500"}
          />
        </div>
        <input
          className="w-full block rounded-lg bg-slate-50 p-2 border-2 border-gray-200"
          maxLength={6}
          autoComplete="off"
          placeholder="Enter code"
          value={inputValue}
          onChange={handleChange}
        />
        {error && (
          <p className="text-red-700 bg-red-100 p-2 rounded-lg w-full mt-5 text-center ">
            {error}
          </p>
        )}

        <div className="flex justify-between items-center w-full gap-16 pt-10">
          <button
            className="w-full p-2 mt-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="w-full p-2 mt-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
            onClick={verifyCode}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;
