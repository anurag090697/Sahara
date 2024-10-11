/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotpassword1, forgotpassword2 } from "../../slice";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const navigate = useNavigate();
  const [whichform, setwhichform] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("");
  const dispatch = useDispatch();
  const { forgotPassword } = useSelector((state) => state.sahara);

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  function sendOTP(e) {
    e.preventDefault();
    if (email) dispatch(forgotpassword1({ email }));
    else alert("enter a valid email");
    // setwhichform(!whichform);
  }
  function verifyOTP(e) {
    e.preventDefault();
    if (password === cpassword) {
      dispatch(forgotpassword2({ email, otp, password }));
    }
    // setwhichform(!whichform);
  }
  useEffect(() => {
    if (forgotPassword.statusText === "OK") setwhichform(false);
    else if (forgotPassword.otpVerified) {
      
      navigate("/user/login");
    } 
    // console.log(forgotPassword);
  }, [forgotPassword]);
  // function changePassword(e) {
  //   e.preventDefault();

  // }
  return (
    <div className='user w-full min-h-dvh pt-20 lg:pr-40 flex items-center justify-center lg:justify-end'>
      <div className='border w-fit px-6 py-4 rounded-xl shadow-md shadow-cyan-900  bg-gradient-to-tl from-gray-300 to-cyan-100/10'>
        <h1 className='text-2xl font-bold my-3 text-violet-100 mx-auto w-fit'>
          Recover Password
        </h1>
        <form
          action=''
          className={`flex flex-col gap-4 items-center ${
            whichform ? "" : "hidden"
          }`}
        >
          <input
            name="email"
            type='email'
            className={`py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium `}
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={(e) => sendOTP(e)}
            className={`bg-orange-400 font-medium border text-xl p-2 rounded-xl text-white shadow-md shadow-orange-900 active:shadow-none hover:border-orange-600 hover:bg-orange-200 hover:text-gray-600 active:translate-y-1 transition-all  `}
          >
            Send Email
          </button>
        </form>
        <form
          action=''
          className={`flex flex-col gap-4 items-center ${
            whichform ? "hidden" : ""
          }`}
        >
          <input
            name='otp'
            type='number'
            placeholder='Enter OTP'
            value={otp}
            required
            onChange={(e) => setotp(e.target.value)}
            className={`py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium`}
          />
          <input
            name='password'
            type='password'
            className={`py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium`}
            placeholder='Enter Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <input
            name='confirm_password'
            type='password'
            required
            className={`py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium`}
            placeholder='Confirm Password'
            onChange={(e) => setCpassword(e.target.value)}
          />
          <button
            onClick={(e) => verifyOTP(e)}
            className={`bg-orange-400 font-medium border text-xl p-2 rounded-xl text-white shadow-md shadow-orange-900 active:shadow-none hover:border-orange-600 hover:bg-orange-200 hover:text-gray-600 active:translate-y-1 transition-all
             `}
          >
            Submit
          </button>
        </form>
        <div className='w-full text-center font-medium py-3'>
          <p className=' text-fuchsia-600'>{forgotPassword.message}</p>{" "}
          <p className='text-rose-600'>{forgotPassword.error}</p>
        </div>
        <h1 className='flex items-center  font-medium text-2xl text-gray-600'>
          <hr className='w-1/2 border' />
          or <hr className='w-1/2  border' />
        </h1>
        <div className='w-fit mx-auto text-center font-medium text-gray-600'>
          <p>Dont't have a account</p>
          <button
            className='text-green-700 hover:text-lime-500'
            onClick={() => navigate("/user/signup")}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
