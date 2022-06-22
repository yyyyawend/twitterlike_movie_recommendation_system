import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Rating from "./rating";
import Row from "./row";
import axios from "axios";

function MovieDetail() {
  const [result, setResult] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetail = async () => {
    try {
      const {data} = await axios.get(`http://127.0.0.1:8000/api/movies/${id}`);
      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-wrap  justify-center px-5 max-w-[850px] my-5 text-gray-300">
      <div className="sm:grid md:grid xl:grid-cols-2">
        <img
          src={result.image_url}
          className="rounded-2xl w-3/4"
          alt={result.title}
        />
        <div className="w-11/12 mr-2">
          <p className=" text-lg text-gray-200 font-bold mt-2">
            {result?.title}
          </p>
          <Rating movieid={id} vote_average={result.vote_average} />
          <p className=" text-sm mt-6">{result.overview}</p>
          <p className="mt-5 text-sm">
            <strong>Genres: </strong>
            <span>{result.genres?.map((genre) => genre.name).join(" | ")}</span>
          </p>
          <p className="mt-4 text-sm">
            <strong>Release Date: </strong> <span>{result.releaseDate}</span>
          </p>

          <p className="mt-5 text-sm">
            <strong>Director: </strong>
            {result.directors?.map((director) => director.name)}
          </p>
          <p className="mt-5 text-sm">
            <strong>Stars: </strong>
            {result.stars?.map((star) => star.name).join(" | ")}
          </p>
        </div>
      </div>
      <p className=" text-lg text-gray-200 font-bold mt-6">
        Recommendations for you:
      </p>
      <Row movies={result.recommendations} />
    </div>
  );
}

export default MovieDetail;
