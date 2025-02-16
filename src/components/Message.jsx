import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Message = () => {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  // console.log("socketConnection:", socketConnection);

  // emit message event when component mounts to fetch messages with given userId
  useEffect(() => {
    if (socketConnection) {
      // console.log("Socket is connected:", socketConnection.connected);
      socketConnection.emit("message-page", params.userId);
    }
  }, [socketConnection]);
  return (
    <div className="bg-gray-700 h-full"> this is message Message section </div>
  );
};

export default Message;
