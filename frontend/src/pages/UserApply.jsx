import { useEffect, useState } from "react";
import { InputComponent } from "../components/InputComponent";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { TableForApply } from "../components/TableForApply";


export function UserApply() {
  const [username, setUsername] = useState('')
  const [schemeId, setSchemeId] = useState('')
  const [schemes, setSchemes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const username = localStorage.getItem('token');
    if (!username) {
      alert("Sign in to apply to the schemes");
      navigate("/user")
    }

    async function getSchemes() {
      const response = await axios({
        method: 'get',
        url: 'https://gov-schemes-awareness.balajikrishnamurthy2004.workers.dev/scheme/schemes'
      })
      setSchemes(response.data.schemes);
    }
    getSchemes();
  }, [])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleSchemeIdChange = (e) => {
    setSchemeId(e.target.value);
  }

  async function handleSubmit() {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://gov-schemes-awareness.balajikrishnamurthy2004.workers.dev/user/apply',
        data: {
          username: username,
          schemeId: schemeId
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      if (response.data.message === 'Application submitted') {
        alert(response.data.message);
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch(e) {
      alert(e);
    }
  }

  return (
    <div className="flex justify-around">
      <div className="w-1/3 mx-auto border-2 border-black p-2 rounded-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Apply for Welfare Scheme</h2>
          <p className="mt-2 text-sm text-gray-600">Please fill out the form below to apply.</p>
        </div>
        <div>
          <InputComponent label={"Username"} placeholder={"arvind@gmail.com"} onChange={handleUsernameChange}></InputComponent>
          <InputComponent label={"Last Name"} placeholder={"Doe"}></InputComponent>
          <InputComponent label={"Age"} placeholder={"27"}></InputComponent>
          <InputComponent label={"SchemeId"} placeholder={"24/GOI/2024"} onChange={handleSchemeIdChange}></InputComponent>
          <InputComponent label={"City"} placeholder={"Bengaluru"}></InputComponent>
          <InputComponent label={"State"} placeholder={"Karnataka"}></InputComponent>
        </div>
        <div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 rounded-md text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          onClick={handleSubmit}>
          Apply Now
        </button>
        </div>
      </div>
      <div className="mr-36 flex flex-col justify-center align-center">
        <TableForApply tableData={schemes}>
        </TableForApply>
      </div>
    </div>
  );
}
