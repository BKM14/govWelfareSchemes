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
            url: 'https://gov-schemes-awareness.balajikrishnamurthy2004.workers.dev/admin/signin',
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
        <div className="bg-cover h-screen flex justify-center items-center" style={{backgroundImage: `url(https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg)`}}>
            <div className="border rounded-md border-white w-96 h-96 flex flex-col items-center">
                <div className="text-white font-poppins font-semibold text-6xl mt-4">Admin Login</div>
                <div className="font-poppins text-white">
                    <InputComponent label={"Email"} placeholder={"johndoe@gmail.com"} value={username} onChange={handleEmailChange}></InputComponent>
                    <InputComponent label={"Password"} placeholder={"*******"} value={password} onChange={handlePasswordChange}></InputComponent>
                </div>
                <Button label={"Login"} onClick={handleSubmit}></Button>
            </div>
        </div>        
    </div>
}

