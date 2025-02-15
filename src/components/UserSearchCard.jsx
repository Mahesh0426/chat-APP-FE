import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserSearchCard = ({ user, onClose }) => {
  return (
    <Link
      to={"/" + user?._id}
      onClick={onClose}
      className="flex items-center gap-4 p-4 transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-primary cursor-pointer mb-2"
    >
      {/* Avatar */}
      <Avatar
        width={50}
        height={50}
        name={user?.name}
        userId={user?._id}
        imageUrl={user?.profile_pic}
      />

      {/* User Details */}
      <div className="flex-1 min-w-0">
        <p className="text-lg font-semibold text-gray-800 truncate">
          {user?.name}
        </p>
        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
      </div>
    </Link>
  );
};

export default UserSearchCard;
