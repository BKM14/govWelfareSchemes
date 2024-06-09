import { Link } from "react-router-dom"

export function BottomWarning({label1, to, toLabel}) {
    return <div className="mt-6">
        {label1}
        <Link to={to} className="font-semibold underline">{toLabel}</Link>
    </div>
}