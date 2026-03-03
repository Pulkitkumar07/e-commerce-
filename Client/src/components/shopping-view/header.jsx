import React, { useState, useEffect } from "react";
import { HousePlug, Menu, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { useSelector, useDispatch } from "react-redux";
import { asyncLogoutUser } from "../../store/actions/userAction.jsx";
import CartWrapper from "./cartWrapper";
import { fetchCartItems } from "@/store/actions/cartAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cartProduct);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCartItems(user._id));
    }
  }, [user?._id, dispatch]);

  const handleLogout = () => {
    dispatch(asyncLogoutUser());
    navigate("/auth/login");
  };

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "Men's", label: "Men" },
    { id: "Women", label: "Women" },
    { id: "Kids", label: "Kids" },
    { id: "Footwear", label: "Footwear" },
    { id: "Accessories", label: "Accessories" },
  ];

  const handleNavigate = (id) => {
    sessionStorage.removeItem("filters");
    if (id === "home") {
      navigate("/shop/home");
      return;
    }

    
    sessionStorage.setItem(
      "filters",
      JSON.stringify({ category: [id] })
    );

    navigate(`/shop/listing?category=${id}`);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">

       
        <button
          onClick={() => handleNavigate("home")}
          className="flex items-center gap-2"
        >
          <HousePlug className="h-6 w-6" />
          <span className="text-lg font-bold">E-Commerce</span>
        </button>

 
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className="text-sm font-medium hover:text-blue-600 transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">

         
          <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  Items added to your cart
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6">
                <CartWrapper cartItems={cartItems} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Profile */}
          {isAuthenticated ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-black hidden lg:block text-white rounded-full w-10 h-10 p-0">
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-60 p-6">
                <SheetHeader>
                  <SheetTitle>Profile</SheetTitle>
                  <SheetDescription>
                    Manage your account
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/shop/account")}
                  >
                    My Account
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button onClick={() => navigate("/auth/login")}>
              Login
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-full max-w-xs p-6">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Browse categories
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-5 mt-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className="text-base font-medium hover:text-blue-600 transition text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
};

export default Header;