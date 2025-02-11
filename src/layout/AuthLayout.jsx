import React from "react";
import Logo from "../assets/chatLogo.png";

const AuthLayout = ({ children }) => {
  return (
    <>
      <header className=" flex justify-center items-center py-3  shadow-md bg-white">
        <img src={Logo} height={150} width={100} alt="chatLogo" />
        <p className="ml-3 text-amber-400  text-3xl font-bold">kuraX App</p>
      </header>
      {children}
    </>
  );
};

export default AuthLayout;
