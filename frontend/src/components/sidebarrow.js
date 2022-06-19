
function SidebarRow({Icon, title, onclick }) {
    return (
        <div className="flex items-center space-x-2 p-4 text-gray-200 hover:text-gray-800 hover:bg-gray-200 rounded-xl cursor-pointer"
         onClick={onclick}
        >
            {Icon && <Icon className="h-8 w-8" />}
            <p className="hidden sm:inline-flex font-medium">
                {title}
            </p>
        </div>
    );
}

export default SidebarRow
