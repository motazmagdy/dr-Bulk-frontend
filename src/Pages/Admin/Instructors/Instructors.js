import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { orange, red } from "@mui/material/colors";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid,GridToolbarContainer } from "@mui/x-data-grid";
import { Box, useTheme, TextField , Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import { tokens } from "../../../theme";
import axios from "axios";
import { InstructorSchema } from "../../../Schemas/InstructorSchema";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import React , { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./Instructors.css"

const serverApi = process.env.REACT_APP_DR_BULK_API;

const EditToolbar = ({addNewInstructor,addingNewInstructor,setAddingNewInstructor}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <GridToolbarContainer
      sx={{
        "& .MuiButton-root": {
          fontWeight: "bolder",
          marginBottom: "1rem",
          fontSize: "larger",
        },
      }}
    >
      {!addingNewInstructor ? (
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setAddingNewInstructor(true);
          }}
        >
          Add Instructor
        </Button>
      ) : (
        <>
          <Dialog
            open={addingNewInstructor}
            sx={{
              "& .MuiPaper-root": {
                width: "100%",
              },
              "& .MuiBox-root": {
                flexDirection: "column",
                flexWrap: "wrap",
              },
              "& .MuiBox-root > .MuiBox-root": {
                width: "100%",
                margin: "0.5rem 0",
              },
            }}
            onClose={() => setAddingNewInstructor(false)}
          >
            <DialogTitle>Add New Instructor</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  nameInEnglish: "",
                  nameInArabic: "",
                  bioInEnglish: "",
                  bioInArabic: "",
                  phoneNumber: "",
                }}
                onSubmit={(values, actions) => {
                  addNewInstructor(values);
                  // actions.resetForm();
                  //setAddingNewInstructor(false);
                }}
                validationSchema={InstructorSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form display="flex" onSubmit={handleSubmit}>
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
                        <Box className="instructorNames">
                          <Box className="instructorName">
                            <TextField
                              fullWidth
                              //   variant="filled"
                              type="text"
                              label="Instructor Name in English"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.nameInEnglish}
                              name="nameInEnglish"
                              error={!!touched.name && !!errors.name}
                              sx={{ gridColumn: "span 2" }}
                            />
                            <br />
                            {errors.nameInEnglish && touched.nameInEnglish ? (
                              <span className="input-err-msg">
                                {errors.nameInEnglish}
                              </span>
                            ) : null}
                          </Box>
                          <Box className="instructorName">
                            <TextField
                              fullWidth
                              //   variant="filled"
                              type="text"
                              label="اسم المدرب بالعربى"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.nameInArabic}
                              name="nameInArabic"
                              error={!!touched.name && !!errors.name}
                              sx={{ gridColumn: "span 2" }}
                            />
                            <br />
                            {errors.nameInArabic && touched.nameInArabic ? (
                              <span className="input-err-msg">
                                {errors.nameInArabic}
                              </span>
                            ) : null}
                          </Box>
                        </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          multiline={true}
                          type="text"
                          label="Bio in English"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.bioInEnglish}
                          name="bioInEnglish"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.bioInEnglish && touched.bioInEnglish ? (
                          <span className="input-err-msg">
                            {errors.bioInEnglish}
                          </span>
                        ) : null}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          multiline={true}
                          type="text"
                          label="السيره الذاتيه للمدرب"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.bioInArabic}
                          name="bioInArabic"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.bioInArabic && touched.bioInArabic ? (
                          <span className="input-err-msg">
                            {errors.bioInArabic}
                          </span>
                        ) : null}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          type="number"
                          label="PhoneNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phoneNumber}
                          name="phoneNumber"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <span className="input-err-msg">
                            {errors.phoneNumber}
                          </span>
                        ) : null}
                      </Box>
                      <br />
                      <Box className="newInstructorBtns">
                        <Button
                          onClick={() => {
                            setAddingNewInstructor(false);
                          }}
                          sx={{
                            backgroundColor: "rgb(244, 67, 54) !important",
                            color: "white",
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          onClick={handleSubmit}
                          sx={{
                            backgroundColor: "rgb(0, 137, 46 ) !important",
                            color: "white",
                          }}
                        >
                          Add
                        </Button>
                      </Box>
                      <br />
                    </Box>
                  </form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </>
      )}
    </GridToolbarContainer>
  );
};

