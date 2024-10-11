/** @format */

import React, { useEffect, useState } from "react";
import logo1 from "../../assets/Images/logo1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alreadyLogged, userLogout } from "../../slice";
import { TiThMenu } from "react-icons/ti";
import { PiUserListBold } from "react-icons/pi";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.sahara);
  const [dropdown, setDropdown] = useState(false);

  

  function logoutUser() {
    dispatch(userLogout({}));
  }

  const logio = (
    <div className='flex gap-3 items-center font-medium text-xl relative'>
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
        <NavLink to='/'>
          <img
            src={logo1}
            alt='sahara-logo'
            className='w-20 hover:drop-shadow-[0px_0px_10px_rgba(255,205,0,1)]'
          />
        </NavLink>
        {logio}
        <div>
          <button className='text-3xl' onClick={() => setDropdown(!dropdown)}>
            {/* <TiThMenu /> */}
            <PiUserListBold />
          </button>
          <ul
            className={`${
              dropdown ? "" : "hidden"
            } absolute bg-white p-4 right-4`}
          >
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
