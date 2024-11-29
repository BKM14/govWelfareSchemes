import { useEffect, useState } from "react";
import axios from 'axios'

export function DeleteScheme() {
    const [schemes, setSchemes] = useState([]);

    useEffect(() => {
        const getSchemes = async () => {
            const response = await axios({
                method: "get",
                url: import.meta.env.VITE_BASE_URL + "scheme/schemes",
            });
            setSchemes(response.data.schemes)
        };
        getSchemes()
    }, [])

    const handleDelete = async(schemeId) => {
        try {
            const response = await axios({
                method: 'delete',
                url: import.meta.env.VITE_BASE_URL + 'admin/deleteScheme',
                data: {
                    schemeId: schemeId
                },
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            alert(response.data.message);
        } catch(e) {
            alert(e);
        }
    }

    return <div className="flex flex-col justify-center align-center bg-slate-400 border p-32">
        {
            schemes.map((scheme, index) => {
                return <div className="flex justify-center align-center my-2 p-2" key={index}>
                    <div className="mr-4 text-white p-2 border border-black">
                        <div>Scheme Name: {scheme.schemeName}</div>
                        <div>Scheme Id: {scheme.schemeId}</div>
                    </div>
                    <button onClick={() => handleDelete(scheme.schemeId)} className="hover:bg-slate-900 hover:px-5 rounded-sm p-2 border border-black duration-300 hover:font-bold green hover:text-white">Delete scheme</button>
                </div>
            })
        }
    </div>
}