const Instructors = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { t } = useTranslation();
  const [categories, setInstructors] = useState([]);
  const [rows, setRows] = useState(categories);
  const [editDialog, setEditDialog] = useState("");
  const [deleteRow,setDeleteRow] = useState("")
  const [addingNewInstructor, setAddingNewInstructor] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});

  const openDeleteAlert = (deleteData)=>{
    setDeleteRow(deleteData)
  }
  const closeDeleteAlert = ()=>{
    setDeleteRow("")
  }
  const openEditDialog = (instructor)=>{
    setEditDialog(instructor)
  }
  const closeEditDialog =()=>{
    setEditDialog("")
  }

  const getInstructors = () => {
    axios
      .get(`${serverApi}/api/instructors`)
      .then((response) => {
        console.log(response.data.data);
        setInstructors(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  const editInstructor = (id , instructoreEditedData)=>{
    const instructorNewData = {
      name: {
        en: instructoreEditedData.nameInEnglish,
        ar: instructoreEditedData.nameInArabic,
      },
      bio: {
        en: instructoreEditedData.bioInEnglish,
        ar: instructoreEditedData.bioInArabic,
      },
      phoneNumber : instructoreEditedData.phoneNumber
    };

    axios
      .put(`${serverApi}/api/instructors/${id}`,  instructorNewData , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Instructor Info Updated Successfully ! ");
          setEditDialog("")
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          toast.error(t(err.response.data.message));
        } else {
          err.response.data.errors.forEach((err) => {
            toast.error(t(err.msg));
          });
        }
      });
  }

  const deleteInstructor = (id)=>{
    axios
      .delete(`${serverApi}/api/instructors/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          toast.success("Instructor Deleted Successfully ! ");
          setDeleteRow("")
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          err.response.data.errors.forEach((err) => {
            toast.error(t(err.msg));
          });
        }
      });
  }

  useEffect(() => {
    getInstructors();
  }, [addingNewInstructor,deleteRow,editDialog]);

  const addNewInstructor = (instructorData) => {
    const instructor = {
      name: {
        en: instructorData.nameInEnglish,
        ar: instructorData.nameInArabic,
      },
      bio: {
        en: instructorData.bioInEnglish,
        ar: instructorData.bioInArabic,
      },
      phoneNumber : instructorData.phoneNumber
    };

    axios
      .post(`${serverApi}/api/instructors`, instructor , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Instructor Added Successfully ! ");
          setAddingNewInstructor(false)
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          err.response.data.errors.forEach((err) => {
            toast.error(err.msg);
          });
        }
      });
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "nameInEnglish",
      headerName: "Name",
      flex: 0.2,
      renderCell: ({ row: { _id, name } }) => {
        return <Typography key={_id}>{name.en}</Typography>;
      },
    },
    {
      field: "nameInArabic",
      headerName: "اسم المدرب",
      flex: 0.2,
      renderCell: ({ row: { _id, name } }) => {
        return <Typography key={_id}>{name.ar}</Typography>;
      },
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: ({ row: { _id , name , bio , phoneNumber} }) => {
        return (
          <Box
            width="50%"
            display="flex"
            justifyContent="center"
            borderRadius="2px"
          >
            <Button
              type="submit"
              style={{ backgroundColor: orange[500], color: "white" }}
              variant="contained"
              onClick={()=>openEditDialog({ _id , name , bio , phoneNumber})}
            >
                Edit <EditIcon sx={{ marginLeft: '8px' }}/>
            </Button>
          </Box>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: ({ row: { _id , name } }) => {
        return (
          <Box
            width="50%"
            display="flex"
            justifyContent="center"
            borderRadius="2px"
          >
            <Button
              type="submit"
              style={{ backgroundColor: red[500], color: "white" }}
              variant="contained"
              onClick={()=>openDeleteAlert({ _id , name })}
            >
              Delete <DeleteIcon sx={{ marginLeft: '8px' }} />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <DashboardHeader title="Instructors" subtitle="Managing the Instructors" />
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
          },
          " & .MuiDataGrid-selectedRowCount & .MuiTablePagination-selectLabel & .MuiTablePagination-actions & .MuiTablePagination-select" :{
            display:"none !important"
          },
          
          " & .MuiDialogContentText-root" : {
            marginBottom:"1 rem !important"
          }
        }
      }
      >
        <DataGrid
          // checkboxSelection
          rows={categories}
          getRowId={(row) => row._id}
          columns={columns}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { addNewInstructor, getInstructors, addingNewInstructor, setAddingNewInstructor },
          }}
          // editMode="row"
        />
        { editDialog ?       
        <Dialog open={editDialog ? true : false } onClose={closeEditDialog}>
        <DialogTitle>Editing Instructor Info</DialogTitle>
        <DialogContent>
          <DialogContentText className="editInstructorText">
            Enter the new Name for <b>{editDialog.name.en}</b>
          </DialogContentText>
          <Formik
                initialValues={{
                  nameInEnglish: editDialog.name.en,
                  nameInArabic: editDialog.name.ar,
                  bioInEnglish: editDialog.bio.en,
                  bioInArabic: editDialog.bio.ar,
                  phoneNumber: editDialog.phoneNumber,
                }}
                onSubmit={(values, actions) => {
                  editInstructor(editDialog._id , values);
                  // actions.resetForm();
                  // setAddingNewInstructor(false);
                }}
                validationSchema={InstructorSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form className="editInstructorForm" onSubmit={handleSubmit}>
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
                        <Box className="instructorNames">
                          <Box className="instructorName">
                            <TextField
                              fullWidth
                              //   variant="filled"
                              type="text"
                              label="Instructor Name in English"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.nameInEnglish}
                              name="nameInEnglish"
                              error={!!touched.name && !!errors.name}
                              sx={{ gridColumn: "span 2" }}
                            />
                            {errors.nameInEnglish && touched.nameInEnglish ? (
                              <span className="input-err-msg">
                                {errors.nameInEnglish}
                              </span>
                            ) : <br />}
                          </Box>
                          <Box className="instructorName">
                            <TextField
                              fullWidth
                              //   variant="filled"
                              type="text"
                              label="اسم المدرب بالعربى"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.nameInArabic}
                              name="nameInArabic"
                              error={!!touched.name && !!errors.name}
                              sx={{ gridColumn: "span 2" }}
                            />
                            {errors.nameInArabic && touched.nameInArabic ? (
                              <span className="input-err-msg">
                                {errors.nameInArabic}
                              </span>
                            ) : <br />}
                          </Box>
                        </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          multiline={true}
                          type="text"
                          label="Bio in English"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.bioInEnglish}
                          name="bioInEnglish"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        {errors.bioInEnglish && touched.bioInEnglish ? (
                          <span className="input-err-msg">
                            {errors.bioInEnglish}
                          </span>
                        ) : <br />}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          multiline={true}
                          type="text"
                          label="السيره الذاتيه للمدرب"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.bioInArabic}
                          name="bioInArabic"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        {errors.bioInArabic && touched.bioInArabic ? (
                          <span className="input-err-msg">
                            {errors.bioInArabic}
                          </span>
                        ) : <br />}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          type="number"
                          label="PhoneNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.phoneNumber}
                          name="phoneNumber"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <span className="input-err-msg">
                            {errors.phoneNumber}
                          </span>
                        ) : <br />}
                      </Box>
                      <br />
                      <Box className="newInstructorBtns">
                        <Button
                          onClick={() => {
                            setEditDialog(false);
                          }}
                          sx={{
                            backgroundColor: "rgb(244, 67, 54) !important",
                            color: "white",
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          onClick={handleSubmit}
                          sx={{
                            backgroundColor: "rgb(0, 137, 46 ) !important",
                            color: "white",
                          }}
                        >
                          Update
                        </Button>
                      </Box>
                      <br />
                    </Box>
                  </form>
                )}
              </Formik>
        </DialogContent>
      </Dialog>
      : null }
        {deleteRow ?
        <Dialog
              open={deleteRow ? true : false}
              keepMounted
              onClose={closeDeleteAlert}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>Delete Instructor confirmation alert </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete the instructor ?<br/>
                Name : <b>{deleteRow.name.en}</b> <br />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDeleteAlert}>No</Button>
                <Button onClick={()=>deleteInstructor(deleteRow._id)}>Yes</Button>
              </DialogActions>
            </Dialog>
            : null }
      </Box>
    </Box>
  );
};

export default Instructors;