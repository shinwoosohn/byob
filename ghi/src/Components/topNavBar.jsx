import React from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import byobIcon from "../Assets/byobIcon.png";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useLogoutMutation } from "../store/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TopNavBar({ token }) {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  async function handleLogout(e) {
    e.preventDefault();
    const response = await logout();

    if (!response.hasOwnProperty("error")) {
      navigate("/");
    }
  }

  return (
    <div className="w-full h-20 bg-byob-cyan">
      <div className="flex justify-between items-center h-20 px-4 max-w-[1440px] mx-auto bg-byob-cyan">
        <div>
          <Link to="/posts">
            <img
              src={byobIcon}
              alt=""
              className={logo ? "hidden" : "max-h-[50px] max-w-[50px]"}
            />
          </Link>
        </div>
        <div className="flex justify-end">
          <ul className="hidden md:flex">
            <li className="flex justify-center items-center px-4 text-[#203330] hover:text-[#CDD884] bg-byob-cyan hover:bg-[#203330] font-bold rounded-lg">
              <Link to={`/users/${user.user_id}/produce/new`}>
                Create Produce
              </Link>
            </li>
            <li className="flex justify-center items-center px-4 text-[#203330] hover:text-[#CDD884] bg-byob-cyan hover:bg-[#203330] font-bold rounded-lg">
              <Link to="/posts/new">Create Post</Link>
            </li>
            <li className="flex justify-center items-center px-4 text-[#203330] hover:text-[#CDD884] bg-byob-cyan hover:bg-[#203330] font-bold rounded-lg">
              <Link to="/deliveries/new">Request Delivery</Link>
            </li>
            <li className="flex justify-center items-center px-4 text-[#203330] hover:text-[#CDD884] bg-byob-cyan hover:bg-[#203330] font-bold rounded-lg">
              <Link to={`/users/${user.user_id}/orders`}>Your Orders</Link>
            </li>
            <li className="flex justify-center items-center px-4 text-[#203330] hover:text-[#CDD884] bg-byob-cyan hover:bg-[#203330] font-bold rounded-lg">
              <Link to={`/users/${user.user_id}/deliveries`}>
                Your Requests
              </Link>
            </li>
            {user.is_driver && (
              <li className="flex justify-center items-center px-4 text-[#203330] hover:text-[#CDD884] bg-byob-cyan hover:bg-[#203330] font-bold rounded-lg">
                <Link to="/deliveries">Driver Deliveries</Link>
              </li>
            )}
            {user.is_driver && (
              <li className="flex justify-center items-center px-4 text-[#203330] hover:text-[#CDD884] bg-byob-cyan hover:bg-[#203330] font-bold rounded-lg">
                <Link to={`/drivers/${user.user_id}/deliveries`}>
                  Driver Pickups
                </Link>
              </li>
            )}
            <li className="flex justify-center items-center px-4 text-[#203330] hover:text-[#CDD884] bg-byob-cyan hover:bg-[#203330] font-bold rounded-lg">
              <button
                className="button__input"
                id="logout"
                type="submit"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
          <div className="hidden md:flex">
            <BiSearch className="mr-3" size={30} />
            <button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <Link to={`/users/${user.user_id}`}>
                {user.avatar_url != null ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar_url}
                    alt=""
                  />
                ) : (
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    alt=""
                  />
                )}
              </Link>
            </button>
          </div>
          <div onClick={handleNav} className="md:hidden z-10">
            {nav ? (
              <AiOutlineClose className="text-black" size={20} />
            ) : (
              <HiOutlineMenuAlt4 size={20} />
            )}
          </div>
          <div
            onClick={handleNav}
            className={
              nav
                ? "absolute left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col"
                : "absolute left-[-100%]"
            }
          >
            <ul className="hidden md:flex">
              <li className="flex justify-center items-center px-4 text-[#203330] bg-byob-cyan font-bold rounded-lg">
                <Link to={`/users/${user.user_id}/produce/new`}>
                  Create Produce
                </Link>
              </li>
              <li className="flex justify-center items-center px-4 text-[#203330] bg-byob-cyan font-bold rounded-lg">
                <Link to="/posts/new">Create Post</Link>
              </li>
              <li className="flex justify-center items-center px-4 text-[#203330] bg-byob-cyan font-bold rounded-lg">
                <Link to="/deliveries/new">Request Delivery</Link>
              </li>
              <li className="flex justify-center items-center px-4 text-[#203330] bg-byob-cyan font-bold rounded-lg">
                <Link to={`/users/${user.user_id}/orders`}>Your Orders</Link>
              </li>
              <li className="flex justify-center items-center px-4 text-[#203330] bg-byob-cyan font-bold rounded-lg">
                <Link to={`/users/${user.user_id}/deliveries`}>
                  Your Requests
                </Link>
              </li>
              {user.is_driver && (
                <li className="flex justify-center items-center px-4 text-[#203330] bg-byob-cyan font-bold rounded-lg">
                  <Link to="/deliveries">Driver Deliveries</Link>
                </li>
              )}
              {user.is_driver && (
                <li className="flex justify-center items-center px-4 text-[#203330] bg-byob-cyan font-bold rounded-lg">
                  <Link to={`/drivers/${user.user_id}/deliveries`}>
                    Driver Pickups
                  </Link>
                </li>
              )}
              <li className="flex justify-center items-center px-4 text-[#203330] bg-byob-cyan font-bold rounded-lg">
                <button
                  className="button__input"
                  id="logout"
                  type="submit"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNavBar;
