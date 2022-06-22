import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import PaginationIcon from "./paginationicon";

export default function Pagination(props) {
  const toPre = (e) => {
    e.preventDefault();
    props.toPreviousPage();
  };

  const toNext = (e) => {
    e.preventDefault();
    props.toNextPage();
  };

  const toPage = (e) => {
    e.preventDefault();
    props.toPage(parseInt(e.target.id));
  };

  return (
    <div className="bg-black px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={toPre}
          className="relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-200 bg-black hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={toNext}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium rounded-md text-gray-200 bg-black hover:bg-gray-300"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300">
            Showing <span className="font-medium">{props.page===1?1:props.offset*(props.page-1)}</span> to{" "}
            <span className="font-medium">{props.page===props.last_page?props.count:props.offset*props.page}</span> of{" "}
            <span className="font-medium">{props.count}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={toPre}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-black text-sm font-medium text-gray-400 hover:text-gray-700 hover:bg-gray-300"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <PaginationIcon
              id={1}
              onClick={toPage}
              active={props.page === 1 ? true : false}
            />
            {[1, 2, 3, props.last_page - 2, props.last_page - 1, props.last_page,].includes(props.page) && (
              <>
                <PaginationIcon
                  id={2}
                  onClick={toPage}
                  active={props.page === 2 ? true : false}
                />
                <PaginationIcon
                  id={3}
                  onClick={toPage}
                  active={props.page === 3 ? true : false}
                />
              </>
            )}

            <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-black text-sm font-medium text-gray-700">
              ...
            </span>

            {[1, 2, 3, props.last_page - 2, props.last_page - 1, props.last_page,].includes(props.page) && (
              <>
                <PaginationIcon
                  id={8}
                  onClick={toPage}
                  active={props.page === 8 ? true : false}
                />
                <PaginationIcon
                  id={9}
                  onClick={toPage}
                  active={props.page === 9 ? true : false}
                />
              </>
            )}
            {props.page > 3 && props.page < props.last_page - 2 && (
              <>
                <PaginationIcon
                  id={props.page - 1}
                  onClick={toPage}
                  active={false}
                />
                <PaginationIcon
                  id={props.page}
                  onClick={toPage}
                  active={true}
                />
                <PaginationIcon
                  id={props.page + 1}
                  onClick={toPage}
                  active={false}
                />

                <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-black text-sm font-medium text-gray-700">
                  ...
                </span>
              </>
            )}
            <PaginationIcon
              id={props.last_page}
              onClick={toPage}
              active={props.page === props.last_page ? true : false}
            />
            <button
              onClick={toNext}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-black text-sm font-medium text-gray-400 hover:bg-gray-300"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
