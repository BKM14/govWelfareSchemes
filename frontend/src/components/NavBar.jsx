import { NavComponent } from "./NavComponent"

export function NavBar({NavData}) {
    return <div className="flex flex-wrap justify-center items-center text-sm md:text-md lg:text-xl text-center border-2 bg-slate-100">
        {NavData.map((item, index) => {
            return <NavComponent label={item.name} to={item.address} key={index}/>
        })}
    </div>
}   