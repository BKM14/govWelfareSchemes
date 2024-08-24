import { Link } from "react-router-dom"


export function Button({label, to = null, onClick = null}) {
    return <div className="flex justify-center mt-3">
        <Link to={to} onClick={onClick} className="rounded-2xl px-4 py-2 text-center bg-slate-950 hover:px-6 text-white font-bold duration-500">{label}</Link>
    </div>
}