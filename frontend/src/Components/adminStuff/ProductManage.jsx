/** @format */

import React, { useEffect, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { addNewProduct } from "../../slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AdminPages from "./AdminPages";

function ProductManage() {
  const dispatch = useDispatch();
  const { user, multiResponse } = useSelector((state) => state.sahara);
  // console.log(multiResponse);
  const [messageR, setMessageR] = useState({ message: "", error: "" });
  useEffect(() => {
    if (multiResponse.item === "newProduct") {
      setFormData({
        title: "",
        brand: "",
        category: "",
        originalPrice: 0,
        offerPrice: 0,
        attributes: {},
        images: [],
        inventory: "",
        inStock: true,
        description: "",
        addedBy: user._id || "66f1dc7263d63696ae02cded",
      });
      alert(multiResponse.message);
    }
  }, [multiResponse]);
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    originalPrice: 0,
    offerPrice: 0,
    attributes: {},
    images: [],
    inventory: "",
    inStock: true,
    description: "",
    addedBy: user._id || "66f1dc7263d63696ae02cded",
  });

  const [attributes, setAttributes] = useState({ key: "", value: "" });
  function setData(e) {
    const { name, value } = e.target;
    // let tm = formData;
    // tm[name] = value;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
    // console.log(formData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    const fData = new FormData();
    for (const key in formData) {
      if (Object.hasOwn(formData, key)) {
        fData.append(key, formData[key]);
      }
    }
    dispatch(addNewProduct(fData));
  }

  function changeAttributes() {
    // console.log("Fff");
    let tm = formData;
    if (attributes.key && attributes.value) {
      tm.attributes[attributes.key] = attributes.value;
    }
    setFormData(tm);
    // console.log(formData);
    setAttributes({ key: "", value: "" });
  }

  function removeAttribute(ele) {
    // console.log(ele);
    let tm = formData.attributes;
    delete tm[ele];
    setFormData({ ...formData, attributes: { ...tm } });
  }

  async function setImages(e) {
    const { name, value, files } = e.target;
    // console.log(files[0].path);
    setFormData((prevState) => ({ ...prevState, pics: files[0] }));
    // try {
    //   const fr = new FormData();
    //   fr.append("image", files[0]);
    //   const res = axios.post("http://localhost:6789/shop/postPicture", fr, {
    //     withCredentials: true,
    //   });
    //   console.log(res);
    //   // console.log(files[0])
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <div className='pt-16 pb-10 bg-gradient-to-br from-fuchsia-300 to-cyan-200 w-full min-h-dvh'>
      <AdminPages></AdminPages>
      <div className='px-24 flex items-center justify-center'>
        <form
          action=''
          className='grid grid-cols-3 gap-10 items-center justify-evenly'
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className='flex flex-col font-medium text-center gap-2 select-none items-center justify-center'>
            <label htmlFor='title' className='text-2xl text-sky-800'>
              Product Name
            </label>
            <input
              name='title'
              placeholder='Enter Title...'
              required
              type='text'
              value={formData.title}
              onChange={(e) => setData(e)}
              className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            />
          </div>
          <div className='flex flex-col font-medium text-center gap-2 select-none items-center justify-center'>
            <label htmlFor='brand' className='text-2xl text-sky-800'>
              Product Brand
            </label>
            <input
              name='brand'
              required
              placeholder='Enter Brand...'
              value={formData.brand}
              onChange={(e) => setData(e)}
              type='text'
              className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            />
          </div>
          <div className='flex flex-col font-medium text-center gap-2 select-none items-center justify-center'>
            <label htmlFor='category' className='text-2xl text-sky-800'>
              Product Category
            </label>
            <input
              name='category'
              required
              placeholder='Enter Category...'
              onChange={(e) => setData(e)}
              type='text'
              className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            />
          </div>
          <div className='flex flex-col font-medium text-center gap-2 select-none items-center justify-center'>
            <label htmlFor='originalPrice' className='text-2xl text-sky-800'>
              Original Price
            </label>
            <input
              name='originalPrice'
              required
              placeholder='Enter Original price...'
              onChange={(e) => setData(e)}
              type='number'
              className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            />
          </div>
          <div className='flex flex-col font-medium text-center gap-2 select-none items-center justify-center'>
            <label htmlFor='OfferPrice' className='text-2xl text-sky-800'>
              Offer Price
            </label>
            <input
              name='offerPrice'
              placeholder='Enter Offer Price...'
              required
              onChange={(e) => setData(e)}
              type='number'
              className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            />
          </div>

          <div className='flex flex-col font-medium text-center gap-2 select-none items-center justify-center'>
            <label htmlFor='inventory' className='text-2xl text-sky-800'>
              Product Inventory
            </label>
            <input
              name='inventory'
              required
              placeholder='Enter Stock Quantity...'
              onChange={(e) => setData(e)}
              type='number'
              className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            />
          </div>
          <div className='flex flex-col font-medium text-center gap-2 select-none items-center justify-center'>
            <label htmlFor='brand' className='text-2xl text-sky-800'>
              Product Description
            </label>
            <textarea
              placeholder='Enter Full Product description...'
              name='description'
              required
              id=''
              onChange={(e) => setData(e)}
              className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            ></textarea>
          </div>
          <div className='flex flex-col font-medium text-center gap-2 select-none items-center justify-center'>
            <label htmlFor='images' className='text-2xl text-sky-800'>
              Product Images
            </label>
            <input
              type='file'
              name='images'
              id=''
              multiple
              className=' py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
              onChange={(e) => setImages(e)}
            />
          </div>
          <div className='flex flex-col font-medium text-center gap-2 select-none items-center justify-center'>
            <label htmlFor='inStock' className='text-2xl text-sky-800'>
              Product Stock
            </label>
            <select
              name='inStock'
              required
              onChange={(e) => setData(e)}
              className='shadow-md text-indigo-500 shadow-cyan-900 p-2 rounded-lg border-2 border-gray-400 outline-lime-600'
            >
              {" "}
              <option value={true} className='text-green-600 font-medium'>
                Available
              </option>
              <option value={false} className='text-rose-500 font-medium'>
                Not Available
              </option>{" "}
            </select>
          </div>
          <div className='grid grid-cols-3 gap-8 font-medium text-center select-none items-start justify-center bg-white/50 rounded-lg shadow-md py-4 px-6 col-span-3'>
            <label
              htmlFor='attributes'
              className='text-2xl text-sky-800 col-span-3'
            >
              Product Attributes
            </label>
            <div className='flex flex-col items-center justify-around gap-6'>
              <input
                name='attribute-key'
                placeholder='Attribute Type...'
                type='text'
                value={attributes.key}
                onChange={(e) =>
                  setAttributes({ ...attributes, key: e.target.value })
                }
                className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
              />
              <input
                name='attribute-value'
                placeholder='Attribute Value...'
                type='text'
                value={attributes.value}
                onChange={(e) =>
                  setAttributes({ ...attributes, value: e.target.value })
                }
                className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
              />
              <p
                className='font-bold text-indigo-500 bg-teal-300 p-2 rounded-lg border border-cyan-400 shadow-md shadow-teal-900 hover:bg-teal-600 hover:text-teal-100 active:shadow-none active:translate-y-1'
                onClick={() => changeAttributes()}
              >
                Add
              </p>
            </div>
            <div className='col-span-2 flex flex-wrap items-center justify-center'>
              {Object.keys(formData.attributes).map((ele, idx) => {
                return (
                  <div
                    key={idx}
                    className='grid grid-cols-3 gap-4 text-left w-1/2'
                  >
                    <p className='text-blue-600'>{ele} :</p>{" "}
                    <p className='text-lime-600'>{formData.attributes[ele]}</p>{" "}
                    <p
                      onClick={() => removeAttribute(ele)}
                      className='text-xl text-fuchsia-400 hover:text-rose-400'
                    >
                      <RiDeleteBinFill />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='col-span-3 justify-center items-center flex select-none'>
            <button
              //   onClick={(e) => handleSubmit(e)}
              className='font-bold text-xl p-3 bg-gradient-to-tr from-cyan-500 via-amber-300 from-40% hover:from-20% hover:to-60% text-gray-700 hover:text-slate-100 to-fuchsia-500 border border-lime-400 rounded-lg shadow-md shadow-cyan-900 active:shadow-none active:translate-y-1'
            >
              Submit
            </button>
          </div>
          {/* <input type='reset' value='Reset' name='reset' /> */}
        </form>
        {/* <select name='' id=''>
          <option value=''>1</option> <option value=''>2</option>
        </select> */}
      </div>
    </div>
  );
}

export default ProductManage;
