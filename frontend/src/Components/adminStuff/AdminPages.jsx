/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

function AdminPages() {
  return (
    <div className='w-full font-medium text-xl mb-3 bg-gradient-to-r from-white to-gray-400 grid grid-cols-4 items-center justify-around'>
      <NavLink
        to='/admin/home'
        className='hover:bg-sky-400 hover:text-white w-full text-center py-3'
      >
        HOME
      </NavLink>{" "}
      <NavLink
        to='/admin/productManage'
        className='hover:bg-sky-400 hover:text-white w-full text-center py-3'
      >
        ADD PRODUCT
      </NavLink>
      <NavLink className='hover:bg-sky-400 hover:text-white w-full text-center py-3'>
        SEARCH PRODUCT
      </NavLink>
      <NavLink className='hover:bg-sky-400 hover:text-white w-full text-center py-3'>
        USER MANAGE
      </NavLink>
    </div>
  );
}

export default AdminPages;
