import { TableData } from "./TableData"

export function TableForApply({tableData}) {

    return <div className="bg-slate-500 rounded-md">
        <table>
            <tbody>
                <tr className="border">
                    <th className="border">#</th>
                    <th className="border">SchemeId</th>
                    <th className="border">Scheme Name</th>
                </tr>
                {tableData.map((row, index) => {
                    return <tr key={index} className="border">
                        <TableData data={index+1}></TableData>
                        <TableData data={row.schemeId}></TableData>
                        <TableData data={row.schemeName}></TableData>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

