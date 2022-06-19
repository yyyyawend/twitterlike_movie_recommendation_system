import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

function Rating(props) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [errors, setErrors] = useState(false);
  const [vote_average, setVote_average] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setRating(null);
    setHover(null);
    setErrors(false);
  };

  const handleRating = async (id) => {
    const rate = {
      user: localStorage.getItem("userid"),
      movie: id,
      rating: rating,
    };

    try {
      const data = await axios.post("http://127.0.0.1:8000/api/rating", rate, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setShowModal(false);
      setRating(null);
      setHover(null);
      setErrors(false);
      setVote_average(data.vote_average);
    } catch (err) {
      console.error(err);
      setRating(null);
      setHover(null);
      setErrors(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="star"
            className="w-4 mr-1 text-yellow-500 hover:text-yellow-700 font-bold"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
            ></path>
          </svg>
          {vote_average ? vote_average : props.vote_average}
        </div>
      </button>

      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-black border-b border-gray-700 p-6 pb-4 ">
                    <div className="flex items-center justify-center">
                      <div className="text-center ml-4">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="mx-auto mb-4 w-14 h-14 text-yellow-500"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-200"
                        >
                          Rating for movie
                        </Dialog.Title>
                        {errors !== false && (
                          <h2>There was an error, please try again!</h2>
                        )}
                        <div className="p-6 text-center">
                          <div className="flex justify-center items-center">
                            {[...Array(10)].map((star, i) => {
                              const starNum = i + 1;
                              const unfillpath =
                                "M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z";
                              const fillpath =
                                "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z";
                              return (
                                <label key={starNum}>
                                  <input
                                    type="radio"
                                    value={starNum}
                                    onClick={() => setRating(starNum)}
                                    className="hidden"
                                  />
                                  <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="star"
                                    className="w-6 text-yellow-500 mr-1"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    onMouseEnter={() => setHover(starNum)}
                                    onMouseLeave={() => setHover(null)}
                                  >
                                    <path
                                      fill="currentColor"
                                      d={
                                        starNum <= (hover || rating)
                                          ? fillpath
                                          : unfillpath
                                      }
                                    ></path>
                                  </svg>
                                </label>
                              );
                            })}
                          </div>
                          <div className="mt-6 space-x-5">
                            <button
                              type="button"
                              className="bg-[#1d9bf0] text-white hover:bg-[#1a8cd8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                              onClick={() => handleRating(props.movieid)}
                            >
                              Rating
                            </button>

                            <button
                              type="button"
                              className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                              onClick={handleClose}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default Rating;
