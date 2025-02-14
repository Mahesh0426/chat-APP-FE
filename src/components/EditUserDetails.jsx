import React, { useEffect, useRef } from "react";
import useForm from "../hooks/useForm";
import Avatar from "./Avatar";
import { uploadFile } from "../helper/uploadFile";
import { updateUserDetails } from "../axios/userAxios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import useLoading from "../hooks/useLoading";
import LoadingSpinner from "../helper/LoadingSpinner";

const EditUserDetails = ({ onClose, user }) => {
  const dispatch = useDispatch();

  // Loading states from custom hook
  const { isLoading, startLoading, stopLoading } = useLoading();

  // Form handling from custom hook
  const { formData, handleOnChange, setFormData } = useForm({
    name: user?.user || "",
    profile_pic: user?.profile_pic || "",
  });

  // Reference to hidden file input
  const uploadPhotoRef = useRef(null);

  // Sync form data with latest user props
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user, setFormData]);

  // Trigger hidden file input
  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    uploadPhotoRef.current?.click();
  };

  // Handle file upload
  const handleUploadPhoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      startLoading();
      const uploadPhoto = await uploadFile(file);
      setFormData((prev) => ({
        ...prev,
        profile_pic: uploadPhoto?.url || "",
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload the file.");
    } finally {
      stopLoading();
    }
  };

  // Submit updated user details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateUserDetails(formData);

      if (response?.status === "error") {
        toast.error(response?.message || "Cannot update user details");
        return;
      }

      toast.success(response?.message || "Profile updated successfully!");
      dispatch(setUser(response.data));
      onClose();
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Something went wrong while updating details.");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold text-lg">Profile Details</h2>
        <p className="text-sm text-gray-600">Edit user details</p>

        {/* Form */}
        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <span className="text-sm font-medium text-gray-700">Photo:</span>
            <div className="my-2 flex items-center gap-4">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <Avatar
                  width={40}
                  height={40}
                  imageUrl={formData?.profile_pic}
                  name={formData?.name}
                />
              )}

              <button
                type="button"
                onClick={handleOpenUploadPhoto}
                className="px-3 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded hover:bg-indigo-200 transition-colors"
              >
                Change Photo
              </button>

              <input
                type="file"
                id="profile_pic"
                ref={uploadPhotoRef}
                className="hidden"
                onChange={handleUploadPhoto}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-indigo-500 px-4 py-2 rounded text-indigo-500 hover:bg-indigo-100 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border border-indigo-500 bg-indigo-500 px-4 py-2 rounded text-white hover:bg-indigo-600 transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);
