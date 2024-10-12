/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../slice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminProducts, user, status, error } = useSelector(
    (state) => state.sahara
  );
  useEffect(() => {
    dispatch(getAllProducts({}));
  }, []);
  return (
    <div className='py-20 bg-gradient-to-bl from-amber-200 to-green-200'>
      <h1 className='w-fit mx-auto font-medium text-3xl text-orange-500'>
        Trending
      </h1>
      <div className='flex flex-wrap gap-6 justify-center items-center py-10 px-20'>
        {adminProducts.length ? (
          adminProducts.map((ele, idx) => {
            return (
              <div
                key={idx}
                className='w-60 flex flex-col justify-between items-center my-6 bg-slate-400 rounded-lg h-80 border-2 shadow-md shadow-slate-900 border-slate-700 hover:scale-110'
              >
                <img
                  onClick={() => navigate("/detailedproduct", { state: ele })}
                  src={ele.images[0]}
                  alt=''
                  className='w-full rounded-t-lg max-h-60 object-center cursor-pointer'
                />
                <div className=' flex flex-col justify-start items-center w-full'>
                  <p className='text-sky-50 max-w-full overflow-hidden text-nowrap px-2'>
                    {ele.title}
                  </p>
                  <p className='line-through text-rose-600'>
                    RS.{ele.originalPrice}
                  </p>
                  <p className='text-emerald-200'>RS.{ele.offerPrice}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Home;
