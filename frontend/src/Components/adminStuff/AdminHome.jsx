/** @format */

import React, { useRef } from "react";

function AdminHome() {
  let serialNumber = useRef(0);

  return (
    <div className='pt-20'>
      <h1 className='text-blue-200 font-medium text-3xl text-center'>
        Dashboard
      </h1>
      <div className='text-blue-300'>
        <h3 className='font-medium text-xl px-4'>Products</h3>
        <div className='grid grid-cols-4 px-10 text-center text-lg text-white'>
          <p>S.No.</p>
          <p>Name</p>
          <p>Price</p>
          <p>Actions</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
