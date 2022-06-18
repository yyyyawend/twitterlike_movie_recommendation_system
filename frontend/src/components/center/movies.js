import React, { useEffect, useState, } from "react";
import Movie from './movie';

function Movies() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = () => {
     fetch("http://127.0.0.1:8000/api/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
      setResults(data.results);
      }).catch( e => { console.log(e); });
  }

  return (

    <div className="px-5 my-5 sm:grid md:grid-cols-2 xl:grid-cols-3 flex-wrap justify-center">
      {results.map(result => (
        <Movie  key={result.id} result={result} />
      ))}
    </div>
  );
}

export default Movies;


