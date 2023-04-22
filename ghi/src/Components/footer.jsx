import React from "react";
import { Link } from "react-router-dom";
import byobLogo from "../Assets/byobLogo.png";
import { FaGithubSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="bottom-0 w-full bg-[#203330]">
      <div className="p-5 max-w-[1440px] mx-auto px-4 gap-8 grid lg:grid-cols-4">
        <div className="">
          <Link to="/">
            <img src={byobLogo} className="pb-4 w-3/6" />
          </Link>
          <div className="flex justify-between md:w-[50%] my-2">
            <FaGithubSquare size={30} color="white" />
            <FaInstagram size={30} color="white" />
            <FaTwitterSquare size={30} color="white" />
          </div>
        </div>
        <div className="lg:col-span-3 flex justify-between mx-8">
          <div>
            <h6 className="text-white font-medium py-2">Support</h6>
            <ul className="text-white">
              <li className="py-2 text-sm">
                <a
                  href="https://gitlab.com/byob1/byob"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gitlab Repository
                </a>
              </li>
              <li className="py-2 text-sm">Technologies</li>
              <li className="py-2 text-sm">Complaints</li>
              <li className="py-2 text-sm">FAQs</li>
            </ul>
          </div>
          <div>
            <h6 className="text-white font-medium py-2">Community</h6>
            <ul className="text-white">
              <li className="py-2 text-sm">
                <a href="/" target="_blank" rel="noopener noreferrer">
                  Join Us!
                </a>
              </li>
              <li className="py-2 text-sm">Access Account</li>
              <li className="py-2 text-sm">Forgot Username?</li>
              <li className="py-2 text-sm">Forgot Password?</li>
            </ul>
          </div>
          <div>
            <h6 className="text-white font-medium py-2">Company</h6>
            <ul className="text-white">
              <li className="py-2 text-sm">About Us</li>
              <li className="py-2 text-sm">Contact Us</li>
              <li className="py-2 text-sm">Location</li>
              <li className="py-2 text-sm">The Team</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
