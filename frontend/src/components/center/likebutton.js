import axios from "axios";
import React, { useState } from "react";

import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

function LikeButton(props) {
  const [likes_count, setLikes_count] = useState(props.likes_count);
  const [liked, setLiked] = useState(props.liked);

  const likePost = async () => {
    const data = { user: localStorage.getItem("userid"), post: props.id };

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/post_like",
        data,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setLikes_count(res.data.likes_count);
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="flex items-center space-x-1 group"
      onClick={(e) => {
        e.stopPropagation();
        likePost();
      }}
    >
      <div className="inputicon group-hover:bg-pink-600/10">
        {liked ? (
          <HeartIconFilled className="h-5 text-pink-600" />
        ) : (
          <HeartIcon className="h-5 group-hover:text-pink-600" />
        )}
      </div>
      {likes_count > 0 && (
        <span
          className={`group-hover:text-pink-600 text-sm ${
            liked && "text-pink-600"
          }`}
        >
          {likes_count}
        </span>
      )}
    </div>
  );
}

export default LikeButton;
