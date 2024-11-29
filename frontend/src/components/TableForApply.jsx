import { TableData } from "./TableData"

export function TableForApply({tableData}) {

    return <div className="bg-slate-200 rounded-md w-fit">
        <table>
            <caption className="text-3xl">List of available schemes</caption>
            <tbody>
                <tr>
                    <th className="border-2 border-solid border-black">#</th>
                    <th className="border-2 border-solid border-black">SchemeId</th>
                    <th className="border-2 border-solid border-black">Scheme Name</th>
                </tr>
                {tableData.map((row, index) => {
                    return <tr key={index} className="border border-solid">
                        <TableData data={index+1}></TableData>
                        <TableData data={row.schemeId}></TableData>
                        <TableData data={row.schemeName}></TableData>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

