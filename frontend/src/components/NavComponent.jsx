import {Link} from "react-router-dom"

export function NavComponent({label, to}) {
    return <Link to={to} className="text-gray-900 border-2 border-solid border-black font-semibold m-1 px-1 md:p-2 transition duration-500 ease-in-out hover:bg-red-600 hover:text-white rounded-md font-poppins">
        {label}
    </Link>
}