import React , { useState } from "react";
import AdminSidebar from "../../../Components/Admin-Sidebar/AdminSidebar";
import '../AdminRouter'
import Topbar from "../../../Components/Topbar/Topbar";
import AdminRouter from "../AdminRouter";

const AdminHome = () => {

    const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
        <AdminSidebar isSidebar={isSidebar} />
        <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <AdminRouter />
        </main>
    </div>
  ) 
};

export default AdminHome;
