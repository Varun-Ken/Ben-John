import { LogOut, MenuIcon, ShoppingBag, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewMenuItems } from "@/config";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/authSlice/authSlice";
import UserCartWrapper from "./UserCartWrapper";
import { fetchCartItems } from "@/store/shop/cartSlice";
import CheckAuth from "../common/CheckAuth";
import { fetchFilteredProducts } from "@/store/shop/shopSlice";

const HeaderRightCorner = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cartProducts);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-3 cursor-pointer">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <ShoppingCart onClick={() => setOpenCartSheet(true)} />
        <UserCartWrapper
          cartItems={cartItems.items}
          setOpenCartSheet={setOpenCartSheet}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white">
              {user.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="w-40 border-2 rounded-sm bg-white m-2"
        >
          <DropdownMenuItem>Hello, {user.userName}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            Account Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              dispatch(logoutUser()).then((data) => console.log(data))
            }
          >
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const MenuItems = () => {
  const navigate = useNavigate();
  const [searchParams,setSearchParams] = useSearchParams()
  useSearchParams(new URLSearchParams())

  const handleNavigate = (getCurrentItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentItem.id !== "home" && getCurrentItem.id !== "products"
        ? {
            category: [getCurrentItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null ?
    setSearchParams(new URLSearchParams(`?category=${getCurrentItem.id}`)) :
    navigate(getCurrentItem.path);
  };

  return (
    <nav className="flex flex-col mb-3 gap-5 lg:flex-row lg:mb-0">
      {shoppingViewMenuItems.map((navItem) => (
        <Label
          key={navItem.id}
          onClick={() => handleNavigate(navItem)}
          className="text-lg lg:text-sm cursor-pointer"
        >
          {navItem.label}
        </Label>
      ))}
    </nav>
  );
};

const ShopHeader = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b">
      <div className="flex h-16 items-center justify-between px-3">
        <Link className="flex items-center gap-2" to="/shop/listing">
          <ShoppingBag size={25} />
          <span className="text-xl font-bold">Ben John</span>
        </Link>
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="lg:hidden" />
          </SheetTrigger>
          <SheetContent side="left" className="p-5">
            <MenuItems />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightCorner />
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
