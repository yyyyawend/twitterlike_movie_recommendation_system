import {
  ChartBarIcon,
  DotsHorizontalIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import CommentButton from "./commentbutton";
import LikeButton from "./likebutton";

function Post({ id, post }) {
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      <img
        src={post.user.avatar ? post.user.avatar : "/assets/default_avatar.jpg"}
        alt=""
        className="h-11 w-11 rounded-full mr-4"
      />

      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline inline-block">
                {post?.user.username}
              </h4>
              <span className="text-sm sm:text-[15px] ml-1.5">
                @{post?.user.username}
              </span>
            </div>
            ·{" "}
            <span className="text-sm sm:text-[15px]">
              <Moment fromNow>{post?.timestamp?.toDate}</Moment>
            </span>
            <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
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

          <div className="inputicon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        {post?.image && (
          <img
            src={post?.image}
            className="rounded-2xl max-w-[560px] max-h-[380px] object-cover mr-2"
            alt=""
          />
        )}

        <div className="text-[#6e767d] flex justify-between w-10/12">
          <CommentButton key={post.post_id} post={post} />

          <LikeButton
          key={post.post_id}
            id={post.post_id}
            likes_count={post.likes_count}
            liked={post.liked}
          />

          <div className="inputicon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="inputicon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
