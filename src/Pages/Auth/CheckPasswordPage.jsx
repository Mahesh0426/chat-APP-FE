import React, { useEffect } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { PiUserCircle } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import useForm from "../../hooks/useForm";
import { loginWithPassword } from "../../axios/userAxios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../helper/LoadingSpinner";
import Avatar from "../../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/userSlice";

const initialPasswordFormData = { password: "" };
const CheckPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?._id;

  //custom hoook
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { formData, handleOnChange, setFormData } = useForm(
    initialPasswordFormData
  );

  //handle password submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      startLoading();
      const response = await loginWithPassword(formData.password, userId);

      if (response?.status === "error") {
        return toast.error(response?.message || "cannot login user");
      }

      //set token in local storage and redux store
      dispatch(setToken(response?.data));
      localStorage.setItem("token", response?.data);

      toast.success(response.message);
      setFormData(initialPasswordFormData);
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "An error occurred");
    } finally {
      stopLoading();
    }
  };

  //redirect to email page if user not provided name and profile picture
  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  return (
    <div className="bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto mt-5">
      <div className="w-fit mx-auto mb-2">
        <Avatar
          width={80}
          height={80}
          name={location?.state?.name}
          imageUrl={location?.state?.profile_pic}
        />
        <h2 className="font-semibold text-lg mt-4">
          {(location?.state?.name || "")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")}
        </h2>
      </div>

      <p className="text-gray-600">Please fill you password.</p>

      <form onSubmit={handleOnSubmit} className="grid gap-4 mt-3">
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

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
        >
          {isLoading ? <LoadingSpinner /> : "login"}
        </button>
      </form>

      <p className="my-3 text-center">
        <Link
          to="/forget-password"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          forget Password ?
        </Link>
      </p>
    </div>
  );
};

export default CheckPasswordPage;
