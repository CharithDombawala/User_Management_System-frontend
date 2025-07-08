import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import Box from '@mui/material/Box';
import Axios from "axios";


// const users =[
//     {
//         id:1,
//         name: 'namam',
//     },
//     {
//         id:2,
//         name:'kkkk',
//     }
// ];

const Users =  () => {
    const [users, setUsers]=useState([]);
    const [submitted, setSubmitted]=useState(false);
    const [selectedUser, setSelectedUser]=useState({});
    const [isEdit, setIsEdit]=useState(false);

    useEffect(() => {
        getUsers();
    },[]);

    const getUsers= () => {
        Axios.get('http://localhost:8080/api/v1/getusers')
            .then(response =>{
                setUsers(response.data || []);
            })
            .catch(error => {
                console.error("Axios Errror :", error);
            });
    };

    const addUser = (data) => {
        setSubmitted(true);
        
        const payload ={
            id:data.id,
            name:data.name,
        }

        Axios.post('http://localhost:8080/api/v1/adduser', payload)
            .then(() =>{
                getUsers();
                setSubmitted(false);
                isEdit(false);
            })
            .catch(error => {
                console.error("Axios Errror :", error);
            });

    };


    const updateUser =(data) => {
            setSubmitted(true);
        
        const payload ={
            id:data.id,
            name:data.name,
        }

        Axios.put('http://localhost:8080/api/v1/updateuser', payload)
            .then(() =>{
                getUsers();
                setSubmitted(false);
                isEdit(false);
            })
            .catch(error => {
                console.error("Axios Errror :", error);
            });    
    };


    const deleteUser =(data) => {


        Axios.delete(`http://localhost:8080/api/v1/deleteuser/${data.id}`)
            .then(() =>{
                getUsers();
            })
            .catch(error => {
                console.error("Axios Errror :", error);
            });    
    };

    return (
        <Box
            sx={{
                width: 'calc(100% -100px)',
                margin: 'auto',
                marginTop: '100px',
                marginLeft: '100px',
                marginRight: '100px',

            }}
        >
            <UserForm
                addUser={addUser}
                updateUser={updateUser}
                submitted={submitted}
                data={selectedUser}
                isEdit={isEdit}
            />
            <UserTable 
                rows={users}
                selectedUser={data => {
                    setSelectedUser(data);
                    setIsEdit(true);
                }}
                deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
            />
        </Box>
    );
}

export default Users;