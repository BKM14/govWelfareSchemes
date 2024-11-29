import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function ApproveUser() {
    const [unApprovedUsers, setUnApprovedUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Log in to approve users")
            navigate("/admin")
        }
        getUnapprovedUsers();
    }, []);

    async function getUnapprovedUsers() {
        try {
            const response = (await axios({
                method: 'get',
                url: import.meta.env.VITE_BASE_URL + 'user/unApprovedUsers',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }));
            setUnApprovedUsers(response.data);
        } catch (error) {
            console.error('Error fetching unapproved users:', error);
        }
    }

    async function approveUser(username) {
        try {
            await axios({
                method: 'put',
                url: import.meta.env.VITE_BASE_URL + 'admin/approveAccount',
                data: {username: username},
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
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
