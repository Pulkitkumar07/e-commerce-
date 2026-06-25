import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetuserProfile } from "@/store/actions/userAction.js";
import CheckAuth from "../components/common/check-auth.jsx";
import { Navigate } from "react-router-dom";

const Layout = lazy(() => import("../components/auth/layout.jsx"));
const Login = lazy(() => import("../pages/auth/login.jsx"));
const Register = lazy(() => import("../pages/auth/register.jsx"));

const AdminLayout = lazy(() => import("@/components/admin-view/layout.jsx"));
const Dashboard = lazy(() => import("../pages/admin-view/dashboard.jsx"));
const Orders = lazy(() => import("../pages/admin-view/Adminorders.jsx"));
const Products = lazy(() => import("../pages/admin-view/product.jsx"));
const Features = lazy(() => import("../pages/admin-view/features.jsx"));

const ShoppingLayout = lazy(() => import("../components/shopping-view/layout.jsx"));
const ShoppingHome = lazy(() => import("../pages/shopping-view/home.jsx"));
const ShoppingListing = lazy(() => import("../pages/shopping-view/listing.jsx"));
const ShoppingCheckout = lazy(() => import("../pages/shopping-view/checkout.jsx"));
const ShoppingAccount = lazy(() => import("../pages/shopping-view/account.jsx"));
const SearchPage = lazy(() => import("@/pages/shopping-view/searchPage.jsx"));
const About = lazy(() => import("@/pages/shopping-view/about.jsx"));
const ContactPage = lazy(() => import("../pages/shopping-view/contactPage.jsx"));

const PageNotFound = lazy(() => import("../pages/not-found/pagenotfound.jsx"));
const UnauthPage = lazy(() => import("../pages/unauth-page/index.jsx"));
const PaypalReturn = lazy(() => import("@/components/shopping-view/paypal.jsx"));
const PaymentSuccess = lazy(() => import("@/components/shopping-view/payment-success.jsx"));

const MainRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetuserProfile());
  }, [dispatch]);

  const { isLoading, user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <Suspense fallback={<div className="p-4 text-center">Loading page...</div>}>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/shop/home" replace />}
        />


        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Layout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="features" element={<Features />} />
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Suspense>
  );
};

export default MainRoutes;