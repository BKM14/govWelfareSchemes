import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { InputComponent } from "../components/InputComponent"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export function UserCreate() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState("");
    const [birthYear, setBirthYear] = useState('');
    const [areaOfResidence, setAreaOfResidence] = useState('');
    const [gender, setGender] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleBirthDayChange = (e) => {
        console.log(typeof birthDay);
        setBirthDay(e.target.value)
    }
    const handleBirthMonthChange = (e) => {
        setBirthMonth(e.target.value)
    }
    const handleBirthYearChange = (e) => {
        setBirthYear(e.target.value)
    }
    const handleAreaOfResidenceChange = (e) => {
        setAreaOfResidence(e.target.value)
    }
    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }
    
    async function handleSubmit() {
        try {
            setLoading(true);
            const response = await axios({
                method: "post",
                url: "https://gov-schemes-awareness.balajikrishnamurthy2004.workers.dev/user/create",
                data: {
                    username: username,
                    password: password,
                    name: name,
                    birthDay: birthDay,
                    birthMonth: birthMonth,
                    birthYear: birthYear,
                    areaOfResidence: areaOfResidence,
                    gender: gender
                }
            })

            alert(response.data.message);
            if (response.data.message === 'Signup successful. You can sign in now') {
                navigate("/user");
            }
        } catch(e) {
            alert(e);
        } finally {
            setLoading(false);
        }
        
    }
    return <div>
        <div className="flex justify-center p-6">
            <div className="border-2 border-solid rounded-md border-black flex flex-col items-center my-2 p-2 w-4/5 md:w-1/2">
                <div className="text-black font-poppins font-semibold text-6xl my-4">Sign up</div>
                <div className="font-montserrat grid grid-cols-1 md:grid-cols-2 gap-x-6 my-4">
                    <InputComponent label={"Username"} placeholder={"johndoe@gmail.com"} value={username} onChange={handleUsernameChange}></InputComponent>
                    <InputComponent type="password" label={"Password"} placeholder={"*******"} value={password} onChange={handlePasswordChange}></InputComponent>
                    <InputComponent label={"Name"} placeholder={"John"} value={name} onChange={handleNameChange}></InputComponent>
                    <InputComponent label={"Birth Day"} placeholder={"14"} value={birthDay} onChange={handleBirthDayChange}></InputComponent>
                    <InputComponent label={"Birth Month"} placeholder={"August"} value={birthMonth} onChange={handleBirthMonthChange}></InputComponent>
                    <InputComponent label={"Birth Year"} placeholder={"2004"} value={birthYear} onChange={handleBirthYearChange}></InputComponent>
                    <InputComponent label={"Area of Residence"} placeholder={"Vijaynagar"} value={areaOfResidence} onChange={handleAreaOfResidenceChange}></InputComponent>
                    <InputComponent label={"Gender"} placeholder={"Male"} value={gender} onChange={handleGenderChange}></InputComponent>
                </div>
                <Button label={"Submit"} onClick={handleSubmit} loading={loading}></Button>
                <BottomWarning label1={"Already have an account? "} to={"/user"} toLabel={"Sign in"}></BottomWarning>
            </div>
        </div>       
    </div>
}