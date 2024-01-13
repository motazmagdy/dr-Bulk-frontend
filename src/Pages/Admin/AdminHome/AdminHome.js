import React , { useState , useEffect } from "react";
import AdminSidebar from "../../../Components/Admin-Sidebar/AdminSidebar";
import '../AdminRouter'
import Topbar from "../../../Components/Topbar/Topbar";
import AdminRouter from "../AdminRouter";
import useAuthContext from "../../../Hooks/AuthContextHook";
import EditorRouter from "../../Editor/EditorRouter";
import EditorSidebar from "../../../Components/Editor-Sidebar/EditorSidebar";
import axios from "axios";
const serverApi = process.env.REACT_APP_DR_BULK_API;

const AdminHome = () => {
    const { state } = useAuthContext();
    const [isSidebar, setIsSidebar] = useState(true);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [memberships, setMemberships] = useState([]);
    const [eatSmart, setEatSmarts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [aboutUs, setAboutUs] = useState([]);
    const [filteredValues, setFilteredValues] = useState(users);
    const [bookedMembership , setBookedMemberships] = useState([]);
    const [bookedEatsmart , setBookedEatsmart] = useState([]);

  const getCategories = () => {
    axios
      .get(`${serverApi}/api/categories`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const getProducts = () => {
    axios
      .get(`${serverApi}/api/products?page={3}&limit={50}`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const getInstructors = () => {
    axios
      .get(`${serverApi}/api/instructors`)
      .then((response) => {
        setInstructors(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const getMemberships = () => {
    axios
      .get(`${serverApi}/api/memberships`)
      .then((response) => {
        setMemberships(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const getEatSmarts = () => {
    axios
      .get(`${serverApi}/api/eat-smart`)
      .then((response) => {
        setEatSmarts(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const getUsers = () => {
    axios
      .get(`${serverApi}/api/users/all-users` ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data.data);
        setFilteredValues(response.data.data)
      })
      .catch((error) => console.log(error));
  };
  const getAboutUs = () =>{
    axios
    .get(`${serverApi}/api/about` ,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    })
    .then((response) => {
      console.log(response);
      setAboutUs(response.data.data);
      // setFilteredValues(response.data.data)
    })
    .catch((error) => console.log(error));
  }
  const getOrders = () =>{
    axios
      .get(`${serverApi}/api/orders` ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => console.log(error));
  }
  const getBookedMemberships = () =>{
    axios
      .get(`${serverApi}/api/book-membership` ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setBookedMemberships(response.data.data);
      })
      .catch((error) => console.log(error));
  }
  const getBookedEatsmart = () =>{
    axios
      .get(`${serverApi}/api/book-eat-smart` ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setBookedEatsmart(response.data.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getCategories();
    getProducts();
    getInstructors();
    getMemberships();
    getEatSmarts();
    getUsers();
    getAboutUs();
    getOrders();
    getBookedMemberships();
    getBookedEatsmart();
  }, []);

  return (
    <div className="app">
      {state.userRole === "admins" ? (
        <AdminSidebar isSidebar={isSidebar} />
      ) : (
        <EditorSidebar isSidebar={isSidebar} />
      )}
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        {state.userRole === "admins" ? 
        <AdminRouter 
        getCategories={getCategories} categories={categories} setCategories={setCategories}
        getProducts={getProducts} products={products} setProducts={setProducts}
        getInstructors={getInstructors} instructors={instructors} setInstructors={setInstructors}
        getMemberships={getMemberships} memberships={memberships} setMemberships={setMemberships}
        getEatSmarts={getEatSmarts} eatSmart={eatSmart} setEatSmarts={setEatSmarts}
        getUsers={getUsers} users={users}  setUsers={setUsers} filteredValues={filteredValues} setFilteredValues={setFilteredValues}
        aboutUs={aboutUs} setAboutUs={setAboutUs}
        getOrders={getOrders} orders={orders} setOrders={setOrders}
        bookedMembership={bookedMembership} setBookedMemberships={setBookedMemberships} getBookedMemberships={getBookedMemberships}
        bookedEatsmart={bookedEatsmart} setBookedEatsmart={setBookedEatsmart} getBookedEatsmart={getBookedEatsmart}
         /> : 
        <EditorRouter 
        getCategories={getCategories} categories={categories} setCategories={setCategories}
        getProducts={getProducts} products={products} setProducts={setProducts}
        getInstructors={getInstructors} instructors={instructors} setInstructors={setInstructors}
        getMemberships={getMemberships} memberships={memberships} setMemberships={setMemberships}
        getEatSmarts={getEatSmarts} eatSmart={eatSmart} setEatSmarts={setEatSmarts}
        getUsers={getUsers} users={users}  setUsers={setUsers} filteredValues={filteredValues} setFilteredValues={setFilteredValues}
        aboutUs={aboutUs} setAboutUs={setAboutUs}
        />}
      </main>
    </div>
  ); 
};

export default AdminHome;
