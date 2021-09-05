import React from "react";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  return (
    <>
      <nav class="flex items-center py-8 px-14 justify-between sticky top-0 z-50 bg-white">
        <div class="flex items-center">
          <div>
            {/* <img */}
            <h1
              class="text-3xl font-bold text-gray-700 cursor-pointer"
              onClick={() => history.push("/")}
            >
              Event Guru
            </h1>
          </div>
          <div class="ml-10 text-xl">
            <ul class="md:flex space-x-8 hidden ">
              <li>
                <a href="#" class="text-gray-800 font-semibold cursor-pointer">
                  Events
                </a>
              </li>
              <li>
                <a href="/contactus" class="text-gray-800 font-semibold">
                  Contact Us
                </a>
              </li>
              {/* <li>
                  <a href="#" class="text-gray-800 font-semibold">
                    World
                  </a>
                </li> */}
            </ul>
          </div>
        </div>
        <div class="lg:flex  items-center space-x-3 py-3 px-6 w-36 bg-indigo-600 text-white rounded-lg  transition-all duration-400 transform hover:scale-105 cursor-pointer hover:shadow-lg">
          <a href="/login">
            <button>Sign In</button>
          </a>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </span>
        </div>
      </nav>
    </>
  );
}

export default Header;
