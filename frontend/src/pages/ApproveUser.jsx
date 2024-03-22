import { useState, useEffect } from 'react';
import axios from 'axios';

export function ApproveUser() {
    const [unApprovedUsers, setUnApprovedUsers] = useState([]);

    useEffect(() => {
        getUnapprovedUsers();
    }, []);

    async function getUnapprovedUsers() {
        try {
            const response = await axios.get('http://localhost:3000/user/unApprovedUsers');
            setUnApprovedUsers(response.data);
        } catch (error) {
            console.error('Error fetching unapproved users:', error);
        }
    }

    async function approveUser(username) {
        try {
            await axios.put('http://localhost:3000/admin/approveAccount', { username });
            alert("User approved succesfully");
            getUnapprovedUsers();
        } catch (error) {
            console.error('Error approving user:', error);
        }
    }

    return (
        <div className='bg-slate-300 flex flex-col justify-center items-center py-16'>
            <div className='text-4xl font-poppins'>List of accounts</div>
            {unApprovedUsers.map((user, index) => (
                <div key={index} className='flex bg-slate-400 border m-1'>
                    <div className='text-white p-2 w-64 border-black border'>
                        <p>Username: {user.username}</p>
                        <p>Name of User: {user.name}</p>
                    </div>
                    <button onClick={() => approveUser(user.username)} className='hover:bg-slate-900 hover:px-5 rounded-sm p-2 border border-black duration-300 hover:font-bold green hover:text-white'>Approve user</button>
                </div>
            ))}
        </div>
    );
}
