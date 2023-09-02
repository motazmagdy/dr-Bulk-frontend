import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./AdminHome/AdminHome";
import Categories from "./Categories/Categories";
import Dashboard from "./Dashboard/Dashboard";
import Products from "./Products/Products";
import ChangePassword from "./ChangePassword/ChangePassword";

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
        );
};

export default AdminRouter;