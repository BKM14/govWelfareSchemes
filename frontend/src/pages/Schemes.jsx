import { useEffect, useState } from "react"
import { Table } from "../components/Table"
import axios from 'axios'

export function Schemes() {
    const [schemes, setSchemes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/schemes/schemes');
                if (searchQuery == '') {
                    setSchemes(response.data);
                } else {
                    let results = [];
                    response.data.map((scheme) => {
                        if (scheme.schemeName.toLowerCase().includes(searchQuery.toLowerCase())) {
                            results.push(scheme);
                        }
                    })
                    setSchemes(results)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [searchQuery]);
    

    return <div>
        <div className="flex flex-col pt-5 items-center font-poppins h-screen font-bold text-white bg-slate-100">
            <div>
                <input type="text" placeholder="Search" className="border-2 rounded-md text-black pl-6 m-2 placeholder:text-black hover:p-7 duration-300 hover:border-black hover:text-xl border-green-800" style={{background: 'url(https://www.freeiconspng.com/uploads/search-icon-png-21.png)', backgroundSize: "18px", backgroundRepeat: "no-repeat", backgroundPosition: "left", backgroundPositionX: "1%"}} value={searchQuery} onChange={handleInputChange}/>
            </div>
            <div className="text-3xl m-3 font-montserrat text-black font-medium">List of Available schemes</div>
            <div className="m-3">
                <Table tableData={schemes} />        
            </div>
        </div>
    </div>
}