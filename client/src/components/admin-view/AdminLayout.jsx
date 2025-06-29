import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSideBar";

const AdminLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden lg:block  bg-gray-20 w-50">
        <AdminSidebar open={openSideBar} setOpen={setOpenSideBar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className=" bg-white shadow">
          <AdminHeader open={openSideBar} setOpen={setOpenSideBar} />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
