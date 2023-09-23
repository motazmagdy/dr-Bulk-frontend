import React , { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme, TextField , Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { tokens } from "../../../theme";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import axios from "axios";
import './Clients.css'
const serverApi = process.env.REACT_APP_DR_BULK_API;

const SearchToolbar = ({searchLetters,showVerifiedOnly,resetSearchValue}) => {
  
    return (
        <Box className="search-container">
            <TextField
            label="Search for a user email"
            variant="outlined"
            className="searchInput"
            onChange={searchLetters}
            />
            <Button className="search-btns verified-only" onClick={showVerifiedOnly} >Verified Only</Button>
            <Button className="search-btns reset-btn" onClick={resetSearchValue} >Reset</Button>
        </Box>

    );
  };


const Clients = () => {
  const [users, setUsers] = useState([]);
  const [filteredValues , setFilteredValues] = useState(users)
  let searchValue = ""
  const getUsers = () => {
    axios
      .get(`${serverApi}/api/users/all-users`)
      .then((response) => {
        setUsers(response.data.data);
        setFilteredValues(response.data.data)
      })
      .catch((error) => console.log(error));
  };

  const searchLetters = (event) => {
    searchValue = event.target.value
    if (searchValue) {
      const filteredResults = users.filter((user) =>
        user.email.includes(searchValue)
      );
      setFilteredValues(filteredResults)
    } else {
      setFilteredValues(users);
    }
  };

  const showVerifiedOnly = ()=>{
    const verifiedUsers = users.filter((user) =>user.verified);
    setFilteredValues(verifiedUsers)
  }

  const resetSearchValue = ()=>{
    setFilteredValues(users)
  }

  useEffect(() => {
    getUsers();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "email",
      headerName: "Email",
      flex: 0.25,
      renderCell: ({ row: { _id, email } }) => {
        return <Typography key={_id}>{email}</Typography>;
      }
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.2,
      renderCell: ({ row: { _id, name } }) => {
        return <Typography key={_id}>{name}</Typography>;
      }
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.2,
      renderCell: ({ row: { _id , phoneNumber} }) => {
        return <Typography key={_id}>{phoneNumber}</Typography>;
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.1,
      renderCell: ({ row: { _id , gender } }) => {
        return <Typography key={_id}>{gender ==="M" ? "Male" : "Female" }</Typography>;
      },
    },
    {
        field: "verified",
        headerName: "Verified",
        flex: 0.3,
        renderCell: ({ row: { _id, verified } }) => {
          return <Button key={_id}  className={verified ? 'user-status verified' : 'user-status not-verified'}>{verified?"Verified" :"Not Verified"}</Button>
        }
    }
  ];

  return (
    <Box m="20px">
      <DashboardHeader title="Users" subtitle="Managing the Users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },"& .MuiTablePagination-selectLabel":{
            display :"none !important"
          },
          "& .MuiTablePagination-input" :{
            display :"none !important"
          },
          "& .MuiTablePagination-actions" : {
            display :"none !important"
          },
          "& .MuiTablePagination-displayedRows" : {
            margin:"auto 3rem"
          }
        }}
      >
        <DataGrid
          disableRowSelectionOnClick
          // rows={rows.length === 0 ? users : rows}
          rows={filteredValues}
          getRowId={(row) => row._id}
          columns={columns}
          slots={{
            toolbar: SearchToolbar,
          }}
          slotProps={{
            toolbar: { searchLetters , showVerifiedOnly , resetSearchValue},
          }}
        />
      </Box>
    </Box>
  );
};

export default Clients;