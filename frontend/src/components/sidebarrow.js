
function SidebarRow({Icon, title,url }) {
    return (
         <a href={url} className="appearance-none">
        <div href={url} className="flex items-center space-x-2 p-4 text-gray-200 hover:text-gray-800 hover:bg-gray-200 rounded-xl cursor-pointer">
            {Icon && <Icon className="h-8 w-8" />}
            <p className="hidden sm:inline-flex font-medium">
                {title}
            </p>
        </div></a>
    );
}

export default SidebarRow
