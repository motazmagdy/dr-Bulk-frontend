import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { orange, red } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography , Box , useTheme, TextField } from "@mui/material";
import "./Products.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Formik } from "formik";
import { tokens } from "../../../theme";
import axios from "axios";
import DashboardHeader from "../../../Components/DashboardHeader/DashboardHeader";
import React, { useState, useEffect } from "react";
import { NewProductSchema } from "../../../Schemas/NewProductSchema";
import { UpdateProductSchema } from "../../../Schemas/UpdateProductSchema"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from "react-toastify";
const serverApi = process.env.REACT_APP_DR_BULK_API;

const EditToolbar = ({
  addNewProduct,
  addingNewProduct,
  setAddingNewProduct,
  getCategories,
  theCategories, 
  setTheCategories,
  imagesPreview, 
  setImagesPreview,
  editingImages,
  setEditingImages
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    getCategories();
  }, [addingNewProduct]);

  return (
    <GridToolbarContainer 
    sx={{
        "& .MuiButton-root" : {
          fontWeight: "bolder",
          marginBottom: "1rem",
          fontSize: "larger"
        }
      }}>
      {!addingNewProduct ? (
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setAddingNewProduct(true);
            setImagesPreview([])
          }}
        >
          Add New Product
        </Button>
      ) : (
        <>
          <Dialog
            open={addingNewProduct}
            sx={{
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "1000px",
              },
              "& .MuiBox-root": {
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              },
              "& .MuiBox-root > .MuiBox-root": {
                width: "45%",
                margin: "0.5rem 0",
              },
            //   "& .MuiButton-root": {
            //     width: "3rem",
            //     height: "3rem",
            //   },
            }}
            onClose={() => setAddingNewProduct(false)}
          >
            <DialogTitle>Add New Product</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  titleInEnglish: "",
                  titleInArabic: "",
                  category: "",
                  descriptionInEnglish: "",
                  descriptionInArabic: "",
                  price: "",
                  points: "",
                  images: [],
                }}
                onSubmit={(values, actions ) => {
                  addNewProduct(values);
                  actions.resetForm();
                  setImagesPreview([])
                }}
                validationSchema={NewProductSchema}
              >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
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
                      <Box
                        display="flex"
                        flexDirection="column"
                        width="95% !important"
                      >
                        <InputLabel id="categoryInEnglish-select-label">
                          Choose the Category
                        </InputLabel>
                        <Select
                          onChange={(e) => {
                            const selectedCategory = e.target.value
                            setFieldValue('category',selectedCategory)
                          }}
                          value={values.category}
                          name="categories"
                          sx={{ width: "100%" }}>
                          {theCategories.map((category) => {
                            return (
                              <MenuItem key={category.id} value={category.id}>
                                {category.categoryEnglish} {" - "}
                                {category.categoryArabic}
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
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                        //   variant="filled"
                          type="text"
                          label="Product Name in English"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.titleInEnglish}
                          name="titleInEnglish"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.titleInEnglish && touched.titleInEnglish ? (
                          <span className="input-err-msg">
                            {errors.titleInEnglish}
                          </span>
                        ) : null}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                        //   variant="filled"
                          type="text"
                          label="اسم المنتج بالعربى"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.titleInArabic}
                          name="titleInArabic"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.titleInArabic && touched.titleInArabic ? (
                          <span className="input-err-msg">
                            {errors.titleInArabic}
                          </span>
                        ) : null}
                      </Box>

                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                        //   variant="filled"
                          type="text"
                          label="Description Name in English"
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
                        //   variant="filled"
                          type="text"
                          label="وصف المنتج بالعربى"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.descriptionInArabic}
                          name="descriptionInArabic"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.descriptionInArabic && touched.descriptionInArabic ?(
                          <span className="input-err-msg">
                            {errors.descriptionInArabic}
                          </span>
                        ) : null}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                        //   variant="filled"
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
                          <span className="input-err-msg">{errors.price}</span>
                        ) : null}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                        //   variant="filled"
                          type="number"
                          label="points"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.points}
                          name="points"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.points && touched.points ? (
                          <span className="input-err-msg">{errors.points}</span>
                        ) : null}
                      </Box>
                      <Box
                        sx={{
                          width: "80% !important",
                          margin: "1rem auto !important",
                        }}
                      >
                        <input
                          variant="filled"
                          type="file"
                          accept="image/*"
                          multiple
                          label="Images"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setImagesPreview([]);
                            const selectedImages = [...e.target.files];
                            setFieldValue("images", selectedImages);
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
                        {errors.images && touched.images ? (
                          <span className="input-err-msg">{errors.images}</span>
                        ) : null}
                        
                      </Box>
                      <br />
                      <Box className="newProductBtns">
                        <Button
                          onClick={() => {
                            setAddingNewProduct(false);
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
                      <br/>
                      <Box className="imgs-preview">
                          {imagesPreview.map((img) => (
                            <img
                              src={img}
                              key={img}
                              alt="Images Preview"
                              className="mt-3 mr-2 productImg"
                            />
                          ))}
                        </Box>
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

const Products = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [products, setProducts] = useState([]);
  const [productsNumber, setProductsNumber] = useState(0);
  const [editingProduct, setEditingProduct] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(false);
  const [addingNewProduct, setAddingNewProduct] = useState(false);
  const [theCategories, setTheCategories ] = useState([])
  const [imagesPreview, setImagesPreview] = useState([]);
  const [editingImages , setEditingImages] = useState(false)

  const getProducts = () => {
    axios
      .get(`${serverApi}/api/products?page={3}&limit={50}`)
      .then((response) => {
        // console.log(response.data.data);
        setProductsNumber(response.data.results);
        setProducts(response.data.data);
      })
      .catch((error) => console.log(error));
  };

    const editProduct = (id, newData) => {
        const updatedData = {
            title : {
                en:newData.titleInEnglish,
                ar:newData.titleInArabic,
            },
            category: newData.category,
            description : {
                en:newData.descriptionInEnglish,
                ar:newData.descriptionInArabic,
            },
            price : newData.price,
            points : newData.points,
        }

      axios
        .put(`${serverApi}/api/products/${id}`, updatedData , {
          headers:{
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Product Updated Successfully ! ")
          }
        })
        .catch((err) => {
            console.log(err.response.data.errors);
          if (err.response.data.message) {
            toast.error(err.response.data.message);
          } else {
            err.response.data.errors.forEach((err) => {
              toast.error(err.msg)
            });
          }
        });
    };

  const deleteProduct = (id)=>{
    axios
      .delete(`${serverApi}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          toast.success("Product Deleted Successfully ! ");
          setDeletingProduct(false)
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          err.response.data.errors.forEach((err) => {
            toast.error(err.msg);
          });
        }
      });
  }

  const getCategories = () => {
    axios
      .get(`${serverApi}/api/categories`)
      .then((response) => {
        const theCategories = response.data.data;
        const availableCategories = theCategories.map((category) => {
          return {
            id: category._id,
            categoryEnglish: category.name.en,
            categoryArabic: category.name.ar,
          };
        });
        setTheCategories(availableCategories);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() =>{
        getProducts();
  }, [addingNewProduct,editingProduct,deletingProduct]);

  const addNewProduct = (product) => {
    const formData = new FormData();
    formData.append("title[en]" , product.titleInEnglish)
    formData.append("title[ar]" , product.titleInArabic)
    formData.set("category", product.category);
    formData.append("description[en]" , product.descriptionInEnglish)
    formData.append("description[ar]" , product.descriptionInArabic)
    formData.set("price", product.price);
    formData.set("points", product.points);

    product.images.forEach((image) => {
      formData.append(`images`, image);
    });

    axios
      .post(`${serverApi}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
            toast.success("Product Added Successfully ! ");
            setAddingNewProduct(false)
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

  const deleteproductImage = (productId , img)=>{
    console.log(productId);
    console.log(img );
    const formData = new FormData();
    formData.append(`images`, img);
    axios.delete(`${serverApi}/api/products/remove-img/${productId}`,  {
      headers : {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem("Token")}`,
        data :{ removedImg :  img}
      }}
    )
    .then((response) => {
      if (response.status === 200) {
          toast.success("Product Image Deleted Successfully ! ");
          // setEditingProduct(false)
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
  }


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 0.2,
      renderCell: ({ row: { _id, title } }) => {
        return <Typography key={_id}>{title.en}</Typography>;
      },
    },
    {
      field: "nameInArabic",
      headerName: "اسم المنتج",
      flex: 0.2,
      renderCell: ({ row: { _id, title } }) => {
        return <Typography key={_id}>{title.ar}</Typography>;
      },
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.1,
    },
    {
      field: "categoryInEnglish",
      headerName: "Category",
      flex: 0.2,
      renderCell: ({ row: { _id, category } }) => {
        return <Typography key={_id}>{category.name.en}</Typography>;
      },
    },
    {
      field: "categoryInArabic",
      headerName: "الفئة",
      flex: 0.2,
      renderCell: ({ row: { _id, category } }) => {
        return <Typography key={_id}>{category.name.ar}</Typography>;
      },
    },
    {
      field: "image",
      headerName: "Thumbnail",
      flex: 0.2,
      renderCell: ({ row: { _id, images } }) => {
        if ( images ){
            const formattedImagePath = images[0]?.replace(/\\/g, '/').replace('public/', '');
            return <img key={_id} className="prodThumbnail" src={`${serverApi}/${formattedImagePath}`} />;
        } else {
            return null
        }
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: ({ row:{ _id, title, category, description, price, points, images} }) => {
        return (
          <Box
            // width="50%"
            margin="auto"
            display="flex"
            justifyContent="center"
            borderRadius="2px"
          >
            <Button
              type="submit"
              style={{ backgroundColor: orange[500], color: "white" }}
              variant="contained"
              onClick={() =>{
                  setEditingProduct({_id, title, category, description, price, points, images})
                  setImagesPreview(images)
              }
              }
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
      renderCell: ({ row: { _id, title , category } }) => {
        return (
          <Box
            // width="50%"
            margin="auto"
            display="flex"
            justifyContent="center"
            borderRadius="2px"
          >
            <Button
              type="submit"
              style={{ backgroundColor: red[500], color: "white" }}
              variant="contained"
                onClick={() => setDeletingProduct({ _id, title ,category })}
            >
              Delete <DeleteIcon sx={{ marginLeft: "8px" }} />
            </Button>
          </Box>
        );
      },
    },
  ];
//   console.log(products);
// console.log(editingImages);
  return (
    <Box m="20px">
      <DashboardHeader title="Products" subtitle="Managing the Products" />
      <Typography variant="h5">
        Available products : {productsNumber}
      </Typography>
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
          disableRowSelectionOnClick
          rows={products}
          getRowId={(row) => row._id}
          columns={columns}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {
              addNewProduct,
              getProducts,
              addingNewProduct,
              setAddingNewProduct,
              getCategories,
              theCategories,
              setTheCategories,
              imagesPreview,
              setImagesPreview,
              editingImages,
              setEditingImages,
            },
          }}
        //   editMode="row"
        />
        {/* {console.log("editingProduct" , editingProduct)} */}
        {editingProduct ? (
          <Dialog
            open={editingProduct ? true : false}
            sx={{
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "1000px",
              },
              "& .MuiBox-root": {
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              },
              "& .MuiBox-root > .MuiBox-root": {
                width: "45%",
                margin: "0.5rem 0",
              },
              "& .MuiButton-root": {
                width: "3rem",
                height: "3rem",
              },
            }}
            onClose={() => setEditingProduct(false)}
          >
            <DialogTitle>Update Product Details</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  titleInEnglish: editingProduct.title.en,
                  titleInArabic: editingProduct.title.ar,
                  category: editingProduct.category._id,
                  descriptionInEnglish: editingProduct.description.en,
                  descriptionInArabic: editingProduct.description.ar,
                  price: editingProduct.price,
                  points: editingProduct.points,
                  images: editingProduct.images,
                }}
                onSubmit={(values, actions) => {
                  editProduct(editingProduct._id, values);
                    actions.resetForm();
                    setTimeout(() => {
                    setEditingProduct(false)
                    }, 1000);
                    setImagesPreview([]);
                }}
                validationSchema={UpdateProductSchema}
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
                      <Box
                        display="flex"
                        flexDirection="column"
                        width="95% !important"
                      >
                        <InputLabel id="categoryInEnglish-select-label">
                          Choose the Category
                        </InputLabel>
                        <Select
                          onChange={(e) => {
                            const selectedCategory = e.target.value;
                            setFieldValue("category", selectedCategory);
                          }}
                          value={values.category}
                          name="categories"
                          sx={{ width: "100%" }}
                        >
                          {theCategories.map((category) => {
                            return (
                              <MenuItem key={category.id} value={category.id}>
                                {category.categoryEnglish} {" - "}
                                {category.categoryArabic}
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
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          //   variant="filled"
                          type="text"
                          label="Product Name in English"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.titleInEnglish}
                          name="titleInEnglish"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.titleInEnglish && touched.titleInEnglish ? (
                          <span className="input-err-msg">
                            {errors.titleInEnglish}
                          </span>
                        ) : null}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          //   variant="filled"
                          type="text"
                          label="اسم المنتج بالعربى"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.titleInArabic}
                          name="titleInArabic"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.titleInArabic && touched.titleInArabic ? (
                          <span className="input-err-msg">
                            {errors.titleInArabic}
                          </span>
                        ) : null}
                      </Box>

                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          //   variant="filled"
                          type="text"
                          label="Description Name in English"
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
                          //   variant="filled"
                          type="text"
                          label="وصف المنتج بالعربى"
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
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          //   variant="filled"
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
                          <span className="input-err-msg">{errors.price}</span>
                        ) : null}
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <TextField
                          fullWidth
                          //   variant="filled"
                          type="number"
                          label="points"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.points}
                          name="points"
                          error={!!touched.name && !!errors.name}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <br />
                        {errors.points && touched.points ? (
                          <span className="input-err-msg">{errors.points}</span>
                        ) : null}
                      </Box>
                      <Box
                        sx={{
                          width: "80% !important",
                          margin: "1rem auto !important",
                        }}
                      >
                        {/* <input
                          variant="filled"
                          type="file"
                          accept="image/*"
                          multiple
                          label="Images"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setImagesPreview([]);
                            const selectedImages = [...e.target.files];
                            setFieldValue("images", selectedImages);
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
                        /> */}
                        <label htmlFor="imagesEdit" className="editImagesBtn">
                          Add New Images
                        </label>
                        <input
                          variant="filled"
                          type="file"
                          accept="image/*"
                          multiple
                          label="Images"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setEditingImages(true);
                            setImagesPreview([]);
                            const selectedImages = [...e.target.files];
                            setFieldValue("images", selectedImages);
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
                          id="imagesEdit"
                          className="addImagesBtn"
                        />
                        <br />
                        {errors.images && touched.images ? (
                          <span className="input-err-msg">{errors.images}</span>
                        ) : null}
                      </Box>
                      <br />
                      <Box className="newProductBtns">
                        <Button
                          onClick={() => {
                            setEditingProduct(!editProduct);
                            setImagesPreview([]);
                            setEditingImages(false)
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
                      <Box className="imgs-preview">
                        {!editingImages
                          ? imagesPreview.map((img, index) => {
                              const imgLinkToFormat = `${serverApi}/${img}`;
                              const modifiedString = imgLinkToFormat
                                .replace(/\\/g, "/")
                                .replace("/public", "");
                              return (
                                    <img
                                      key={index}
                                      src={modifiedString}
                                      alt="Images Preview"
                                      className="mt-3 mr-2"
                                    />
                              );
                            })
                          : imagesPreview.map((img) => (
                              <img
                                src={img}
                                key={img}
                                alt="Images Preview"
                                className="mt-3 mr-2"
                              />
                            ))}
                      </Box>
                    </Box>
                  </form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        ) : null}
        {deletingProduct ? (
          <Dialog
            open={deletingProduct ? true : false}
            keepMounted
            onClose={() => setDeletingProduct(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Delete Product confirmation alert </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete the product ?<br />
                Title : <b>{deletingProduct.title.en}</b> <br />
                Category : <b>{deletingProduct.category.name.en}</b>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeletingProduct(false)}>No</Button>
              <Button onClick={() => deleteProduct(deletingProduct._id)}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </Box>
    </Box>
  );
};

export default Products;
