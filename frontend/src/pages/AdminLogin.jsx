import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/Button"
import { InputComponent } from "../components/InputComponent"
import axios from 'axios'


export function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
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
=======
        try {
            setLoading(true);
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
        } catch(e) {
            alert("Error: " + e);
        } finally {
            setLoading(false);
        }
                
    }

    return <div className="flex justify-center p-6">
        <div className="border-2 border-solid rounded-md border-black p-6 md:w-2/5">
            <div className="text-black font-poppins font-semibold text-6xl mt-4 text-center">Admin Login</div>
            <div className="font-poppins text-black w-full my-3">
                <InputComponent label={"Email"} placeholder={"johndoe@gmail.com"} value={username} onChange={handleEmailChange}></InputComponent>
                <InputComponent type="password" label={"Password"} placeholder={"*******"} value={password} onChange={handlePasswordChange}></InputComponent>
            </div>
            <div className="flex justify-center items-center">
                <Button label={"Login"} onClick={handleSubmit} loading={loading}></Button>
            </div>
        </div>
    </div>
}

