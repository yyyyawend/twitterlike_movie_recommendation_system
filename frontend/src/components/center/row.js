import Movie from "./movie";
import React, { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

function Row(props) {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-96 space-y-0.5 md:space-y-2">
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />
        <div
          className="flex items-center mt-4 space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
          ref={rowRef}
        >
          {props.movies?.map((movie) => (
            <Movie key={movie.id} result={movie} row={true} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
