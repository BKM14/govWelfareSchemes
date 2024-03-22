import {Link} from "react-router-dom"

export function NavComponent({label, to}) {
    // return <Link to={to} className="bg-lime-300 p-1 m-0 border rounded-md px-3">{label}</Link>
    return <Link to={to} className="text-gray-900 font-semibold py-2 px-2 transition duration-500 ease-in-out hover:bg-red-600 hover:text-white hover:rounded-md font-poppins">
        {label}
    </Link>
}