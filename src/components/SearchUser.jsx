import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
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

  //ues effect when component mounts
  useEffect(() => {
    handleSearchUser();
  }, [search]);

  console.log("search", search);
  console.log("searchUser", searchUser);

  return (
    <div className="fixed top-0 bottom-0 left-110 right-0">
      <div className="w-full max-w-md ma-auto mt-10">
        {/* input search user */}
        <div className="bg-white rounded h-14 overflow-hidden flex ">
          <input
            type="text"
            placeholder="Search user by name, email...."
            className="w-full outline-none py-1 h-full px-4"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} />
          </div>
        </div>

        {/**display search user */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/**no user found */}
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">no user found!</p>
          )}

          {loading && (
            <p>
              <LoadingSpinner />
            </p>
          )}

          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return (
                <UserSearchCard key={user._id} user={user} onClose={onClose} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
