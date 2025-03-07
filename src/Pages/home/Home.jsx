import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../axios/userAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "../../redux/userSlice";
import Sidebar from "../../components/Sidebar";
import Logo from "../../assets/chatLogo.png";
import { io } from "socket.io-client";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.user);
  // console.log(user);

  // use effect to get user details
  useEffect(() => {
    const fetchtUserDetails = async () => {
      try {
        const response = await getUserDetails();
        dispatch(setUser(response.data));
        // console.log("response", response);

        // if user logout then navigate to email page
        if (response.data.logout) {
          console.log("user logout", response.data.logout);
          dispatch(logout());
          navigate("/email");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchtUserDetails();
  }, []);

  //socket connection
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_APP_API_BASE_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketConnection.on("onlineUser", (data) => {
      // console.log("Received message:", data);
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const basePath = location.pathname === "/";
  return (
    <div className="grid sm:grid-cols-[300px_1fr] h-screen max-h-screen">
      {/* Sidebar */}
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/* Message component */}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>
      <div
        className={`justify-center items-center flex-col gap-2 hidden  ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div className=" flex items-center ">
          <img src={Logo} width={200} alt="logo" />
          <p className="ml-3 text-amber-400  text-4xl font-bold">kuraX App</p>
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
};

export default Home;
