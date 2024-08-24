/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export function MainComponent({label, address}) {
    return <div className="bg-violet-400 p-2 md:p-4 lg:p-5 border rounded-lg m-1 hover:bg-green-800 hover:text-white font-semibold mb-1.5 duration-500 text-md md: text-xl text-center flex justify-center flex-col">
        <Link to={address}>{label}</Link>
    </div>
}