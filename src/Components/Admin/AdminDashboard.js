import React from "react";
import { useHistory } from "react-router-dom";

function AdminDashboard(props) {
  const history = useHistory();
  return (
    <div>
      <div className="flex h-screen max-h-1">
        <div className="m-auto mt-10">
          {/* <h2 class="text-3xl leading-9 font-bold tracking-tight text-gray-800 sm:text-4xl sm:leading-10 text-center -mt-40">
            Admin Dashboard
          </h2> */}
          <div class=" flex  flex-col  md:flex-row justify-center  flex-wrap gap-20 mt-32">
            <div class="">
              <div class="bg-white max-w-xs shadow-lg   mx-auto border-b-4 border-indigo-500 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
                <div class="bg-indigo-500  flex h-20  items-center">
                  <h1 class="text-white ml-4 border-2 py-2 px-4 rounded-full">
                    1
                  </h1>
                  <p class="ml-4 text-white uppercase">Advertisements</p>
                </div>
                <p class="py-6 px-6 text-lg tracking-wide text-center">
                  Manage Advertisements
                </p>
                <div class="flex justify-center px-5 mb-2 text-sm ">
                  <button
                    type="button"
                    class="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                    onClick={() => history.push("/admin/newad")}
                  >
                    Click
                  </button>
                </div>
              </div>
            </div>

            <div class="">
              <div class="bg-white max-w-xs mx-auto rounded-2xl  border-b-4 border-green-500 overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
                <div class="h-20 bg-green-500 flex items-center ">
                  <h1 class="text-white ml-4 border-2 py-2 px-4 rounded-full">
                    2
                  </h1>
                  <p class=" text-white text-base ml-4 uppercase">
                    Registration
                  </p>
                </div>
                <p class="py-6 px-6 text-lg tracking-wide text-center">
                  Manage Registrations
                </p>
                <div class="flex justify-center px-5 mb-2 text-sm ">
                  <button
                    type="button"
                    class="border border-green-500 text-green-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline"
                  >
                    Click
                  </button>
                </div>
              </div>
            </div>

            <div class="">
              <div class="bg-white max-w-xs mx-auto rounded-2xl  border-b-4 border-red-500 overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
                <div class="h-20 bg-red-500 flex items-center ">
                  <h1 class="text-white ml-4 border-2 py-2 px-4 rounded-full">
                    3
                  </h1>
                  <p class=" text-white text-base ml-4 uppercase">Stats</p>
                </div>
                <p class="py-6  px-6 text-lg tracking-wide text-center">
                  View System Statistics
                </p>
                <div class="flex justify-center px-5 mb-2 text-sm ">
                  <button
                    type="button"
                    class="border border-red-500 text-red-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-red-600 focus:outline-none focus:shadow-outline"
                    onClick={() => history.push("/admin/statistics")}
                  >
                    Click
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
