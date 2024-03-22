import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { InputComponent } from "../components/InputComponent"

export function Login2() {
    return <div className="bg-cover h-screen flex justify-center items-center" style={{backgroundImage: `url(https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg)`}}>
        <div className="border rounded-md border-white w-96 h-96 flex flex-col items-center">
            <div className="text-white font-poppins font-semibold text-6xl mt-4">Login</div>
            <div className="font-poppins text-white">
                <InputComponent label={"Email"} placeholder={"johndoe@gmail.com"} link={"https://cdn-icons-png.flaticon.com/128/646/646094.png"}></InputComponent>
                <InputComponent label={"Password"} placeholder={"*******"}></InputComponent>
            </div>
            <Button to={"https://www.google.com"} label={"Login"}></Button>
            <BottomWarning label1={"Don't have an account?"} to={"https://www.youtube.com"} toLabel={"Create one"}></BottomWarning>
        </div>
    </div>
}