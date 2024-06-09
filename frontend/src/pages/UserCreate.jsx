import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { InputComponent } from "../components/InputComponent"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export function UserCreate() {

    const navigate = useNavigate();

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
        }
        
    }
    return <div>
        <div className="bg-cover flex justify-center" style={{backgroundImage: `url(https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg)`}}>
            <div className="border rounded-md border-white w-96 flex flex-col items-center my-2 p-2">
                <div className="text-white font-poppins font-semibold text-6xl my-4">Sign up</div>
                <div className="font-montserrat">
                    <InputComponent label={"Username"} placeholder={"johndoe@gmail.com"} value={username} onChange={handleUsernameChange}></InputComponent>
                    <InputComponent label={"Password"} placeholder={"*******"} value={password} onChange={handlePasswordChange}></InputComponent>
                    <InputComponent label={"Name"} placeholder={"John"} value={name} onChange={handleNameChange}></InputComponent>
                    <InputComponent label={"Birth Day"} placeholder={"14"} value={birthDay} onChange={handleBirthDayChange}></InputComponent>
                    <InputComponent label={"Birth Month"} placeholder={"August"} value={birthMonth} onChange={handleBirthMonthChange}></InputComponent>
                    <InputComponent label={"Birth Year"} placeholder={"2004"} value={birthYear} onChange={handleBirthYearChange}></InputComponent>
                    <InputComponent label={"Area of Residence"} placeholder={"Vijaynagar"} value={areaOfResidence} onChange={handleAreaOfResidenceChange}></InputComponent>
                    <InputComponent label={"Gender"} placeholder={"Male"} value={gender} onChange={handleGenderChange}></InputComponent>
                    <Button label={"Submit"} onClick={handleSubmit}></Button>
                    <BottomWarning label1={"Already have an account?"} to={"/user"} toLabel={"Sign in"}></BottomWarning>
                </div>
            </div>
        </div>       
    </div>
}