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
import useAuthContext from "../../../Hooks/AuthContextHook";
import axios from "axios";
import { CategorySchema } from "../../../Schemas/CategorySchema";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import React , { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import './Categories.css'

const serverApi = process.env.REACT_APP_DR_BULK_API;

const EditToolbar = ({addNewCategory,addingNew,setAddingNew}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <GridToolbarContainer  
    sx={{
      "& .MuiButton-root" : {
        fontWeight: "bolder",
        marginBottom: "1rem",
        fontSize: "larger"
      }
    }}>
      {!addingNew ? (
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setAddingNew(true);
          }}
        >
          Add Category
        </Button>
      ) : (
        <Formik
          initialValues={{
            nameInEnglish: "",
            nameInArabic: "",
                      }}
          onSubmit={(values, actions) => {
            addNewCategory(values);
            actions.resetForm();
          }}
          validationSchema={CategorySchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} display="flex">
              <Box
                display="flex"
                gap="30px"
                mb={2}
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                alignItems="baseline"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <Box display="flex" flexDirection="column">
                  <TextField
                    fullWidth
                    // variant="filled"
                    type="text"
                    label="Category Name in English"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nameInEnglish}
                    name="nameInEnglish"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  {errors.nameInEnglish && touched.nameInEnglish ? (
                    <span className="input-err-msg">
                      {errors.nameInEnglish}
                    </span>
                  ) : null}
                </Box>
                <Box display="flex" flexDirection="column">
                  <TextField
                    fullWidth
                    // variant="filled"
                    type="text"
                    label="اسم الفئه بالعربى"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nameInArabic}
                    name="nameInArabic"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  {errors.nameInArabic && touched.nameInArabic ? (
                    <span className="input-err-msg">{errors.nameInArabic}</span>
                  ) : null}
                </Box>
                <Button
                  type="submit"
                  className="category-btns add-category"
                  variant="contained"
                >
                  Add
                </Button>
                <Button
                  type="submit"
                  className="category-btns cancel-category"
                  variant="contained"
                  onClick={() => {
                    setAddingNew(false);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </GridToolbarContainer>
  );
};

