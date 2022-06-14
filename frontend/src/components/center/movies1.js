import requests from "./requests";
import React, { useEffect, useState, } from "react";

function Movies(props) {
  const [results, setResults] = useState([]);

  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=a0722eb6bddce6d360c89a7a5d7fb14f&language=en-US&page=1";

  useEffect(() => {
    getServerSideProps();
  }, []);

  async function getServerSideProps() {
    const request = await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResults(data.results);
      });
  }

  return (
    <div className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 flex-wrap justify-center">
      {results.map(result => (
       <div
      className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-x-105 hover:z-50"
    >
      <img
        layout="responsive"
        src={
          `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
          `${BASE_URL}${result.poster_path}`
        }
        height={1080}
        width={1920}
      />
      <div className="p-2">
    <p className="flex items-center space-x-5 text-sm">
           <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="w-4 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
    </svg>
    {result.vote_average}
    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="w-4 text-blue-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
    </svg>
    </p>
        <h2 className="mt-1 text-md text-grey-800 transition-all duration-100 ease-in-out group-hover:font-bold">
          {result.title || result.original_name}
        </h2>
        <p className="flex items-center text-sm opacity-0 group-hover:opacity-100">
          {result.media_type && `${result.media_type} •`}{" "}
          {result.release_date || result.first_air_date} •{" "}
        </p>
         <p className="truncate max-w-md text-sm opacity-0 group-hover:opacity-100">{result.overview}</p>
      </div>
    </div>
      ))}


    </div>
  );
}

export default Movies;
