import Post from "./post";
import Input from "./input";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getPostList();
  }, []);

  const getPostList = async () => {
    try {
      const  res  = await axios.get("http://127.0.0.1:8000/api/post_list", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const callback = (data) => {
    setResults(data);
  };

  return (
    <div className="flex-grow border-l border-r border-gray-700">
      <Input callback={callback} />
      <div className="pb-72">
        {results.map((post) => (
          <Post key={post.post_id} id={post.post_id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
