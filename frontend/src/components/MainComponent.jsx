/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export function MainComponent({label, address}) {
    return <div className="bg-violet-400 p-5 border rounded-lg m-1 hover:bg-green-800 hover:text-white font-semibold mb-1.5 duration-500">
        <Link to={address}>{label}</Link>
    </div>
}