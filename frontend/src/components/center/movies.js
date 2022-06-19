import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./movie";

function Movies() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/movies");
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-5 my-5 sm:grid md:grid-cols-2 xl:grid-cols-3 flex-wrap justify-center">
      {results.map((result) => (
        <Movie key={result.id} result={result} />
      ))}
    </div>
  );
}

export default Movies;
