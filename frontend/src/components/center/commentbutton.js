import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, ChatIcon } from "@heroicons/react/outline";
import Moment from "react-moment";
import axios from "axios";

function CommentButton(props) {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [comments_count, setCommentCount] = useState(props.post.comments_count)
  const post = props.post;

  const handleClose = () => {
    setShowModal(false);
    setComment("");
  };

  const sendComment = async () => {
    var data = {
      user: localStorage.getItem("userid"),
      post: post.post_id,
      body: comment,
    };
    try {
     const res =  await axios.post("http://127.0.0.1:8000/api/post_comment", data,
        {headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }}
      );
      setComment("");
      setCommentCount(res.data.comments_count)
      setShowModal(false)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="flex items-center space-x-1 group"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        <div className="inputicon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
          <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
        </div>
        {post.comments_count > 0 && (
          <span className="group-hover:text-[#1d9bf0] text-sm">
            {comments_count}
          </span>
        )}
      </div>

      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-50 inset-0 pt-8"
          onClose={handleClose}
        >
          <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                  <div
                    className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                    onClick={handleClose}
                  >
                    <XIcon className="h-[22px] text-white" />
                  </div>
                </div>
                <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                  <div className="w-full">
                    <div className="text-[#6e767d] flex gap-x-3 relative">
                      <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                      <img
                        src={
                          post.user.avatar
                            ? post.user.avatar
                            : "/assets/default_avatar.jpg"
                        }
                        alt=""
                        className="h-11 w-11 rounded-full"
                      />
                      <div>
                        <div className="inline-block group">
                          <h4 className="font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base">
                            {post?.user.username}
                          </h4>
                          <span className="ml-1.5 text-sm sm:text-[15px]">
                            @{post?.user.username}{" "}
                          </span>
                        </div>{" "}
                        ·{" "}
                        <span className="hover:underline text-sm sm:text-[15px]">
                          <Moment fromNow>{post?.timestamp?.toDate}</Moment>
                        </span>
                        <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                          {post.movie.length > 0 && (
                            <p>
                              {post.movie.map((tag) => (
                                <a
                                  className="underline text-blue-500 hover:text-blue-700"
                                  href={`/movie/${tag.id}`}
                                >
                                  #{tag.title}({tag.year}){" "}
                                </a>
                              ))}
                            </p>
                          )}
                          {post?.text}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 flex space-x-3 w-full">
                      <img
                        src={
                          post.user.avatar
                            ? post.user.avatar
                            : "/assets/default_avatar.jpg"
                        }
                        alt=""
                        className="h-11 w-11 rounded-full"
                      />
                      <div className="flex-grow mt-2">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Tweet your reply"
                          rows="2"
                          className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                        />

                        <button
                          className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                          onClick={sendComment}
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default CommentButton;
