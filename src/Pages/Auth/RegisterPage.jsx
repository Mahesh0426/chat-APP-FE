import React, { useState } from "react";
import {
  IoClose,
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoImageOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { uploadFile } from "../../helper/uploadFile";
import LoadingSpinner from "../../helper/LoadingSpinner";
import { toast } from "react-toastify";
import useLoading from "../../hooks/useLoading";
import { createUser } from "../../axios/userAxios";
import useForm from "../../hooks/useForm";

const initialFormState = { name: "", email: "", password: "", profile_pic: "" };

const RegisterPage = () => {
  const navigate = useNavigate();
  //custom hoook
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formData, handleOnChange, setFormData } = useForm(initialFormState);
  // local state
  const [uploadPhoto, setUploadPhoto] = useState(null);

  //function to handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      startLoading();
      const uploadPhoto = await uploadFile(file);
      setUploadPhoto(file);

      setFormData((prev) => ({
        ...prev,
        profile_pic: uploadPhoto?.url,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      stopLoading();
    }
  };

  //function to handle file deletion
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
    setFormData((prev) => ({
      ...prev,
      profile_pic: "",
    }));
  };

  //function to handle form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      startLoading();
      const response = await createUser(formData);
      // console.log("response:", response);

      if (response?.status === "error") {
        return toast.error(response?.message || "cannot create user");
      }

      toast.success(response.message);
      setFormData(initialFormState);
      navigate("/email");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
        <div className="bg-indigo-600 text-white py-4 px-6">
          <h2 className="text-3xl font-bold">Welcome to kuraX APP!</h2>
          <p className="mt-1 text-indigo-200">Create your account</p>
        </div>
        <form onSubmit={handleOnSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            {/* Name input */}
            <div className="relative">
              <IoPersonOutline className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your Full Name"
                autoComplete="username"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleOnChange}
              />
            </div>

            {/* Email input */}
            <div className="relative">
              <IoMailOutline className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
                autoComplete="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleOnChange}
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <IoLockClosedOutline className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleOnChange}
              />
            </div>

            {/* Profile picture upload */}
            <div>
              <label
                htmlFor="profile_pic"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Picture
              </label>
              <div className="relative">
                {isLoading ? (
                  // Show loader while uploading
                  <div className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                    <LoadingSpinner />
                  </div>
                ) : (
                  // Show uploaded image or upload prompt
                  <div className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                    {uploadPhoto ? (
                      <div className="absolute inset-0 w-full h-full">
                        <img
                          src={URL.createObjectURL(uploadPhoto)}
                          alt="Profile preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-100 transition"
                          onClick={handleClearUploadPhoto}
                        >
                          <IoClose className="text-red-500" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <IoImageOutline className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="profile_pic"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload Profile Pic</span>
                            <input
                              id="profile_pic"
                              name="profile_pic"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleFileUpload}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            {isLoading ? <LoadingSpinner /> : "Register"}
          </button>
        </form>

        {/* Footer: link to login */}
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/email"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
