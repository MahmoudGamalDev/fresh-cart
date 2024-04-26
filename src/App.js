import React, { Suspense, useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter, createHashRouter, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import NotFound from "./components/NotFound/NotFound";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import { userContext } from "./UserContext";
import { RoutesGuard } from "./components/RoutesGuard";
import ProductDetails from "./components/Product Details/ProductDetails";
import Orders from "./components/Orders/Orders";
import { lazy } from 'react';
import Loading from "./components/Loading/Loading";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";


const Products = lazy(() => import('./components/Products/Products'));

export default function App() {
  let { setUser, setLogin } = useContext(userContext);

  // Handle reload
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUser(localStorage.getItem("userToken"));
      setLogin(localStorage.getItem("userName"));
    }
  });

  const routes = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: localStorage.getItem("userToken") ? <Home /> : <Login /> },
        { path: "register", element: <Register /> },
        { path: "home", element: <RoutesGuard><Home /></RoutesGuard> },
        { path: "brands", element: <RoutesGuard><Brands /></RoutesGuard> },
        { path: "products", element: <RoutesGuard><Suspense fallback={<Loading></Loading>}><Products></Products></Suspense></RoutesGuard> },
        { path: "productDetails/:id", element: <RoutesGuard><ProductDetails /></RoutesGuard> },
        { path: "categories", element: <RoutesGuard><Categories /></RoutesGuard> },
        { path: "cart", element: <RoutesGuard><Products /></RoutesGuard> },
        { path: "allorders", element: <RoutesGuard><Orders /></RoutesGuard> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
