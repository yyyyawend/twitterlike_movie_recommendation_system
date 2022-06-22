import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./movie";
import Pagination from "../pagination";

function Movies() {
  const [results, setResults] = useState([]);
  const [current_url, setCurrentUrl] = useState(
    "http://127.0.0.1:8000/api/movies?offset=12"
  );
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);
  const [last_page, setLastPage] = useState(1);
  const offset = 12;

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const res = await axios.get(current_url);
        console.log(res);
        setResults(res.data.results);
        setCount(res.data.count);
        setLastPage(Math.ceil(res.data.count / offset));
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, [current_url]);

  useEffect(() => {
    setCurrentUrl(`http://127.0.0.1:8000/api/movies?offset=12&page=${page}`);
  }, [page]);

  const toPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const toNextPage = () => {
    if (page < last_page) {
      setPage(page + 1);
    }
  };

  const toPage = (num) => {
    setPage(num);
  };

  return (
    <>
      <p className=" text-lg text-gray-200  font-bold mt-6">All movies:</p>
      <div className="px-2 my-5 max-w-[850px] sm:grid md:grid-cols-2 xl:grid-cols-3 flex-wrap justify-center">
        {results.map((result) => (
          <Movie key={result.id} result={result} />
        ))}
      </div>
      <Pagination
        page={page}
        toPage={toPage}
        toPreviousPage={toPreviousPage}
        toNextPage={toNextPage}
        count={count}
        last_page={last_page}
        offset={offset}
      />
    </>
  );
}

export default Movies;
