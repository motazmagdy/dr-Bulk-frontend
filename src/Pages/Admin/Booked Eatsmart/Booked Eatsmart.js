import React , { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import useAuthContext from "../../../Hooks/AuthContextHook";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
const serverApi = process.env.REACT_APP_DR_BULK_API;

const BookedEatsmart = ({bookedEatsmart, setBookedEatsmart,getBookedEatsmart}) => {
  const { state } = useAuthContext()

  useEffect(() => {
    getBookedEatsmart();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const editorColumns =[{
    field: "Username",
    headerName: "Username",
    flex: 0.15,
    renderCell: ({ row: { _id, userId } }) => {
      return <Typography key={_id}>{userId?.name}</Typography>;
    }
  },
  {
    field: "Email",
    headerName: "Email",
    flex: 0.25,
    renderCell: ({ row: { _id, userId } }) => {
      return <Typography key={_id}>{userId?.email}</Typography>;
    }
  },
  {
    field: "Phone Number",
    headerName: "Phone Number",
    flex: 0.2,
    renderCell: ({ row: { _id , userId} }) => {
      return <Typography key={_id}>{userId?.phoneNumber}</Typography>;
    },
  },
  // {
  //   field: "Items",
  //   headerName: "Items",
  //   flex: 0.1,
  //   renderCell: ({ row: { _id , items} }) => {
  //     return <Typography key={_id}>{items?.length}</Typography>;
  //   }
  // },
  {
    field: "Bill",
    headerName: "Bill",
    flex: 0.1,
    renderCell: ({ row: { _id , bill} }) => {
      return <Typography key={_id}>{bill}</Typography>;
    },
  },
  {
    field: "Payment Method",
    headerName: "Payment Method",
    flex: 0.1,
    renderCell: ({ row: { _id , paymentMethod} }) => {
      return <Typography key={_id}>{paymentMethod}</Typography>;
    },
  },
  {
    field: "Status",
    headerName: "Status",
    flex: 0.1,
    renderCell: ({ row: { _id , status} }) => {
      return <Typography key={_id}>{status}</Typography>;
    },
  },

]
  return (
    <Box m="20px">
      <DashboardHeader title="Booked Eatsmart" subtitle="Viewing the Booked Eatsmart" />
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
          rows={bookedEatsmart}
          getRowId={(row) => row._id}
          columns={editorColumns}
        />
      </Box>
    </Box>
  );
};

export default BookedEatsmart;