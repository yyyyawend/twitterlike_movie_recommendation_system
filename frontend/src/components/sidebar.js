import SidebarRow from './sidebarrow';
import Logout from "../components/logout"

import {
    CalendarIcon,
    DesktopComputerIcon,
    UsersIcon
  } from '@heroicons/react/solid';
  import {
      ChevronDownIcon,
      ShoppingBagIcon,
      UserGroupIcon,
  } from '@heroicons/react/outline';

function Sidebar() {
    return (
        <div className="p-2 mt-5 max-w-[500px] xl:min-w-[250px]">
                <div className="flex items-center space-x-2 p-4 text-gray-200 hover:text-gray-800 hover:bg-gray-200 rounded-xl cursor-pointer">

        <img
        src={localStorage.getItem("useravatar") !== "null"? localStorage.getItem("useravatar") : "/assets/default_avatar.jpg"}
          alt=""
          className="h-10 w-10 rounded-full"
        />
         <p className="hidden sm:inline-flex font-medium">
                {localStorage.getItem("username")}
            </p>
        </div>
            <SidebarRow Icon={UserGroupIcon} title="Groups"/>
            <SidebarRow Icon={ShoppingBagIcon} title="Marketplace"/>
            <SidebarRow Icon={DesktopComputerIcon} title="Watch"/>
            <SidebarRow Icon={CalendarIcon} title="Events"/>
            <SidebarRow Icon={ChevronDownIcon} title="See More"/>
            <Logout />
        </div>
    );
}

export default Sidebar
