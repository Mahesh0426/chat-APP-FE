import React, { useEffect, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import LoadingSpinner from "../helper/LoadingSpinner";
import UserSearchCard from "./UserSearchCard";
import { searchUserDetails } from "../axios/userAxios";

const SearchUser = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch user details on search
  const handleSearchUser = async () => {
    try {
      setLoading(true);
      // Make API call to search user details
      const response = await searchUserDetails(search);
      console.log("response", response);

      setLoading(false);
      setSearchUser(response.data);
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };

  //Triggers the handleSearchUser function whenever the search term changes.
  useEffect(() => {
    handleSearchUser();
  }, [search]);

  return (
    <div className="fixed top-7 bottom-0 left-0 right-0 z-10 flex flex-col items-center">
      <div className="w-full max-w-sm relative mx-auto mt-10">
        {/* input search user */}
        <div className="bg-white rounded h-14 overflow-hidden flex relative">
          <input
            type="text"
            placeholder="Search user by name, email..."
            className="w-full outline-none py-1 h-full px-4 pr-14"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {/* Search Icon */}
          <div className="h-14 w-14 flex justify-center items-center absolute right-0 top-0">
            <IoSearchOutline size={25} />
          </div>
        </div>

        {/** display search user */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/** no user found */}
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">No user found!</p>
          )}

          {loading && (
            <div>
              <LoadingSpinner />
            </div>
          )}

          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return (
                <UserSearchCard key={user._id} user={user} onClose={onClose} />
              );
            })}
        </div>

        {/* Close Button (Fixed Properly) */}
        <div
          className="absolute -top-10 right-2 text-2xl p-2 lg:text-4xl hover:text-red-500"
          onClick={onClose}
        >
          <button>
            <IoClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
