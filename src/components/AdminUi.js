import React, { useState, useEffect } from 'react'
import '../styles/AdminUi.css'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import EditRoundedIcon from '@mui/icons-material/EditRounded';


import PaginationBar from './PaginationBar'
import SearchBar from './SearchBar';
import { Typography } from '@mui/material';

function AdminUi() {


    // <----- persisting data's on useState hook. ----->  //

    const [searchText, setSearchText] = useState('');

    const [users, setUsers] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState([]);

    const [selectedRows, setSelectedRows] = useState([]);

    const [editMode, setEditMode] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const [selectAll, setSelectAll] = useState(false);

    const itemsPerPage = 10;

    // <------ When Component Mounted this will call the fetchUsersFromApi function. -----> //
    useEffect(() => {
        fetchUsersFromAPI();
    }, []);



    // <------ When Component Mounted this will call and when users and searchText data change will call the filterUsers fn with searchText.  -----> //
    useEffect(() => {
        filterUsers(searchText)
        console.log("after mounter ", currentPage);
    }, [searchText])

    useEffect(() => {
        userChangesHandle();
    }, [users])






    // < ------ handle whenever users data change update filtered data ------ > //
    const userChangesHandle = () => {
        setFilteredUsers(users);
    }



    // <------ filter the user data based on the query which user enters in search input ..   --------> //
    const filterUsers = (query) => {


        const filteredData = users.filter(
            (user) =>
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase()) ||
                user.role.toLowerCase().includes(query.toLowerCase())
        );
        setCurrentPage(1);

        // setFilteredUsers([...filteredData]);
        setFilteredUsers(filteredData);

    };










    /**
    * function to fetch all user data from the backend and display the list of users
    *
    *
    * @returns { Array.<users> }
    *    Latest list of addresses
    *
    * API Endpoint - "GET https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    *
    * Example for successful response from backend:
    * HTTP 200
    * [
    *      {
    *          "_id": "1",
    *          "name": "Aaron Miles",
    *          "email":"aaron@mailinator.com",
    *          "role":"member"
    *      },
    *      {
    *          "_id": "1",
    *          "name": "Aaron Miles",
    *          "email":"aaron@mailinator.com",
    *          "role":"member"
    *      },
    * ]
    * 
    *
    *  <----- This function fetch users data from the api and set the response data to the users state.  ----->  */

    const fetchUsersFromAPI = async () => {
        try {
            const response = await fetch(
                'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
            );

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUsers(data);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };





    // <------ This function handle the user selection. -----> //

    const handleSelectRow = (userId) => {
        const isSelected = selectedRows.includes(userId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter((id) => id !== userId));
        } else {
            setSelectedRows([...selectedRows, userId]);
        }
    };



    // <---- This function handle the deletion of single user data when clicks the delete button. -----> //
    const handleDelete = (id) => {
        const updateUsers = users.filter((user) => user.id !== id);

        const updatedFilteredUsers = filteredUsers.filter((user) => user.id !== id);

        setUsers(updateUsers);
        setFilteredUsers(updatedFilteredUsers);

    }

    //  <------ This function delete all the selected data from the checkbox. -------> //
    const handleDeleteSelected = () => {

        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

        const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));

        // Filter out the selected users from the 'filteredUsers' state
        const updatedFilteredUsers = filteredUsers.filter(
            (user) => !selectedRows.includes(user.id)
        );

        // Clear the selected rows
        setSelectedRows([]);

        setSelectAll(false);


        if (currentPage === totalPages) {
            setCurrentPage(currentPage - 1);
        }


        // Update the 'users' and 'filteredUsers' states with the filtered lists
        setUsers(updatedUsers);
        setFilteredUsers(updatedFilteredUsers);
    };



    // Handle row edit mode toggle
    const toggleEditMode = (userId) => {
        setEditMode(editMode === userId ? null : userId);
    };



    // Handle row data change when in edit mode
    const handleRowDataChange = (event, field, userId) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                return { ...user, [field]: event.target.value };
            }
            return user;
        });
        setUsers(updatedUsers);
    };











    // <------ Handler to toggle "Select All" checkbox state. ------> //
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]); // Deselect all rows
        } else {
            setSelectedRows(
                filteredUsers
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((user) => user.id)
            ); // Select rows on the current page
        }
        setSelectAll(!selectAll); // Toggle the "Select All" state
    };






    return (
        <div className='admin-table'>

            {/* search-section */}
            <div className='search-bar'>
                <SearchBar setSearchText={setSearchText} searchText={searchText} />
            </div>


            {/* table-section */}
            <div className='table-section'>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>
                                <Typography variant='title'>
                                    Name
                                </Typography>
                            </th>
                            <th>
                                <Typography variant='title'>
                                    Email
                                </Typography></th>
                            <th><Typography variant='title'>
                                Role
                            </Typography></th>
                            <th>
                                <Typography variant='title'>
                                    Actions
                                </Typography></th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {/* Render rows */}
                        {filteredUsers
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((user) => (
                                <tr
                                    className="table-row"
                                    key={user.id}
                                    style={{
                                        backgroundColor: selectedRows.includes(user.id)
                                            ? 'gray'
                                            : '',
                                    }}
                                >
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(user.id)}
                                            onChange={() => handleSelectRow(user.id)}
                                        />
                                    </td>
                                    <td>
                                        {editMode === user.id ? (
                                            <input
                                                type="text"
                                                value={user.name}
                                                className='edit-input'
                                                onChange={(e) =>
                                                    handleRowDataChange(e, 'name', user.id)
                                                }
                                            />
                                        ) : (
                                            user.name
                                        )}
                                    </td>
                                    <td>
                                        {editMode === user.id ? (
                                            <input
                                                type="text"
                                                value={user.email}
                                                className='edit-input'
                                                onChange={(e) =>
                                                    handleRowDataChange(e, 'email', user.id)
                                                }
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td>
                                        {editMode === user.id ? (
                                            <input
                                                type="text"
                                                value={user.role}
                                                className='edit-input'
                                                onChange={(e) =>
                                                    handleRowDataChange(e, 'role', user.id)
                                                }
                                            />
                                        ) : (
                                            user.role
                                        )}
                                    </td>
                                    <td>
                                        {editMode === user.id ? (<button type="submit" className='submit-btn' onClick={() => toggleEditMode(user.id)}>submit</button>) : (
                                            <div className='action-section'>
                                                <DeleteOutlineOutlinedIcon
                                                    color='error'
                                                    className="delete-button"
                                                    onClick={() => handleDelete(user.id)}
                                                    sx={
                                                        {
                                                            width: "22px",
                                                            height: "22px"
                                                        }
                                                    }
                                                />

                                                <EditRoundedIcon
                                                    className="delete-button"
                                                    onClick={() => toggleEditMode(user.id)}
                                                    sx={
                                                        {
                                                            width: "22px",
                                                            height: "22px"
                                                        }
                                                    }
                                                />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* pagination-section */}
            <div className='pagination-bar'>
                <PaginationBar handleDeleteSelected={handleDeleteSelected} filteredUsers={filteredUsers} setCurrentPage={setCurrentPage} selectedRows={selectedRows} selectAll={selectAll} currentPage={currentPage} />
            </div>
        </div>
    )
}

export default AdminUi