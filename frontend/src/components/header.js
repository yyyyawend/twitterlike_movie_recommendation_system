import { HomeIcon, UserGroupIcon,} from "@heroicons/react/solid";
import {
  FilmIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./headericon";

function Header() {
  return (
    <div className="sticky top-0 z-50 flex items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className="hidden lg:block flex items-center">
        <img className="h-8 w-auto" src="/assets/title.png" alt="Movie" />
      </div>
      {/* center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-3 md:space-x-2">
          <HeaderIcon
            active={window.location.pathname === "/" ? true : false}
            Icon={HomeIcon}
            url="/"
          />
          <HeaderIcon
            active={window.location.pathname === "/movies" ? true : false}
            Icon={FilmIcon}
            url="/movies"
          />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/* Right */}
      <div className="hidden lg:flex items-center">
        {/* Profile Pic*/}
        <div className="sticky top-0 py-1.5 z-50 w-60">
          <div className="bg-[#202327] p-3 rounded-full relative">
            <SearchIcon className="text-gray-500 h-5 z-50" />
            <input
              type="text"
              className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
              placeholder="Search Twitter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
