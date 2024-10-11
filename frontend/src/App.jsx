/** @format */

import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Common/Header";
import SignUp from "./Components/User/SignUp";
import Login from "./Components/User/Login";
import ForgotPassword from "./Components/User/ForgotPassword";
import Home from "./Components/Home";
import AdminHome from "./Components/adminStuff/AdminHome";
import ProductManage from "./Components/adminStuff/ProductManage";
import AdminRoute from "./Components/adminStuff/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <div className='container w-full min-h-dvh min-w-full bg-gradient-to-br from-yellow-800 to-blue-800 relative'>
        <Header></Header>
        <Routes>
          <Route path='/user/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/user/login' element={<Login></Login>}></Route>
          <Route
            path='/user/forgotpassword'
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route
            path='/admin/home'
            element={
              // <AdminRoute></AdminRoute>
              <AdminHome></AdminHome>
            }
          ></Route>

          <Route
            path='/admin/productManage'
            element={<ProductManage></ProductManage>}
          ></Route>
          {/* <Route path='/home'></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
