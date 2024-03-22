import { useState, useEffect } from 'react';
import axios from 'axios';

export function ApproveApplication() {
    const [unApprovedApplications, setUnApprovedApplications] = useState([]);

    useEffect(() => {
        getUnapprovedApplications();
    }, []);

    async function getUnapprovedApplications() {
        try {
            const response = await axios.get('http://localhost:3000/application/unApprovedApplications');
            setUnApprovedApplications(response.data);
        } catch (error) {
            console.error('Error fetching unapproved users:', error);
        }
    }

    async function approveApplication(username, schemeId) {
        try {
            await axios.put('http://localhost:3000/admin/approveApplication', { username, schemeId });
            alert("Application approved succesfully");
            getUnapprovedApplications();
        } catch (error) {
            console.error('Error approving user:', error);
        }
    }

    async function rejectApplication(username, schemeId) {
        try {
            const response = await axios({
                method: 'delete',
                url: 'http://localhost:3000/admin/deleteApplication',
                data: {
                    username: username,
                    schemeId: schemeId
                }
            })
            alert(response.data.message);
            getUnapprovedApplications();
        } catch(e) {
            alert(e);
        }
        
    }

    return (
        <div className='bg-slate-300 py-16 flex flex-col justify-center items-center'>
            <div className='text-4xl font-poppins my-4'>Approve application</div>
            {unApprovedApplications.map((application, index) => (
                <div key={index} className='flex bg-slate-400 border m-1'>
                    <div className=' text-white p-2 border border-black'>
                        <p>Username: {application.username}</p>
                        <p>Scheme Id: {application.schemeId}</p>
                    </div>
                    <button onClick={() => approveApplication(application.username, application.schemeId)} className='hover:bg-slate-900 hover:px-5 rounded-sm p-2 border border-black duration-300 hover:font-bold green hover:text-white'>Approve application</button>
                    <button onClick={() => rejectApplication(application.username, application.schemeId)} className='hover:bg-slate-900 hover:px-5 rounded-sm p-2 border border-black duration-300 hover:font-bold green hover:text-white'>Reject application</button>
                </div>
            ))}
        </div>
    );
}
