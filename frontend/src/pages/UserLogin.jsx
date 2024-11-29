import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import {useNavigate} from 'react-router-dom'
import { InputComponent } from "../components/InputComponent"
import axios from 'axios'
import { useState } from "react"

export function UserLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    async function handleSubmit() {
        const response = await axios({
            method: 'post',
            url: import.meta.env.VITE_BASE_URL + 'user/signin',
            data: {
                username: email,
                password: password
            }
        })
        if (response.data.message === 'login successful') {
            localStorage.setItem('token', response.data.token)
            alert(response.data.message);
            navigate("/userdash");
        } else {
            alert(response.data.message);
        }
    }

    return <div>
        <div className="flex justify-center my-32">
            <div className="rounded-md p-6 flex flex-col items-center border-2 border-black ">
                <div className="text-black font-poppins font-semibold text-6xl mt-4">Login</div>
                <div className="font-poppins text-black">
                    <InputComponent label={"Email"} placeholder={"johndoe@gmail.com"} onChange={handleEmailChange}></InputComponent>
                    <InputComponent label={"Password"} placeholder={"*******"} onChange={handlePasswordChange}></InputComponent>
                </div>
                <Button label={"Login"} onClick={handleSubmit}></Button>
                <BottomWarning label1={"Don't have an account? "} to={"/create"} toLabel={"Create one"}></BottomWarning>
            </div>
        </div>        
    </div>
}