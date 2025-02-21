import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft, FaImage, FaPlus, FaVideo } from "react-icons/fa";
import { uploadFile } from "../helper/uploadFile";
import useLoading from "../hooks/useLoading";
import { IoClose } from "react-icons/io5";
import LoadingSpinner from "../helper/LoadingSpinner";
import { IoMdSend } from "react-icons/io";
import moment from "moment";

const Message = () => {
  const params = useParams();

  //redux state
  const user = useSelector((state) => state?.user);

  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  //local state and custom hook
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [allMessage, setAllMessage] = useState([]);
  const [isOpenImageVideoUpload, setIsOpenImageVideoUpload] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allMessage]);

  //handle to open image and video  upload
  const handleUploadImageVideoOpen = () => {
    setIsOpenImageVideoUpload((preve) => !preve);
  };

  //hanle to upload image
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    startLoading();
    const uploadPhoto = await uploadFile(file);
    stopLoading();
    setIsOpenImageVideoUpload(false);

    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: uploadPhoto.url,
      };
    });
  };

  //handle to clear upload  photo
  const handleClearUploadImage = () => {
    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: "",
      };
    });
  };

  //handle to upload video
  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];

    startLoading();
    const uploadPhoto = await uploadFile(file);
    stopLoading();
    setIsOpenImageVideoUpload(false);

    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: uploadPhoto.url,
      };
    });
  };

  // handle to clear video upload
  const handleClearUploadVideo = () => {
    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: "",
      };
    });
  };

  //handle on clange
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setMessage((preve) => {
      return {
        ...preve,
        text: value,
      };
    });
  };

  // handle on send message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id,
        });
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: "",
        });
      }
    }
  };
  // useEffect to get socket connection
  useEffect(() => {
    if (socketConnection) {
      const emitMessagePage = () => {
        socketConnection.emit("message-page", params.userId);

        // listen to seen event
        socketConnection.emit("seen", params.userId);

        // listen to message-user event
        socketConnection.on("message-user", (data) => {
          // console.log("message-user", data);

          setDataUser(data);
        });

        // listen to message
        socketConnection.on("message", (data) => {
          // console.log("data", data);

          setAllMessage(data);
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
      {/* header */}
      <header className="position-sticky top-0 h-16 bg-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to={"/"} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div className="mt-2 ml-2">
            <Avatar
              height={50}
              width={50}
              imageUrl={dataUser.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div className="ml-2">
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {dataUser?.name}
            </h3>
            <p className="-my-2 text-sm">
              {dataUser.online ? (
                <span className="text-gray-600">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>

        <div>
          <button className="relative group cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-all">
            <HiDotsVertical className="text-2xl" />
          </button>
        </div>
      </header>

      {/* all message section */}
      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">
        {/* All messages section */}
        <div className="flex flex-col gap-2 py-2 mx-2" ref={currentMessage}>
          {allMessage.map((msg, index) => (
            <div
              key={index}
              className={`p-2 mt-2 rounded-lg w-fit max-w-[75%] text-white flex flex-col gap-1 ${
                user._id === msg.msgByUserId
                  ? "ml-auto bg-blue-600 "
                  : "bg-gray-800 "
              }`}
            >
              {/* Image Preview */}
              {msg?.imageUrl && (
                <div className="mt-1 max-w-xs max-h-60 overflow-hidden rounded">
                  <img
                    src={msg.imageUrl}
                    alt="preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Video Preview */}
              {msg?.videoUrl && (
                <div className="mt-1 max-w-xs max-h-60 overflow-hidden rounded">
                  <video
                    src={msg.videoUrl}
                    className="w-full h-full object-contain"
                    controls
                  />
                </div>
              )}
              {/* Message Text & Timestamp in one line */}
              <div className="flex flex-col gap-1">
                <p className="px-2 text-sm flex items-center gap-2">
                  {msg.text}
                  <span className="text-xs opacity-70 self-end mt-0.5 ml-auto">
                    {moment(msg.createdAt).format("hh:mm A")}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/**upload Image display */}
        {message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadImage}
            >
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <img
                src={message.imageUrl}
                alt="uploadImage"
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}

        {/**upload video display */}
        {message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadVideo}
            >
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <video
                src={message.videoUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}

        {isLoading && (
          <div className="w-full h-full flex sticky bottom-0 justify-center items-center">
            <LoadingSpinner />
          </div>
        )}
      </section>

      {/* footer icons and buttons  to send messsage  */}
      <section className="h-16 bg-white flex items-center p-4 ">
        <div>
          <button
            onClick={handleUploadImageVideoOpen}
            className="flex justify-center items-center w-11 h-11 rounded-full relative group cursor-pointer  hover:bg-gray-200 transition-all"
          >
            <FaPlus size={20} />
          </button>

          {/**video and image */}
          {isOpenImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-cyan-400">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-purple-500">
                    <FaVideo size={18} />
                  </div>
                  <p>Video</p>
                </label>

                <input
                  type="file"
                  id="uploadImage"
                  accept="image/*"
                  onChange={handleUploadImage}
                  className="hidden"
                />

                <input
                  type="file"
                  id="uploadVideo"
                  accept="video/*"
                  onChange={handleUploadVideo}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>

        {/**input box */}
        <form className="h-full w-full flex gap-2" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type here message..."
            className="  py-1 px-4 outline-none w-full h-full border rounded-full border-gray-400"
            value={message.text}
            onChange={handleOnChange}
          />
          <button className="flex  justify-center w-11 h-11 rounded-full  cursor-pointer  hover:text-green-600 transition-all">
            <IoMdSend size={29} />
          </button>
        </form>
      </section>
    </div>
  );
};

export default Message;
