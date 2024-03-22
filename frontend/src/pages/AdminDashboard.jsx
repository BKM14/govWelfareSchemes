import { Button } from "../components/Button"

export function AdminDashboard() {
    return <div className="flex justify-between">
        <div className="w-1/2 bg-slate-500 border-black border-2 py-16 flex justify-center align-center flex-col">
            <p className="text-center text-3xl">Add/Delete a scheme</p>
            <Button label={"Add a scheme"} to={"/addscheme"}></Button>
            <Button label={"Delete a scheme"} to={"/delete"}></Button>
        </div>
        <div className="w-1/2 bg-slate-500 border-black border-2 py-16 flex justify-center align-center flex-col">
            <p className="text-center text-3xl"> Users</p>
            <Button label={"Approve users"} to={"/approve"}></Button>
            <Button label={"Approve applications"} to={"/approveApplication"}></Button>
        </div>
    </div>
}