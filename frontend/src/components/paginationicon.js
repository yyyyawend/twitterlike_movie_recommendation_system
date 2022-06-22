function PaginationIcon({ id , active, onClick }) {
  return (
     <button
              id={id}
              onClick={onClick}
              className={active?"z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              :"bg-black border-gray-700 text-gray-400 hover:text-gray-700 hover:bg-gray-300 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
            >
              {id}
            </button>
  );
}

export default PaginationIcon;
