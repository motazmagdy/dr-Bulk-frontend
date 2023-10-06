import React from "react";
import { Routes, Route } from "react-router-dom";
import Categories from "./Categories/Categories";
import Dashboard from "./Dashboard/Dashboard";
import Products from "./Products/Products";
import Instructors from "./Instructors/Instructors";
import ChangePassword from "./ChangePassword/ChangePassword";
import Memberships from "./Memberships/Memberships";
import EatSmarts from "./EatSmart/EatSmart";
import Clients from "./Clients/Clients";

const AdminRouter = ({getCategories ,categories, setCategories,
    getProducts ,products, setProducts,
    getInstructors, instructors ,setInstructors,
    getMemberships, memberships ,setMemberships,
    getEatSmarts, eatSmart ,setEatSmarts,
    getUsers, users , setUsers, filteredValues, setFilteredValues}) => {

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
        path="/clients"
        element={<Clients users={users} setUsers={setUsers} getUsers={getUsers} filteredValues={filteredValues} setFilteredValues={setFilteredValues}/>}
      />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  );
};

export default AdminRouter;
