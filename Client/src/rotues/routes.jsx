import { Routes, Route } from "react-router-dom";
import Layout from "../components/auth/layout.jsx";
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
import AdminLayout from "@/components/admin-view/layout.jsx";
import Dashboard from "../pages/admin-view/dashboard.jsx";
import Orders from "../pages/admin-view/orders.jsx";
import Products from "../pages/admin-view/product.jsx";
import Features from "../pages/admin-view/features.jsx";
import ShoppingLayout from "../components/shopping-view/layout.jsx";
import ShoppingHome from "../pages/shopping-view/home.jsx";
import ShoppingListing from "../pages/shopping-view/listing.jsx";
import ShoppingCheckout from "../pages/shopping-view/checkout.jsx";
import ShoppingAccount from "../pages/shopping-view/account.jsx";
import PageNotFound from "../pages/not-found/pagenotfound.jsx";
import CheckAuth from "../components/common/check-auth.jsx";
import UnauthPage from "../pages/unauth-page/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncGetuserProfile } from "@/store/actions/userAction.jsx";

const MainRoutes = () => {

 const dispatch=useDispatch(); 

 useEffect(()=>{
  dispatch(asyncGetuserProfile())
 },[]);


const { isLoading } = useSelector((state) => state.user);
const user = useSelector((state) => state.user.user);
const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
 if(isLoading) return <div>Loading...</div>;
 
  return (
    <Routes>

      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Layout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="features" element={<Features />} />
      </Route>

      <Route
        path="/shop"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route path="home" element={<ShoppingHome />} />
        <Route path="listing" element={<ShoppingListing />} />
        <Route path="checkout" element={<ShoppingCheckout />} />
        <Route path="account" element={<ShoppingAccount />} />
      </Route>

      <Route path="/unauth-page" element={<UnauthPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoutes;
