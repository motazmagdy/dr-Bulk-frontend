import React from "react";
import { Routes, Route } from "react-router-dom";
import Categories from "./Categories/Categories";
import Dashboard from "./Dashboard/Dashboard";
import Products from "./Products/Products";
import Instructors from "./Instructors/Instructors";
import ChangePassword from "./ChangePassword/ChangePassword";
import Memberships from "./Memberships/Memberships";
import EatSmarts from "./EatSmart/EatSmart";
import AboutUs from "./AboutUs/AboutUs";
import Clients from "./Clients/Clients";
import Orders from "./Orders/Orders";
import BookedMemberships from "./Booked Memberships/Booked Memberships";
import BookedEatsmart from "./Booked Eatsmart/Booked Eatsmart";

const AdminRouter = ({getCategories ,categories, setCategories,
    getProducts ,products, setProducts,
    getInstructors, instructors ,setInstructors,
    getMemberships, memberships ,setMemberships,
    getEatSmarts, eatSmart ,setEatSmarts,
    getUsers, users , setUsers, filteredValues, setFilteredValues,
    aboutUs ,setAboutUs , getOrders , orders , setOrders ,
    bookedMembership , setBookedMemberships , getBookedMemberships ,
    bookedEatsmart , setBookedEatsmart , getBookedEatsmart  
  }) => {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/categories"
        element={
          <Categories
            categories={categories}
            setCategories={setCategories}
            getCategories={getCategories}
          />
        }
      />
      <Route
        path="/products"
        element={<Products products={products} setProducts={setProducts} getProducts={getProducts}/>}
      />
      <Route
        path="/instructors"
        element={
          <Instructors
            instructors={instructors}
            setInstructors={setInstructors}
            getInstructors={getInstructors}
          />
        }
      />
      <Route
        path="/memberships"
        element={
          <Memberships
            memberships={memberships}
            setMemberships={setMemberships}
            getMemberships={getMemberships}
          />
        }
      />
      <Route
        path="/eat-smart"
        element={<EatSmarts eatSmart={eatSmart} setEatSmarts={setEatSmarts} getEatSmarts={getEatSmarts}/>}
      />
      <Route
        path="/orders"
        element={<Orders orders={orders} setOrders={setOrders} getOrders={getOrders}/>}
      />
      <Route
        path="/booked-memberships"
        element={<BookedMemberships bookedMembership={bookedMembership} setBookedMemberships={setBookedMemberships} getBookedMemberships={getBookedMemberships}/>}
      />
      <Route
        path="/booked-eatsmart"
        element={<BookedEatsmart bookedEatsmart={bookedEatsmart} setBookedEatsmart={setBookedEatsmart} getBookedEatsmart={getBookedEatsmart}/>}
      />
      <Route
        path="/about-us"
        element={<AboutUs aboutUs={aboutUs} setAboutUs={setAboutUs}/>}
      />
      <Route
        path="/clients"
        element={<Clients users={users} setUsers={setUsers} getUsers={getUsers} filteredValues={filteredValues} setFilteredValues={setFilteredValues}/>}
      />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  );
};

export default AdminRouter;
