import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";

const Message = () => {
  const params = useParams();

  //redux state
  const user = useSelector((state) => state?.user);

  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  //local state
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  useEffect(() => {
    if (socketConnection) {
      const emitMessagePage = () => {
        socketConnection.emit("message-page", params.userId);

        // listen to message-user event
        socketConnection.on("message-user", (data) => {
          console.log("message-user", data);

          setDataUser(data);
        });
      };

      // If already connected, emit immediately.
      if (socketConnection.connected) {
        emitMessagePage();
      } else {
        // Otherwise, wait for the connection event.
        socketConnection.on("connect", emitMessagePage);
      }

      // Cleanup the listener when the component unmounts or dependencies change.
      return () => {
        socketConnection.off("connect", emitMessagePage);
      };
    }
  }, [socketConnection, params?.userId, user]);

  return (
    <div>
      <header className="position-sticky top-0 h-16 bg-white">
        <div className="flex items-center gap-2">
          <div className="mt-2">
            <Avatar
              height={50}
              width={50}
              imageUrl={dataUser.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Message;
