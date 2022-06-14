import Rating from './rating';

function Movie( {result} ) {

  return(
     <div className="p-2 group cursor-pointer text-gray-200 transition duration-200 ease-in transform sm:hover:scale-x-105 ">
      <img
        className="w-full  xl:h-80 md:h-3/4 sm:h-3/4"
        src={result.image_url}
        alt=""
      />
      <div className="p-2">
    <p className="flex items_center text-sm">
    <Rating key={result.id} movieid={result.id} vote_average={result.vote_average}/>
    </p>
        <h2 className="mt-1 text-md  transition-all duration-100 ease-in-out group-hover:font-bold">
          {result.title}
        </h2>
        <p className="flex items-center text-sm opacity-0 group-hover:opacity-100">
          {result.releaseDate} •{" "}
        </p>
         <p className="truncate max-w-md text-sm opacity-0 group-hover:opacity-100">{result.overview}</p>
      </div>
    </div>
  )

}

export default Movie;
