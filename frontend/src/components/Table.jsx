import { TableData } from "./TableData"
import {useNavigate} from 'react-router-dom'


export function Table({tableData}) {

    const navigate = useNavigate()

    function handleClick() {
        navigate("/user");
    }

    return <div>
        <table>
            <tbody className="border border-solid">
                <tr className="border border-solid text-black ">
                    <th className="border-2 border-solid  p-2 border-black">#</th>
                    <th className="border-2 border-solid p-2 border-black">Scheme</th>
                    <th className="border-2 border-solid p-2 border-black">Apply here</th>
                </tr>
                {tableData.map((row, index) => {
                    return <tr key={index} className="border-2 border-solid border-black">
                        <TableData data={index+1}></TableData>
                        <TableData data={row.schemeName}></TableData>
                        <div className="flex justify-center align-center">
                            <button className=" m-1 p-2 px-4 bg-slate-900 hover:bg-green-600 hover:text-white border border-solid rounded-md hover:px-8 hover:py-3 duration-500" onClick={handleClick}>Apply</button>
                        </div>
                        
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

