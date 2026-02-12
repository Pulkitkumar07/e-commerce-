import React from "react";
import { HousePlug, Menu, ShoppingBag, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
import { asyncLogoutUser } from "../../store/actions/userAction.jsx"; // adjust path

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const handleLogout = () => {
    dispatch(asyncLogoutUser());
    navigate("/auth/login");
  };

  const menuItems = [
    { id: "home", label: "Home", path: "/shop/home" },
    { id: "men", label: "Men", path: "/shop/listing" },
    { id: "women", label: "Women", path: "/shop/listing" },
    { id: "kids", label: "Kids", path: "/shop/listing" },
    { id: "home", label: "Home", path: "/shop/listing" },
    { id: "footwear", label: "Footwear", path: "/shop/listing" },
    { id: "accessories", label: "Accessories", path: "/shop/listing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="text-lg font-bold">E-Commerce</span>
        </Link>


        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="text-sm font-medium hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>


        <div className=" flex items-center gap-4">


          <div className="hidden lg:block relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/shop/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>


          {isAuthenticated ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-black hidden lg:block text-white rounded-full w-10 h-10 p-0">
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-60 h-70   rounded-l-sm shadow-lg p-6">
                <SheetHeader>
                  <SheetTitle>Profile</SheetTitle>
                  <SheetDescription>
                    Manage your account
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-6 h-fit flex flex-col gap-4">

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
            <Button onClick={() => navigate("login")}>
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

              <div className="flex flex-col gap-6 mt-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="text-base font-medium hover:text-blue-600 transition"
                  >
                    {item.label}
                  </Link>
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
