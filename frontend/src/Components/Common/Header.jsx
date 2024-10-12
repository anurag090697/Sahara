/** @format */

import React, { useEffect, useState } from "react";
import logo1 from "../../assets/Images/logo1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alreadyLogged, getcartlist, userLogout } from "../../slice";
import { TiThMenu } from "react-icons/ti";
import { PiUserListBold } from "react-icons/pi";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, cart, wishlist } = useSelector((state) => state.sahara);
  const [dropdown, setDropdown] = useState(false);

  function logoutUser() {
    dispatch(userLogout({}));
  }

  // console.log(cart, wishlist);

  useEffect(() => {
    if (user.logged && user.role === "user") {
      // console.log({uid: user._id, email: user.email});
      dispatch(getcartlist({ uid: user._id, email: user.email }));
    }
  }, [user]);

  const logio = (
    <div className='flex gap-3 items-center font-medium text-xl relative'>
      {user.logged ? (
        <>
          <div>
            <button
              className={`text-3xl ${
                dropdown ? "text-emerald-800" : "text-indigo-600"
              }`}
              onClick={() => setDropdown(true)}
              onBlur={() => setDropdown(false)}
            >
              {/* <TiThMenu /> */}
              <PiUserListBold />
            </button>
            <ul
              className={`${
                dropdown ? "" : "hidden"
              } absolute bg-white right-4 w-44 p-4 text-cyan-700`}
            >
              <li className='text-green-700 underline bg-gray-200 hover:bg-gray-400 text-right w-full bg-gray-200'>
                {user.firstname + " " + user.lastname}
                <button
                  onClick={() => logoutUser()}
                  className='text-red-600 hover:text-rose-300 text-right w-full'
                >
                  LogOut
                </button>
              </li>

              {/* <li className>
               
              </li> */}
              <hr className='border-slate-800' />
              <li className=' hover:bg-gray-400'>VIEW CART</li>
              <hr className='border-slate-800' />
              <li className=' hover:bg-gray-400'>VIEW WISHLIST</li>
              <hr className='border-slate-800' />
              <li className=' hover:bg-gray-400'>SETTINGS</li>
            </ul>
          </div>
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

        <div>{logio}</div>
      </nav>
    </header>
  );
}

export default Header;
