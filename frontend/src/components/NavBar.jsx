import { NavComponent } from "./NavComponent"

export function NavBar({NavData}) {
    return <div className="flex justify-between p-1">
        {NavData.map((item, index) => {
            return <NavComponent label={item.name} to={item.address} key={index}/>
        })}
    </div>
}