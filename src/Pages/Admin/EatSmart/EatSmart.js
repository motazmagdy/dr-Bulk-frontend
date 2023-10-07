import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { orange, red } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import useAuthContext from "../../../Hooks/AuthContextHook";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Box, useTheme, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import { tokens } from "../../../theme";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./EatSmart.css";
import { EatSmartSchema } from "../../../Schemas/EatSmartSchema";

const serverApi = process.env.REACT_APP_DR_BULK_API;

const EditToolbar = ({
  addNewEatSmart,
  addingNewEatSmart,
  setAddingNewEatSmart,
  //   imagesPreview,
  setImagesPreview,
  // eatSmartTypes
}) => {
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
      {!addingNewEatSmart ? (
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setAddingNewEatSmart(true);
          }}
        >
          Add Eat Smart
        </Button>
      ) : (
        <>
          <Dialog
            open={addingNewEatSmart}
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
            onClose={() => setAddingNewEatSmart(false)}
          >
            <DialogTitle>Add New EatSmart</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  titleInEnglish: "",
                  titleInArabic: "",
                  descriptionInEnglish: "",
                  descriptionInArabic: "",
                  duration: "",
                  price: "",
                  points: "",
                  type: "",
                  image: []
                }}
                onSubmit={(values, actions) => {
                  addNewEatSmart(values);
                  //   actions.resetForm();
                  //setAddingNewEatSmart(false);
                }}
                validationSchema={EatSmartSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
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
                      <Box>
                        <TextField
                          fullWidth
                          type="string"
                          label="EatSmart Type"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.type}
                          name="type"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        {/* <InputLabel id="type-select-label">
                          EatSmart Type
                        </InputLabel>
                        <Select
                          onChange={(e) => {
                            const selectedEatSmart = e.target.value;
                            setFieldValue("type", selectedEatSmart);
                          }}
                          value={values.type}
                          name="type"
                          sx={{ width: "100%", marginTop: "1rem !important" }}
                        >
                          {eatSmartTypes.map((type, index) => {
                            return (
                              <MenuItem key={index} value={type}>
                                {type}
                              </MenuItem>
                            );
                          })}
                        </Select> */}
                        {errors.category && touched.category ? (
                          <span className="input-err-msg">
                            {errors.category}
                          </span>
                        ) : null}
                      </Box>
                      <Box className="containerNames">
                        <Box className="childName">
                          <TextField
                            fullWidth
                            //   variant="filled"
                            type="text"
                            label="EatSmart Name in English"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.titleInEnglish}
                            name="titleInEnglish"
                            error={!!touched.name && !!errors.name}
                            sx={{ gridColumn: "span 2" }}
                          />
                          {errors.titleInEnglish && touched.titleInEnglish ? (
                            <span className="input-err-msg">
                              {errors.titleInEnglish}
                            </span>
                          ) : null}
                        </Box>
                        <Box className="childName">
                          <TextField
                            fullWidth
                            //   variant="filled"
                            type="text"
                            label="اسم العضويه بالعربى"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.titleInArabic}
                            name="titleInArabic"
                            error={!!touched.name && !!errors.name}
                            sx={{ gridColumn: "span 2" }}
                          />
                          {errors.titleInArabic && touched.titleInArabic ? (
                            <span className="input-err-msg">
                              {errors.titleInArabic}
                            </span>
                          ) : null}
                        </Box>
                        <Box className="childName">
                          <TextField
                            fullWidth
                            type="string"
                            label="Duration"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.duration}
                            name="duration"
                            error={!!touched.name && !!errors.name}
                            sx={{ gridColumn: "span 2" }}
                          />
                          <br />
                          {errors.duration && touched.duration ? (
                            <span className="input-err-msg">
                              {errors.duration}
                            </span>
                          ) : null}
                        </Box>
                        <Box className="childName">
                          <TextField
                            fullWidth
                            type="number"
                            label="Price"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.price}
                            name="price"
                            error={!!touched.name && !!errors.name}
                            sx={{ gridColumn: "span 2" }}
                          />
                          <br />
                          {errors.price && touched.price ? (
                            <span className="input-err-msg">
                              {errors.price}
                            </span>
                          ) : null}
                        </Box>
                        <Box className="childName">
                          <TextField
                            fullWidth
                            type="number"
                            label="Points"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.points}
                            name="points"
                            error={!!touched.name && !!errors.name}
                            sx={{ gridColumn: "span 2" }}
                          />
                          <br />
                          {errors.points && touched.points ? (
                            <span className="input-err-msg">
                              {errors.points}
                            </span>
                          ) : null}
                        </Box>
                      </Box>

                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          multiline={true}
                          type="text"
                          label="EatSmart Description in English"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.descriptionInEnglish}
                          name="descriptionInEnglish"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.descriptionInEnglish &&
                          touched.descriptionInEnglish ? (
                          <span className="input-err-msg">
                            {errors.descriptionInEnglish}
                          </span>
                        ) : null}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          multiline={true}
                          type="text"
                          label="وصف العضويه بالعربى"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.descriptionInArabic}
                          name="descriptionInArabic"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.descriptionInArabic &&
                          touched.descriptionInArabic ? (
                          <span className="input-err-msg">
                            {errors.descriptionInArabic}
                          </span>
                        ) : null}
                      </Box>

                      {/* <Box
                        sx={{
                          width: "80% !important",
                          margin: "1rem auto !important",
                        }}
                      >
                        <input
                          variant="filled"
                          type="file"
                          accept="image/*"
                          //   multiple
                          label="Images"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setImagesPreview([]);
                            const selectedImages = [...e.target.files];
                            setFieldValue("image", selectedImages);
                            selectedImages.forEach((imageFile) => {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (reader.readyState === 2) {
                                  setImagesPreview((prevImages) => [
                                    ...prevImages,
                                    reader.result,
                                  ]);
                                }
                              };
                              reader.readAsDataURL(imageFile);
                            });
                          }}
                          name="images"
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.image && touched.image ? (
                          <span className="input-err-msg">{errors.image}</span>
                        ) : null}
                      </Box> */}
                      <br />
                      <Box className="newInstructorBtns">
                        <Button
                          onClick={() => {
                            setAddingNewEatSmart(false);
                            setImagesPreview([]);
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
                      {/* <Box className="imgs-preview">
                        {imagesPreview.map((img) => (
                          <img
                            src={img}
                            key={img}
                            alt="Images Preview"
                            className="mt-3 mr-2"
                          />
                        ))}
                      </Box> */}
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

const EatSmarts = ({eatSmart, setEatSmarts , getEatSmarts}) => {
  const { state } = useAuthContext()
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { t } = useTranslation();
  const [rows, setRows] = useState(eatSmart);
  const [editDialog, setEditDialog] = useState("");
  const [deleteRow, setDeleteRow] = useState("");
  const [addingNewEatSmart, setAddingNewEatSmart] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  // const eatSmartTypes = ['Weekly', 'Monthly'];

  const openDeleteAlert = (deleteData) => {
    setDeleteRow(deleteData);
  };
  const closeDeleteAlert = () => {
    setDeleteRow("");
  };
  const openEditDialog = (instructor) => {
    setEditDialog(instructor);
  };
  const closeEditDialog = () => {
    setEditDialog("");
  };

  const editEatSmart = (id, eatsmartEditedData) => {
    const eatsmartNewData = {
      title: {
        en: eatsmartEditedData.titleInEnglish,
        ar: eatsmartEditedData.titleInArabic,
      },
      duration: eatsmartEditedData.duration,
      type: eatsmartEditedData.type,
      price: eatsmartEditedData.price,
      description: {
        en: eatsmartEditedData.descriptionInEnglish,
        ar: eatsmartEditedData.descriptionInArabic,
      },
      points: eatsmartEditedData.points
    };
    axios
      .put(`${serverApi}/api/eat-smart/${id}`, eatsmartNewData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("EatSmart Info Updated Successfully ! ");
          setEditDialog("");
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
  };

  const deleteEatSmart = (id) => {
    axios
      .delete(`${serverApi}/api/eat-smart/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          toast.success("EatSmart Deleted Successfully ! ");
          setDeleteRow("");
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
  };

  useEffect(() => {
    getEatSmarts();
  }, [addingNewEatSmart, deleteRow, editDialog]);

  const addNewEatSmart = (eatsmartData) => {
    console.log(eatsmartData);

    const eatsmart = {
      title: {
        en: eatsmartData.titleInEnglish,
        ar: eatsmartData.titleInArabic,
      },
      duration: eatsmartData.duration,
      type: eatsmartData.type,
      price: eatsmartData.price,
      description: {
        en: eatsmartData.descriptionInEnglish,
        ar: eatsmartData.descriptionInArabic,
      },
      points: eatsmartData.points,
      //   image: eatsmartData.image,
      //   image :formData
    };
    console.log("EatSmart", eatsmart);

    //     formData.append("title[en]" , eatsmartData.titleInEnglish)
    //     formData.append("title[ar]" , eatsmartData.titleInArabic)
    //     formData.append("description[en]" , eatsmartData.descriptionInEnglish )
    //     formData.append("description[ar]" , eatsmartData.descriptionInArabic )
    //     formData.append("duration", eatsmartData.duration);
    //     formData.append("price", eatsmartData.price);
    //     formData.append("points", eatsmartData.points);
    //     formData.append("type", eatsmartData.type);

    axios
      .post(`${serverApi}/api/eat-smart`, eatsmart, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("EatSmart Added Successfully ! ");
          setAddingNewEatSmart(false);
        }
      })
      .catch((err) => {
        console.log(err);
        // console.log(err.response.data.errors);
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
  const editorColumns =[{
    field: "titleInEnglish",
    headerName: "Title",
    flex: 0.2,
    renderCell: ({ row: { _id, title } }) => {
      return <Typography key={_id}>{title.en}</Typography>;
    },
  },
  {
    field: "title",
    headerName: "اسم العضويه",
    flex: 0.2,
    renderCell: ({ row: { _id, title } }) => {
      return <Typography key={_id}>{title.ar}</Typography>;
    },
  },
  {
    field: "type",
    headerName: "Type",
    flex: 0.1,
  },
  {
    field: "points",
    headerName: "Points",
    flex: 0.1,
  },
  {
    field: "edit",
    headerName: "Edit",
    flex: 0.2,
    renderCell: ({ row: { _id, title, description, price , duration , points , type  } }) => {
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
            onClick={() => openEditDialog({ _id, title, description, price , duration , points , type  })}
          >
            Edit <EditIcon sx={{ marginLeft: "8px" }} />
          </Button>
        </Box>
      );
    },
  }]
const adminFields = [
  {
    field: "price",
    headerName: "Price",
    flex: 0.1,
  },
  ,{
  field: "delete",
  headerName: "Delete",
  flex: 0.2,
  renderCell: ({ row: { _id, title } }) => {
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
          onClick={() => openDeleteAlert({ _id, title })}
        >
          Delete <DeleteIcon sx={{ marginLeft: "8px" }} />
        </Button>
      </Box>
    );
  },
}]
const adminColumns = [...editorColumns , ...adminFields]
  // const columns = [
  //   {
  //     field: "titleInEnglish",
  //     headerName: "Title",
  //     flex: 0.2,
  //     renderCell: ({ row: { _id, title } }) => {
  //       return <Typography key={_id}>{title.en}</Typography>;
  //     },
  //   },
  //   {
  //     field: "title",
  //     headerName: "اسم العضويه",
  //     flex: 0.2,
  //     renderCell: ({ row: { _id, title } }) => {
  //       return <Typography key={_id}>{title.ar}</Typography>;
  //     },
  //   },
  //   {
  //     field: "type",
  //     headerName: "Type",
  //     flex: 0.1,
  //   },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     flex: 0.1,
  //   },
  //   {
  //     field: "points",
  //     headerName: "Points",
  //     flex: 0.1,
  //   },
  //   {
  //     field: "edit",
  //     headerName: "Edit",
  //     flex: 0.2,
  //     renderCell: ({ row: { _id, title, description, price , duration , points , type  } }) => {
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
  //             onClick={() => openEditDialog({ _id, title, description, price , duration , points , type  })}
  //           >
  //             Edit <EditIcon sx={{ marginLeft: "8px" }} />
  //           </Button>
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     field: "delete",
  //     headerName: "Delete",
  //     flex: 0.2,
  //     renderCell: ({ row: { _id, title } }) => {
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
  //             onClick={() => openDeleteAlert({ _id, title })}
  //           >
  //             Delete <DeleteIcon sx={{ marginLeft: "8px" }} />
  //           </Button>
  //         </Box>
  //       );
  //     },
  //   },
  // ];

  return (
    <Box m="20px">
      <DashboardHeader
        title="EatSmarts"
        subtitle="Managing the EatSmarts"
      />
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
          " & .MuiDialogContentText-root": {
            marginBottom: "1 rem !important",
          }, "& .MuiTablePagination-selectLabel": {
            display: "none !important"
          },
          "& .MuiTablePagination-input": {
            display: "none !important"
          },
          "& .MuiTablePagination-actions": {
            display: "none !important"
          },
          "& .MuiTablePagination-displayedRows": {
            margin: "auto 3rem"
          }
        }}
      >
        <DataGrid
          disableRowSelectionOnClick
          rows={eatSmart}
          getRowId={(row) => row._id}
          columns={state.userRole ==='admins' ? adminColumns : editorColumns }
          slots={state.userRole === 'admins' ? { toolbar: EditToolbar} : null }
          // columns={columns}
          // slots={{
          //   toolbar: EditToolbar,
          // }}
          slotProps={{
            toolbar: {
              addNewEatSmart,
              getEatSmarts,
              addingNewEatSmart,
              setAddingNewEatSmart,
              imagesPreview,
              setImagesPreview,
              // eatSmartTypes
            },
          }}
        // editMode="row"
        />
        {editDialog ? (
          <Dialog
            open={editDialog ? true : false}
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
            onClose={() => setEditDialog(false)}
          >
            <DialogTitle>Editing EatSmart</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  titleInEnglish: editDialog.title.en,
                  titleInArabic: editDialog.title.ar,
                  descriptionInEnglish: editDialog.description.en,
                  descriptionInArabic: editDialog.description.ar,
                  duration: editDialog.duration,
                  price: editDialog.price,
                  points: editDialog.points,
                  type: editDialog.type,
                  image: []
                }}
                onSubmit={(values, actions) => {
                  editEatSmart(editDialog._id, values);
                  //   actions.resetForm();
                  //setAddingNewEatSmart(false);
                }}
                validationSchema={EatSmartSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
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
                      <Box>
                        <TextField
                          fullWidth
                          type="string"
                          label="EatSmart Type"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.type}
                          name="type"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        {/* <InputLabel id="type-select-label">
                        EatSmart Type
                      </InputLabel> */}
                        {/* <Select
                        onChange={(e) => {
                          const selectedEatSmart = e.target.value;
                          setFieldValue("type", selectedEatSmart);
                        }}
                        value={values.type}
                        name="type"
                        sx={{ width: "100%", marginTop: "1rem !important" }}
                      >
                        {eatSmartTypes.map((type, index) => {
                          return (
                            <MenuItem key={index} value={type}>
                              {type}
                            </MenuItem>
                          );
                        })}
                      </Select> */}
                        {errors.category && touched.category ? (
                          <span className="input-err-msg">
                            {errors.category}
                          </span>
                        ) : null}
                      </Box>
                      <Box className="containerNames">
                        <Box className="childName">
                          <TextField
                            fullWidth
                            //   variant="filled"
                            type="text"
                            label="EatSmart Name in English"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.titleInEnglish}
                            name="titleInEnglish"
                            error={!!touched.name && !!errors.name}
                            sx={{ gridColumn: "span 2" }}
                          />
                          {errors.titleInEnglish && touched.titleInEnglish ? (
                            <span className="input-err-msg">
                              {errors.titleInEnglish}
                            </span>
                          ) : null}
                        </Box>
                        <Box className="childName">
                          <TextField
                            fullWidth
                            //   variant="filled"
                            type="text"
                            label="اسم العضويه بالعربى"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.titleInArabic}
                            name="titleInArabic"
                            error={!!touched.name && !!errors.name}
                            sx={{ gridColumn: "span 2" }}
                          />
                          {errors.titleInArabic && touched.titleInArabic ? (
                            <span className="input-err-msg">
                              {errors.titleInArabic}
                            </span>
                          ) : null}
                        </Box>
                        <Box className="childName">
                          <TextField
                            fullWidth
                            type="string"
                            label="Duration"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.duration}
                            name="duration"
                            error={!!touched.name && !!errors.name}
                            sx={{ gridColumn: "span 2" }}
                          />
                          <br />
                          {errors.duration && touched.duration ? (
                            <span className="input-err-msg">
                              {errors.duration}
                            </span>
                          ) : null}
                        </Box>
                        {state.userRole === "admins" ? 
                        <Box className="childName">
                          <TextField
                            fullWidth
                            type="number"
                            label="Price"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.price}
                            name="price"
                            error={!!touched.name && !!errors.name}
                            sx={{ gridColumn: "span 2" }}
                          />
                          <br />
                          {errors.price && touched.price ? (
                            <span className="input-err-msg">
                              {errors.price}
                            </span>
                          ) : null}
                        </Box>
                        : null }
                        <Box className="childName">
                          <TextField
                            fullWidth
                            type="number"
                            label="Points"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.points}
                            name="points"
                            error={!!touched.name && !!errors.name}
                            sx={{ gridColumn: "span 2" }}
                          />
                          <br />
                          {errors.points && touched.points ? (
                            <span className="input-err-msg">
                              {errors.points}
                            </span>
                          ) : null}
                        </Box>
                      </Box>

                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          multiline={true}
                          type="text"
                          label="EatSmart Description in English"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.descriptionInEnglish}
                          name="descriptionInEnglish"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.descriptionInEnglish &&
                          touched.descriptionInEnglish ? (
                          <span className="input-err-msg">
                            {errors.descriptionInEnglish}
                          </span>
                        ) : null}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          multiline={true}
                          type="text"
                          label="وصف العضويه بالعربى"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.descriptionInArabic}
                          name="descriptionInArabic"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.descriptionInArabic &&
                          touched.descriptionInArabic ? (
                          <span className="input-err-msg">
                            {errors.descriptionInArabic}
                          </span>
                        ) : null}
                      </Box>

                      {/* <Box
                      sx={{
                        width: "80% !important",
                        margin: "1rem auto !important",
                      }}
                    >
                      <input
                        variant="filled"
                        type="file"
                        accept="image/*"
                        //   multiple
                        label="Images"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setImagesPreview([]);
                          const selectedImages = [...e.target.files];
                          setFieldValue("image", selectedImages);
                          selectedImages.forEach((imageFile) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setImagesPreview((prevImages) => [
                                  ...prevImages,
                                  reader.result,
                                ]);
                              }
                            };
                            reader.readAsDataURL(imageFile);
                          });
                        }}
                        name="images"
                        sx={{ gridColumn: "span 2" }}
                      />
                      <br />
                      {errors.image && touched.image ? (
                        <span className="input-err-msg">{errors.image}</span>
                      ) : null}
                    </Box> */}
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
                      {/* <Box className="imgs-preview">
                      {imagesPreview.map((img) => (
                        <img
                          src={img}
                          key={img}
                          alt="Images Preview"
                          className="mt-3 mr-2"
                        />
                      ))}
                    </Box> */}
                    </Box>
                  </form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        ) : null}
        {deleteRow ? (
          <Dialog
            open={deleteRow ? true : false}
            keepMounted
            onClose={closeDeleteAlert}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Delete Instructor confirmation alert </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete the instructor ?<br />
                Name : <b>{deleteRow.title.en}</b> <br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteAlert}>No</Button>
              <Button onClick={() => deleteEatSmart(deleteRow._id)}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </Box>
    </Box>
  );
};

export default EatSmarts;
