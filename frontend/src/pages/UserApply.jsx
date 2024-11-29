import { useEffect, useState } from "react";
import { InputComponent } from "../components/InputComponent";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { TableForApply } from "../components/TableForApply";


export function UserApply() {
  const [username, setUsername] = useState('');
  const [schemeId, setSchemeId] = useState('');
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const username = localStorage.getItem('token');
    if (!username) {
      alert("Sign in to apply to the schemes");
      navigate("/user");
    }

    async function getSchemes() {
      const response = await axios({
        method: 'get',
        url: import.meta.env.VITE_BASE_URL +  'scheme/schemes'
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
      setLoading(true);
      const response = await axios({
        method: 'post',
        url: import.meta.env.VITE_BASE_URL +  '/user/apply',
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
      alert("Error: " + e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="md:w-2/3 my-4 mx-auto border-2 border-solid border-black p-2 rounded-md">
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
          disabled={loading}
          className=" w-full py-3 bg-indigo-600 rounded-md text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 flex items-center justify-center"
          onClick={handleSubmit}>
          {loading ? (
            <>
              <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 border-t-white border-indigo-500 rounded-full mr-2"></div>
              Loading
            </>
          ) : (
            "Apply now"
          )}
        </button>
        </div>
      </div>
      <div className="mx-auto p-2">
        <TableForApply tableData={schemes}>
        </TableForApply>
      </div>
    </div>
  );
}
