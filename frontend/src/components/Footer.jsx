/* eslint-disable react/prop-types */
import { NavBar } from "./NavBar";

export function Footer({FooterData, visitor_count, imglink, lastUpdated}) {
    return <div className="text-sm">
        <div className="">
            <NavBar NavData={FooterData}></NavBar>
        </div>
        <div className="flex justify-center md:justify-between text-white p-3 bg-black">
            <p className="mt-1 hidden md:block">No. of visitors: <strong>{visitor_count}</strong></p>
            <img src={imglink} alt="nic logo"/>
            <p className="mt-1 hidden md:block">Last updated on: <strong>{lastUpdated}</strong></p>
        </div>
    </div>
}
