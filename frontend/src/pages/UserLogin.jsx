import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import {useNavigate} from 'react-router-dom'
import { InputComponent } from "../components/InputComponent"
import axios from 'axios'
import { useState } from "react"

export function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    async function handleSubmit() {
        try {
            setLoading(true);
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
        } catch(e) {
            alert("Error: " + e);
        } finally {
            setLoading(false);
        }
        
    }

    return <div>
        <div className="flex justify-center p-6">
            <div className="rounded-md p-6 flex flex-col items-center border-2 border-solid border-black my-2">
                <div className="text-black font-poppins font-semibold text-6xl mt-4">Login</div>
                <div className="font-poppins text-black my-2">
                    <InputComponent label={"Email"} placeholder={"johndoe@gmail.com"} onChange={handleEmailChange}></InputComponent>
                    <InputComponent type="password" label={"Password"} placeholder={"*******"} onChange={handlePasswordChange}></InputComponent>
                </div>
                <Button label={"Login"} onClick={handleSubmit} loading={loading}></Button>
                <BottomWarning label1={"Don't have an account? "} to={"/create"} toLabel={"Create one"}></BottomWarning>
            </div>
        </div>        
    </div>
}