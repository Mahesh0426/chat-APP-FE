import React from "react";
import { IoMailOutline } from "react-icons/io5";
import { PiUserCircle } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import useForm from "../../hooks/useForm";
import { loginWithEmail } from "../../axios/userAxios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../helper/LoadingSpinner";

const initialLoginFormData = { email: "" };
const CheckEmailPage = () => {
  const navigate = useNavigate();
  //custom hoook
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formData, handleOnChange, setFormData } =
    useForm(initialLoginFormData);

  //handle email submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      startLoading();
      const response = await loginWithEmail(formData);
      // console.log("response:", response);

      if (response?.status === "error") {
        return toast.error(response?.message || "cannot login user");
      }

      toast.success(response.message);
      setFormData(initialLoginFormData);
      navigate("/password", {
        state: response?.data,
      });
    } catch (error) {
      toast.error(error?.message);
    } finally {
      stopLoading();
    }
  };
  return (
    <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto mt-5">
      <div className="w-fit mx-auto mb-2">
        <PiUserCircle size={80} />
      </div>

      <h2 className="text-2xl font-bold">Welcome to kuraX APP!</h2>

      <form onSubmit={handleOnSubmit} className="grid gap-4 mt-3">
        {/* Email input */}
        <div className="relative">
          <IoMailOutline className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleOnChange}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
        >
          {isLoading ? <LoadingSpinner /> : "Lets Go"}
        </button>
      </form>

      <p className="my-3 text-center">
        New User ?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Signup
        </Link>
      </p>
    </div>
  );
};

export default CheckEmailPage;
