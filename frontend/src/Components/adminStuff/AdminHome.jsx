/** @format */

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, deleteOneProduct } from "../../slice";
import { RiDeleteBinFill } from "react-icons/ri";
import { LuFolderEdit } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import AdminPages from "./AdminPages";

function AdminHome() {
  let serialNumber = useRef(0);
  const navigate = useNavigate();
  const { adminProducts, deletedProduct, user, status, error } = useSelector(
    (state) => state.sahara
  );
  // console.log(adminProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.logged && user.role === "admin") {
      dispatch(getAllProducts({}));
    } else {
      navigate("/user/login");
    }
  }, []);

  function deleteProduct(upis) {
    dispatch(deleteOneProduct(upis));
  }
  useEffect(() => {
    // console.log(deletedProduct);
    if (deletedProduct.status == 202) {
      dispatch(getAllProducts({}));
      serialNumber.current = 0;
    }
  }, [deletedProduct]);
  return (
    <div className='pt-16'>
      <AdminPages></AdminPages>
      <h1 className='text-blue-200 font-medium text-3xl text-center'>
        Dashboard
      </h1>
      <div className='text-blue-300'>
        <h3 className='font-medium text-xl px-4'>Products</h3>
        <div className='grid grid-cols-4 px-10 text-center text-lg text-blue-400 font-medium'>
          <p>S.No.</p>
          <p>Name</p>
          <p>Price</p>
          <p>Actions</p>
        </div>
        <div className='flex flex-col gap-4'>
          {adminProducts.length
            ? adminProducts.map((ele, idx) => {
                return (
                  <div
                    className='grid grid-cols-4 px-10 text-center text-lg text-white hover:bg-sky-600 hover:text-slate-800'
                    key={idx}
                  >
                    <p className='text-lime-400'>{++serialNumber.current}.</p>
                    <p className=' cursor-pointer'>{ele.title}</p>
                    <p>{ele.offerPrice}</p>
                    <p className='text-amber-100'>
                      <button
                        className='font-medium  hover:text-rose-500'
                        onClick={() => deleteProduct(ele.upis)}
                      >
                        <RiDeleteBinFill />
                      </button>{" "}
                      <button className='font-medium hover:text-cyan-500'>
                        <LuFolderEdit />
                      </button>
                    </p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
