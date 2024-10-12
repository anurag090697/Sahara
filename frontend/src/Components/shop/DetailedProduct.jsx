/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { todoWishlist } from "../../slice";

function DetailedProduct() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [imgarr, setImgArr] = useState([]);
  const [idx, setIdx] = useState(0);
  const ele = location.state;
  // console.log(ele);
  const { user, cart, wishlist } = useSelector((state) => state.sahara);
  function inList(upis) {
    let ans = false;
    wishlist.forEach((element) => {
      // console.log(element.upis);
      if (element.upis === upis) ans = true;
    });
    // console.log(ans);
    return ans;
  }
  useEffect(() => {
    if (ele) {
      setImgArr(ele.images || []);
      console.log(inList(ele), wishlist);
    }
  }, [ele]);

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[4];
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }

  function checkWishlist() {
    if (inList(ele.upis)) {
      dispatch(
        todoWishlist({ email: user.email, upis: ele.upis, doThis: "remove" })
      );
    } else {
      dispatch(
        todoWishlist({ email: user.email, upis: ele.upis, doThis: "add" })
      );
    }
  }

  return (
    <div className='px-14 py-20'>
      <div className='flex items-start justify-between border-2 border-rose-500 rounded-lg overflow-hidden h-fit'>
        <div className='flex items-center gap-3 px-6 w-1/3 relative bg-amber-100 '>
          <button
            className={`bg-sky-200/50 p-2 left-0 top-1/2 text-4xl rounded-full absolute ${
              idx === 0 ? "text-rose-600" : "text-indigo-500"
            } hover:bg-sky-400`}
            onClick={() => setIdx((prev) => (prev > 0 ? prev - 1 : prev))}
          >
            <GrPrevious />
          </button>
          <img
            src={
              imgarr[idx] ||
              "https://thumbs.dreamstime.com/b/no-photo-available-icon-shadow-no-photo-available-icon-shadow-simple-vector-logo-268691695.jpg"
            }
            alt=''
          />
          <button
            className={`bg-sky-200/50 absolute right-0 top-1/2 p-2 text-4xl rounded-full ${
              idx === imgarr.length - 1 ? "text-rose-600" : "text-indigo-500"
            } hover:bg-sky-400`}
            onClick={() =>
              setIdx((prev) => (prev < imgarr.length - 1 ? prev + 1 : prev))
            }
          >
            <GrNext />
          </button>
        </div>
        <div className='p-4 bg-sky-200 w-2/3 self-stretch'>
          <div className='flex flex-col gap-4 items-start'>
            <h1 className='text-3xl'>{ele.title}</h1>
            {ele.saharachoice && (
              <div className='text-white bg-amber-500 w-fit pr-4 pl-1 font-medium '>
                Sahara's <span className='text-lime-700'>Choice</span>
              </div>
            )}
            {ele.saharachoice && (
              <h3 className='flex items-end font-black text-sky-500'>
                <FaCheck className='text-amber-500 text-xl' />
                prime
              </h3>
            )}
            {/* <div>
          {ele.totalRatings ? (
            <div className='flex items-center gap-3 font-medium'>
              {" "}
              <span>{ele.product_star_rating}</span>
              <span className={`flex items-center hover:${""}`}>
                {starRating(ele.product_star_rating)}{" "}
                <FaChevronDown className='text-gray-600' />
              </span>
              <span>{ele.product_num_ratings} Ratings</span>
            </div>
          ) : (
            ""
          )}
        </div> */}
            <hr className='border-black w-2/3' />
            <div>
              <div className='flex gap-2 items-end'>
                <h1 className='text-2xl'>Price-{ele.offerPrice}</h1>
                <p>
                  M.R.P.
                  <span className='line-through'>{ele.offerPrice}</span>
                </p>
              </div>
              <div>
                <p>Inclusive of all taxes</p>
                {/* <p>{ele.sales_volume}</p> */}
              </div>
            </div>
          </div>
          <div className='flex gap-6 items-center my-4'>
            <button
              //   onClick={() => handleAddToCart(ele)}
              className='rounded-xl text-gray-100 bg-lime-500 p-2 font-medium shadow-md shadow-lime-800 border-2 border-lime-600 hover:bg-lime-300 hover:text-rose-500 hover:shadow-none'
            >
              Add To Cart
            </button>
            <button
              onClick={() => checkWishlist()}
              className={`${
                inList(ele.upis) ? "text-rose-500" : "text-slate-500"
              } text-4xl hover:text-rose-500 `}
            >
              <FaHeart />
            </button>
          </div>
          <div className='relative border border-lime-500 p-2 rounded-lg'>
            <button
              className='absolute right-2 top-2 text-violet-800 text-xl'
              onClick={() =>
                speak(
                  ele.description ? ele.description : "No description available"
                )
              }
            >
              <HiOutlineSpeakerWave />
            </button>
            <h2 className='text-xl font-medium'>Product Description</h2>
            <p className='text-lime-800'>{ele.description}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap items-start gap-10 justify-around '>
        <div className='flex flex-col px-10 py-5 border-2 border-white rounded-lg w-full my-2 bg-white'>
          <div className='w-fit flex flex-col gap-3 border-2 border-rose-200 bg-rose-100 p-3 rounded-lg shadow-lg shadow-rose-800 my-10'>
            <h1 className='text-xl font-medium'>Customer reviews</h1>
            {/* <div>
          {ele.product_num_ratings ? (
            <div className='flex items-center gap-3 font-medium'>
              {" "}
              <span className={`flex items-center hover:${""}`}>
                {starRating(ele.product_star_rating)}{" "}
              </span>
              <span>{ele.product_star_rating}</span>{" "}
              <span>Out of 5</span>
            </div>
          ) : (
            ""
          )}
        </div> */}
          </div>
        </div>
        {/* 
    <div className='flex items-center justify-around w-full bg-emerald-50 border-2 border-emerald-600 p-3  rounded-lg rounded-lg'>
      
     
    </div> */}
      </div>
    </div>
  );
}

export default DetailedProduct;