const Categories = ({categories, getCategories}) => {

  const { state } = useAuthContext()
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { t } = useTranslation();
  // const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState(categories);
  const [editDialog, setEditDialog] = useState("");
  const [deleteRow,setDeleteRow] = useState("")
  const [addingNew, setAddingNew] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});

  const openDeleteAlert = (deleteData)=>{
    setDeleteRow(deleteData)
  }
  const closeDeleteAlert = ()=>{
    setDeleteRow("")
  }
  const openEditDialog = (category)=>{
    setEditDialog(category)
  }
  const closeEditDialog =()=>{
    setEditDialog("")
  }

  const editCategory = (id , newName)=>{
    const newCategoryName = {
      en : newName.nameInEnglish,
      ar : newName.nameInArabic
    }
    const newCategoryData = { name : newCategoryName }

    axios
      .put(`${serverApi}/api/categories/${id}`,  newCategoryData , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("Category Name Updated Successfully ! "));
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

  const deleteCategory = (id)=>{
    axios
      .delete(`${serverApi}/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          toast.success(t("Category Deleted Successfully ! "));
          setDeleteRow("")
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

  useEffect(() => {
    getCategories();
  }, [addingNew,deleteRow,editDialog]);

  const addNewCategory = (categoryNames) => {
    const category = {
        en : categoryNames.nameInEnglish,
        ar : categoryNames.nameInArabic
      }
        const categoryData = { name : category }
    axios
      .post(`${serverApi}/api/categories`, categoryData , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Category Added Successfully ! ");
          setAddingNew(false)
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
  const editorColumns = [{
    field: "name",
    headerName: "Name",
    flex: 0.3,
    renderCell: ({ row: { _id, name } }) => {
      return <Typography key={_id}>{name.en}</Typography>;
    }
  },
  {
    field: "nameInArabic",
    headerName: "اسم الفئه",
    flex: 0.3,
    renderCell: ({ row: { _id, name } }) => {
      return <Typography key={_id}>{name.ar}</Typography>;
    }
  },
  {
    field: "edit",
    headerName: "Edit",
    flex: 0.2,
    renderCell: ({ row: { _id , name} }) => {
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
            onClick={()=>openEditDialog({ _id , name })}
          >
              Edit <EditIcon sx={{ marginLeft: '8px' }}/>
          </Button>
        </Box>
      );
    },
  }]
  const adminFields = {  field: "delete",
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
  }
  const adminColumns = [...editorColumns , adminFields]


  // const columns = [
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     flex: 0.3,
  //     renderCell: ({ row: { _id, name } }) => {
  //       return <Typography key={_id}>{name.en}</Typography>;
  //     }
  //   },
  //   {
  //     field: "nameInArabic",
  //     headerName: "اسم الفئه",
  //     flex: 0.3,
  //     renderCell: ({ row: { _id, name } }) => {
  //       return <Typography key={_id}>{name.ar}</Typography>;
  //     }
  //   },
  //   {
  //     field: "edit",
  //     headerName: "Edit",
  //     flex: 0.2,
  //     renderCell: ({ row: { _id , name} }) => {
  //       return (
  //         <Box
  //           width="50%"
  //           display="flex"
  //           justifyContent="center"
  //           borderRadius="2px"
  //         >
  //           <Button
  //             type="submit"
  //             style={{ backgroundColor: orange[500], color: "white" }}
  //             variant="contained"
  //             onClick={()=>openEditDialog({ _id , name })}
  //           >
  //               Edit <EditIcon sx={{ marginLeft: '8px' }}/>
  //           </Button>
  //         </Box>
  //       );
  //     },
  //   },
  //    {  field: "delete",
  //     headerName: "Delete",
  //     flex: 0.2,
  //     renderCell: ({ row: { _id , name } }) => {
  //       return (
  //         <Box
  //           width="50%"
  //           display="flex"
  //           justifyContent="center"
  //           borderRadius="2px"
  //         >
  //           <Button
  //             type="submit"
  //             style={{ backgroundColor: red[500], color: "white" }}
  //             variant="contained"
  //             onClick={()=>openDeleteAlert({ _id , name })}
  //           >
  //             Delete <DeleteIcon sx={{ marginLeft: '8px' }} />
  //           </Button>
  //         </Box>
  //       );
  //     },
  //     },
  // ];

  return (
    <Box m="20px">
      <DashboardHeader title="Categories" subtitle="Managing the Categories" />
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
          "& .MuiTablePagination-selectLabel":{
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
          // checkboxSelection
          rows={categories}
          getRowId={(row) => row._id}
          columns={state.userRole ==='admins' ? adminColumns : editorColumns }
          slots={state.userRole === 'admins' ? { toolbar: EditToolbar} : null }
          slotProps={{
            toolbar: { addNewCategory, getCategories, addingNew, setAddingNew },
          }}
          // editMode="row"
        />
        { editDialog ?
        <Dialog open={editDialog ? true : false } onClose={closeEditDialog}>
        <DialogTitle>Editing a Category</DialogTitle>
        <DialogContent>
          <DialogContentText className="editCategoryText">
            Enter the new Name for <b>{editDialog.name.en}</b>
          </DialogContentText>
          <Formik
          initialValues={{
            nameInEnglish: editDialog.name.en ,
            nameInArabic: editDialog.name.ar
          }}
          onSubmit={(values, actions) => {
            editCategory(editDialog._id , values)
            getCategories();
            actions.resetForm();
          }}
          validationSchema={CategorySchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} display="flex">
              <Box
                display="flex"
                gap="30px"
                mb={2}
                mt={3}
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                }}
              >
                <TextField
                  fullWidth
                  // variant="filled"
                  type="text"
                  label="Name in English"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nameInEnglish}
                  name="nameInEnglish"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                /> 
                 <TextField
                  fullWidth
                  // variant="filled"
                  type="text"
                  label="اسم الفئه بالعربى"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nameInArabic}
                  name="nameInArabic"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                    <Button type="submit">Confirm</Button>
                    <Button onClick={closeEditDialog}>Cancel</Button>
                </Box>
                </form>
                
            )}</Formik>
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
              <DialogTitle>Delete Category confirmation alert </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete the product ?<br/>
                Title : <b>{deleteRow.name.en}</b> <br />
                Category : <b>{deleteRow.name.ar}</b> 
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDeleteAlert}>No</Button>
                <Button onClick={()=>deleteCategory(deleteRow._id)}>Yes</Button>
              </DialogActions>
            </Dialog>
            : null }
      </Box>
    </Box>
  );
};

export default Categories;
