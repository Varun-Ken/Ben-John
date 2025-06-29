import React, { Fragment, useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  AlignJustify,
  ChartNoAxesCombined,
  LogOut,
  Menu,
  Sidebar,
  LayoutDashboard,
  ShoppingBasket,
  Shirt,
  ShoppingBag,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const adminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingBasket />,
  },
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icon: <ShoppingBag />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Shirt />,
  },
];

const MenuItems = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-3">
      {adminSideBarMenuItems.map((menuItem) => (
        <div
          className="flex items-center gap-3 rounded-md p-3"
          key={menuItem.id}
          onClick={() => {
            setOpen(false);
            navigate(menuItem.path);
          }}
        >
          {menuItem.icon}
          {menuItem.label}
        </div>
      ))}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  //const navigate1 = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle  className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined /> 
                <SheetDescription />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside>
        <div className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
          <div
            // onClick={() => navigate1("/admin/dashboard")}
            className="cursor-pointer items-center gap-2"
          >
            <ChartNoAxesCombined size={30} />
            <h1 className="text-xl font-extrabold">Admin Panel</h1>
            <MenuItems setOpen={setOpen} />
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
