/** @format */

import React, { useEffect, useState } from "react";
import logo1 from "../../assets/Images/logo1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alreadyLogged, userLogout } from "../../slice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.sahara);

  useEffect(() => {
    dispatch(alreadyLogged({}));
    // console.log(user);
  }, []);

  function logoutUser() {
    dispatch(userLogout({}));
  }

  const logio = (
    <div className='flex gap-3 items-center font-medium text-xl'>
      {user.logged ? (
        <>
          {/* <p>Welcome</p> */}
          <p className='text-green-700 underline'> {user.firstname}</p>
          <button
            onClick={() => logoutUser()}
            className='text-red-600 hover:text-rose-900'
          >
            LogOut
          </button>
        </>
      ) : (
        <div>
          <NavLink to='/user/login' className='hover:text-blue-700'>
            Login
          </NavLink>{" "}
          /{" "}
          <NavLink to='/user/signup' className='hover:text-blue-700'>
            SignUp
          </NavLink>{" "}
        </div>
      )}
    </div>
  );
  return (
    <header className='w-full absolute top-0 '>
      <nav className='bg-gray-100/60 min-w-full flex items-center py-2 px-6 justify-between'>
        <NavLink>
          <img src={logo1} alt='sahara-logo' className='w-20 ' />
        </NavLink>
        {logio}
      </nav>
    </header>
  );
}

export default Header;
