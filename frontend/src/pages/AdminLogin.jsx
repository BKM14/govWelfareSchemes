import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/Button"
import { InputComponent } from "../components/InputComponent"
import axios from 'axios'


export function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    async function handleSubmit() {
        const response = await axios({
            method: 'post',
            url: import.meta.env.VITE_BASE_URL + 'admin/signin',
            data: {
                username: username,
                password: password
            }
        })
        alert(response.data.message);
        if (response.data.message === 'Sign in successful') {
            localStorage.setItem('token', response.data.token);
            navigate("/admindash");
        }        
    }

    return <div>
        <div className="flex justify-center my-32">
        <div className="border-2 rounded-md border-black p-6 flex flex-col items-center">
                <div className="text-black font-poppins font-semibold text-6xl mt-4 text-center">Admin Login</div>
                <div className="font-poppins text-black">
                    <InputComponent label={"Email"} placeholder={"johndoe@gmail.com"} value={username} onChange={handleEmailChange}></InputComponent>
                    <InputComponent label={"Password"} placeholder={"*******"} value={password} onChange={handlePasswordChange}></InputComponent>
                </div>
                <Button label={"Login"} onClick={handleSubmit}></Button>
            </div>
        </div>        
    </div>
}

