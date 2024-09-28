/** @format */

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../slice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.sahara);
  //   console.log(user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRolee] = useState("");

  async function logThatUser(e) {
    e.preventDefault();
    // console.log(email, password, role);
    dispatch(userLogin({ email, password, role }));
  }
//   console.log(user);
    useEffect(() => {
      if (user.logged && user.role === 'admin') {
        navigate("/admin/home");
      }
    }, [user]);

  return (
    <div className='user w-full min-h-dvh pt-20 lg:pr-40 flex items-center justify-center lg:justify-end'>
      <div className='border w-fit px-6 py-4 rounded-xl shadow-md shadow-cyan-900  bg-gradient-to-tl from-gray-300 to-cyan-100/10'>
        <h1 className='text-2xl font-bold text-violet-100 mb-3 mx-auto w-fit'>
          LogIn
        </h1>
        <form
          action=''
          className='flex flex-col gap-4 items-center'
          onSubmit={(e) => logThatUser(e)}
        >
          <input
            type='email'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            required
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            required
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            name='role'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            required
            onChange={(e) => setRolee(e.target.value)}
          >
            <option value=''>Role</option>
            <option value='admin' className='text-fuchsia-600 font-medium'>
              Admin
            </option>
            <option value='user' className='text-amber-700 font-medium'>
              User
            </option>
          </select>
          <button className='bg-orange-400 font-medium border text-xl p-2 rounded-xl text-white shadow-md shadow-orange-900 active:shadow-none hover:border-orange-600 hover:bg-orange-200 hover:text-gray-600 active:translate-y-1 transition-all'>
            Submit
          </button>
        </form>
        <button
          onClick={() => navigate("/user/forgotpassword")}
          className='text-center w-full pt-3 font-medium text-blue-600 hover:text-blue-500'
        >
          Forgot Password ?
        </button>

        <h1 className='flex items-center font-medium text-2xl text-gray-600'>
          <hr className='w-1/2 border' />
          or <hr className='w-1/2  border' />
        </h1>
        <div className='w-fit mx-auto text-center font-medium text-gray-600'>
          <p>Dont't have a account</p>
          <button
            className='text-green-700 hover:text-lime-500'
            onClick={() => navigate("/user/signup")}
          >
            SignUp here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
