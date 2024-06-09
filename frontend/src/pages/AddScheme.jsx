import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { InputComponent } from "../components/InputComponent"
import { Button } from "../components/Button"
import axios from 'axios'

export function AddScheme() {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { 
            alert("Log in to add scheme");
            navigate("/admin")
        }
    }, [])

    const [schemeName, setSchemeName] = useState('')
    const [schemeId, setSchemeId] = useState(0)
    const [minAge, setMinAge] = useState(0);
    const [gender, setGender] = useState('');
    const [areaOfResidence, setAreaOfResidence] = useState('');
    const [annualIncome, setAnnualIncome] = useState(0);
    const navigate = useNavigate();

    const handleSchemeNameChange = (e) => {
        setSchemeName(e.target.value);
    }

    const handleSchemeIdChange = (e) => {
        setSchemeId(e.target.value);
    }

    const handleMinAgeChange = (e) => {
        setMinAge(parseInt(e.target.value))
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }

    const handleAreaOfResidenceChange = (e) => {
        setAreaOfResidence(e.target.value);
    }

    const handleAnnualIncomeChange = (e) => {
        setAnnualIncome(parseInt(e.target.value))
    }

    async function handleSubmit() {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://gov-schemes-awareness.balajikrishnamurthy2004.workers.dev/admin/addScheme',
                headers: {
                    Authorization: localStorage.getItem("token")
                },
                data: {
                    schemeName: schemeName,
                    schemeId: schemeId,
                    minAge: minAge,
                    gender: gender,
                    areaOfResidence: areaOfResidence,
                    annualIncome: annualIncome
                }
            })

            alert(response.data.message);
            navigate("/schemes");

        } catch(e){
            alert(e);
        }
    }

    return <div className="w-1/2 mx-auto bg-slate-300 p-4 rounded-md">
        <div>
            <p className="text-center font-semibold text-3xl">Add a scheme</p>
            <div>
                <InputComponent label={"Scheme Name"} placeholder={"Housing welfare scheme"} value={schemeName} onChange={handleSchemeNameChange}></InputComponent>
                <InputComponent label={"Scheme Id"} placeholder={"25/2024/GOI/2"} value={schemeId} onChange={handleSchemeIdChange}></InputComponent>
                <InputComponent label={"Minimum age"} placeholder={"18"} value={minAge} onChange={handleMinAgeChange}></InputComponent>
                <InputComponent label={"Gender"} placeholder={"Male/Female/Both"} value={gender} onChange={handleGenderChange}></InputComponent>
                <InputComponent label={"Area of Residence"} placeholder={"Bengaluru"} value={areaOfResidence} onChange={handleAreaOfResidenceChange}></InputComponent>
                <InputComponent label={"Annual Income"} placeholder={"200000"} value={annualIncome} onChange={handleAnnualIncomeChange}></InputComponent>
                <Button label={"Add scheme"} onClick={handleSubmit}></Button>
            </div>
        </div>
    </div>
}