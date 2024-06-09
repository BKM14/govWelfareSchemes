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
            url: 'https://gov-schemes-awareness.balajikrishnamurthy2004.workers.dev/user/signin',
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
        <div className="bg-cover h-screen flex justify-center items-center" style={{backgroundImage: `url(https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg)`}}>
            <div className="border rounded-md border-white w-96 h-96 flex flex-col items-center">
                <div className="text-white font-poppins font-semibold text-6xl mt-4">Login</div>
                <div className="font-poppins text-black">
                    <InputComponent label={"Email"} placeholder={"johndoe@gmail.com"} onChange={handleEmailChange}></InputComponent>
                    <InputComponent label={"Password"} placeholder={"*******"} onChange={handlePasswordChange}></InputComponent>
                </div>
                <Button label={"Login"} onClick={handleSubmit}></Button>
                <BottomWarning label1={"Don't have an account?"} to={"/create"} toLabel={"Create one"}></BottomWarning>
            </div>
        </div>        
    </div>
}