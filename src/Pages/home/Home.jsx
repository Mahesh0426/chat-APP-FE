import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../axios/userAxios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../../redux/userSlice";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  const { token } = useSelector((state) => state.user);
  // console.log("token", token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // use effect to get user details
  useEffect(() => {
    const fetchtUserDetails = async () => {
      try {
        const response = await getUserDetails();
        console.log("response", response);
      } catch (error) {
        console.log(error);
      }

      // // if user logout then navigate to email page
      // if (data.logout) {
      //   dispatch(logout());
      //   navigate("/email");
      // }
    };
    fetchtUserDetails();
  }, []);

  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      {/* Sidebar */}
      <section className="bg-amber-700 ">
        <Sidebar />
      </section>

      {/* Message component */}
      <section className="">
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
