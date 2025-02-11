import React, { useState } from "react";
import { IoClose, IoPersonOutline, IoMailOutline, IoLockClosedOutline, IoImageOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [data, setData] = useState({ name: "", email: "", password: "", profile_pic: "" });
  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle form submission
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
            <div className="relative">
              <IoPersonOutline className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                autoComplete="username"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleOnChange}
              />
            </div>
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
            <div>
              <label htmlFor="profile_pic" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <div className="relative">
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
                          <span>Upload profil Pic</span>
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
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
