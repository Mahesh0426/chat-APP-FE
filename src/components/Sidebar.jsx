import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-slate-100 w-12 h-full  rounded-tr-lg py-5">
        {" "}
        <NavLink
          className={({ isActive }) =>
            `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
              isActive && "bg-slate-200"
            }`
          }
          title="chat"
        >
          <IoChatbubbleEllipses size={25} />
        </NavLink>
        <div className="w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-slate-200  rounded ">
          <FaUserPlus size={25} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
