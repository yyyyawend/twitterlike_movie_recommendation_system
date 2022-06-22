import React, { useEffect, useState } from "react";
import axios from "axios"

function Widgets() {
    const [results, setResults] = useState([]);

    useEffect(() => {
    getTopMovies();
  }, []);

  const getTopMovies = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/top_movies");
      console.log(res)
      setResults(res.data.top_movies);
    } catch (err) {
      console.error(err);
    }
  };

    return (


     <div className="hidden lg:flex flex-col w-64 p-2">
     <div className=" text-gray-500">
       <div className="inline space-y-4">


      <div className="text-[#d9d9d9] bg-[#15181c] space-y-3 rounded-xl pt-4">
        <h4 className="font-bold text-xl px-4">Top Movies</h4>
     {results?.slice(0,4).map((result) => (
     <a href={`/movie/${result.id}`}>
        <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
        <h1 className="max-w-[250px] text-sm">#{result.title}({result.year})</h1>
        </div></a>
         ))}

        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button>
      </div>

      <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
        <a href="#"><h1 className="max-w-[250px] text-sm">#sddfdsf nnbv</h1></a>
        </div>
        <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
        <a href="#"><h1 className="max-w-[250px] text-sm">#sddfdsf nnbv</h1></a>
        </div>
        <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
        <a href="#"><h1 className="max-w-[250px] text-sm">#sddfdsf nnbv</h1></a>
        </div>

        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button>
      </div>
    </div>
            </div>

        </div>


    );
}

export default Widgets
