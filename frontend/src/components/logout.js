import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SidebarRow from "./sidebarrow";
import { LogoutIcon } from "@heroicons/react/outline";

const Logout = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        window.location.replace("http://localhost:3000/login");
      });
  };

  return (
    <>
      <SidebarRow Icon={LogoutIcon} title="Logout" onclick={handleShowModal} />

      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setShowModal(false)}
        >
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
                  <div className="bg-black p-6 pb-4 ">
                    <div className="flex items-center justify-center">
                      <div className="text-center ml-4">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-200"
                        >
                          Logout
                        </Dialog.Title>
                        <div class="p-6 text-center">
                          <div className="flex text-gray-300 justify-center items-center">
                            Are you sure you want to logout?
                          </div>
                          <div className="mt-6 space-x-5">
                            <button
                              type="button"
                              className="bg-[#1d9bf0] text-white hover:bg-[#1a8cd8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>

                            <button
                              type="button"
                              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                              onClick={() => setShowModal(false)}
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
};

export default Logout;
