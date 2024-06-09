import { Link } from "react-router-dom"


export function Button({label, to = null, onClick = null}) {
    return <div className="flex justify-center mt-3">
        <Link to={to} onClick={onClick} className=" rounded-2xl bg-white p-2 w-28 text-center hover:bg-slate-950 hover:text-white hover:w-36 duration-500">{label}</Link>
    </div>
}