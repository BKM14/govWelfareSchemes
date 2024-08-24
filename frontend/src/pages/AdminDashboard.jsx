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

    return <div className="flex justify-between">
        <div className="w-1/2 bg-slate-500 border-black border-2 py-16 flex justify-center align-center flex-col">
            <p className="text-center text-3xl">Add/Delete a scheme</p>
            <Link label={"Add a scheme"} to={"/addscheme"}></Link>
            <Link label={"Delete a scheme"} to={"/delete"}></Link>
        </div>
        <div className="w-1/2 bg-slate-500 border-black border-2 py-16 flex justify-center align-center flex-col">
            <p className="text-center text-3xl"> Users</p>
            <Link label={"Approve users"} to={"/approve"}></Link>
            <Link label={"Approve applications"} to={"/approveApplication"}></Link>
        </div>
    </div>
}