import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { orange, red } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./Memberships.css";
import { MembershipSchema } from "../../../Schemas/MembershipSchema";

const serverApi = process.env.REACT_APP_DR_BULK_API;

const EditToolbar = ({
  addNewMembership,
  addingNewMembership,
  setAddingNewMembership,
//   imagesPreview,
  setImagesPreview,
  membershipTypes
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
      {!addingNewMembership ? (
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setAddingNewMembership(true);
          }}
        >
          Add Membership
        </Button>
      ) : (
        <>
          <Dialog
            open={addingNewMembership}
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
            onClose={() => setAddingNewMembership(false)}
          >
            <DialogTitle>Add New Membership</DialogTitle>
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
                  addNewMembership(values);
                //   actions.resetForm();
                  //setAddingNewMembership(false);
                }}
                validationSchema={MembershipSchema}
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
                        <InputLabel id="type-select-label">
                          Membership Type
                        </InputLabel>
                        <Select
                          onChange={(e) => {
                            const selectedMembership = e.target.value;
                            setFieldValue("type", selectedMembership);
                          }}
                          value={values.type}
                          name="type"
                          sx={{ width: "100%", marginTop: "1rem !important" }}
                        >
                          {membershipTypes.map((type, index) => {
                            return (
                              <MenuItem key={index} value={type}>
                                {type}
                              </MenuItem>
                            );
                          })}
                        </Select>
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
                            label="Membership Name in English"
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
                          label="Membership Description in English"
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
                            setAddingNewMembership(false);
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

const Memberships = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { t } = useTranslation();
  const [memberships, setMemberships] = useState([]);
  const [rows, setRows] = useState(memberships);
  const [editDialog, setEditDialog] = useState("");
  const [deleteRow, setDeleteRow] = useState("");
  const [addingNewMembership, setAddingNewMembership] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const membershipTypes = ["Normal", "Silver", "Gold"];

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

  const getMemberships = () => {
    axios
      .get(`${serverApi}/api/memberships`)
      .then((response) => {
        // console.log(response.data.data);
        setMemberships(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  const editMembership = (id, membershipEditedData) => {
    const membershipNewData = {
        title: {
            en: membershipEditedData.titleInEnglish,
            ar: membershipEditedData.titleInArabic,
          },
          duration: membershipEditedData.duration,
          type: membershipEditedData.type,
          price: membershipEditedData.price,
          description: {
            en: membershipEditedData.descriptionInEnglish,
            ar: membershipEditedData.descriptionInArabic,
          },
          points: membershipEditedData.points
    };
    axios
      .put(`${serverApi}/api/memberships/${id}`, membershipNewData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Membership Info Updated Successfully ! ");
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

  const deleteMembership = (id) => {
    axios
      .delete(`${serverApi}/api/memberships/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          toast.success("Membership Deleted Successfully ! ");
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
    getMemberships();
  }, [addingNewMembership, deleteRow, editDialog]);

  const addNewMembership = (membershipData) => {
    console.log(membershipData);
    
    const membership = {
      title: {
        en: membershipData.titleInEnglish,
        ar: membershipData.titleInArabic,
      },
      duration: membershipData.duration,
      type: membershipData.type,
      price: membershipData.price,
      description: {
        en: membershipData.descriptionInEnglish,
        ar: membershipData.descriptionInArabic,
      },
      points: membershipData.points,
    //   image: membershipData.image,
    //   image :formData
    };
    console.log("Membership", membership);

    //     formData.append("title[en]" , membershipData.titleInEnglish)
    //     formData.append("title[ar]" , membershipData.titleInArabic)
    //     formData.append("description[en]" , membershipData.descriptionInEnglish )
    //     formData.append("description[ar]" , membershipData.descriptionInArabic )
    //     formData.append("duration", membershipData.duration);
    //     formData.append("price", membershipData.price);
    //     formData.append("points", membershipData.points);
    //     formData.append("type", membershipData.type);

    axios
      .post(`${serverApi}/api/memberships`, membership, {
        headers: {
            // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Membership Added Successfully ! ");
          setAddingNewMembership(false);
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
  const columns = [
    {
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
      field: "price",
      headerName: "Price",
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
    },
    {
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
    },
  ];

  return (
    <Box m="20px">
      <DashboardHeader
        title="Memberships"
        subtitle="Managing the Memberships"
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
          " & .MuiDataGrid-selectedRowCount & .MuiTablePagination-selectLabel & .MuiTablePagination-actions & .MuiTablePagination-select":
            {
              display: "none !important",
            },

          " & .MuiDialogContentText-root": {
            marginBottom: "1 rem !important",
          },
        }}
      >
        <DataGrid
          // checkboxSelection
          rows={memberships}
          getRowId={(row) => row._id}
          columns={columns}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {
              addNewMembership,
              getMemberships,
              addingNewMembership,
              setAddingNewMembership,
              imagesPreview,
              setImagesPreview,
              membershipTypes
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
          <DialogTitle>Editing Membership</DialogTitle>
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
                editMembership(editDialog._id,values);
              //   actions.resetForm();
                //setAddingNewMembership(false);
              }}
              validationSchema={MembershipSchema}
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
                      <InputLabel id="type-select-label">
                        Membership Type
                      </InputLabel>
                      <Select
                        onChange={(e) => {
                          const selectedMembership = e.target.value;
                          setFieldValue("type", selectedMembership);
                        }}
                        value={values.type}
                        name="type"
                        sx={{ width: "100%", marginTop: "1rem !important" }}
                      >
                        {membershipTypes.map((type, index) => {
                          return (
                            <MenuItem key={index} value={type}>
                              {type}
                            </MenuItem>
                          );
                        })}
                      </Select>
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
                          label="Membership Name in English"
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
                        label="Membership Description in English"
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
              <Button onClick={() => deleteMembership(deleteRow._id)}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </Box>
    </Box>
  );
};

export default Memberships;
