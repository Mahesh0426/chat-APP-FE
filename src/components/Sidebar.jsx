import React, { useEffect, useState } from "react";
import { SlLogout } from "react-icons/sl";
import { FaUserPlus } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  return (
    <div className="w-full h-full grid grid-cols-[48px_1fr] bg-gray-800">
      {/* sidebar | icons */}
      <div className="bg-gray-900 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-gray-400 flex flex-col justify-between">
        {/* chat icon */}
        <div>
          {/* chat */}
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-900 rounded ${
                isActive && "bg-gray-900"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={25} />
          </NavLink>
          {/* add friend */}
          <div
            title="add friend"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-900 rounded"
          >
            <button onClick={() => setOpenSearchUser(true)}>
              <FaUserPlus size={25} />
            </button>
          </div>
        </div>
        {/* profile button */}
        <div className="flex flex-col items-center">
          <button
            style={{ zIndex: 1000 }}
            className="mx-auto"
            title={user?.name}
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            <Avatar
              width={45}
              height={45}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
          </button>
          {/* logout button */}
          <button
            title="logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-900 rounded"
          >
            <span className="mr-4">
              <SlLogout size={25} />
            </span>
          </button>
        </div>
      </div>

      {/* user Info | Message  */}
      <div className="w-full bg-gray-700 text-white">
        <div className="h-16 flex items-center bg-gray-700 shadow-md">
          <h2 className="text-xl font-bold p-4 w-full border-b border-gray-600">
            Message
          </h2>
        </div>

        <div className="bg-gray-700 h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-gray-300">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-gray-300">
                Click on add user to start a conversation with.
              </p>
            </div>
          )}

          {/* User list */}
          {/* {allUser.map((conv, index) => {
          return (
            <NavLink
              to={"/" + conv?.userDetails?._id}
              key={conv?._id}
              className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-gray-500 rounded hover:bg-gray-600 cursor-pointer"
            >
              <div>
                <Avatar
                  imageUrl={conv?.userDetails?.profile_pic}
                  name={conv?.userDetails?.name}
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h3 className="text-ellipsis line-clamp-1 font-semibold text-base">
                  {conv?.userDetails?.name}
                </h3>
                <div className="text-gray-400 text-xs flex items-center gap-1">
                  <div className="flex items-center gap-1">
                    {conv?.lastMsg?.imageUrl && (
                      <div className="flex items-center gap-1">
                        <span>
                          <FaImage />
                        </span>
                        {!conv?.lastMsg?.text && <span>Image</span>}
                      </div>
                    )}
                    {conv?.lastMsg?.videoUrl && (
                      <div className="flex items-center gap-1">
                        <span>
                          <FaVideo />
                        </span>
                        {!conv?.lastMsg?.text && <span>Video</span>}
                      </div>
                    )}
                  </div>
                  <p className="text-ellipsis line-clamp-1">
                    {conv?.lastMsg?.text}
                  </p>
                </div>
              </div>
              {Boolean(conv?.unseenMsg) && (
                <p className="text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full">
                  {conv?.unseenMsg}
                </p>
              )}
            </NavLink>
          );
        })} */}
        </div>
      </div>

      {/**edit user details*/}
      {isOpenModal && (
        <EditUserDetails onClose={() => setIsOpenModal(false)} user={user} />
      )}

      {/**search user */}
      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
};

export default Sidebar;
