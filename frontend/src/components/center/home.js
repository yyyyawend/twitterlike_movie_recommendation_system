import Post from "./post";
import Input from './input';
import React, { useEffect, useState, } from "react";

function Home( ) {

  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    getPostList();
  }, []);

  const getPostList = () => {
     fetch("http://127.0.0.1:8000/api/post_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
      console.log(data)
      setResults(data.results);
      }).catch( e => { console.log(e); });
  }

  const callback =(data)=>{
    setResults(data)
  }

    return (
       <div className="flex-grow border-l border-r border-gray-700">
        <Input callback={callback} />
          <div className="pb-72">
        {results.map((post) => (
          <Post key={post.post_id} id={post.post_id} post={post}  />
        ))}
      </div>
</div>
    )
}

export default Home
