import React , { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../../theme";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import useAuthContext from "../../../Hooks/AuthContextHook";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./Orders.css" ;

const Orders = ({orders, setOrders,getOrders}) => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [viewDetails, setViewDetails] = useState("");
  const openViewDetails= (order) => {
    setViewDetails(order);
  };

  useEffect(() => {
    getOrders();
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
  {
    field: "Details",
    headerName: "Details",
    flex: 0.1,
    renderCell: ({ row: { _id, items  } }) => {
      return (
        <Box
          width="50%"
          display="flex"
          justifyContent="center"
          borderRadius="2px"
          margin='auto'
        >
          <Button
            type="submit"
            style={{ backgroundColor: '#837d7d', color: "white" }}
            variant="contained"
            onClick={() => openViewDetails({ _id, items  })}
          >
            View <ReceiptLongIcon sx={{ marginLeft: "8px" }} />
          </Button>
        </Box>
      );
    },
  },

]
  return (
    <Box m="20px">
      <DashboardHeader title="Orders" subtitle="Managing the Orders" />
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
          rows={orders}
          getRowId={(row) => row._id}
          columns={editorColumns}
        />
        {viewDetails ? (
          <Dialog
            open={viewDetails ? true : false}
            sx={{
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "1000px",
              },
              "& .MuiBox-root": {
                flexDirection: "row",
                flexWrap: "wrap",
              },
              "& .MuiBox-root > .MuiBox-root": {
                width: "100%",
                margin: "0.5rem 0",
              },
            }}
            onClose={() => setViewDetails(false)}
          >
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
                    <Box
                      display="flex"
                      flexDirection="column"
                      mb={2}
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 4",
                        },
                      }}
>
                        {viewDetails?.items?.map((item)=>{
                           return   <Box className="containerNames" key={item?._id}>
                                            <Typography><b>Product Name : </b>{item?.productId}</Typography>
                                            <Typography><b>Quantity : </b>{item?.quantity}</Typography>
                              </Box>
                        })}
                      <br />
                      <Box className="newInstructorBtns">
                        <Button
                          onClick={() => {
                            setViewDetails(false);
                          }}
                          sx={{
                            backgroundColor: "rgb(244, 67, 54) !important",
                            color: "white",
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                      <br />
                    </Box>
            </DialogContent>
          </Dialog>
        ) : null}
      </Box>
    </Box>
  );
};

export default Orders;