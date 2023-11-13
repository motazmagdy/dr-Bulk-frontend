import React from "react";
import { Routes, Route } from "react-router-dom";
import Categories from "../Admin/Categories/Categories";
import Dashboard from "../Admin/Dashboard/Dashboard";
import Products from "../Admin/Products/Products";
import Instructors from "../Admin/Instructors/Instructors";
import ChangePassword from "../Admin/ChangePassword/ChangePassword";
import Memberships from "../Admin/Memberships/Memberships";
import EatSmarts from "../Admin/EatSmart/EatSmart";
import Clients from "../Admin/Clients/Clients";
import AboutUs from "../Admin/AboutUs/AboutUs";

const EditorRouter = ({
  getCategories,
  categories,
  setCategories,
  getProducts,
  products,
  setProducts,
  getInstructors,
  instructors,
  setInstructors,
  getMemberships,
  memberships,
  setMemberships,
  getEatSmarts,
  eatSmart,
  setEatSmarts,
  getUsers,
  users,
  setUsers,
  filteredValues,
  setFilteredValues,
  aboutUs ,
  setAboutUs
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
        element={
          <Products
            products={products}
            setProducts={setProducts}
            getProducts={getProducts}
          />
        }
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
        element={
          <EatSmarts
            eatSmart={eatSmart}
            setEatSmarts={setEatSmarts}
            getEatSmarts={getEatSmarts}
          />
        }
      />
      <Route
        path="/about-us"
        element={<AboutUs aboutUs={aboutUs} setAboutUs={setAboutUs}/>}
      />
      <Route
        path="/clients"
        element={
          <Clients
            users={users}
            setUsers={setUsers}
            getUsers={getUsers}
            filteredValues={filteredValues}
            setFilteredValues={setFilteredValues}
          />
        }
      />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  );
};

export default EditorRouter;
