import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

export function AdminDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Log in to see the dashboard")
            navigate("/admin")
        }
    }, [])

    return <div className="flex flex-col items-center md:flex-row md:justify-center">
        <div className="w-4/5 md:w-1/2 bg-slate-200 border-black border-2 py-16 flex justify-center items-center flex-col">
            <p className="text-center text-3xl">Add/Delete a scheme</p>
            <Link to={"/addscheme"} className="w-4/5 md:w-1/2 border-2 border-solid m-3 hover:bg-green-500 duration-200 font-bold border-black text-center p-4 bg-slate-300">Add a scheme</Link>
            <Link to={"/delete"} className="w-4/5 md:w-1/2 border-2 border-solid m-3 hover:bg-green-500 duration-200 font-bold border-black text-center p-4 bg-slate-300">Delete a scheme</Link>
        </div>
        <div className="w-4/5 md:w-1/2 bg-slate-500 border-black border-2 py-16 flex justify-center items-center flex-col mt-4 md:mt-0">
            <p className="text-center text-3xl"> Users</p>
            <Link to={"/approve"} className="w-4/5 md:w-1/2 border-2 border-solid m-3 hover:bg-green-500 duration-200 font-bold border-black text-center p-4 bg-slate-300">Approve users</Link>
            <Link to={"/approveApplication"} className="w-4/5 md:w-1/2 border-2 border-solid m-3 hover:bg-green-500 duration-200 font-bold border-black text-center p-4 bg-slate-300">Approve applications</Link>
        </div>
    </div>
}