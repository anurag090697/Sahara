/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../slice";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { registered, status, error } = useSelector((state) => state.sahara);
  const [formData, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    mobile: "",
    role: "",
  });
  const [resmsg, setResMsg] = useState({ message: "", error: "" });
  // console.log(status);
  const [cpass, setCpass] = useState("");

  function setValue(e) {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  }
  async function reisterUser(e) {
    e.preventDefault();

    if (formData.password === cpass) {
      dispatch(userRegister({...formData}));
    } else {
      setResMsg({ message: "", error: "Password does not match" });
      setTimeout(() => {
        setResMsg({ message: "", error: "" });
      }, 4000);
    }
  }
  useEffect(() => {
    if (registered.message) {
      setResMsg({ message: "User added successfully", error: "" });
      setTimeout(() => {
        setResMsg({ message: "", error: "" });
      }, 4000);
    }
  }, [registered]);

  return (
    <div className='user w-full min-h-dvh pt-20 lg:pr-40 flex items-center justify-center lg:justify-end'>
      <div className='border w-fit px-6 py-4 rounded-xl shadow-md shadow-cyan-900  bg-gradient-to-tl from-gray-300 to-cyan-100/10'>
        <h1 className='text-2xl font-bold text-violet-100 mb-3 mx-auto w-fit'>
          SignUp
        </h1>
        <form
          action=''
          className='grid grid-cols-1 md:grid-cols-2 justify-center gap-4 items-center'
          onSubmit={(e) => reisterUser(e)}
        >
          <input
            type='text'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium '
            required
            // value={formData.firstname}
            name='firstname'
            placeholder='Enter First Name'
            onChange={(e) => setValue(e)}
          />
          <input
            type='text'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium '
            required
            name='lastname'
            placeholder='Enter Last Name'
            onChange={(e) => setValue(e)}
          />
          <input
            type='email'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            required
            placeholder='Enter Email'
            onChange={(e) => setValue(e)}
            name='email'
          />
          <input
            type='tel'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            placeholder='Enter Mobile Number'
            required
            onChange={(e) => setValue(e)}
            name='mobile'
          />
          <input
            type='password'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            required
            placeholder='Enter Password'
            name='password'
            onChange={(e) => setValue(e)}
          />
          <input
            type='password'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            required
            placeholder='Confirm Password'
            name='confirm password'
            value={cpass}
            onChange={(e) => setCpass(e.target.value)}
          />{" "}
          <select
            name='gender'
            onChange={(e) => setValue(e)}
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium '
            required
          >
            <option value='' className='text-gray-500'>
              Select Gender
            </option>
            <option value='male' className='text-blue-700 font-medium'>
              Male
            </option>
            <option value='female' className='text-rose-500 font-medium'>
              Female
            </option>
            <option value='other' className='text-slate-500 font-medium'>
              Other
            </option>
          </select>
          <select
            name='role'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            required
            onChange={(e) => setValue(e)}
          >
            <option value=''>Role</option>
            <option value='admin' className='text-fuchsia-600 font-medium'>
              Admin
            </option>
            <option value='user' className='text-amber-700 font-medium'>
              User
            </option>
          </select>
          <div className=' md:col-span-2 flex items-center justify-center'>
            <button className='bg-orange-400 font-medium border text-xl py-2 px-4 rounded-xl text-white shadow-md shadow-orange-900 active:shadow-none hover:border-orange-600 hover:bg-orange-200 hover:text-gray-600 active:translate-y-1 transition-all'>
              Submit
            </button>
          </div>
        </form>
        <div
          className={`w-full flex items-center justify-center h-12 font-medium ${
            resmsg.message && "text-emerald-400"
          } ${resmsg.error && "text-rose-500"}`}
        >
          {/* {resmsg.message ? resmsg.message : resmsg.error} */}
        </div>
        <h1 className='flex items-center m font-medium text-2xl text-gray-600'>
          <hr className='w-1/2 border' />
          or <hr className='w-1/2  border' />
        </h1>
        <div className='w-fit mx-auto text-center font-medium text-gray-600'>
          <p>Already have a account</p>
          <button
            className='text-green-700 hover:text-lime-500'
            onClick={() => navigate("/user/login")}
          >
            Log In here
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

//   try {
//     const response = await axios.post(
//       "http://localhost:6789/shop/register",
//       { ...formData }
//     );
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//     setResMsg({ message: "", error: err });
//     setTimeout(() => {
//       setResMsg({ message: "", error: "" });
//     }, 4000);
//   }
