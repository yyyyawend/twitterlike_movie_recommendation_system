import SidebarRow from './sidebarrow';

import {
    CalendarIcon,
    ClockIcon,
    DesktopComputerIcon,
    UsersIcon
  } from '@heroicons/react/solid';
  import {
      ChevronDownIcon,
      ShoppingBagIcon,
      UserGroupIcon,
      LogoutIcon
  } from '@heroicons/react/outline';

function Sidebar() {
    return (
        <div className="p-2 mt-5 max-w-[500px] xl:min-w-[250px]">
            <SidebarRow Icon={UsersIcon} title="Friends"/>
            <SidebarRow Icon={UserGroupIcon} title="Groups"/>
            <SidebarRow Icon={ShoppingBagIcon} title="Marketplace"/>
            <SidebarRow Icon={DesktopComputerIcon} title="Watch"/>
            <SidebarRow Icon={CalendarIcon} title="Events"/>
            <SidebarRow Icon={ChevronDownIcon} title="See More"/>
            <SidebarRow Icon={LogoutIcon} title="Logout" url="/logout"/>
        </div>
    );
}

export default Sidebar
